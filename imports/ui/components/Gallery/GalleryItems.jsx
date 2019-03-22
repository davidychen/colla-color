import React from "react";
import { withRouter } from "react-router-dom";
// reactstrap components
import { Row } from "reactstrap";

import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Pieces } from "../../../api/pieces.js";

// core components
import GalleryItem from "../../components/Gallery/GalleryItem.jsx";

class GalleryItems extends React.Component {
  renderItems() {
    let filteredItems = this.props.items;

    // array of N elements, where N is the number of rows needed
    const rows = [...Array(Math.ceil(filteredItems.length / 3))];
    // chunk the products into the array of rows
    const itemRows = rows.map((row, idx) =>
      filteredItems.slice(idx * 3, idx * 3 + 3)
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
    return <div>{this.renderItems()} </div>;
  }
}

GalleryItems.propTypes = {
  pageId: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.object),
  currentUser: PropTypes.object
};
export default withRouter(
  withTracker(props => {
    Meteor.subscribe("pieces-fills", props.pageId).ready();
    //Meteor.subscribe("piece-find").ready();
    return {
      items: Pieces.find({}).fetch(),
      currentUser: Meteor.user()
    };
  })(GalleryItems)
);
