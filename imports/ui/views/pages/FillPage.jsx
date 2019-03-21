import React from "react";
// react plugin used to create charts

import { Redirect } from "react-router-dom";

import { ChromePicker } from "react-color";
import FillCanvas from "../../components/Canvas/FillCanvas.jsx";
// reactstrap components
import { Row, Col } from "reactstrap";

import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Pieces } from "../../../api/pieces.js";

// core components

class FillPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#FFFFFF",
      redirect: false
    };
    this.toUp = [[0, 0, 5]];
    this.handleColorChange = this.handleColorChange.bind(this);
    // this.updateNumer = this.updateNumer.bind(this);
  }
  handleColorChange(color) {
    this.setState({ color: color.hex });
  }

  componentDidMount() {
    document.body.classList.toggle("landing-page");
    setTimeout(() => {
      if (!this.props.item) {
        this.setState({ redirect: true });
      }
    }, 2000);
  }
  componentWillUnmount() {
    document.body.classList.toggle("landing-page");
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
                        You are filling: <br />
                        <span className="text-white">
                          {this.props.item.name}
                        </span>
                      </h1>
                      <FillCanvas
                        item={this.props.item}
                        color={this.state.color}
                      />
                    </div>
                  )}
                </Col>
                {ready && (
                  <Col lg="4" md="5">
                    <h1 className="text-white" />
                    <p className="text-white mb-3 center text-center">
                      {"Owner: " + this.props.item.owner}
                    </p>
                    <p className="text-white mb-3 center text-center">
                      {"Fills: " + this.props.item.fills}
                    </p>
                    <div className="text-white mb-3 center">
                      <ChromePicker
                        className="center"
                        disableAlpha
                        color={this.state.color}
                        onChange={this.handleColorChange}
                      />
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

FillPage.propTypes = {
  ready: PropTypes.bool,
  item: PropTypes.object,
  currentUser: PropTypes.object
};
export default withTracker(props => {
  const pieceId = props.match.params.pieceId;
  let ready = Meteor.subscribe("piece-withId", pieceId).ready();
  return {
    ready,
    item: Pieces.find({}).fetch()[0],
    currentUser: Meteor.user()
  };
})(FillPage);
