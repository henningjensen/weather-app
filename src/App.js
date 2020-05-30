import React, { Component } from "react";
import Routes from "./Routes";
import { Link } from 'react-router-dom';
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="app container">
        <h1>        
          <Link to="/">Været på Søndre Lindheim Gard - Gvarv</Link>
        </h1>
        <Routes />
        <Link to="/today" className="waves-effect waves-light btn">Historikk - i dag</Link>
      </div>
    );
  }
}

export default App;
