import Axios from "axios";
import React, { Component } from "react";
import {} from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    Axios.post("http://localhost:9000/users/logout", null, {
      withCredentials: true,
    })
      .then((response) => {
        console.log("logged out");
        this.props.handleLogout();
      })
      .catch((error) => {
        console.log("logout err", error);
      });
  }
  render() {
    var dropdownItems;
    if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
      dropdownItems = (
        <div>
          <NavDropdown.Item href="/login">Login</NavDropdown.Item>
          <NavDropdown.Item href="/register">Register</NavDropdown.Item>
        </div>
      );
    } else {
      dropdownItems = (
        <NavDropdown.Item onClick={this.handleLogoutClick}>
          Logout
        </NavDropdown.Item>
      );
    }
    return (
      // <nav className="navbar navbar-light Nav-background p-3 mb-5">
      <Navbar collapseOnSelect className="Nav-background p-3 mb-5">
        <Navbar.Brand href="/">My notes</Navbar.Brand>
        <Nav className="ml-auto">
          <NavDropdown
            title={
              this.props.user.username ? this.props.user.username : "Dropdown"
            }
            alignRight
          >
            {dropdownItems}
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

export default NavBar;
