import React from "react";
import { connect } from "react-redux";
import { Accordion, Card, Container, Jumbotron } from "react-bootstrap";
import { setTrips } from "../store/trips";
import { AllTripsCard, AddTrip } from "./index";

class AllTrips extends React.Component {
  // componentDidMount() {
  //   this.props.setTrips();
  // }

  render() {
    // const trips = this.props.trips;
    return (
      <Container>
        <Jumbotron>
          <h1>Calandra's Trips</h1>
        </Jumbotron>

        {!this.props.trips ? (
          <div>Add your first trip here.</div>
        ) : (
          <div>
            {Object.values(this.props.trips).map((trip) => {
              return <AllTripsCard key={trip.id} trip={trip} />;
            })}
          </div>
        )}

        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              + Add Trip
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <AddTrip />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Container>
    );
  }
}

const mapState = (state) => ({
  trips: state.trips.all,
});

const mapDispatch = (dispatch) => ({
  setTrips: () => dispatch(setTrips()),
});

export default connect(mapState, mapDispatch)(AllTrips);
