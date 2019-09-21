import React, { Component } from "react";
import QrReader from 'react-qr-reader';
import { PageHeader, Button} from 'react-bootstrap';
import { API } from "aws-amplify";
import './AttendeeInformation.css';

export default class AttendeeInformation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: null,
            attendee: "",
        };
    }

    handleScan = async data => {
        if (data) {
            const parsedData = JSON.parse(data);
            const id = parsedData.id;
            const attendee = await this.getAttendee(id);
            this.setState({
                attendee: attendee
            })
        } else {
        }
    }
    handleError = err => {
        console.error(err)
    }

    getAttendee = (id) => {
        return API.get("registration", `/attendees/${id}`);
    }

    renderAttendee = (attendee) => {
        console.log(this.state);
        return <div style={{marginBottom: "10px"}}>
            <div className="attendeeInfo">
            <h4 className="attendeeKey">First Name:</h4> <p className="attendeeValue">{attendee.firstName}</p>
            </div>

            <div className="attendeeInfo">
            <h4 className="attendeeKey">Last Name</h4>: <p className="attendeeValue">{attendee.lastName}</p>
            </div>

            <div className="attendeeInfo">
            <h4 className="attendeeKey">Father's Name</h4>: <p className="attendeeValue">{attendee.fatherName}</p>
            </div>

            <div className="attendeeInfo">
            <h4 className="attendeeKey">Father's Mobile</h4>: <p className="attendeeValue">{attendee.fatherMobile}</p>
            </div>

            <div className="attendeeInfo">
            <h4 className="attendeeKey">Mother's Name</h4>: <p className="attendeeValue">{attendee.motherName}</p>
            </div>

            <div className="attendeeInfo">
            <h4 className="attendeeKey">Mother's Mobile</h4>: <p className="attendeeValue">{attendee.motherMobile}</p>
            </div>

            <div className="attendeeInfo">
            <h4 className="attendeeKey">Age</h4>: <p className="attendeeValue">{attendee.age}</p>
            </div>

            <div className="attendeeInfo">
            <h4 className="attendeeKey">Has Registered</h4>: <p className="attendeeValue">{attendee.isRegistered ? "Yes" : "No"}</p>
            </div>

            <div className="attendeeInfo">
            <h4 className="attendeeKey">Points</h4>: <p className="attendeeValue">{attendee.points}</p>
            </div>

            <div className="attendeeInfo">
            <h4 className="attendeeKey">Address</h4>: <p className="attendeeValue">{attendee.address}</p>
            </div>

            <div className="attendeeInfo">
            <h4 className="attendeeKey">Email</h4>: <p className="attendeeValue">{attendee.email}</p>
            </div>

            <div className="attendeeInfo">
            <h4 className="attendeeKey">Emergency Contact</h4>: <p className="attendeeValue">{attendee.emergencyContact}</p>
            </div>

            <div className="attendeeInfo">
            <h4 className="attendeeKey">Emergency Contact Number</h4>: <p className="attendeeValue">{attendee.emergencyNumber}</p>
            </div>

            <div className="attendeeInfo">
            <h4 className="attendeeKey">Id</h4>: <p className="attendeeValue">{attendee.id}</p>
            </div>

            <div className="attendeeInfo">
            <h4 className="attendeeKey">Timeslot</h4>: <p className="attendeeValue">{attendee.timeSlot}</p>
            </div>
        </div>
    }

    resetPage = () => {
        this.setState({
            attendee: "",
            isLoading: null
        })
    }

    render() {
        return (
            <div className={`AttendeeInformation ${this.props.className}`}>
                <PageHeader>
                    Attendee information
                </PageHeader>
                {
                    this.state.attendee ? <div>
                        {this.renderAttendee(this.state.attendee)}
                        <Button style={{cursor: "pointer"}} block bsSize="large" bsStyle="info" onClick={this.resetPage}>Reset</Button>
                        </div> 
                        :
                        <div className="scanner">
                            <QrReader
                                delay={0}
                                onError={this.handleError}
                                onScan={this.handleScan}
                                style={{ width: '100%' }}
                                facingMode={"environment"}
                            />
                        </div>
                }
            </div>
        );
    }
}