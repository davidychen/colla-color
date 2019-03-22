// canvas.js

import React, { Component } from "react";
import PropTypes from "prop-types";

export default class EditCanvas extends Component {
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
      prevPos: { offsetX: 0, offsetY: 0 },
      board: []
    };
    this.loaded = false;
    this.size = 0;
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
    const color = this.props.color.toUpperCase();
    // Meteor.call("piece.fill", this.props.item._id, r, c, this.props.color);
    if (r < this.size && c < this.size && this.board[r][c] != color) {
      this.board[r][c] = color;
      this.drawOne(r, c, color);
    }
    this.props.updateBoard(this.board);
  }

  drawOne(r, c, color) {
    const cellSize = this.cellSize;
    this.ctx.clearRect(cellSize * c, cellSize * r, cellSize, cellSize);
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      cellSize * c + 1,
      cellSize * r + 1,
      cellSize - 1,
      cellSize - 1
    );
  }

  onMouseDown() {
    this.isPainting = true;
  }

  onMouseMove({ nativeEvent }) {
    if (this.isPainting) {
      this.onClick({ nativeEvent });
    }
  }
  endPaintEvent() {
    if (this.isPainting) {
      this.isPainting = false;
    }
  }

  drawBoard() {
    if (!this.canvas || !this.props.item.default || this.loaded) return;

    this.ctx = this.canvas.getContext("2d");
    const board = this.props.item.board;
    const colors = this.props.item.default;
    const size = this.props.item.size;
    const cellSize = (this.state.width - 1) / size;
    if (this.props.item._id != this.pieceId) {
      this.loaded = false;
      this.pieceId = this.props.item._id;
    }
    this.size = size;
    this.cellSize = cellSize;

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
    this.props.updateBoard(this.board);
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

EditCanvas.propTypes = {
  item: PropTypes.object,
  color: PropTypes.string,
  updateBoard: PropTypes.func
};
