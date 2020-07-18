import React from "react";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import { Counts } from "meteor/tmeasday:publish-counts";
// reactstrap components
import {
  Alert,
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  FormGroup,
  InputGroup,
  Input,
  InputGroupText,
  InputGroupAddon,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";

import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Pieces } from "../../../api/pieces.js";

// core components
import GalleryItems from "../../components/Gallery/GalleryItems.jsx";

class GalleryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      error: "",
      errorVisible: false,
      page: 1
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    // this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ modal: !this.state.modal });
  }
  componentDidMount() {
    document.body.classList.toggle("gallery-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("gallery-page");
  }

  handleSubmit(e) {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let size = document.getElementById("size").valueAsNumber;
    Meteor.call("piece.insert", name, size, (err, res) => {
      if (err) {
        this.setState({
          error: err.reason,
          errorVisible: true
        });
      } else {
        this.props.history.push("/edit/" + res);
      }
    });
  }

  onDismiss() {
    this.setState({ errorVisible: false });
  }

  
  togglePages(e, pageId) {
    e.preventDefault();
    this.setState({
      page: pageId
    });
  }
  renderPages() {
    const pages = [];
    for (let i = 0; i < this.props.counts; i++) {
      if (i % 6 == 0) {
        pages.push(i / 6 + 1);
      }
    }
    const content = pages.map((pageId, idx) => (
      <PaginationItem
        key={idx}
        className={this.state.page === pageId ? "active" : ""}
      >
        <PaginationLink onClick={e => this.togglePages(e, pageId)}>
          {pageId}
        </PaginationLink>
      </PaginationItem>
    ));
    return (
      <Container>
        <Row>
          <Col md="6">
            <Pagination
              className="pagination pagination-info"
              listClassName="pagination-info"
            >
              {content}
            </Pagination>
          </Col>
        </Row>
      </Container>
    );
  }

  render() {
    const error = this.state.error;
    return (
      <div>
        <div className="wrapper">
          <section className="section section-lg section-coins">
            <Container>
              <Row>
                <Col md="9">
                  <hr className="line-info" />
                  <h1>
                    Choose the piece{" "}
                    <span className="text-info">that you want to fill</span>
                  </h1>
                </Col>
                <Col md="3">
                  <hr className="line-success" />
                  <Button color="success" onClick={() => this.toggleModal()}>
                    Create New
                  </Button>
                </Col>
                {/* Start Form Modal */}
                <Modal
                  modalClassName="modal-black"
                  isOpen={this.state.modal}
                  toggle={() => this.toggleModal()}
                >
                  <div className="modal-header justify-content-center">
                    <button
                      className="close"
                      onClick={() => this.toggleModal()}
                    >
                      <i className="fas fa-times text-white" />
                    </button>
                    <div className="text-muted text-center ml-auto mr-auto">
                      <h3 className="mb-0">Create template</h3>
                    </div>
                  </div>
                  <div className="modal-body">
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
                    <div className="text-center text-muted mb-4 mt-3">
                      <small>Fill the information below</small>
                    </div>
                    <Form role="form">
                      <FormGroup className="mb-3">
                        <InputGroup
                          className={classnames("input-group-alternative", {
                            "input-group-focus": this.state.nameFocus
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-tag" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Name"
                            id="name"
                            type="text"
                            onFocus={() => this.setState({ nameFocus: true })}
                            onBlur={() => this.setState({ nameFocus: false })}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup
                          className={classnames("input-group-alternative", {
                            "input-group-focus": this.state.sizeFocus
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-arrows-alt" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Size"
                            id="size"
                            type="number"
                            min="1"
                            max="50"
                            onFocus={() => this.setState({ sizeFocus: true })}
                            onBlur={() => this.setState({ sizeFocus: false })}
                          />
                        </InputGroup>
                      </FormGroup>
                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="primary"
                          type="button"
                          onClick={this.handleSubmit}
                        >
                          Submit
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Modal>
                {/* End Form Modal */}
              </Row>

              <GalleryItems pageId={this.state.page} />
            </Container>
            {this.props.counts && this.renderPages()}
          </section>
        </div>
      </div>
    );
  }
}

GalleryPage.propTypes = {
  // items: PropTypes.arrayOf(PropTypes.object),
  currentUser: PropTypes.object,
  history: PropTypes.object,
  counts: PropTypes.number
};
export default withRouter(
  withTracker(() => {
    Meteor.subscribe("piece-count").ready();

    Meteor.subscribe("pieces-fills", 1).ready();
    //Meteor.subscribe("piece-find").ready();
    return {
      //items: Pieces.find({}).fetch(),
      //items: Pieces.findFromPublication("piece-find", 1).fetch(),
      counts: Counts.get("pieces-counter"),
      currentUser: Meteor.user()
    };
  })(GalleryPage)
);
