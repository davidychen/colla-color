import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";

import { ColorBoard } from "../api/colorBoard.js";
import { Area } from "../api/area.js";

class CanvasPaint extends Component {
  redraw() {
    const ctx = this.canvas.getContext("2d");

    for (const p of this.props.area) {
      ctx.fillStyle = p.color;
      for (const cood of p.coordinate){
        ctx.fillRect(cood.x * 10, cood.y * 10, 10, 10);
      }
    }
  }

  componentDidMount() {
    this.redraw();
  }

  componentDidUpdate() {
    this.redraw();
  }

  onClick(evt) {
    // Get the coords
    // const x = evt.clientX - this.canvas.offsetLeft,
    //   y =  evt.clientY - this.canvas.offsetTop;

    // const insertX = Math.floor(x/10);
    // const insertY = Math.floor(y/10);

    // var flag = false; //area.click
    // for (const p of this.props.area) {
    //   for (const cood of p.coordinate){
    //     if (insertX == cood.x && insertY == cood.y){
    //       flag = true;
    //       break;
    //     }
    //   }
    //   if (flag) {
    //     Meteor.call("area.update", p, this.props.color.color);
    //     break;
    //   }
    // }

    // //board.update
    // for (const p of this.props.color.allColor) {
    //   if (boardX == p.x && boardY == p.y){
    //     Meteor.call("colorBoard.update", this.props.color, p.color);
    //     break;
    //   }
    // }
  }

  render() {
    return (
      <div>
        <canvas
          width="500"
          height="500"
          style={{ backgroundColor: "#eee" }}
          ref={canvas => (this.canvas = canvas)}
          onClick = {this.onClick.bind(this)}
        />
      </div>
      
    );
  }
}

CanvasPaint.propTypes = {
  area : PropTypes.arrayOf(PropTypes.object).isRequired
};


export default withTracker(() => {
  const handle = Meteor.subscribe("area");
  const handle2 = Meteor.subscribe("colorBoard");

  // if (ColorBoard.find({}).fetch()[0] == undefined) {
  //   Meteor.call("colorBoard.insert");
  // }

  // if (Area.find({}).fetch()[0] == undefined) {
  //   Meteor.call("area.insert");
  // }
  return {
    color: ColorBoard.find({}).fetch()[0],
    area: Area.find({}).fetch(),
    ready : handle.ready(),
    ready2 : handle2.ready()
  };
})(CanvasPaint);