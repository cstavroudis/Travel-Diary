import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { setTrip } from "../store/trips";
import { connect } from "react-redux";

class AllTripsCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("setting single Trip:", this.props.trip);
    this.props.setTrip(this.props.trip);
  }

  render() {
    const trip = this.props.trip;
    return (
      <Card className="all-trips-card" key={trip.tripId}>
        <Card.Body>
          <Card.Title>
            <Link to={`/trips/${trip.id}`} onClick={this.handleClick}>
              {trip.title}
            </Link>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{`${trip.startDate} – ${trip.endDate}`}</Card.Subtitle>
          <Card.Text>{Object.keys(trip.countries).join(", ")}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

const mapDispatch = (dispatch) => ({
  setTrip: (trip) => dispatch(setTrip(trip)),
});

export default connect(null, mapDispatch)(AllTripsCard);
