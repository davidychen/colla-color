import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

//import Points from "../api/points.js";
import Area from "../api/area.js";
import ColorBoard from "../api/colorBoard.js";


import CanvasPaint from "./CanvasPaint.jsx";
import AccountsUIWrapper from "./AccountsUIWrapper.jsx";

class App extends Component {
  render() {
    return (
      <div>
        <div>Collaborative Painting</div>

        <AccountsUIWrapper/>

        { Meteor.user() ?
          <CanvasPaint/> :
          <div>Please login to play!</div>
        }

      </div>
    );
  }
}


export default withTracker(() => {
  return ({
    user:Meteor.user()
  });
})(App);


