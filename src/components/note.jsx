import React, { Component } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import Axios from "axios";
import moment from "moment";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
        }
      })
      .catch((error) => {
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
                style={{ fontWeight: "bold" }}
              />
              <CKEditor
                editor={ClassicEditor}
                data={selectedNote.content}
                onChange={this.props.handleEditorChange}
              />
              <ButtonGroup className="pt-2">
                <Button
                  onClick={this.props.deleteNote}
                  className="btn btn-danger"
                >
                  Delete Note
                </Button>
                <Button type="submit" className="btn btn-success">
                  Save Note
                </Button>
              </ButtonGroup>
              <p className="d-inline pl-3">
                Last saved:{" "}
                {moment(selectedNote.editDate).format("h:s DD.MM.YYYY")}
              </p>
            </form>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default Note;
