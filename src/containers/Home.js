import React, { Component } from "react";
import { API } from "aws-amplify";
import "./Home.css";

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      temperatures: []
    };
  }

  async componentDidMount() {
    try {
      const temperatures = await this.temperatures();
      this.setState({ temperatures });
    } catch (e) {
      alert(e);
    }
  
    this.setState({ isLoading: false });
  }
  
  temperatures() {
    return API.get("weather", "/temperature");
  }
  
  renderCurrentTemperature(temperatures) {
      return ( 
        temperatures.length !== 0 ?
        <div>
            <h1>{Math.round(temperatures[0].temperature * 100)/100}&deg;</h1>
            <h2>{new Date(temperatures[0].timestamp).toLocaleString()}</h2>
            <p>Vindhastighet: { temperatures[0].CurrentWindSpeed }</p>
            <p>Vindretning: { temperatures[0].CurrentWindDirection }</p>
        </div>
        :
        <div />
      );
  }

  render() {
    return (
      <div className="Home">
        <div className="lander">
          {this.renderCurrentTemperature(this.state.temperatures)}
          <p>Nåværende plassering av sensor: garasjen</p>
          <p>Live værdata fra Søndre Lindheim Gard på Gvarv - Fruktbygda</p>
        </div>
      </div>
    );
  }
}
