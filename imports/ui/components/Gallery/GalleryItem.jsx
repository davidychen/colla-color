// canvas.js

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ListGroupItem,
  ListGroup,
  Row,
  Col
} from "reactstrap";

import { withRouter } from "react-router-dom";

import React, { Component } from "react";
import PropTypes from "prop-types";

class GalleryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0
    };
    this.loaded = false;
    this.size = 0;
    this.board = [];
    this.onFill = this.onFill.bind(this);
  }

  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    this.setState({
      width: this.container.offsetWidth
    });
    this.loaded = false;
    this.drawBoard();
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
        this.ctx.fillRect(cellSize * c, cellSize * r, cellSize, cellSize);
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
    const cellSize = this.state.width / size;
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
          this.ctx.fillRect(cellSize * c, cellSize * r, cellSize, cellSize);
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

  onFill() {
    this.props.history.push("/fill/" + this.props.item._id);
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
      />
    );
  }

  getType() {
    return ["primary", "success", "info"][this.props.i];
  }

  render() {
    return (
      <Col md="4">
        <Card className="card-coin card-plain">
          <CardHeader>
            <div className="canvas-gallery img-center img-fluid">
              <div ref={el => (this.container = el)}>
                {this.state.width && this.renderCanvas()}
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <Row>
              <Col className="text-center" md="12">
                <h4 className="text-uppercase">{this.props.item.name}</h4>
                <span>{this.props.item.owner}</span>
                <hr className={"line-" + this.getType()} />
              </Col>
            </Row>
            <Row>
              <ListGroup>
                <ListGroupItem>{this.props.item.fills} fills</ListGroupItem>
              </ListGroup>
            </Row>
          </CardBody>
          <CardFooter className="text-center">
            <Button
              onClick={this.onFill}
              className="btn-simple"
              color={this.getType()}
            >
              Start filling
            </Button>
          </CardFooter>
        </Card>
      </Col>
    );
  }
}

GalleryItem.propTypes = {
  item: PropTypes.object,
  i: PropTypes.number,
  history: PropTypes.object
};

export default withRouter(GalleryItem);
