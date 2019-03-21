import React from "react";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Pieces } from "../../../api/pieces.js";

// core components
import GalleryItem from "../../components/Gallery/GalleryItem.jsx";

class GalleryPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    document.body.classList.toggle("gallery-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("gallery-page");
  }

  renderItems() {
    let filteredItems = this.props.items;

    // array of N elements, where N is the number of rows needed
    const rows = [...Array(Math.ceil(filteredItems.length / 3))];
    // chunk the products into the array of rows
    const itemRows = rows.map((row, idx) =>
      filteredItems.slice(idx * 4, idx * 4 + 4)
    );
    // map the rows as div.row
    const content = itemRows.map((row, idx) => (
      <Row key={idx}>
        {row.map((item, i) => (
          <GalleryItem key={item._id} item={item} i={i} />
        ))}
      </Row>
    ));
    return <div>{content}</div>;
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
                    Choose the piece{" "}
                    <span className="text-info">that you want to fill</span>
                  </h1>
                </Col>
              </Row>

              {this.renderItems()}
            </Container>
          </section>
        </div>
      </div>
    );
  }
}

GalleryPage.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  currentUser: PropTypes.object
};
export default withTracker(() => {
  Meteor.subscribe("pieces").ready();

  return {
    items: Pieces.find({}).fetch(),
    currentUser: Meteor.user()
  };
})(GalleryPage);
