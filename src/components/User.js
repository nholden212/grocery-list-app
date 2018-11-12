import React, { Component } from 'react';

class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: this.props.user
    };
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
      <section className="User">
        <div>Active user: {this.props.user}</div>
        <button onClick={() => this.signIn(provider)}>Sign in with Google</button>
        <button onClick={this.signOut}>Sign out</button>
      </section>
    )
  }
}

export default User;
