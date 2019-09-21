import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from './containers/Login';
import AppliedRoute from './components/AppliedRoute';
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import Notes from "./containers/Notes";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Agenda from './containers/Agenda';
import AttendeeInformation from "./containers/AttendeeInformation";
import ConfirmRegistration from "./containers/ConfirmRegistration";
import GivingPoints from './containers/GivingPoints';
import UsePoints from './containers/UsePoints';
import Activity from './containers/Activity';

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/agenda" exact component={Agenda} props={childProps} />


    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />

    {/* <AuthenticatedRoute path="/notes/new" exact component={NewNote} props={childProps} />
    <AuthenticatedRoute path="/notes/:id" exact component={Notes} props={childProps} /> */}

    <AuthenticatedRoute path="/attendeeInfo" exact component={AttendeeInformation} props={childProps} />
    <AuthenticatedRoute path="/confirmRegistration" exact component={ConfirmRegistration} props={childProps} />
    <AuthenticatedRoute path="/givingPoints" exact component={GivingPoints} props={childProps} />
    <AuthenticatedRoute path="/usePoints" exact component={UsePoints} props={childProps} />
    <AuthenticatedRoute path="/activity" exact component={Activity} props={childProps} />

    { /* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>;
