import React, { Component } from "react";
import Notebook from "./notebook";
import Nav from "react-bootstrap/Nav";
import Axios from "axios";
import AddNotebookModal from "./addNotebookModal";
import { Col, Container, Row, Dropdown } from "react-bootstrap";
import Note from "./note";

class DashBoard extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.onSelectedNoteChange = this.onSelectedNoteChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addModalClose = this.addModalClose.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  componentDidMount() {
    this.getNotebooks();
  }

  getNotebooks() {
    Axios.get("http://localhost:9000/notebooks", {
      withCredentials: true,
    })
      .then((response) => {
        this.setState(
          {
            notebooks: response.data,
          },
          function () {
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
          }
        );
      })
      .catch((error) => {
        console.log("error getting notebooks");
      });
  }

  state = {
    selectedNotebookId: "",
    selectedNoteId: "",
    notebooks: [],
    modalShow: false,
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

  handleEditorChange(event, editor) {
    this.setState((prevState) => {
      const notebookIndex = prevState.notebooks.findIndex(
        (notebook) => notebook._id === prevState.selectedNotebookId
      );

      const noteIndex = prevState.notebooks[notebookIndex].notes.findIndex(
        (note) => note._id === prevState.selectedNoteId
      );

      let newNotebooks = [...prevState.notebooks];

      newNotebooks[notebookIndex].notes[noteIndex] = {
        ...newNotebooks[notebookIndex].notes[noteIndex],
        content: editor.getData(),
      };

      return { newNotebooks };
    });
  }

  handleChange(event) {
    console.log(event);
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

  addModalClose(title) {
    if (title) {
      this.handleModalSave(title);
    }
    this.setState({
      modalShow: false,
    });
  }

  handleModalSave(title) {
    Axios.post(
      "http://localhost:9000/notebooks",
      {
        title: title,
      },
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        if (response.data.status === "created") {
          this.getNotebooks();
        }
      })
      .catch((error) => {
        console.log("error adding a notebook");
      });
  }

  addNote() {
    if (this.props.selectedNotebookId !== "") {
      Axios.post(
        "http://localhost:9000/notebooks/addNote",
        {
          id: this.state.selectedNotebookId,
          title: "New Note",
          content: "",
        },
        {
          withCredentials: true,
        }
      )
        .then((response) => {
          if (response.data.status === "created") {
            this.getNotebooks();

            //TODO select latest note
          }
        })
        .catch((error) => {
          console.log("error creating a note");
        });
    }
  }

  deleteNote() {
    Axios.delete(
      "http://localhost:9000/notebooks/" +
        this.state.selectedNotebookId +
        "/deleteNote/" +
        this.state.selectedNoteId,
      {
        withCredentials: true,
      }
    )
      .then((res) => {
        this.getNotebooks();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteNotebook(id) {
    Axios.delete("http://localhost:9000/notebooks/" + id, {
      withCredentials: true,
    })
      .then((res) => {
        this.setState({
          selectedNotebookId: "",
          selectedNoteId: "",
        });
        this.getNotebooks();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getTheLatestNote() {
    let selectedNotebook = this.state.notebooks.find(
      (notebook) => notebook._id === this.state.selectedNotebookId
    );
    let latest = selectedNotebook.notes.reduce((r, o) =>
      o.editDate > r.editDate ? o : r
    );
    return latest;
  }

  render() {
    const listNotebooks = this.state.notebooks.map((notebook) => (
      <div key={notebook._id}>
        <Dropdown className="d-inline float-right">
          <Dropdown.Toggle variant="muted">
            <span></span>
          </Dropdown.Toggle>
          <Dropdown.Menu size="xs" title="">
            <Dropdown.Item onClick={() => this.deleteNotebook(notebook._id)}>
              {" "}
              delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Nav.Item className="mt-1">
          <Nav.Link
            className="linkText"
            onClick={() => this.handleClick(notebook._id)}
          >
            {notebook.title}&nbsp;
          </Nav.Link>
        </Nav.Item>
      </div>
    ));
    return (
      <Container fluid className="">
        <Row className="no-gutters">
          <Col xs={6} sm={4} lg={2} id="sidebar-wrapper">
            <Nav className="col-12 d-block sidebar mt-3">
              <Nav.Item>
                <Nav.Link
                  className="btn btn-success ml-2"
                  onClick={() => this.setState({ modalShow: true })}
                >
                  +&nbsp;Notebook
                </Nav.Link>
              </Nav.Item>
              {listNotebooks}
              <AddNotebookModal
                show={this.state.modalShow}
                onHide={this.addModalClose}
                animation={false} //stops the "findDOMNode" warning
              />
            </Nav>
          </Col>
          <Col xs={6} sm={4} lg={2} id="sidebar-wrapper">
            {this.state.selectedNotebookId !== "" ? (
              <div className="ml-3 mt-3 pr-3">
                <Nav.Link
                  className="btn btn-success"
                  onClick={() => this.addNote()}
                >
                  + Note
                </Nav.Link>
              </div>
            ) : null}
            <Notebook
              handleGetNotebooks={this.handleGetNotebooks}
              notebooks={this.state.notebooks}
              selectedNoteId={this.state.selectedNoteId}
              onSelectedNoteChange={this.onSelectedNoteChange}
              selectedNotebookId={this.state.selectedNotebookId}
              handleChange={this.handleChange}
            />
          </Col>
          <Col xs={12} sm={4} lg={8} className="mt-3 noteOrder">
            <Note
              notebooks={this.state.notebooks}
              selectedNoteId={this.state.selectedNoteId}
              selectedNotebookId={this.state.selectedNotebookId}
              handleChange={this.handleChange}
              deleteNote={this.deleteNote}
              handleEditorChange={this.handleEditorChange}
            />
          </Col>
        </Row>
        <Row></Row>
        <Row></Row>
      </Container>
    );
  }
}

export default DashBoard;
