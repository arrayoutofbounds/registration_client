import React, { Component } from "react";
import { PageHeader } from "react-bootstrap";

export default class Agenda extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`Agenda ${this.props.className}`}>
                <PageHeader>
                    Overview
                </PageHeader>
                <p>
                    The event will run from 10-4 pm. However, as per the time slot selected in the sign up form, you 
                    must come at the designated time.
                </p>
                <br />
                
                <h1>Food</h1>
                <p>Food is available for all to purchase</p>
                <br />

                <h1>
                    What does this event have?
                </h1>
                <div>
                    <ul>
                        <li>
                            Rides
                        </li>
                        <li>
                            Show
                        </li>
                        <li>
                            Exhibition
                        </li>
                        <li>
                            Activities
                        </li>
                        <li>
                            Food
                        </li>
                    </ul>
                </div>
            
            <br />

            <p>
                We hope you and your family have lots of fun!
            </p>
            </div>
        );
    }
}
