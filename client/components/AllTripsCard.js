import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

class AllTripsCard extends React.Component {
  render() {
    const trip = this.props.trip;
    return (
      <Card className="all-trips-single" key={trip.tripId}>
        <Card.Body>
          <Card.Title>
            <Link to={`/trips/${trip.tripId}/entries`}>{trip.title}</Link>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{`${trip.startDate} – ${trip.endDate}`}</Card.Subtitle>
          <Card.Text>{Object.keys(trip.countries).join(", ")}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
export default AllTripsCard;
