import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import NavBar from "./NavBar.jsx";

import "./assets/css/colla-color.css";
import "./assets/demo/demo.css";
//import Points from "../api/points.js";
// import Area from "../api/area.js";
// import ColorBoard from "../api/colorBoard.js";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import CanvasPaint from "./CanvasPaint.jsx";
import Gallery from "./Gallery.jsx";

import MainNavBar from "./components/Navbars/MainNavbar.jsx";
import Create from "./Create.jsx";
import LandingPage from "./views/pages/LandingPage.jsx";
import GalleryPage from "./views/pages/GalleryPage.jsx";
import LoginPage from "./views/pages/LoginPage.jsx";
import RegisterPage from "./views/pages/RegisterPage.jsx";
import AccountsUIWrapper from "./AccountsUIWrapper.jsx";

const GalleryComponent = () => (
  <div>
    <h2>Gallery</h2>
    <Gallery />
  </div>
);

const CreateComponent = () => (
  <div>
    <h2>Create</h2>
    {Meteor.user() ? <Create /> : <div>Please login!</div>}
  </div>
);

const NotFoundPage = () => (
  <div>
    <h2>404 Page not found</h2>
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <MainNavBar />
          <Switch>
            <Route
              exact
              path="/"
              render={props => <LandingPage {...props} />}
            />
            <Route
              exact
              path="/gallery"
              render={props => <GalleryPage {...props} />}
            />
            <Route exact path="/create" component={CreateComponent} />

            <Route path="/login" render={props => <LoginPage {...props} />} />
            <Route
              exact
              path="/signup"
              render={props => <RegisterPage {...props} />}
            />
            <Route component={NotFoundPage} />
          </Switch>
          <br />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  loggedIn: PropTypes.bool
};

export default withTracker(() => {
  const user = Meteor.user();
  const userDataAvailable = user !== undefined;
  const loggedIn = user && userDataAvailable;
  return {
    user: user,
    loggedIn: loggedIn
  };
})(App);
