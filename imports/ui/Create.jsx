import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      area: []
    };
    for (var i = 0; i < 50; i++) {
      var tmp = [];
      for (var j = 0; j < 50; j++) {
        tmp.push(0);
      }
      this.state.area.push(tmp);
    }
  }

  redraw() {
    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);
    for (var i = 0; i < this.state.area.length; i++) {
      ctx.fillStyle = "#000000";

      for (var j = 0; j < this.state.area[i].length; j++) {
        if (this.state.area[i][j] == 1) {
          ctx.fillRect(i * 10, j * 10, 10, 10);
        }
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
    const x = evt.clientX - this.canvas.offsetLeft,
      y = evt.clientY - this.canvas.offsetTop;
    const insertX = Math.floor(x / 10);
    const insertY = Math.floor(y / 10);
    let a = this.state.area.slice(); //creates the clone of the state
    a[insertX][insertY] = 1;

    //console.log("click", insertX, insertY);
    this.setState({
      area: a
    });
    //console.log(this.state.area);
  }

  floodfill(x, y, a, now) {
    if (x < 0 || y < 0 || x >= a.length || y >= a.length || a[x][y] == 1) {
      return;
    }
    a[x][y] = 1;
    now.push({ x, y });
    this.floodfill(x - 1, y, a, now);
    this.floodfill(x + 1, y, a, now);
    this.floodfill(x, y - 1, a, now);
    this.floodfill(x, y + 1, a, now);
  }

  onSubmitClick() {
    // this.setState({
    //   index: evt.target.value - 1
    // });

    // Area.insert({area:[{
    //   color:"#FF0F05",
    //   coordinate:[{
    //     x:26,
    //     y:32
    //   },{
    //     x:27,
    //     y:32
    //   }]
    // },{
    //   color:"#FF0F05",
    //   coordinate:[{
    //     x:0,
    //     y:1
    //   },{
    //     x:0,
    //     y:0
    //   }]
    // }]});
    var cood = [];
    var now = [];
    let a = this.state.area.slice(); //creates the clone of the state
    for (var i = 0; i < a.length; i++) {
      for (var j = 0; j < a[i].length; j++) {
        if (a[i][j] == 1) {
          now.push({ x: i, y: j });
        }
      }
    }
    cood.push(now);

    for (i = 0; i < a.length; i++) {
      for (j = 0; j < a[i].length; j++) {
        if (a[i][j] == 0) {
          now = [];
          this.floodfill(i, j, a, now);
          cood.push(now);
        }
      }
    }
    var newPict = { area: [] };
    i = 0;
    for (const n of cood) {
      if (i == 0) {
        newPict.area.push({
          color: "#000000",
          coordinate: n
        });
      } else {
        newPict.area.push({
          color: "#EEEEEE",
          coordinate: n
        });
      }
      i++;
    }

    for (i = 0; i < a.length; i++) {
      for (j = 0; j < a[i].length; j++) {
        a[i][j] = 0;
      }
    }
    this.setState({
      area: a
    });

    Meteor.call("area.add", newPict);
    this.redraw();
  }

  render() {
    return (
      <div>
        <div>Playing as {Meteor.user().username}</div>
        <canvas
          width="500"
          height="500"
          style={{ backgroundColor: "#eee" }}
          ref={canvas => (this.canvas = canvas)}
          onClick={this.onClick.bind(this)}
        />

        <button
          type="button"
          className="btn btn-success"
          onClick={this.onSubmitClick.bind(this)}
        >
          Submit
        </button>
      </div>
    );
  }
}

Create.propTypes = {};

export default withTracker(() => {
  return {};
})(Create);
