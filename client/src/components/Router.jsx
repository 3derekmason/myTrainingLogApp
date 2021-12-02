import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { LoginPage, UserDetailsPage } from "pages";

const Router = () => (
  <Switch>
    <Redirect from="/" to="/home"/>
    <Route path="/home" component={Home} />
    <Route path="/profile" component={Profile} />
    <Route path="/libraries" component={Libraries} />
  </Switch>
);

export default Router;