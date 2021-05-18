import React from "react";
import { Button } from "react-bootstrap";
import firebase from "../../Firebase";
import { setUser } from "../store/users";
import { setTrips } from "../store/trips";
import { connect } from "react-redux";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  async handleLogin() {
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

      const db = firebase.firestore();
      const docRef = await db.collection("users").doc(user.email);

      const userDoc = await docRef.get();

      if (userDoc.exists) {
        this.props.setTrips(docRef);
      } else {
        console.log("user not in db, setting user");
        await docRef.set(userInfo);
      }
      userInfo.docRef = docRef;
      this.props.setUser(userInfo);
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
          <Button type="button" onClick={this.handleLogin}>
            Sign In
          </Button>
        )}
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
  setTrips: (docRef) => dispatch(setTrips(docRef)),
});

export default connect(null, mapDispatch)(SignIn);
