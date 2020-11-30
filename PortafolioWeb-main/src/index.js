import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
//import AboutComponent from "components/About";
import CancelBookingComponent from "components/cancelBooking";
import TestComponent from "components/test/test";
import DepartamentosComponent from "components/pruebaLista";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {/* <Route path="/landing-page" component={LandingPage} /> */}
      <Route path="/xdd" component={CancelBookingComponent} />
      <Route path="/profile-page" component={ProfilePage} />
      {/* <Route path="/about" component={AboutComponent} /> */}
      <Route path="/" component={LandingPage} />
      {/* <Route path="/departments" component={DepartamentosComponent} /> */}
    </Switch>
  </Router>,
  document.getElementById("root")
);

