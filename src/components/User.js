import React, { Component } from 'react';

class User extends Component {
  constructor(props){
    super(props);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  signIn(provider){
    this.props.firebase.auth().signInWithPopup(provider);
  }

  signOut(){
    this.props.firebase.auth().signOut();
  }

  render(){
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    return(
      <div className="UserComponent">
        <p className="red-text">{this.props.message}</p>
        Welcome, {this.props.user}
        <button className="auth-button" onClick={() => this.signIn(provider)}>Sign in</button>
        <button className="auth-button" onClick={this.signOut}>Sign out</button>
      </div>
    )
  }
}

export default User;
