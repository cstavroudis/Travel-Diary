import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { SignIn } from "./index";

class NavBar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">
          Travel Journal
        </Navbar.Brand>

        {this.props.user.email ? (
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
            <SignIn />
          </Nav>
        ) : (
          <Nav>
            <SignIn />
          </Nav>
        )}
      </Navbar>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
});

export default connect(mapState)(NavBar);
