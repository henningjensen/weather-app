import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import Routes from "./Routes";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Routes />
        <footer>Live værdata fra Søndre Lindheim Gard på Gvarv</footer>
      </div>
    );
  }
}

export default App;
