import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem, FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      timeSlots: {},
      children: [],
    };
  }

  async componentDidMount() {
    try {
      // 1. get time slots count
      const timeSlots = await this.getTimeSlots();
      this.setState({ timeSlots });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  getTimeSlots() {
    return API.get("registration", "/timeSlotAvailability");
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit() {

  }

  render() {
    const { slot1, slot2 } = this.state.timeSlots;
    return (
      <div className={`Home ${this.props.className}`}>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="firstName" >
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="First name"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="lastName" >
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Last name"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="age" >
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Age"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
        </form>
      </div>
    );
  }
}
