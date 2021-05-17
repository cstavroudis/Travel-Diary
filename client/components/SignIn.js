import React from "react";
import { Button } from "react-bootstrap";
import firebase from "../../Firebase";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(event) {
    try {
      event.preventDefault();
      console.log("clicked! w event:", event);
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      const user = result.user;
      this.setState({ loggedIn: true });
      console.log("user:", user);
    } catch (error) {
      console.log("There was an error loggin user in:", error);
    }
  }

  render() {
    return (
      <div>
        {this.state.loggedIn ? (
          <Button type="button">Sign Out</Button>
        ) : (
          <Button type="button" onClick={this.handleClick}>
            Sign In
          </Button>
        )}
      </div>
    );
  }
}

export default SignIn;
