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
            <h3>Temperatur: {Math.round(temperatures[0].temperature * 100)/100}&deg;</h3>
            <h3>Vindhastighet: { Math.round(temperatures[0].CurrentWindSpeed / 3.6) / 10 } m/s</h3>
            <h3>Vindretning: { temperatures[0].CurrentWindDirection }</h3>
            <h3>Sist oppdatert: {new Date(temperatures[0].timestamp).toLocaleString()}</h3>
        </div>
        :
        <div />
      );
  }

  loading() {
    if (this.state.isLoading) {
      return "Henter data fra værstasjon..."
    }
    else {
      return ""
    }
  }

  render() {
    return (
      <div className="Home">
        <div className="lander">
          {this.loading()}
          {this.renderCurrentTemperature(this.state.temperatures)}
        </div>
      </div>
    );
  }
}
