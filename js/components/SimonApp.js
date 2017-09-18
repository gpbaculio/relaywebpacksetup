import 'babel-polyfill'
import React, { Component } 
  from 'react';
import $ from 'jquery';
import { createFragmentContainer, graphql, }
  from 'react-relay';

class SimonApp extends Component {

  state = {
    start: false,
    sequence: [],
    playerSequence: [],
    level: 1,
    hurryUp:0
  }

  componentDidMount() {
    var redTone = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
      greenTone = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
     yellowTone = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
        blueTone = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
           tones = [redTone, greenTone, yellowTone, blueTone];

    var Button = function(divId, tone) {
      this.tone = tone;
      this.lighten = () => {
        var toAnimate = $(divId);
            toAnimate.addClass("lighten");  
            setTimeout(() => toAnimate.removeClass("lighten"), 700); 
      };
    };

    var red = new Button("#red", redTone),
        green = new Button("#green", greenTone),
        yellow = new Button("#yellow", yellowTone),
        blue = new Button("#blue", blueTone);
    this.setState((state, props) => ({ buttons: { red, green, yellow, blue }}));
  }

  _onStartClick = () => {
    this.playSequence() 
  };

playSequence() {
    let  errorTone = new Audio('https://cdn.rawgit.com/iamglenbacs/gpbaculio-simongame/839290a8/sounds/errorbuzz.mp3')
    var { buttons } = this.state;
    var {red, green, yellow, blue } = buttons;

    clearTimeout(this.state.hurryUp)
      var i = 0;
      var play = setInterval(() => {
          var item = this.props.viewer.sequence[i];
          switch(item) {
            case 0:
              red.tone.play()
              red.lighten()
              break;
            case 1:
              green.tone.play()
              green.lighten()
              break;
            case 2:
              yellow.tone.play()
              yellow.lighten()
              break;
            case 3:
              blue.tone.play()
              blue.lighten()
              break;
          }
          if (i === this.state.sequence.length-1) { // when i is equal to the last index === length-1 (smiilar to indexes length)
            clearInterval(play); // stop interval
               var hurryUp = setTimeout(() => {
                  errorTone.play();
                  this.setState((state, props) => ({ hurryUp }));
                  console.log("called on playSequence timeout")
                  this.playSequence();
              }, 3000);
          }
          i++;
      
      }, 3000);
    }

  _playerResponse = (color) => {
    console.log("color response = ", color)
  }


  render() {

    return (<div><span className="title"> Reactjs Calculator </span>
            <div className="container">
              <div className="color-container">
                <div className="inline" id="red" onClick={()=>this._playerResponse('red')}></div>
                <div className="inline" id="green" onClick={()=>this._playerResponse('green')}></div>
                <div className="inline" id="yellow" onClick={()=>this._playerResponse('yellow')}></div>
                <div className="inline" id="blue" onClick={()=>this._playerResponse('blue')}></div>
              </div>
            <button onClick={() => this._onStartClick()}>start </button>
            <button> strict </button>
            <button>{this.state.power ? 'off' : 'on'}</button>
            <span> count:  {this.state.levelCount} </span>
            <div> 
              <div style={{marginTop: '40px'}}>
                  <span style={{float: 'left'}}> Deployed Heroku App: <a href="https://gpbaculio-twitchtv-api.herokuapp.com/" target="_blank" > link </a> </span>
                  <span style={{float: 'right'}}> Github Repo: <a href="https://github.com/iamglenbacs/gpbaculio-twitchtv-api" target="_blank" > link </a> </span>
              </div>
            </div>  
        </div>
        <span className="footer"> Developed by Glendon Philipp Baculio </span>
    </div>);
  }
}

export default createFragmentContainer(SimonApp, {
  viewer: graphql`
    fragment SimonApp_viewer on User {
      id,
      sequence
    }
  `,
});
