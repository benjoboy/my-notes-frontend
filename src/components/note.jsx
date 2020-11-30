import React, { Component } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import Axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const SavingState = Object.freeze({
  NOT_SAVED: 0,
  SAVING: 1,
  SAVED: 2,
});

class Note extends Component {
  constructor() {
    super();

    this.saveNote = this.saveNote.bind(this);
    this.update = this.update.bind(this);
  }

  state = {
    saving: SavingState.NOT_SAVED,
  };

  componentDidMount() {
    this.timer = null;
  }

  update(event, editor) {
    if (editor == null) event.persist();
    console.log(event);
    clearTimeout(this.timer);
    this.setState({ saving: SavingState.NOT_SAVED });

    this.timer = setTimeout(() => {
      this.setState({ saving: SavingState.SAVING });
      if (editor != null) {
        console.log("hello");
        this.props.handleEditorChange(event, editor);
      } else {
        console.log("hello2");
        this.props.handleChange(event);
      }
      this.saveNote(event);
      this.setState({ saving: SavingState.SAVED });
    }, 500);
  }

  saveNote() {
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
                onChange={this.update}
              />
              <ButtonGroup className="pt-2">
                <Button
                  onClick={this.props.deleteNote}
                  className="btn btn-danger"
                >
                  Delete Note
                </Button>
              </ButtonGroup>
              <AutoSaveDisplay saving={this.state.saving} />
            </form>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default Note;

const AutoSaveDisplay = ({ saving }) => {
  let display;
  switch (saving) {
    case SavingState.SAVING:
      display = <em>saving...</em>;
      break;
    case SavingState.SAVED:
      display = "saved!";
      break;
    default:
      display = <br />;
  }
  return <div className="d-inline pl-3">{display}</div>;
};
