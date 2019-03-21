import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="footer">
        <Container>
          <Row>
            <Col md="3">
              <h1 className="title">CC•</h1>
            </Col>
            <Col md="3">
              <Nav>
                <NavItem>
                  <NavLink to="/" tag={Link}>
                    Home
                  </NavLink>
                </NavItem>
                {this.props.loggedIn && (
                  <NavItem>
                    <NavLink to="/gallery" tag={Link}>
                      Gallery
                    </NavLink>
                  </NavItem>
                )}
              </Nav>
            </Col>
            <Col md="3">
              <Nav>
                <NavItem>
                  <NavLink href="https://opensource.org/licenses/MIT">
                    License
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
            <Col md="3">
              <h3 className="title">Who we are:</h3>
              <div className="btn-wrapper profile">
                <Button
                  className="btn-icon btn-neutral btn-round btn-simple"
                  color="default"
                  href="http://davidychen.com"
                  id="tooltip622135962"
                  target="_blank"
                >
                  <i className="fas fa-heart" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip622135962">
                  David Chen
                </UncontrolledTooltip>
                <Button
                  className="btn-icon btn-neutral btn-round btn-simple"
                  color="default"
                  href="https://simonwux.github.io/"
                  id="tooltip230450801"
                  target="_blank"
                >
                  <i className="fas fa-star" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip230450801">
                  Simon Wu
                </UncontrolledTooltip>
                <Button
                  className="btn-icon btn-neutral btn-round btn-simple"
                  color="default"
                  href="https://github.com/davidychen/colla-color"
                  id="tooltip318450378"
                  target="_blank"
                >
                  <i className="fab fa-github" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip318450378">
                  Github
                </UncontrolledTooltip>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

Footer.propTypes = {
  user: PropTypes.object,
  loggedIn: PropTypes.bool,
  history: PropTypes.object
};

export default withRouter(
  withTracker(() => {
    const user = Meteor.user();
    const userDataAvailable = user !== undefined;
    const loggedIn = user && userDataAvailable;
    return {
      user: user,
      loggedIn: loggedIn
    };
  })(Footer)
);
