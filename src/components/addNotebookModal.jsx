import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class AddNotebookModal extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    title: "",
  };

  //   addNotebook() {
  //     console.log("hell", this.state.title);
  //     Axios.post(
  //       "http://localhost:9000/notebooks",
  //       {
  //         title: this.state.title,
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //       .then((response) => {
  //         console.log("successfuly added a notebook");
  //         if (response.data.status === "created") {
  //           console.log("hello", this.props);
  //           this.props.onSelectedNotebookChange(response.data.notebook._id);
  //           this.props.onHide();
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("error");
  //       });
  //   }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            New Notebook
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter title"
              name="title"
              value={this.state.title}
              onChange={(e) => this.handleChange(e)}
              required
            />{" "}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.onHide(this.state.title)}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddNotebookModal;
