import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import MainList from './components/MainList.js';
import List from './components/List.js';
import User from './components/User.js';

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
  constructor(props){
    super(props);
    this.state = {
      activeListId: "",
      activeList: "",
      user: "",
      message: ""
    };
  }

  activateList(id, name){
    this.setState({
      activeListId: id,
      activeList: name
    })
  }

  deactivateList(){
    this.setState({
      activeListId: "",
      activeList: ""
    })
  }

  setUser(user){
    if(user === null){
      this.setState({
        user: "Guest",
        message: "You must be signed in to perform actions"
      });
    } else {
      this.setState({
        user: user.displayName,
        message: ""
      });
    }
  }

  render() {
    return (
      <div className="App">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet"></link>
        <User
          firebase={firebase}
          user={this.state.user}
          setUser={(user) => this.setUser(user)}
          message={this.state.message}
        />
        <MainList
          firebase={firebase}
          user={this.state.user}
          activateList={(id, name) => this.activateList(id, name)}
          deactivateList={() => this.deactivateList()}
          activeListId={this.state.activeListId}
        />
        <List
          firebase={firebase}
          user={this.state.user}
          activeListId={this.state.activeListId}
          activeList={this.state.activeList}
        />
      </div>
    );
  }
}

export default App;
