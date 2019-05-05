import React, { Component } from "react";
import Routes from "./Routes";
import { Link } from 'react-router-dom';
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="app container">
            <h1>Været på Søndre Lindheim Gard - Gvarv</h1>
       
            <nav>
              <div class="nav-wrapper white">
              <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li>
                <Link to="/today" class="black-text">Historikk - i dag</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Routes />
      </div>
    );
  }
}

export default App;
