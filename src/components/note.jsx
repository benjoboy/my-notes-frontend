import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Axios from "axios";

class Note extends Component {
  constructor() {
    super();

    this.saveNote = this.saveNote.bind(this);
  }

  saveNote(event) {
    event.preventDefault();

    console.log("save");
    let selectedNote;
    let selectedNotebook = this.props.notebooks.find(
      (notebook) => notebook._id === this.props.selectedNotebookId
    );
    selectedNote = selectedNotebook.notes.find(
      (note) => note._id === this.props.selectedNoteId
    );

    Axios.put(
      "http://localhost:9000/notebooks/" +
        this.props.selectedNotebookId +
        "/" +
        this.props.selectedNoteId,
      {
        title: selectedNote.title,
        content: selectedNote.content,
      },
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
            <form onSubmit={this.saveNote}>
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
