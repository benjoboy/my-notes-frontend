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
        if (
          this.state.selectedNotebookId === "" &&
          this.state.notebooks.length > 0
        ) {
          this.setState({
            selectedNotebookId: this.state.notebooks[0]._id,
          });
          if (
            this.state.selectedNoteId === "" &&
            this.state.notebooks[0].notes.length > 0
          ) {
            this.setState({
              selectedNoteId: this.state.notebooks[0].notes[0]._id,
            });
          }
        }
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
    if (this.state.selectedNotebookId !== id) {
      let selectedNotebook = this.state.notebooks.find(
        (notebook) => notebook._id === id
      );
      let noteId;

      if (selectedNotebook.notes.length > 0) {
        noteId = selectedNotebook.notes[0]._id;
      } else noteId = "";

      this.setState({
        selectedNotebookId: id,
        selectedNoteId: noteId,
      });
    }
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
          <Col id="notebook" className="mt-4">
            <Notebook
              notebooks={this.state.notebooks}
              selectedNoteId={this.state.selectedNoteId}
              onSelectedNoteChange={this.onSelectedNoteChange}
              selectedNotebookId={this.state.selectedNotebookId}
              handleChange={this.handleChange}
            ></Notebook>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
