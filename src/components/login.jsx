import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("form submitted");
    const { username, password } = this.state;
    axios
      .post(
        "http://localhost:9000/users/login",
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("registration res", response);
        this.props.handleSuccessfulAuth(response.data);
      })
      .catch((error) => {
        console.log("registration error", error);
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div className="container-sm mt-5">
        <h2>Sign up</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="username"
              className="form-control"
              id="username"
              placeholder="Enter username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              id="pwd"
              placeholder="Enter password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="checkbox">
            <label>
              <input type="checkbox" name="remember" /> Remember me
            </label>
          </div>
          <button type="submit" className="btn btn-secondary">
            Sign up
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
