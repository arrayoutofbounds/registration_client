import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap"; // to make sure there is no hard refresh and reach router is used.
import "./App.css";
import Routes from "./Routes";
import { Auth } from 'aws-amplify';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') { // only show errors that are not this
        alert(e);
      }
    }

    // app is no longer trying to authenticate by getting the current session
    this.setState({
      isAuthenticating: false
    })
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async event => {
    await Auth.signOut();

    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
      <div className="App">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Kids Diwali 2019</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <Fragment>
                <LinkContainer to="/agenda">
                  <NavItem>Agenda</NavItem>
                </LinkContainer>
              </Fragment>
              {
                this.state.isAuthenticated &&
                <Fragment>
                  <LinkContainer to="/confirmRegistration">
                    <NavItem>Confirm Registration</NavItem>
                  </LinkContainer >

                  <LinkContainer to="/attendeeInfo">
                    <NavItem>Attendee Information</NavItem>
                  </LinkContainer>
                  
                  <LinkContainer to="/givingPoints">
                    <NavItem>Give Points</NavItem>
                  </LinkContainer>

                  <LinkContainer to="/usePoints">
                    <NavItem>Redeem Points</NavItem>
                  </LinkContainer>

                  {/* <LinkContainer>
                    <NavItem>Activity Attendance</NavItem>
                  </LinkContainer> */}

                  <NavItem onClick={this.handleLogout}>Logout</NavItem>
                </Fragment>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);