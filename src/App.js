import React, { Component } from "react";
import Routes from "./Routes";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Routes />
        <footer>
          <p>Live værdata fra Søndre Lindheim Gard på Gvarv - Fruktbygda</p>
        </footer>
      </div>
    );
  }
}

export default App;
