import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import NavBar from "./NavBar.jsx";

//import Points from "../api/points.js";
// import Area from "../api/area.js";
// import ColorBoard from "../api/colorBoard.js";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import CanvasPaint from "./CanvasPaint.jsx";
import AccountsUIWrapper from "./AccountsUIWrapper.jsx";

const HomeComponent = () => {
  return (
    <div>
      <div>Colla-Color</div>

      { Meteor.user() ?
        <CanvasPaint/> :
        <div>Please login!</div>
      }

    </div>
  );
};

const AboutComponent = () =>
  <div>
    <h2>About</h2>
    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est saepe, ea minus quae ab nam impedit eaque. Adipisci expedita sit repudiandae, enim sapiente ipsam voluptas obcaecati veritatis, sunt eius nemo.</div>
  </div>;

const NotFoundPage = () =>
  <div>
    <h2>Page not found</h2>
  </div>;

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route exact path="/about" component={AboutComponent} />
            <Route component={NotFoundPage} />
          </Switch>
          <br />


        </div>
      </Router>
    );
  }
}


export default withTracker(() => {
  return ({
    user:Meteor.user()
  });
})(App);



