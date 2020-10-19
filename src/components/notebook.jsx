import Axios from "axios";
import React, { Component } from "react";
import { Container, Nav, Col, Row } from "react-bootstrap";
import Note from "./note";

class Notebook extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.updateNote = this.updateNote.bind(this);
  }

  state = {};

  handleClick(id) {
    this.props.onSelectedNoteChange(id);
  }

  updateNote() {
    Axios.put(
      "http://localhost:9000/notebooks/" +
        this.props.selectedNotebook +
        "/" +
        this.props.selectedNote,
      { withCredentials: true }
    )
      .then((response) => {
        if (response.data.status === "updated") {
          console.log("note updated", response);
        }
      })
      .catch((error) => {
        //TODO not updated message
        console.log("err updating notebook", error);
      });
  }

  handleUpdateNote(event) {
    this.updateNote();
    event.preventDefault();
  }

  render() {
    let selectedNotebook = this.props.notebooks.find(
      (notebook) => notebook._id === this.props.selectedNotebookId
    );

    var notesList = "";
    if (this.props.selectedNotebookId) {
      notesList = selectedNotebook.notes.map((note) => (
        <Nav.Item key={note._id} className="border border-secondary">
          <Nav.Link onClick={() => this.handleClick(note._id)}>
            {note.title}
          </Nav.Link>
        </Nav.Item>
      ));
    }

    return (
      <React.Fragment>
        <Container fluid>
          <Row>
            <Col style={{}} className=" col-auto">
              <Nav
                className="flex-column vh-100 overflow-auto"
                style={{ width: "250px" }}
              >
                {notesList}
              </Nav>
            </Col>
            <Col id="notebook">
              <Note
                notebooks={this.props.notebooks}
                selectedNoteId={this.props.selectedNoteId}
                handleUpdateNoteId={this.handleUpdateNoteId}
                selectedNotebookId={this.props.selectedNotebookId}
                handleChange={this.props.handleChange}
              ></Note>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Notebook;
