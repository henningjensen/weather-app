import React, { Component } from "react";
import { API } from "aws-amplify";
import "./Home.css";
import WeatherData from "../WeatherData.js";

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
      
      if (temperatures.length === 0)
        return "<div/>";

      const weatherData = new WeatherData(temperatures[0]);

      return ( 
        <div class="dashboard">
          <div class="card teal lighten-5">
            <div class="card-content black-text">
              <span class="card-title">Temperatur</span>
              <h1>{weatherData.temperature()}&deg;</h1>
            </div>
          </div>
          <div class="card teal lighten-5">
            <div class="card-content black-text">
              <span class="card-title">Vind</span>
              <h1>{weatherData.windspeed()} m/s - { temperatures[0].CurrentWindDirection }&deg;</h1>
            </div>
          </div>
          <hr/>
          <h5>Sist oppdatert: {new Date(temperatures[0].timestamp).toLocaleString()}</h5>
        </div>
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
      <div>
        {this.loading()}
        {this.renderCurrentTemperature(this.state.temperatures)}
      </div>
    );
  }
}
