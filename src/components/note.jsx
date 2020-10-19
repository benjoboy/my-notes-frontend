import React, { Component } from "react";
import { Button } from "react-bootstrap";

class Note extends Component {
  state = {};

  render() {
    let selectedNote;
    if (this.props.selectedNoteId) {
      let selectedNotebook = this.props.notebooks.find(
        (notebook) => notebook._id === this.props.selectedNotebookId
      );
      selectedNote = selectedNotebook.notes.find(
        (note) => note._id === this.props.selectedNoteId
      );
    }
    return (
      <React.Fragment>
        {selectedNote ? (
          <div>
            <h1>{selectedNote.content}</h1>
            <form onSubmit={this.props.handleUpdateNote}>
              <input
                value={selectedNote.title}
                className="form-control"
                name="noteTitle"
                onChange={this.props.handleChange}
              />
              <input
                value={selectedNote.content}
                className="form-control"
                name="noteContent"
                onChange={this.props.handleChange}
              />
              <Button type="submit" className="btn btn-success">
                Save Note
              </Button>
            </form>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default Note;
