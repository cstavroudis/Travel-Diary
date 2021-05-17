import React from "react";
import { Button } from "react-bootstrap";
import firebase from "../../Firebase";
import { setUser } from "../store/users";
import { connect } from "react-redux";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      const user = result.user;
      this.setState({ loggedIn: true });
      const userInfo = {
        displayName: user.displayName,
        email: user.email,
        photo: user.photoURL,
      };
      this.props.setUser(userInfo);
      const db = firebase.firestore();
      console.log("database:", db);
      const snapshot = await db.collection("users").get();
      console.log("snapshot:", snapshot);
      // const docRef = await db.collection("users").doc(user.email);
      // await docRef.set(userInfo);
      // redirect to trips tab
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

const mapDispatch = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
});

export default connect(null, mapDispatch)(SignIn);
