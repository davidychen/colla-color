import React from "react";
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

export default class NotFoundPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    document.body.classList.toggle("gallery-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("gallery-page");
  }



  render() {
    return (
      <div>
        <div className="wrapper">
          <section className="section section-lg section-coins">
            <Container>
              <Row>
                <Col md="4">
                  <hr className="line-info" />
                  <h1>
                    404{" "}
                    <span className="text-info">Page Not Found</span>
                  </h1>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      </div>
    );
  }
}

NotFoundPage.propTypes = {
};
