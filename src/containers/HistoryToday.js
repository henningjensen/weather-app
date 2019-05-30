import React, { Component } from "react";
import { API } from "aws-amplify";
import WeatherData from "../WeatherData.js";

export default class HistoryToday extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: []
    };
  }

  async componentDidMount() {
    try {
      const data = await this.fetchData();
      this.setState({ data });
    } catch (e) {
      alert(e);
    }
  
    this.setState({ isLoading: false });
  }
  
  fetchData() {
    return API.get("weather", "/today");
  }
  
  renderTable(data) {
      return ( 
        data.length !== 0 ?
        <div>
          <table class="table">
            <thead>
              <th>Tidspunkt</th>
              <th>Temperatur (C&deg;)</th>
              <th>Vind (m/s)</th>
              <th>Vindkast (nå, maks, min)(m/s)</th>
              <th>Nedbør</th>
            </thead>
            {[...data].reverse().map(item => {
                let weatherdata = new WeatherData(item)
                return (
                <tr>
                  <td>{new Date(item.timestamp).toLocaleTimeString()}</td>
                  <td>{weatherdata.temperature()}</td>
                  <td>{weatherdata.windspeed()}</td>
                  <td>
                    {weatherdata.currentWindGust()} - {weatherdata.windGustMax()} - {weatherdata.windGustMin()}
                  </td>
                  <td>{item.RainTotal }</td>
                </tr>
              )}
            )}            
          </table>
        </div>
        :
        <div />
      );
  }

  render() {
    return (
      <div className="Home">
        <div className="lander">
          {this.renderTable(this.state.data)}
        </div>
      </div>
    );
  }
}
