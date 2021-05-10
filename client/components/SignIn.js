import React from "react";
import { Button } from "react-bootstrap";
import firebase from "../../Firebase";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    console.log("clicked! w event:", event);
    const provider = new firebase.auth.GoogleAuthProvider();
    console.log("provider:", provider);
    const result = firebase.auth().signInWithPopup(provider);
    const credential = result.credential;
    const token = credential.accessToken;
    const user = result.user;
    console.log(`user: ${user}, credential: ${credential}, token: ${token}`);
  }

  render() {
    return (
      <Button type="button" onClick={this.handleClick}>
        Sign In
      </Button>
    );
  }
}

export default SignIn;
