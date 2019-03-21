import React from "react";
import classnames from "classnames";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
// reactstrap components
import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares1to6: "",
      squares7and8: "",
      error: "",
      errorVisible: false,
      redirectToReferrer: false
    };
    this.followCursor = this.followCursor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidMount() {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", this.followCursor);
    if (this.props.location.state) {
      if (this.props.location.state.from.pathname != "/signup") {
        this.setState({
          error: "You need to log in to view the content. ",
          errorVisible: true
        });
      }
    }
  }
  componentWillUnmount() {
    document.body.classList.toggle("register-page");
    document.documentElement.removeEventListener(
      "mousemove",
      this.followCursor
    );
  }
  followCursor(event) {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    this.setState({
      squares1to6:
        "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)",
      squares7and8:
        "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let name = document.getElementById("signup-name").value;
    let password = document.getElementById("signup-password").value;
    Accounts.createUser({ username: name, password: password }, err => {
      if (err) {
        this.setState({
          error: err.reason,
          errorVisible: true
        });
      } else {
        this.setState({ redirectToReferrer: true });
        // this.props.history.push("/login");
      }
    });
  }

  onDismiss() {
    this.setState({ errorVisible: false });
  }

  render() {
    const error = this.state.error;
    let { from } = this.props.location.state || {
      from: { pathname: "/gallery" }
    };
    let { redirectToReferrer } = this.state;

    if (Meteor.user() || redirectToReferrer) return <Redirect to={from} />;
    return (
      <div>
        <div className="wrapper">
          <div className="page-header">
            <div className="page-header-image" />
            <div className="content">
              <Container>
                <Row>
                  <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                    <div
                      className="square square-7"
                      id="square7"
                      style={{ transform: this.state.squares7and8 }}
                    />
                    <div
                      className="square square-8"
                      id="square8"
                      style={{ transform: this.state.squares7and8 }}
                    />
                    <Card className="card-register">
                      <CardHeader>
                        <CardImg
                          alt="..."
                          src="assets/img/square-purple-1.png"
                        />
                        <CardTitle tag="h4">Register</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Alert
                          color="danger"
                          isOpen={this.state.errorVisible}
                          toggle={this.onDismiss}
                        >
                          <span>
                            <b>Error! -</b>
                            {error}
                          </span>
                        </Alert>

                        <Form className="form">
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.fullNameFocus
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fas fa-user" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="User Name"
                              type="text"
                              id="signup-name"
                              onFocus={() =>
                                this.setState({ fullNameFocus: true })
                              }
                              onBlur={() =>
                                this.setState({ fullNameFocus: false })
                              }
                            />
                          </InputGroup>
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.passwordFocus
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fas fa-lock" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password"
                              id="signup-password"
                              type="password"
                              onFocus={() =>
                                this.setState({ passwordFocus: true })
                              }
                              onBlur={() =>
                                this.setState({ passwordFocus: false })
                              }
                            />
                          </InputGroup>
                        </Form>
                      </CardBody>
                      <CardFooter>
                        <Button
                          className="btn-round"
                          color="primary"
                          size="lg"
                          onClick={this.handleSubmit}
                        >
                          Sign Up
                        </Button>
                        <div className="form-group">
                          <p className="text-center">
                            Already have an account? Login{" "}
                            <Link to="/login">here</Link>
                          </p>
                        </div>
                      </CardFooter>
                    </Card>
                  </Col>
                </Row>
                <div className="register-bg" />
                <div
                  className="square square-1"
                  id="square1"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-2"
                  id="square2"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-3"
                  id="square3"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-4"
                  id="square4"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-5"
                  id="square5"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-6"
                  id="square6"
                  style={{ transform: this.state.squares1to6 }}
                />
              </Container>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  location: PropTypes.object
};

export default RegisterPage;
