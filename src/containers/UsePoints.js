import React, { Component } from 'react'
import QrReader from 'react-qr-reader';
import { PageHeader, FormGroup, ControlLabel, Alert, FormControl, Button } from 'react-bootstrap';
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
            pointsAvailable: "",
            points: "",
            error: "",
        };
    }

    handleScan = async data => {
        if (data) {
            const parsedData = JSON.parse(data);
            const id = parsedData.id;
            const points = await this.getPoints(id);
            this.setState({
                attendee: parsedData,
                pointsAvailable: points.points
            });
        } else {
            console.log("No data found");
        }
    }

    getPoints = (id) => {
        return API.get("registration", `/getPoints/${id}`);
    }

    handleError = err => {
        console.error(err)
    }

    handleChange = (event) => {
        const validationValue = validator.isInt(event.target.value) && parseInt(event.target.value) > 0 && (parseInt(event.target.value) <= this.state.pointsAvailable);
        if (!validationValue) {
            this.setState({
                error: "Please enter a number greater than 0 and less than available points",
                points: ""
            })
            return;
        }

        this.setState({
            points: parseInt(event.target.value) // you know that it can be converted to an integer
        })
    }

    usePoints = () => {
        const { id } = this.state.attendee;
        const points = this.state.points; // you know its an integer by this point
        return API.put("registration", `/redeemPoints/${id}`, {
            body: {
                pointsRedeemed: points
            }
        });
    }

    resetPage = () => {
        this.setState({
            attendee: "",
            points: "",
            error: "",
            pointsAvailable: ""
        })
        this.props.history.push("/usePoints");
    }

    handleSubmit = async () => {
        this.setState({
            isLoading: true
        });

        try {
            await this.usePoints();
            this.props.history.push("/usePoints");
        } catch (e) {
            console.log(e);
            this.setState({ isLoading: false });
        }
    }

    validateForm = () => {
        return parseInt(this.state.points) > 0 && (parseInt(this.state.points) <= this.state.pointsAvailable);
    }

    render() {
        console.log(this.state);
        return (
            <div className={`UsePoints ${this.props.className}`}>
                <PageHeader>
                    Redeem Points
                </PageHeader>
                {
                    this.state.attendee ? <div>
                        <h4>Points available to redeem: {this.state.pointsAvailable}</h4>
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
                                disabled={!this.validateForm()}
                                type="submit"
                                isLoading={this.state.isLoading}
                                text="Redeem Points"
                                loadingText="redeeming points..."
                            />
                            <Button style={{cursor: "pointer"}} block bsSize="large" bsStyle="info" onClick={this.resetPage}>Reset</Button>
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
