import React from "react";
import { connect } from "react-redux";
import { Button, Container, Form, Col } from "react-bootstrap";
import { addTrip } from "../store/trips";
import { Autocomplete } from "@react-google-maps/api";

const initalState = {
  title: "",
  countries: [],
  date: "",
  autocomplete: false,
  lat: 0,
  lng: 0,
  address: "",
};
class AddTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      countries: [],
      date: "",
      autocomplete: false,
      lat: 0,
      lng: 0,
      address: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.autocomplete = null;
    this.addCountry = this.addCountry.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addTrip(this.state);
    this.setState(initalState);
  }

  onLoad(autocomplete) {
    this.autocomplete = autocomplete;
  }

  onPlaceChanged() {
    if (this.autocomplete !== null) {
      const place = this.autocomplete.getPlace();
      this.setState({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: place.formatted_address,
      });
      console.log("state after place clicked:", this.state);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }

  async addCountry(event) {
    console.log("event:", event);
    await this.setState({
      countries: [
        ...this.state.countries,
        [this.state.address, [this.state.lat, this.state.lng]],
      ],
    });
    await this.setState({ address: "", lat: 0, lng: 0 });
    console.log(this.state);
  }

  render() {
    return (
      <Container>
        <Form action="" onSubmit={this.handleSubmit}>
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
            {this.state.countries.map((country) => (
              <Form.Text key={country[0]}>{country[0]}</Form.Text>
            ))}

            <Form.Row>
              <Col>
                <Autocomplete
                  onLoad={this.onLoad}
                  onPlaceChanged={this.onPlaceChanged}
                >
                  <Form.Control />
                </Autocomplete>
              </Col>
              <Col>
                <Button type="button" size="sm" onClick={this.addCountry}>
                  Add Country
                </Button>
              </Col>
            </Form.Row>
          </Form.Group>

          <Button type="submit">Add Trip</Button>
        </Form>
      </Container>
    );
  }
}

const mapDispatch = (dispatch) => ({
  addTrip: (trip) => dispatch(addTrip(trip)),
});

export default connect(null, mapDispatch)(AddTrip);
