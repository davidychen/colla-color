// canvas.js

import React, { Component } from "react";

class LandingCanvas extends Component {
  constructor(props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.endPaintEvent = this.endPaintEvent.bind(this);
    this.state = {
      width: 0,
      height: 0,
      isPainting: false,
      userStrokeStyle: "#EE92C2",
      guestStrokeStyle: "#F0C987",
      line: [],
      prevPos: { offsetX: 0, offsetY: 0 }
    };
  }

  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    console.log(window.innerWidth);
    console.log(this.container.offsetWidth);
    this.setState({
      width: this.container.offsetWidth,
      height: this.container.offsetWidth
    });
    // if (window.innerWidth < 500) {
    //   this.setState({
    //     width: window.innerWidth - 25,
    //     height: window.innerWidth - 25
    //   });
    // } else {
    //   let update_width = window.innerWidth / 2;
    //   let update_height = update_width;
    //   this.setState({ width: update_width, height: update_height });
    // }
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  onMouseDown({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    this.isPainting = true;
    this.prevPos = { offsetX, offsetY };
  }

  onMouseMove({ nativeEvent }) {
    if (this.isPainting) {
      const { offsetX, offsetY } = nativeEvent;
      const offSetData = { offsetX, offsetY };
      // Set the start and stop position of the paint event.
      const positionData = {
        start: { ...this.prevPos },
        stop: { ...offSetData }
      };
      // Add the position to the line array
      this.line = this.line.concat(positionData);
      this.paint(this.prevPos, offSetData, this.userStrokeStyle);
    }
  }
  endPaintEvent() {
    if (this.isPainting) {
      this.isPainting = false;
      // this.sendPaintData();
    }
  }
  paint(prevPos, currPos, strokeStyle) {
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPos;

    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeStyle;
    // Move the the prevPosition of the mouse
    this.ctx.moveTo(x, y);
    // Draw a line to the current position of the mouse
    this.ctx.lineTo(offsetX, offsetY);
    // Visualize the line using the strokeStyle
    this.ctx.stroke();
    this.prevPos = { offsetX, offsetY };
  }

  componentDidMount() {
    // Here we set up the properties of the canvas element.
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    //this.canvas.width = this.state.width;
    //this.canvas.height = this.state.height;
    if (this.canvas) {
      this.ctx = this.canvas.getContext("2d");
      this.ctx.lineJoin = "round";
      this.ctx.lineCap = "round";
      this.ctx.lineWidth = 5;
    }
  }

  renderCanvas() {
    return (
      <canvas
        // We use the ref attribute to get direct access to the canvas element.
        ref={ref => (this.canvas = ref)}
        width={this.state.width}
        height={this.state.height}
        style={{ background: "black" }}
        onMouseDown={this.onMouseDown}
        onMouseLeave={this.endPaintEvent}
        onMouseUp={this.endPaintEvent}
        onMouseMove={this.onMouseMove}
      />
    );
  }

  render() {
    return (
      <div className="canvas-container" ref={el => (this.container = el)}>
        {this.state.width && this.renderCanvas()}
      </div>
    );
  }
}
export default LandingCanvas;
