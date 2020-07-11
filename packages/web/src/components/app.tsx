import "./app.scss";

import React from "react";
import { Router, Route, Switch } from "react-router";
import { browserHistory } from "../navigation";

import { NotFound } from "./+404";
import { Home, homeRoute } from "./+home";

export function App () {
  return (
    <Router history={browserHistory}>
      <Switch>
        <Route component={Home} {...homeRoute} />
        <Route component={NotFound} path="*" />
      </Switch>
    </Router>
  )
}
