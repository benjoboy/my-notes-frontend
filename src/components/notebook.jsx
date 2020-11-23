import React, { Component } from "react";
import { Nav } from "react-bootstrap";

class Notebook extends Component {
  render() {
    let selectedNotebook = this.props.notebooks.find(
      (notebook) => notebook._id === this.props.selectedNotebookId
    );

    var notesList = "";
    if (this.props.selectedNotebookId) {
      notesList = selectedNotebook.notes.map((note) => (
        <Nav.Item key={note._id} className="">
          <Nav.Link
            className="linkText"
            onClick={() => this.props.onSelectedNoteChange(note._id)}
          >
            {note.title}
          </Nav.Link>
        </Nav.Item>
      ));
    }

    return <Nav className="col-12 d-block sidebar">{notesList}</Nav>;
  }
}

export default Notebook;
