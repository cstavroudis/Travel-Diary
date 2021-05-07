import React from "react";
import { Container, Card, Jumbotron, Accordion } from "react-bootstrap";
import { connect } from "react-redux";
import { AddEntry } from "./index";

class SingleTrip extends React.Component {
  // async componentDidMount() {
  //   await this.props.setTrip(this.props.match.params.id);
  // }

  // componentDidUpdate(prev) {
  //   if (prev.trip.entries !== this.props.trip.entries) {

  //   }
  // }

  render() {
    const { trip } = this.props;
    const entries = trip.entries || [];
    console.log(`rendering single Trip w ${trip}`);
    return (
      <Container>
        <Jumbotron>
          <h1>{trip.title}</h1>
          <h4>
            {trip.startDate} - {trip.endDate}
          </h4>
        </Jumbotron>
        {entries.map((entry) => (
          <Card key={entry.id} className=".entry-card">
            <Card.Body>
              <Card.Title>{entry.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {entry.date}
              </Card.Subtitle>
              <Card.Text>{entry.body}</Card.Text>
            </Card.Body>
          </Card>
        ))}
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              + Add Entry
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <AddEntry tripId={trip.id} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Container>
    );
  }
}

const mapState = (state) => {
  console.log("state in single trip:", state);
  return { trip: state.trips.single };
};

export default connect(mapState)(SingleTrip);
