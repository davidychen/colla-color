import React, { Component } from "react";
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
import Create from "./Create.jsx";
import LandingPage from "./views/pages/LandingPage.jsx";
import LoginPage from "./views/pages/LoginPage.jsx";
import RegisterPage from "./views/pages/RegisterPage.jsx";
import AccountsUIWrapper from "./AccountsUIWrapper.jsx";

const HomeComponent = () => {
  return (
    <div>
      <div>Colla-Color</div>

      {Meteor.user() ? <CanvasPaint /> : <div>Please login!</div>}
    </div>
  );
};

const AboutComponent = () => (
  <div>
    <h2>About</h2>
    <div>This is a cooperative filling color game.</div>
  </div>
);

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
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route exact path="/gallery" component={GalleryComponent} />
            <Route exact path="/about" component={AboutComponent} />
            <Route exact path="/create" component={CreateComponent} />
            <Route
              path="/landing-page"
              render={props => <LandingPage {...props} />}
            />
            <Route
              path="/login"
              render={props => <LoginPage {...props} />}
            />
            <Route
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

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(App);
