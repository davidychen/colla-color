// canvas.js

import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";

export default class FillCanvas extends Component {
  constructor(props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.endPaintEvent = this.endPaintEvent.bind(this);
    this.onClick = this.onClick.bind(this);
    this.state = {
      width: 0,
      size: 0,
      loaded: false,
      isPainting: false,
      color: "",
      line: [],
      prevPos: { offsetX: 0, offsetY: 0 }
    };
    this.loaded = false;
    this.size = 0;
    this.board = [];
    this.pieceId = "";
  }

  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    if (this.container) {
      this.setState({
        width: this.container.offsetWidth
      });
    }
    this.loaded = false;
    this.drawBoard();
  }

  onClick({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    const r = Math.floor(offsetY / this.cellSize);
    const c = Math.floor(offsetX / this.cellSize);
    Meteor.call("piece.fill", this.props.item._id, r, c, this.props.color);
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
  fillOne(r, c, color, area, visited) {
    if (r < 0 || r >= this.size || c < 0 || c >= this.size) return;

    if (visited[r][c]) return;
    const board = this.props.item.board;
    const boardArea = board[r][c];
    const cellSize = this.cellSize;
    visited[r][c] = true;
    if (boardArea == area) {
      if (this.board[r][c] !== this.colors[area]) {
        this.ctx.clearRect(cellSize * c, cellSize * r, cellSize, cellSize);
        this.ctx.fillStyle = color;
        this.ctx.fillRect(
          cellSize * c + 1,
          cellSize * r + 1,
          cellSize - 1,
          cellSize - 1
        );
        this.board[r][c] = color;
      }
      setTimeout(() => {
        this.fillOne(r - 1, c, color, area, visited);
        this.fillOne(r, c + 1, color, area, visited);
        this.fillOne(r + 1, c, color, area, visited);
        this.fillOne(r, c - 1, color, area, visited);
      }, 100);
    } else {
      setTimeout(() => {
        this.fillOne(r - 1, c, color, area, visited);
        this.fillOne(r, c + 1, color, area, visited);
        this.fillOne(r + 1, c, color, area, visited);
        this.fillOne(r, c - 1, color, area, visited);
      }, 200);
    }
  }
  drawBoard() {
    if (!this.canvas || !this.props.item.colors) return;

    this.ctx = this.canvas.getContext("2d");
    const board = this.props.item.board;
    const colors = this.props.item.colors;
    const size = this.props.item.size;
    const cellSize = (this.state.width - 1) / size;
    if (this.props.item._id != this.pieceId) {
      this.loaded = false;
      this.pieceId = this.props.item._id;
    }
    this.size = size;
    this.cellSize = cellSize;

    if (!this.loaded) {
      this.board = [];
      this.colors = colors;
      this.ctx.clearRect(0, 0, this.state.width, this.state.width);
      for (let r = 0; r < size; r++) {
        let subboard = [];
        for (let c = 0; c < size; c++) {
          const area = board[r][c];
          this.ctx.fillStyle = colors[area];
          this.ctx.fillRect(
            cellSize * c + 1,
            cellSize * r + 1,
            cellSize - 1,
            cellSize - 1
          );
          subboard.push(colors[area]);
        }
        this.board.push(subboard);
      }
      this.loaded = true;
    } else {
      const oldColors = this.colors;
      this.colors = colors;
      const cells = this.props.item.cells;
      for (let i = 0; i < size; i++) {
        if (oldColors[i] != colors[i]) {
          let visited = [];
          for (let i = 0; i < size; i++) {
            let subarray = [];
            for (let j = 0; j < size; j++) {
              subarray.push(false);
            }
            visited.push(subarray);
          }
          this.fillOne(cells[i].r, cells[i].c, colors[i], i, visited);
        }
      }
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
    this.drawBoard();
  }

  componentDidUpdate() {
    this.drawBoard();
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  renderCanvas() {
    return (
      <canvas
        // We use the ref attribute to get direct access to the canvas element.
        ref={ref => (this.canvas = ref)}
        width={this.state.width}
        height={this.state.width}
        style={{ background: "#787878" }}
        onMouseDown={this.onMouseDown}
        onMouseLeave={this.endPaintEvent}
        onMouseUp={this.endPaintEvent}
        onClick={this.onClick}
        /*onMouseMove={this.onMouseMove}*/
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

FillCanvas.propTypes = {
  item: PropTypes.object,
  color: PropTypes.string
};
