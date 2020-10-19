import React, { Component } from "react";
import Notebook from "./notebook";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Axios from "axios";

class Home extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.onSelectedNotebookChange = this.onSelectedNoteChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSelectedNoteChange = this.onSelectedNoteChange.bind(this);
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

  onSelectedNotebookChange(id) {
    this.setState({
      selectedNotebook: id,
    });
  }

  onSelectedNoteChange(id) {
    this.setState({
      selectedNoteId: id,
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState((prevState) => {
      const notebookIndex = prevState.notebooks.findIndex(
        (notebook) => notebook._id === prevState.selectedNotebookId
      );

      const noteIndex = prevState.notebooks[notebookIndex].notes.findIndex(
        (note) => note._id === prevState.selectedNoteId
      );

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
          <Col style={{}} className="Nav-background col-auto">
            <Nav
              className="flex-column vh-100 overflow-auto"
              style={{ width: "150px" }}
            >
              {listNotebooks}
            </Nav>
          </Col>
          <Col id="notebook" className="mt-5">
            <Notebook
              notebooks={this.state.notebooks}
              selectedNoteId={this.state.selectedNoteId}
              onSelectedNoteChange={this.state.onSelectedNoteChange}
              selectedNotebookId={this.state.selectedNotebookId}
              onSelectedNotebookChange={this.onSelectedNotebookChange}
              handleChange={this.handleChange}
            ></Notebook>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
