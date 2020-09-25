import React, { Component } from "react";
import {} from "react-router-dom";

class NavBar extends Component {
  state = {};
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
        </div>
      </nav>
    );
  }
}

export default NavBar;
