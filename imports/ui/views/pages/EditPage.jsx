import React from "react";
// react plugin used to create charts

import { Redirect } from "react-router-dom";

import { ChromePicker } from "react-color";
import EditCanvas from "../../components/Canvas/EditCanvas.jsx";
// reactstrap components
import { Row, Col, Button } from "reactstrap";

import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Pieces } from "../../../api/pieces.js";

// core components

class EditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#FFFFFF",
      redirect: false,
      wait: false
    };
    this.toUp = [[0, 0, 5]];
    this.handleColorChange = this.handleColorChange.bind(this);
    this.submitPiece = this.submitPiece.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.board = [];
    // this.updateNumer = this.updateNumer.bind(this);
  }
  handleColorChange(color) {
    this.setState({ color: color.hex.toUppercase() });
  }

  componentDidMount() {
    document.body.classList.toggle("landing-page");
    setTimeout(() => {
      if (!this.props.item) {
        this.setState({ redirect: true });
      }
    }, 5000);
    setTimeout(() => {
      if (this.state.wait) {
        this.setState({ wait: false });
      }
    }, 5000);
  }

  componentDidUpdate() {
    setTimeout(() => {
      if (this.state.wait) {
        this.setState({ wait: false });
      }
    }, 5000);
    const currentUserId = this.props.currentUser && this.props.currentUser._id;
    if (
      this.props.ready &&
      this.props.item &&
      this.props.item._id == this.props.match.params.pieceId &&
      this.props.item.ownerId != currentUserId
    ) {
      this.setState({ redirect: true });
    }
  }
  componentWillUnmount() {
    document.body.classList.toggle("landing-page");
  }
  updateBoard(board) {
    this.board = board;
  }
  submitPiece() {
    Meteor.call("piece.edit", this.props.item._id, this.board);
    this.setState({ wait: true });
  }

  render() {
    const ready = this.props.ready && this.props.item;
    if (this.state.redirect) {
      return <Redirect to="/gallery" />;
    }

    return (
      <div>
        <div className="wrapper">
          <section className="section section-lg">
            <section className="section">
              <Row className="row-grid justify-content-between align-items-center text-left">
                <Col lg="6" md="6">
                  {!ready && (
                    <h1 className="text-white">
                      Loading piece... <br />
                      <span className="text-white">Please wait. </span>
                    </h1>
                  )}
                  {ready && (
                    <div>
                      <h1 className="text-white">
                        You are Editing: <br />
                        <span className="text-white">
                          {this.props.item.name}
                        </span>
                      </h1>
                      <EditCanvas
                        item={this.props.item}
                        color={this.state.color}
                        updateBoard={this.updateBoard}
                      />
                    </div>
                  )}
                </Col>
                {ready && (
                  <Col lg="4" md="5">
                    <h1 className="text-white" />
                    <p className="text-white mb-3 center text-center">
                      Use the color to edit your piece!
                    </p>

                    <div className="text-white mb-3 center">
                      <ChromePicker
                        className="center"
                        disableAlpha
                        color={this.state.color}
                        onChange={this.handleColorChange}
                      />
                    </div>
                    <div className="text-white mb-3 center text-center">
                      <Button
                        color="success"
                        onClick={() => this.submitPiece()}
                      >
                        Save
                      </Button>
                    </div>

                    <div className="text-white mb-3 center text-center">
                      {this.state.wait && (
                        <p className="text-white mb-3 center text-center">
                          Saved successfully!
                        </p>
                      )}
                    </div>
                  </Col>
                )}
              </Row>
            </section>
          </section>
        </div>
      </div>
    );
  }
}

EditPage.propTypes = {
  ready: PropTypes.bool,
  item: PropTypes.object,
  currentUser: PropTypes.object,
  match: PropTypes.object
};
export default withTracker(props => {
  const pieceId = props.match.params.pieceId;
  let ready = Meteor.subscribe("piece-own-withId", pieceId).ready();
  return {
    ready,
    item: Pieces.find({}).fetch()[0],
    currentUser: Meteor.user()
  };
})(EditPage);
