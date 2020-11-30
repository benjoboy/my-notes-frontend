import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navbar";
import Register from "./components/register";
import Login from "./components/login";
import { Switch, Route, withRouter } from "react-router-dom";
import Axios from "axios";
import DashBoard from "./components/dashboard";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    };

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    Axios.get("http://localhost:9000/users/logged_in", {
      withCredentials: true,
    })
      .then((response) => {
        if (
          response.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response.data.user,
          });
        } else if (
          !response.data.logged_in &&
          this.state.status === "LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {},
          });
        }
      })
      .catch((error) => {
        console.log("check login error");
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data,
    });
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    });
  }

  handleSuccessfulAuth(data) {
    this.handleLogin(data);
    this.props.history.push("/");
  }
  render() {
    return (
      <React.Fragment>
        <NavBar
          handleLogout={this.handleLogout}
          user={this.state.user}
          loggedInStatus={this.state.loggedInStatus}
        />
        <Switch>
          {this.state.loggedInStatus === "LOGGED_IN" ? (
            <Route
              path="/"
              exact
              render={(props) => (
                <DashBoard
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                  user={this.state.user}
                />
              )}
            />
          ) : (
            <Route
              path="/"
              exact
              render={(props) => (
                <Login
                  {...props}
                  handleSuccessfulAuth={this.handleSuccessfulAuth}
                />
              )}
            />
          )}
          <Route
            path="/register"
            exact
            render={(props) => (
              <Register
                {...props}
                handleSuccessfulAuth={this.handleSuccessfulAuth}
              />
            )}
          />
          <Route
            path="/login"
            exact
            render={(props) => (
              <Login
                {...props}
                handleSuccessfulAuth={this.handleSuccessfulAuth}
              />
            )}
          />
          <main className="container"></main>
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(App);

// function App() {
//   const [isAuthenticated, userHasAuthenticated] = useState(false);

//   return (
//     <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
//       <Router>
//         <React.Fragment>
//           <NavBar />
//           <Switch>
//             <Route path="/" exact component={Home} />
//             <Route path="/register" exact component={Register} />
//             <Route path="/login" exact component={Login} />
//             <main className="container"></main>
//           </Switch>
//         </React.Fragment>
//       </Router>
//     </AppContext.Provider>
//   );
// }

// export default App;
