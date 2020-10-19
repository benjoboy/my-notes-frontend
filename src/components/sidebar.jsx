import React, { Component } from "react";
import Notebook from "./notebook";
import { Col, Container, Row } from "react-bootstrap";

class Sidebar extends Component {
  state = {
    notebooks: [
      {
        name: "notebook 1",
        notes: [
          {
            title: "notebook 1 - note 1",
            content: "Hello world!",
          },
        ],
      },
      {
        name: "notebook 2",
        notes: [
          {
            title: "notebook 2 - note 1",
            content: "sup",
          },
        ],
      },
      {
        name: "notebook 3",
        notes: [
          {
            title: "notebook 3 - note 1",
            content: "yello",
          },
        ],
      },
    ],
  };
  render() {
    return (
      <Container>
        <Row>
          <div>
            <h1>Home</h1>
            <h1>Status: {this.props.loggedInStatus}</h1>
            <h1>username: {this.props.user.username}</h1>
          </div>
        </Row>
        <Row>
          <Col id="sidebar"> hello</Col>
          <Col id="notebook">
            <Notebook></Notebook>hello2
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Sidebar;
