import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// default config to be used throughout application
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'; // comes from axios instance file
axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';

axios.interceptors.request.use( reqConfig => {
  console.log(reqConfig);
  return reqConfig;
}, error => {
  // this error method comes in play in case there are connectivity issues, etc
  console.log(error);
  return Promise.reject(error);
} );

axios.interceptors.response.use( respConfig => {
  console.log(respConfig);
  return respConfig;
}, error => {
  console.log(error);
  return Promise.reject(error);
} );

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
