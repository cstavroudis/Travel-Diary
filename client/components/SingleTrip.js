import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

class SingleTrip extends React.Component {
  render() {
    const trip = this.props.trip;
    return (
      <Container className="all-trips-single" key={trip.tripId}>
        {/* <Link to={`/trips/${trip.tripId}/entries`}> */}
        <h2>{trip.title}</h2>
        {/* </Link> */}
        <h5>{Object.keys(trip.countries).join(", ")}</h5>
        <h6>{`${trip.startDate} – ${trip.endDate}`}</h6>
      </Container>
    );
  }
}
export default SingleTrip;
