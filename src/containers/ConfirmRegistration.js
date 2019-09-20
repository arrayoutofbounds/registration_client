import React, { Component } from "react";
import QrReader from 'react-qr-reader';
import { PageHeader, Button } from 'react-bootstrap';
import { API } from "aws-amplify";
import './ConfirmRegistration.css';

export default class ConfirmRegistration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: null,
            attendee: ""
        };
    }

    handleScan = async data => {
        if (data) {
            const parsedData = JSON.parse(data);
            const id = parsedData.id;
            this.setState({
                attendee: parsedData
            })
            await this.confirmRegistration(id);
        } else {
            console.log("No data found");
        }
    }

    confirmRegistration = (id) => {
        return API.put("registration", `/confirmRegistration/${id}`);
    }

    handleError = err => {
        console.error(err)
    }

    resetPage = () => {
        this.setState({
            attendee: ""
        })
        this.props.history.push("/confirmRegistration");
    }

    render() {
        return (
            <div className={`ConfirmRegistration ${this.props.className}`}>
                <PageHeader>
                    Confirm Registration
                </PageHeader>
                {
                    this.state.attendee ? <div>
                        <div>
                            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                            <h4 className="confirmMessage">{this.state.attendee.firstName} {this.state.attendee.lastName} has been registered successfully!</h4>
                        </div>
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
