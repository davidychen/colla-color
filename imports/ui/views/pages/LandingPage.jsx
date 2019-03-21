import React from "react";
// react plugin used to create charts
import { ChromePicker } from "react-color";
import LandingCanvas from "../../components/Canvas/LandingCanvas.jsx";
// reactstrap components
import {
  Row,
  Col
} from "reactstrap";

// core components
import Footer from "/imports/ui/components/Footer/Footer.jsx";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#FFFFFF",
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
  }
  componentWillUnmount() {
    document.body.classList.toggle("landing-page");
  }
  render() {
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
                  <LandingCanvas color={this.state.color}/>
                </Col>
                <Col lg="4" md="5">
                  <h1 className="text-white" />
                  <p className="text-white mb-3 center text-center">
                    Use the color you pick to fill the piece!
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
              </Row>
            </section>
          </section>
        </div>
      </>
    );
  }
}

export default LandingPage;
