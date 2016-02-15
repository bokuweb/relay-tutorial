import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import App from './app';

console.log('hoge')
ReactDOM.render(
  <Relay.RootContainer 
     Component={App.Container}
     route={App.queries}
     onReadyStateChange={res => console.info(res)} />,
  document.getElementById('content')  
)
