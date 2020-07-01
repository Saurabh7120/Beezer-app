/*jshint esversion:9*/
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import './index.css';
import App from './App';
import * as firebase from 'firebase';
import {Provider} from 'react-redux';
import store from './redux/store';
import {persistGate} from 'redux-persist/integration/react';
import {persistor} from './redux/store';


const firebaseConfig = {
   apiKey: "AIzaSyCTt7nuBCZeKVJkCf0E_kTjoBRsa7mNVEU",
   authDomain: "beezer-app-e1939.firebaseapp.com",
   databaseURL: "https://beezer-app-e1939.firebaseio.com",
   projectId: "beezer-app-e1939",
   storageBucket: "beezer-app-e1939.appspot.com",
   messagingSenderId: "1005289167632",
   appId: "1:1005289167632:web:d3aa716e504daf0eb16395",
   measurementId: "G-K18KHB5KPK"
 };

 firebase.initializeApp(firebaseConfig);


ReactDOM.render(
  <Provider store={store}>
  <Router>
  <persistGate persistor={persistor}>
    <App />
  </persistGate>
  </Router>
  </Provider>,
  document.getElementById('root')
);
