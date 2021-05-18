import React from "react";
import { connect } from "react-redux";
import { Button, Container, Form, Col } from "react-bootstrap";
import { addTrip } from "../store/trips";
import { Autocomplete } from "@react-google-maps/api";

const initalState = {
  title: "",
  countries: [],
  // country: "",
  startDate: "",
  endDate: "",
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
      // country: "",
      startDate: "",
      endDate: "",
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
    const countries = {};
    for (let [country, coords] of this.state.countries) {
      countries[country] = coords;
    }
    this.props.addTrip(this.props.docRef, {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      title: this.state.title,
      countries,
    });
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
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }

  async addCountry(event) {
    await this.setState({
      countries: [
        ...this.state.countries,
        [this.state.address, [this.state.lat, this.state.lng]],
      ],
    });
    await this.setState({ address: "", lat: 0, lng: 0 });
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
            <Form.Row>
              <Col>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  name="startDate"
                  onChange={this.handleChange}
                  value={this.state.startDate}
                />
              </Col>
              <Col>
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  name="endDate"
                  onChange={this.handleChange}
                  value={this.state.endDate}
                />
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group controlId="formBasicCountries">
            <Form.Label>Countries Visited</Form.Label>
            <Form.Text>
              {this.state.countries.map((country) => (
                <span key={country[0]} className="chip">
                  {country[0]}
                </span>
              ))}
            </Form.Text>

            <Form.Row>
              <Col>
                <Autocomplete
                  onLoad={this.onLoad}
                  onPlaceChanged={this.onPlaceChanged}
                >
                  {/* <Form.Control
                    name="country"
                    onChange={this.handleChange}
                    value={this.state.country}
                  /> */}
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

const mapState = (state) => ({
  docRef: state.user.docRef,
});

const mapDispatch = (dispatch) => ({
  addTrip: (docRef, trip) => dispatch(addTrip(docRef, trip)),
});

export default connect(mapState, mapDispatch)(AddTrip);
