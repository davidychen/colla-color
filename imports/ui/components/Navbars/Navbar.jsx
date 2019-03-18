import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

class MainNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      color: "navbar-transparent"
    };
    this.changeColor = this.changeColor.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.onCollapseExiting = this.onCollapseExiting.bind(this);
    this.onCollapseExited = this.onCollapseExited.bind(this);
    this.scrollToDownload = this.scrollToDownload.bind(this);
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    window.addEventListener("scroll", this.changeColor);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.changeColor);
  }
  changeColor() {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      this.setState({
        color: "bg-info"
      });
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      this.setState({
        color: "navbar-transparent"
      });
    }
  }
  toggleCollapse() {
    document.documentElement.classList.toggle("nav-open");
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  }
  onCollapseExiting() {
    this.setState({
      collapseOut: "collapsing-out"
    });
  }
  onCollapseExited() {
    this.setState({
      collapseOut: ""
    });
  }
  scrollToDownload() {
    document
      .getElementById("download-section")
      .scrollIntoView({ behavior: "smooth" });
  }

  logout(){

  }
  render() {
    return (
      <Navbar
        className={"fixed-top " + this.state.color}
        color-on-scroll="100"
        expand="lg"
      >
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              data-placement="bottom"
              to="/"
              rel="noopener noreferrer"
              title="Designed and Coded by David and Sim"
              tag={Link}
            >
              <span>CC• </span>
              Colla Color
            </NavbarBrand>
            <button
              aria-expanded={this.state.collapseOpen}
              className="navbar-toggler navbar-toggler"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse
            className={"justify-content-end " + this.state.collapseOut}
            navbar
            isOpen={this.state.collapseOpen}
            onExiting={this.onCollapseExiting}
            onExited={this.onCollapseExited}
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    CC•Colla Color
                  </a>
                </Col>
                <Col className="collapse-close text-right" xs="6">
                  <button
                    aria-expanded={this.state.collapseOpen}
                    className="navbar-toggler"
                    onClick={this.toggleCollapse}
                  >
                    <i className="tim-icons icon-simple-remove" />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav navbar>
              {this.props.loggedIn && <NavItem className="p-0">
                <NavLink
                  data-placement="bottom"
                  tag={Link}
                  to="/gallery"
                  rel="noopener noreferrer"
                  target="_blank"
                  title="View all Pieces"
                >
                  <i className="fas fa-images" />
                  <p className="d-lg-none d-xl-none">Gallery</p>
                </NavLink>
              </NavItem>}
              {this.props.loggedIn && <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  href="#pablo"
                  nav
                  onClick={e => e.preventDefault()}
                >
                  <i className="fa fa-cogs d-lg-none d-xl-none" />
                  {this.props.currentUser.username}
                </DropdownToggle>
                <DropdownMenu className="dropdown-with-icons">
                  <DropdownItem onClick={this.logout}>
                    <i className="fas fa-user" />
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>}
              {!this.props.loggedIn && <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  href="#pablo"
                  nav
                  onClick={e => e.preventDefault()}
                >
                  <i className="fa fa-cogs d-lg-none d-xl-none" />
                  Getting started
                </DropdownToggle>
                <DropdownMenu className="dropdown-with-icons">
                  <DropdownItem tag={Link} to="/login">
                    <i className="fas fa-user" />
                    Login
                  </DropdownItem>
                  <DropdownItem tag={Link} to="/signup">
                    <i className="fas fa-user-plus" />
                    Sign Up
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>}
              
              <NavItem>
                <Button
                  className="nav-link d-none d-lg-block"
                  color="default"
                  onClick={this.scrollToDownload}
                >
                  <i className="tim-icons icon-cloud-download-93" /> Download
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default MainNavbar;
