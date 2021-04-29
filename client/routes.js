import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { HomePage, AllTrips, AllTripsCard } from "./components";
// import { me } from "./store";

/**
 * COMPONENT
 */
export default class Routes extends Component {
  // componentDidMount() {
  //   this.props.loadInitialData();
  // }

  render() {
    const { isLoggedIn } = this.props;
    // user object is available on props in routes
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={HomePage} />
        {/* <Route path="/login" component={Login} /> */}
        <Route exact path="/trips" component={AllTrips} />
        <Route exact path="/trips/:id" component={AllTripsCard} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            {/* <Route path="/account" component={Account} /> */}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        {/* <Route component={Login} /> */}
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
// const mapState = (state) => {
//   return {
//     // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
//     // Otherwise, state.user will be an empty object, and state.user.id will be falsey
//     isLoggedIn: !!state.user.id,
//     user: state.user,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     loadInitialData() {
//       dispatch(me());
//     },
//   };
// };

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
// export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
// Routes.propTypes = {
//   loadInitialData: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired,
// };
