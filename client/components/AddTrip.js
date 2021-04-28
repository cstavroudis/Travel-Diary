import React from "react";
import { connect } from "react-redux";
import { Button, Container, Form } from "react-bootstrap";
import { addTrip } from "../store/trips";

const initalState = {
  title: "",
  countries: "",
  date: "",
};
class AddTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      countries: [],
      date: "",
      loading: false,
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <Container>
        {/* <Form onSubmit={handleSubmit}> */}
        <Form action="">
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Trip Title</Form.Label>
            <Form.Control
              name="title"
              onChange={this.handleChange}
              value={this.state.title}
            />
          </Form.Group>

          <Form.Group controlId="formBasicDate">
            <Form.Label>Trip Date</Form.Label>
            <Form.Control
              name="date"
              onChange={this.handleChange}
              value={this.state.date}
            />
            <Form.Text>Please enter MM/YYYY</Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicCountries">
            <Form.Label>Country(s) Visited</Form.Label>
            <Form.Control
              name="countries"
              onChange={this.handleChange}
              value={this.state.countries}
            />
            <Form.Text>Please separate by commas.</Form.Text>
          </Form.Group>

          {/* <Button size="sm" type="submit">
          {loading ? "Loading..." : "Add Trip"}
        </Button> */}
          <Button
            onClick={(event) => {
              event.preventDefault();
              addNewTrip(trip);
            }}
          >
            {this.loading ? "Loading..." : "Add Trip"}
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapDispatch = (dispatch) => ({
  addTrip: (trip) => dispatch(addTrip(trip)),
});

export default connect(null, mapDispatch)(AddTrip);
