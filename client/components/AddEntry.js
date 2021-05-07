import React from "react";
import { connect } from "react-redux";
import { Button, Container, Form } from "react-bootstrap";
import { addEntry } from "../store/trips";

const initalState = {
  title: "",
  date: "",
  body: "",
};
class AddEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      date: "",
      body: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addEntry(this.props.tripId, this.state);
    this.setState(initalState);
  }

  render() {
    return (
      <Container>
        <Form action="" onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Entry Title</Form.Label>
            <Form.Control
              name="title"
              onChange={this.handleChange}
              value={this.state.title}
            />
          </Form.Group>

          <Form.Group controlId="formBasicDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              name="date"
              onChange={this.handleChange}
              value={this.state.date}
            />
            <Form.Text>Please enter MM/DD/YYYY</Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicBody">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="body"
              onChange={this.handleChange}
              value={this.state.body}
            />
          </Form.Group>

          <Button type="submit">Add Entry</Button>
        </Form>
      </Container>
    );
  }
}

const mapDispatch = (dispatch) => ({
  addEntry: (tripId, entry) => dispatch(addEntry(tripId, entry)),
});

export default connect(null, mapDispatch)(AddEntry);
