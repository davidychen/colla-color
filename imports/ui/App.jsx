import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";


import "./assets/css/colla-color.css";
import "./assets/demo/demo.css";
//import Points from "../api/points.js";
// import Area from "../api/area.js";
// import ColorBoard from "../api/colorBoard.js";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";


import MainNavBar from "./components/Navbars/MainNavbar.jsx";
import Footer from "./components/Footer/Footer.jsx";

import Create from "./Create.jsx";
import LandingPage from "./views/pages/LandingPage.jsx";
import GalleryPage from "./views/pages/GalleryPage.jsx";
import FillPage from "./views/pages/FillPage.jsx";
import LoginPage from "./views/pages/LoginPage.jsx";
import RegisterPage from "./views/pages/RegisterPage.jsx";
import NotFoundPage from "./views/pages/NotFoundPage.jsx";


const CreateComponent = () => (
  <div>
    <h2>Create</h2>
    {Meteor.user() ? <Create /> : <div>Please login!</div>}
  </div>
);



function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        Meteor.user() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object
};

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
            <PrivateRoute
              path="/gallery"
              component= {GalleryPage }
            />
            <PrivateRoute
              path="/fill/:pieceId"
              component= {FillPage }
            />
            <Route path="/create" component={CreateComponent} />

            <Route path="/login" render={props => <LoginPage {...props} />} />
            <Route
              path="/signup"
              render={props => <RegisterPage {...props} />}
            />
            <Route component={NotFoundPage} />
          </Switch>
          <Footer />
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
