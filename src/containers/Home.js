import { API } from "aws-amplify";
import validator from 'validator';

import "./Home.css";
import LoaderButton from "../components/LoaderButton";

import React, { Component } from "react";
import { PageHeader, FormGroup, FormControl, ControlLabel } from "react-bootstrap";;

const MORNING = '10-1';
const AFTERNOON = '1-4';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      timeSlots: {},
      fields: {
        firstName: {
          value: '',
          isValid: false,
        },
        lastName: {
          value: '',
          isValid: false,
        },
        age: {
          value: '',
          isValid: false,
        },
        fatherName: {
          value: '',
          isValid: false,
        },
        motherName: {
          value: '',
          isValid: false,
        },
        address: {
          value: '',
          isValid: false,
        },
        fatherMobile: {
          value: '',
          isValid: false,
        },
        motherMobile: {
          value: '',
          isValid: false,
        },
        email: {
          value: '',
          isValid: false,
        },
        emergencyContact: {
          value: '',
          isValid: false,
        },
        emergencyNumber: {
          value: '',
          isValid: false,
        },
        timeSlot: {
          value: 1,
          isValid: true,
        },
      }
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
  }

  getTimeSlots = () => {
    return API.get("registration", "/timeSlotAvailability");
  }

  handleChange = (event) => {
    const validationValue = this.validateField(event);
    let copyOfFields = Object.assign({}, this.state.fields);

    if (event.target.id === 'timeSlot') {
      switch (event.target.value) {
        case MORNING:
          copyOfFields[event.target.id].value = 1;
          break;
        case AFTERNOON:
          copyOfFields[event.target.id].value = 2;
          break;
        default:
          copyOfFields[event.target.id].value = 1;
          break;
      }
    } else {
      copyOfFields[event.target.id].value = event.target.value;
    }

    copyOfFields[event.target.id].isValid = validationValue;
    this.setState({
      fields: copyOfFields
    });
  }

  validateField = (event) => {
    const target = event.target.id;

    switch (target) {
      case 'email':
        if (validator.isEmail(event.target.value)) {
          return true;
        } else {
          return false;
        }
      case 'fatherMobile':
        if (validator.isMobilePhone(event.target.value, "en-AU")) {
          return true;
        } else {
          return false;
        }
      case 'motherMobile':
        if (validator.isMobilePhone(event.target.value, "en-AU")) {
          return true;
        } else {
          return false;
        }
      case 'age':
        if (validator.isInt(event.target.value)) {
          return true;
        } else {
          return false;
        }
      case 'emergencyNumber':
        if (validator.isMobilePhone(event.target.value, "en-AU")) {
          return true;
        } else {
          return false;
        }
      case 'timeSlot':
        if(event.target.value === MORNING || event.target.value === AFTERNOON){
          return true;
        }else{
          return false;
        }
      default:
        if (event.target.value.length > 0) {
          return true;
        } else {
          return false;
        }
    }
  }

  validateForm = () => {
    const properties = this.state.fields;
    for(let field in properties){
      if(!properties[field].isValid){
        return false;
      }
    }
    return true;
  }

  handleSubmit = async () => {
    this.setState({
      isLoading: true
    });

    const attendee = {};

    const properties = this.state.fields;
    for(let field in properties){
      attendee[field] = properties[field].value;
    }

    try {
      await this.createAttendee(attendee);
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  createAttendee(attendee) {
    return API.post("registration", "/attendees", {
      body: attendee
    });
  }

  render() {
    const { slot1, slot2 } = this.state.timeSlots;
    return (
      <div className={`Home ${this.props.className}`}>
        <PageHeader>
          Register
        </PageHeader>
        <form onSubmit={this.handleSubmit}>

          <FormGroup controlId="firstName">
            <ControlLabel>First Name</ControlLabel>
            <FormControl
              type="text"
              value={this.state.firstName}
              placeholder="First name"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>

          <br />

          <FormGroup controlId="lastName" >
            <ControlLabel>Last Name</ControlLabel>
            <FormControl
              type="text"
              value={this.state.lastName}
              placeholder="Last name"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>

          <br />

          <FormGroup controlId="age" >
            <ControlLabel>Age</ControlLabel>
            <FormControl
              type="text"
              value={this.state.age}
              placeholder="Age"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>

          <br />

          <FormGroup controlId="fatherName" >
            <ControlLabel>Father's Name</ControlLabel>
            <FormControl
              type="text"
              value={this.state.fatherName}
              placeholder="Father's name"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>

          <br />

          <FormGroup controlId="motherName" >
            <ControlLabel>Mother's Name</ControlLabel>
            <FormControl
              type="text"
              value={this.state.motherName}
              placeholder="Mother's name"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>

          <br />

          <FormGroup controlId="address" >
            <ControlLabel>address</ControlLabel>
            <FormControl
              type="text"
              value={this.state.address}
              placeholder="Address"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>

          <br />

          <FormGroup controlId="fatherMobile" >
            <ControlLabel>Father's Mobile</ControlLabel>
            <FormControl
              type="text"
              value={this.state.fatherMobile}
              placeholder="Father's mobile"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>

          <br />

          <FormGroup controlId="motherMobile" >
            <ControlLabel>Mother's Mobile</ControlLabel>
            <FormControl
              type="text"
              value={this.state.motherMobile}
              placeholder="Mother's mobile"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          <br />

          <FormGroup controlId="email" >
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="email"
              value={this.state.email}
              placeholder="Email"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>

          <br />

          <FormGroup controlId="emergencyContact" >
            <ControlLabel>Emergency Contact Name</ControlLabel>
            <FormControl
              type="text"
              value={this.state.emergencyContact}
              placeholder="Emergency contact name"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>

          <br />

          <FormGroup controlId="emergencyNumber" >
            <ControlLabel>Emergency Number</ControlLabel>
            <FormControl
              type="text"
              value={this.state.emergencyNumber}
              placeholder="Emergency contact number"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>

          <br />

          <FormGroup controlId="timeSlot" >
            <ControlLabel>Timeslot Available</ControlLabel>
            <FormControl componentClass="select" placeholder="select" onChange={this.handleChange}>
              <option defaultValue value={MORNING}>10-1</option>
              <option value={AFTERNOON}>1-4</option>
            </FormControl>
            <FormControl.Feedback />
          </FormGroup>

          <br />

          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Register"
            loadingText="registering…"
          />

          <br />

        </form>

        <br />
      </div>
    );
  }
}
