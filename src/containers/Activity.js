import React, { Component } from 'react'
import QrReader from 'react-qr-reader';
import { PageHeader, FormGroup, ControlLabel, Alert, FormControl } from 'react-bootstrap';
import { API } from "aws-amplify";
import validator from 'validator';
import LoaderButton from '../components/LoaderButton';

const ACTIVITIES = {
    1: "One",
    2: "Two",
    3: "Three",
    4: "Four",
    5: "Five",
    6: "Six",
    7: "Seven",
    8: "Eight",
    9: "Nine",
    10: "Ten"
}

export default class Activity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: "",
            isLoading: false,
            attendee: "",
            attendingActivity: "1",
        };
    }

    handleScan = data => {
        const parsedData = JSON.parse(data);

        if (parsedData) {
            this.setState({
                attendee: parsedData
            })
        }
    }

    handleError = err => {
        console.error(err)
    }

    handleChange = (event) => {
        if (!Object.keys(ACTIVITIES).includes(event.target.value)) {
            this.setState({
                error: "Activity entered is not in predfined list"
            });
            return;
        }

        this.setState({
            attendingActivity: event.target.value
        });
    }

    updateActivity = () => {
        const { id } = this.state.attendee;
        const attendingActivity = this.state.attendingActivity;
        return API.put("registration", `/activityAttended/${attendingActivity}/attendee/${id}`);
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        this.setState({
            isLoading: true
        });

        try{
            await this.updateActivity();
           this.setState({
               attendee: "",
               isLoading: false,
               error: "",
               attendingActivity: "1"
           });
        }catch(e){
            this.setState({
                error: e.message,
                isLoading: false
            })
        }
    }

    render() {
        return (
            <div className={`Activity ${this.props.className}`}>
                <PageHeader>
                    Activity
                </PageHeader>
                {
                    this.state.attendee ?
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="attendingActivity" >
                                <ControlLabel>Attending Activity</ControlLabel>
                                <FormControl componentClass="select" placeholder="select" onChange={this.handleChange}>
                                    {
                                        Object.keys(ACTIVITIES).map((key, id) => {
                                            return (
                                                <option key={id} value={key}>
                                                    {key}
                                                </option>
                                            )
                                        })
                                    }
                                </FormControl>
                                <FormControl.Feedback />
                            </FormGroup>

                            <LoaderButton
                                block
                                bsStyle="info"
                                bsSize="large"
                                disabled={false}
                                type="submit"
                                isLoading={this.state.isLoading}
                                text="Attending Activity"
                                loadingText="updating..."
                            />
                        </form>

                        :

                        <div>
                            <QrReader
                                delay={0}
                                onError={this.handleError}
                                onScan={this.handleScan}
                                style={{ width: '100%' }}
                            />
                            <p>{this.state.attendee.id}</p>
                        </div>
                }
                {this.state.error.length > 0 && <Alert bsStyle="warning"> <strong>{this.state.error}!</strong> </Alert>}
            </div>
        )
    }
}
