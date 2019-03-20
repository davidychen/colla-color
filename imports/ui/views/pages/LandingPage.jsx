import React from "react";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
import { ChromePicker } from "react-color";
import reactCSS from "reactcss";

import LandingCanvas from "../../components/Canvas/LandingCanvas.jsx";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import Footer from "/imports/ui/components/Footer/Footer.jsx";

import bigChartData from "/imports/ui/variables/charts.jsx";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#fff",
      tests: [[0, 0, 0, 0], [1, 1, 1, 1], [2, 2, 2, 2], [3, 3, 3, 3]],
      time: Date.now(),
      n: 5,
      markers: []
    };
    this.toUp = [[0, 0, 5]];
    this.handleColorChange = this.handleColorChange.bind(this);
    // this.updateNumer = this.updateNumer.bind(this);
  }
  handleColorChange(color) {
    this.setState({ color: color.hex });
    // this.updateNumer(0, 0, this.state.n);
    this.setState({ n: this.state.n + 1 });
    this.timeout(3);
  }
  timeout(n) {
    if (n == 0) return;
    setTimeout(() => {
      this.setState({ n: this.state.n + 1 });
      console.log(this.state.n);
      // Do Something Here
      // Then recall the parent function to
      // create a recursive loop.
      this.timeout(n - 1);
    }, 1000);
  }

  updateNumer(r, c, n) {
    if (r < 0 || c < 0 || r > 3 || c > 3 || n > 100) return;
    const tests = this.state.tests;
    if (tests[r][c] == n) return;
    tests[r][c] = n;
    this.setState({ tests: tests });
    console.log(new Date(), r, c, n, this.state.tests);
    setTimeout(() => {
      this.updateNumer(r + 1, c, n);
    }, 1000);
    var that = this;
    setTimeout(function() {
      that.updateNumer(r, c - 1, n);
    }, 1000);
    setTimeout(
      function() {
        this.updateNumer(r, c + 1, n);
      }.bind(this),
      1000
    );
    setTimeout(
      function() {
        this.updateNumer(r - 1, c, n);
      }.bind(this),
      1000
    );
  }
  componentDidMount() {
    document.body.classList.toggle("landing-page");
    let todos = [10, 20, 30];
    this.interval = setInterval(() => {
      this.setState(prev => ({
        markers: prev.markers.concat([todos.shift()])
      }));
      if (!todos.length) clearInterval(this.interval);
    }, 1000);
  }
  componentWillUnmount() {
    document.body.classList.toggle("landing-page");
    clearInterval(this.interval);
  }
  render() {
    const tests = this.state.tests;
    return (
      <>
        <div className="wrapper">
          <section className="section section-lg">
            <section className="section">
              <Row className="row-grid justify-content-between align-items-center text-left">
                <Col lg="6" md="6">
                  <h1 className="text-white">
                    Let&apos;s Color <br />
                    <span className="text-white">together!</span>
                  </h1>
                  <LandingCanvas />
                </Col>
                <Col lg="4" md="5">
                  <h1 className="text-white" />
                  <p className="text-white mb-3 center text-center">
                    Use the color you pick to fill the piece!
                  </p>
                  <p> {this.state.n}</p>
                  <p>{tests}</p>
                  <p>{this.state.markers}</p>
                  <p> {this.state.time}</p>
                  <div className="text-white mb-3 center">
                    <ChromePicker
                      className="center"
                      disableAlpha
                      color={this.state.color}
                      onChange={this.handleColorChange}
                    />
                  </div>
                </Col>
              </Row>
            </section>
          </section>
          <section className="section section-lg">
            <section className="section">
              <img alt="..." className="path" src="assets/img/path4.png" />
              <Container>
                <Row className="row-grid justify-content-between">
                  <Col className="mt-lg-5" md="5">
                    <Row>
                      <Col className="px-2 py-2" lg="6" sm="12">
                        <Card className="card-stats">
                          <CardBody>
                            <Row>
                              <Col md="4" xs="5">
                                <div className="icon-big text-center icon-warning">
                                  <i className="tim-icons icon-trophy text-warning" />
                                </div>
                              </Col>
                              <Col md="8" xs="7">
                                <div className="numbers">
                                  <CardTitle tag="p">3,237</CardTitle>
                                  <p />
                                  <p className="card-category">Awards</p>
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col className="px-2 py-2" lg="6" sm="12">
                        <Card className="card-stats upper bg-default">
                          <CardBody>
                            <Row>
                              <Col md="4" xs="5">
                                <div className="icon-big text-center icon-warning">
                                  <i className="tim-icons icon-coins text-white" />
                                </div>
                              </Col>
                              <Col md="8" xs="7">
                                <div className="numbers">
                                  <CardTitle tag="p">3,653</CardTitle>
                                  <p />
                                  <p className="card-category">Commits</p>
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="px-2 py-2" lg="6" sm="12">
                        <Card className="card-stats">
                          <CardBody>
                            <Row>
                              <Col md="4" xs="5">
                                <div className="icon-big text-center icon-warning">
                                  <i className="tim-icons icon-gift-2 text-info" />
                                </div>
                              </Col>
                              <Col md="8" xs="7">
                                <div className="numbers">
                                  <CardTitle tag="p">593</CardTitle>
                                  <p />
                                  <p className="card-category">Presents</p>
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col className="px-2 py-2" lg="6" sm="12">
                        <Card className="card-stats">
                          <CardBody>
                            <Row>
                              <Col md="4" xs="5">
                                <div className="icon-big text-center icon-warning">
                                  <i className="tim-icons icon-credit-card text-success" />
                                </div>
                              </Col>
                              <Col md="8" xs="7">
                                <div className="numbers">
                                  <CardTitle tag="p">10,783</CardTitle>
                                  <p />
                                  <p className="card-category">Forks</p>
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                  <Col md="6">
                    <div className="pl-md-5">
                      <h1>
                        Large <br />
                        Achivements
                      </h1>
                      <p>
                        I should be capable of drawing a single stroke at the
                        present moment; and yet I feel that I never was a
                        greater artist than now.
                      </p>
                      <br />
                      <p>
                        When, while the lovely valley teems with vapour around
                        me, and the meridian sun strikes the upper surface of
                        the impenetrable foliage of my trees, and but a few
                        stray.
                      </p>
                      <br />
                      <a
                        className="font-weight-bold text-info mt-5"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Show all{" "}
                        <i className="tim-icons icon-minimal-right text-info" />
                      </a>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          </section>
          <section className="section section-lg">
            <img alt="..." className="path" src="assets/img/path4.png" />
            <img alt="..." className="path2" src="assets/img/path5.png" />
            <img alt="..." className="path3" src="assets/img/path2.png" />
            <Container>
              <Row className="justify-content-center">
                <Col lg="12">
                  <h1 className="text-center">Your best benefit</h1>
                  <Row className="row-grid justify-content-center">
                    <Col lg="3">
                      <div className="info">
                        <div className="icon icon-primary">
                          <i className="tim-icons icon-money-coins" />
                        </div>
                        <h4 className="info-title">Low Commission</h4>
                        <hr className="line-primary" />
                        <p>
                          Divide details about your work into parts. Write a few
                          lines about each one. A paragraph describing a feature
                          will.
                        </p>
                      </div>
                    </Col>
                    <Col lg="3">
                      <div className="info">
                        <div className="icon icon-warning">
                          <i className="tim-icons icon-chart-pie-36" />
                        </div>
                        <h4 className="info-title">High Incomes</h4>
                        <hr className="line-warning" />
                        <p>
                          Divide details about your product or agency work into
                          parts. Write a few lines about each one. A paragraph
                          describing feature will be a feature.
                        </p>
                      </div>
                    </Col>
                    <Col lg="3">
                      <div className="info">
                        <div className="icon icon-success">
                          <i className="tim-icons icon-single-02" />
                        </div>
                        <h4 className="info-title">Verified People</h4>
                        <hr className="line-success" />
                        <p>
                          Divide details about your product or agency work into
                          parts. Write a few lines about each one. A paragraph
                          describing be enough.
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section section-lg section-safe">
            <img alt="..." className="path" src="assets/img/path5.png" />
            <Container>
              <Row className="row-grid justify-content-between">
                <Col md="5">
                  <img
                    alt="..."
                    className="img-fluid floating"
                    src="assets/img/chester-wade.jpg"
                  />
                  <Card className="card-stats bg-danger">
                    <CardBody>
                      <div className="justify-content-center">
                        <div className="numbers">
                          <CardTitle tag="p">100%</CardTitle>
                          <p className="card-category text-white">Safe</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  <Card className="card-stats bg-info">
                    <CardBody>
                      <div className="justify-content-center">
                        <div className="numbers">
                          <CardTitle tag="p">573 K</CardTitle>
                          <p className="card-category text-white">
                            Satisfied customers
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  <Card className="card-stats bg-default">
                    <CardBody>
                      <div className="justify-content-center">
                        <div className="numbers">
                          <CardTitle tag="p">10 425</CardTitle>
                          <p className="card-category text-white">Business</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="6">
                  <div className="px-md-5">
                    <hr className="line-success" />
                    <h3>Awesome features</h3>
                    <p>
                      The design system comes with three pre-built pages to help
                      you get started faster. You can change the text and images
                      and you&apos;re good to go.
                    </p>
                    <ul className="list-unstyled mt-5">
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div className="icon icon-success mb-2">
                            <i className="tim-icons icon-vector" />
                          </div>
                          <div className="ml-3">
                            <h6>Carefully crafted components</h6>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div className="icon icon-success mb-2">
                            <i className="tim-icons icon-tap-02" />
                          </div>
                          <div className="ml-3">
                            <h6>Amazing page examples</h6>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div className="icon icon-success mb-2">
                            <i className="tim-icons icon-single-02" />
                          </div>
                          <div className="ml-3">
                            <h6>Super friendly support team</h6>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section section-lg">
            <img alt="..." className="path" src="assets/img/path4.png" />
            <img alt="..." className="path2" src="assets/img/path2.png" />
            <Col md="12">
              <Card className="card-chart card-plain">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <hr className="line-info" />
                      <h5 className="card-category">Total Investments</h5>
                      <CardTitle tag="h2">Performance</CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={bigChartData.data}
                      options={bigChartData.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </section>
          <section className="section section-lg section-coins">
            <img alt="..." className="path" src="assets/img/path3.png" />
            <Container>
              <Row>
                <Col md="4">
                  <hr className="line-info" />
                  <h1>
                    Choose the coin{" "}
                    <span className="text-info">that fits your needs</span>
                  </h1>
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Card className="card-coin card-plain">
                    <CardHeader>
                      <img
                        alt="..."
                        className="img-center img-fluid"
                        src="assets/img/bitcoin.png"
                      />
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col className="text-center" md="12">
                          <h4 className="text-uppercase">Light Coin</h4>
                          <span>Plan</span>
                          <hr className="line-primary" />
                        </Col>
                      </Row>
                      <Row>
                        <ListGroup>
                          <ListGroupItem>50 messages</ListGroupItem>
                          <ListGroupItem>100 emails</ListGroupItem>
                          <ListGroupItem>24/7 Support</ListGroupItem>
                        </ListGroup>
                      </Row>
                    </CardBody>
                    <CardFooter className="text-center">
                      <Button className="btn-simple" color="primary">
                        Get plan
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
                <Col md="4">
                  <Card className="card-coin card-plain">
                    <CardHeader>
                      <img
                        alt="..."
                        className="img-center img-fluid"
                        src="assets/img/etherum.png"
                      />
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col className="text-center" md="12">
                          <h4 className="text-uppercase">Dark Coin</h4>
                          <span>Plan</span>
                          <hr className="line-success" />
                        </Col>
                      </Row>
                      <Row>
                        <ListGroup>
                          <ListGroupItem>150 messages</ListGroupItem>
                          <ListGroupItem>1000 emails</ListGroupItem>
                          <ListGroupItem>24/7 Support</ListGroupItem>
                        </ListGroup>
                      </Row>
                    </CardBody>
                    <CardFooter className="text-center">
                      <Button className="btn-simple" color="success">
                        Get plan
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
                <Col md="4">
                  <Card className="card-coin card-plain">
                    <CardHeader>
                      <img
                        alt="..."
                        className="img-center img-fluid"
                        src="assets/img/ripp.png"
                      />
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col className="text-center" md="12">
                          <h4 className="text-uppercase">Bright Coin</h4>
                          <span>Plan</span>
                          <hr className="line-info" />
                        </Col>
                      </Row>
                      <Row>
                        <ListGroup>
                          <ListGroupItem>350 messages</ListGroupItem>
                          <ListGroupItem>10K emails</ListGroupItem>
                          <ListGroupItem>24/7 Support</ListGroupItem>
                        </ListGroup>
                      </Row>
                    </CardBody>
                    <CardFooter className="text-center">
                      <Button className="btn-simple" color="info">
                        Get plan
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
          <Footer />
        </div>
      </>
    );
  }
}

export default LandingPage;
