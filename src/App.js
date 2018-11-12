import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import MainList from './components/MainList.js';

var config = {
    apiKey: "AIzaSyCk3Fd6aI31DLLjsaaZFBLh8TcxoVAiBfM",
    authDomain: "grocery-list-5faa0.firebaseapp.com",
    databaseURL: "https://grocery-list-5faa0.firebaseio.com",
    projectId: "grocery-list-5faa0",
    storageBucket: "grocery-list-5faa0.appspot.com",
    messagingSenderId: "341209489552"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainList
          firebase={firebase}
        />
      </div>
    );
  }
}

export default App;
