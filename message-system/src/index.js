
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from './components/Login/PrivateRoute.js';
import PublicRoute from './components/Login/PublicRoute.js';
// core components
import Admin from "layouts/Admin.js";
import Login from 'components/Login/Login.js'

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      
      <Route path="/login" component={Login} />
      <Route path="/admin" component={Admin} />
      <Redirect from="/" to="/login" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
