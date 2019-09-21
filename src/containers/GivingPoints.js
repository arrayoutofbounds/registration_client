import React, { Component } from 'react'
import QrReader from 'react-qr-reader';
import { PageHeader, FormGroup, ControlLabel, Alert, FormControl } from 'react-bootstrap';
import { API } from "aws-amplify";
import './GivingPoints.css';
import validator from 'validator';
import LoaderButton from '../components/LoaderButton';

export default class GivingPoints extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            attendee: "",
            points: "",
            error: "",
        };
    }

    handleScan = async data => {
        if (data) {
            const parsedData = JSON.parse(data);
            this.setState({
                attendee: parsedData,
            });
        } else {
        }
    }

    handleError = err => {
        console.error(err)
    }

    handleChange = (event) => {
        const validationValue = validator.isInt(event.target.value) && parseInt(event.target.value) > 0;
        if (!validationValue) {
            this.setState({
                error: "Please enter a valid number and ensure its greater than 0",
                points: ""
            })
            return;
        }

        this.setState({
            points: parseInt(event.target.value)
        })
    }

    givePoints = () => {
        const { id } = this.state.attendee;
        const points = this.state.points;
        return API.put("registration", `/givePoints/${id}`, {
            body: {
                pointsGiven: points
            }
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({
            isLoading: true
        });

        try {
            await this.givePoints();
            this.setState({
                isLoading: false,
                attendee: "",
                points: "",
                error: ""
            })
            // this.props.history.push("/givingPoints");
        } catch (e) {
            console.log(e);
            this.setState({ isLoading: false });
        }
    }

    render() {
        return (
            <div className={`GivingPoints ${this.props.className}`}>
                <PageHeader>
                    Giving Points
                </PageHeader>
                {
                    this.state.attendee ? <div>
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="points" >
                                <ControlLabel>Points</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.points}
                                    placeholder="Points"
                                    onChange={this.handleChange}
                                />
                                <FormControl.Feedback />
                            </FormGroup>
                            <LoaderButton
                                block
                                bsStyle="info"
                                bsSize="large"
                                disabled={!this.state.points > 0}
                                type="submit"
                                isLoading={this.state.isLoading}
                                text="Give Points"
                                loadingText="giving points..."
                            />
                        </form>
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
                {this.state.error.length > 0 && <Alert bsStyle="warning"> <strong>{this.state.error}!</strong> </Alert>}
            </div>
        )
    }
}
