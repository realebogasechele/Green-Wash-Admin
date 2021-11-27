import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import React from "react";

import Dashboard from "./Dashboard/Dashboard";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Calendar from "./Calendar/Calendar";
import Profile from "./Profile/Profile";
import Add from "./Add/Add"
import CardDetails from "./CardDetails/CardDetails";
import Management from "./Management/Management";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import Otp from "./ForgotPassword/Otp";
import NewPassword from "./ForgotPassword/NewPassword";
import Clients from "./Clients/Clients";
import Verify from "./Recover Account/Verify";
import RecoverOtp from "./Recover Account/RecoverOtp";

const Router: React.FC<RouteComponentProps> = ({ match }) => (
  <IonRouterOutlet id="main">
    <Route path={match.url} exact={true}>
      <Redirect to="/signIn" />
    </Route>
    <Route path="/signIn" exact={true}>
      <SignIn />
    </Route>
    <Route path="/dashboard" exact={true}>
      <Dashboard />
    </Route>
    <Route path="/calendar" exact={true}>
      <Calendar />
    </Route>
    <Route path="/page/:name/:title" exact={true}>
      <Management />
    </Route>
    <Route path="/cardDetails/:name/:id/:type/:back" exact={true}>
      <CardDetails />
      </Route>
    <Route path="/add/:name/:title" exact={true}>
      <Add />
    </Route>
    <Route path="/profile" exact={true}>
      <Profile />
    </Route>
    <Route path="/signUp" exact={true}>
      <SignUp />
    </Route>
    <Route path="/clients" exact={true}>
      <Clients />
      </Route>
    <Route path="/forgot" exact={true}>
      <ForgotPassword />
    </Route>
    <Route path="/forgot/otp" exact={true}>
      <Otp />
    </Route>
    <Route path="/newPassword" exact={true}>
      <NewPassword />
    </Route>
    <Route path="/recover" exact={true}>
      <Verify />
    </Route>
    <Route path="/recover/otp" exact={true}>
      <RecoverOtp />
    </Route>
  </IonRouterOutlet>
);

export default Router;