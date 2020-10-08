import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
      </div>
    );
  }
}

export default Home;
