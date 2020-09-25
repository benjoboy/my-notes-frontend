import React from "react";
import "./App.css";
import NavBar from "./components/navbar";
import Register from "./components/register";
import Login from "./components/login";
import Home from "./components/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <main className="container"></main>
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
