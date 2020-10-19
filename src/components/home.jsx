import React, { Component } from "react";
import Notebook from "./notebook";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Axios from "axios";

class Sidebar extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.onSelectedNoteChange = this.onSelectedNoteChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getNotebooks();
  }

  getNotebooks() {
    Axios.get("http://localhost:9000/notebooks", {
      withCredentials: true,
    })
      .then((response) => {
        console.log("res:", response);
        this.setState({
          notebooks: response.data,
        });
      })
      .catch((error) => {
        console.log("error getting notebooks");
      });
  }

  state = {
    selectedNotebookId: "",
    selectedNoteId: "",
    notebooks: [],
  };

  handleClick(id) {
    this.setState({
      selectedNotebookId: id,
    });
  }

  onSelectedNoteChange(id) {
    this.setState({
      selectedNoteId: id,
    });
  }

  handleChange(event) {
    console.log(event);
    const { name, value } = event.target;
    this.setState((prevState) => {
      const notebookIndex = prevState.notebooks.findIndex(
        (notebook) => notebook._id === prevState.selectedNotebookId
      );
      //console.log("notebook index", notebookIndex);
      const noteIndex = prevState.notebooks[notebookIndex].notes.findIndex(
        (note) => note._id === prevState.selectedNoteId
      );

      //console.log("note index", noteIndex);
      let newNotebooks = [...prevState.notebooks];
      if (name === "noteContent")
        newNotebooks[notebookIndex].notes[noteIndex] = {
          ...newNotebooks[notebookIndex].notes[noteIndex],
          content: value,
        };
      else if (name === "noteTitle") {
        newNotebooks[notebookIndex].notes[noteIndex] = {
          ...newNotebooks[notebookIndex].notes[noteIndex],
          title: value,
        };
      }

      return { newNotebooks };
    });
  }
  render() {
    const listNotebooks = this.state.notebooks.map((notebook) => (
      <Nav.Link
        key={notebook._id}
        className="linkText"
        onClick={() => this.handleClick(notebook._id)}
      >
        {notebook.title}
      </Nav.Link>
    ));
    return (
      <Container fluid>
        <Row>
          <div>
            <h1>Home</h1>
            <h1>Status: {this.props.loggedInStatus}</h1>
            <h1>username: {this.props.user.username}</h1>
            <h1>
              {this.state.selectedNotebook
                ? this.state.selectedNotebook[0].title
                : ""}
            </h1>
          </div>
        </Row>
        <Row>
          <Col style={{}} className="Nav-background col-auto">
            <Nav
              className="flex-column vh-100 overflow-auto"
              style={{ width: "150px" }}
            >
              {listNotebooks}
            </Nav>
          </Col>
          <Col id="notebook">
            <Notebook
              notebooks={this.state.notebooks}
              selectedNoteId={this.state.selectedNoteId}
              selectedNotebookId={this.state.selectedNotebookId}
              onSelectedNoteChange={this.onSelectedNoteChange}
              handleChange={this.handleChange}
            ></Notebook>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Sidebar;
