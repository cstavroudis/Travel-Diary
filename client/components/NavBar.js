import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export default class NavBar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">
          Travel Journal
        </Navbar.Brand>

        {/* {props.firebase.auth.email ? ( */}
        <Nav>
          <Nav.Link as={Link} to="/trips">
            Trips
          </Nav.Link>
          <Nav.Link as={Link} to="/countries">
            My Countries
          </Nav.Link>
          <Nav.Link as={Link} to="/map">
            My Map
          </Nav.Link>
          <button type="button">Log In</button>
          {/* <LogOut /> */}
        </Nav>
        {/* ) : (
        <Nav>
          <Login />
        </Nav>
      )} */}
      </Navbar>
    );
  }
}

// const mapState = (state) => {
//   console.log("state.firebase:", state.firebase);
//   return {
//     firebase: state.firebase,
//   };
// };
// export default connect(mapState)(NavBar);
