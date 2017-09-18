import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';

import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

import SimonApp from './components/SimonApp';

const mountNode = document.getElementById('root');

function fetchQuery(
  operation,
  variables,
) {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

const modernEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

ReactDOM.render(
  <QueryRenderer
    environment={modernEnvironment}
    query={graphql`
      query appQuery { #js is just a module + Query name
        viewer {
          ...SimonApp_viewer
        }
      }
    `}
    variables={{}}
    render={({error, props}) => {
      if (props) {
        return <App viewer={props.viewer} />;
      } else {
        return <div>Loading</div>;
      }
    }}
  />,
  mountNode
);

