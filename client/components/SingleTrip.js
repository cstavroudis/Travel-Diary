import React from "react";
import { Container, Card } from "react-bootstrap";
import { connect } from "react-redux";

class SingleTrip extends React.Component {
  render() {
    const { entries } = this.props;
    return (
      <Container>
        {entries.map((entry) => (
          <Card key={entry.id}>
            <Card.Title>{entry.title}</Card.Title>
            <Card.Text>{entry.body}</Card.Text>
          </Card>
        ))}
      </Container>
    );
  }
}

const mapState = (state) => ({
  entries: state.entries,
});

export default connect(mapState)(SingleTrip);
