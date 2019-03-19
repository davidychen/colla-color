import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";

import { Area } from "../api/area.js";

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0
    };
  }

  redraw() {

    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);
    for (const p of this.props.area[this.state.index].area) {
      ctx.fillStyle = p.color;
      for (const cood of p.coordinate){
        ctx.fillRect(cood.x * 10, cood.y * 10, 10, 10);
      }
    }
  }

  drawBoard() {
    var pictureLength = Area.find({}).fetch().length;
    console.log(pictureLength);
    var select = document.getElementById("selectNumber"); 

    for(var i = 0; i < pictureLength; i++) {
      var opt = i+1;
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
    }
  }

  componentDidMount() {
    this.drawBoard();
  }

  componentDidUpdate() {
    this.redraw();
  }

  onClick(evt) {
    // Get the coords
    // const x = evt.clientX - this.canvas.offsetLeft,
    //   y =  evt.clientY - this.canvas.offsetTop;
    // const boardX = Math.floor((evt.clientX - this.canvas2.offsetLeft)/20),
    //   boardY =  Math.floor((evt.clientY - this.canvas2.offsetTop)/20);

    // const insertX = Math.floor(x/10);
    // const insertY = Math.floor(y/10);
    // var flag = false; //area.click
    // for (var i = 0; i < this.props.area[this.state.index].area.length; i++) {
    //   var p = this.props.area[this.state.index].area[i];
    //   for (const cood of p.coordinate){
    //     if (insertX == cood.x && insertY == cood.y){
    //       flag = true;
    //       break;
    //     }
    //   }
    //   if (flag) {
    //     Meteor.call("area.update", this.props.area[this.state.index], i, this.props.color.color);
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

  onSelectChange(evt) {
    this.setState({
      index: evt.target.value - 1
    });
    this.redraw();
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


        <select id="selectNumber"
          onChange={this.onSelectChange.bind(this)}>
        </select>
        
      </div>
      
    );
  }
}

Gallery.propTypes = {
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
    area: Area.find({}).fetch(),
    ready : handle.ready(),
    ready2 : handle2.ready()
  };
})(Gallery);