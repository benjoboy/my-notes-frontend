import Axios from "axios";
import React, { Component } from "react";
import {} from "react-router-dom";

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
    return (
      <nav className="navbar navbar-light Nav-background p-3 mb-5">
        <a className="navbar-brand" href="/">
          My Notes
        </a>
        <div>
          <a className="navbar-brand" href="/login">
            Login
          </a>
          <a className="navbar-brand" href="/register">
            Register
          </a>
          <button
            className="navbar-toggler"
            onClick={() => this.handleLogoutClick()}
          >
            Logout
          </button>
        </div>
      </nav>
    );
  }
}

export default NavBar;
