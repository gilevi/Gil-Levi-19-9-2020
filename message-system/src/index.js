
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
// core components
import Admin from "layouts/Admin.js";
import Login from 'components/Login/Login.js'

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

const store = createStore(reducers,applyMiddleware(thunk));
ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        
        <Route path="/login" component={Login} />
        <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
