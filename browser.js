import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import App from './app';

ReactDOM.render(
  <Relay.RootContainer 
     Component={App.Container}
     route={App.queries}
     renderLoading={() => <div>Loading...</div>}
     onReadyStateChange={res => console.info(res)} />,
  document.getElementById('content')  
)
