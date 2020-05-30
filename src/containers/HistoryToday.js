import React, { Component } from "react";
import { API } from "aws-amplify";
import WeatherData from "../WeatherData.js";
import { VictoryLine, VictoryChart, VictoryAxis,
  VictoryTheme, VictoryTooltip } from 'victory';


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
      const items = await this.fetchData();
      const data = items.map(item => new WeatherData(item));
      this.setState({ data  });
    } catch (e) {
      alert(e);
    }
  
    this.setState({ isLoading: false });
  }
  
  fetchData() {
    var items = API.get("weather", "/today");
    return items;
  }
  
  renderTable(data) {
      return ( 
        data.length !== 0 ?
        <div>
          <div style={{width: 500, height:200}}>

          <h2>Temperatur</h2>          
          <VictoryChart theme={VictoryTheme.material} scale={{x: 'time'}} height={200} width={500}>
          <VictoryAxis
              tickCount={5}
              tickFormat={(x) => x.getHours()}
            />
            <VictoryAxis dependentAxis label="temperatur C&deg;" style={{ axisLabel: {padding: 40} }}/>
            <VictoryLine
              data={data}
              x={(d) => d.timestampAsDate()}
              y={(d) => d.temperature()} 
              labels={({ datum }) => `x: ${datum.x}, y: ${datum.y}`}
              labelComponent={
                <VictoryTooltip />
              }
            />
          </VictoryChart>
          
          </div>

          <div style={{width: 500, height:200}}>
            <h2>Vind</h2>
          <VictoryChart theme={VictoryTheme.material} scale={{x: 'time'}} height={200} width={500}>
          <VictoryAxis
              tickCount={5}
              tickFormat={(x) => x.getHours()}
            />
            <VictoryAxis dependentAxis label="vind m/s" style={{ axisLabel: {padding: 40} }}/>
            <VictoryLine
              data={data}
              x={(d) => d.timestampAsDate()}
              y={(d) => d.windspeed()} 
              labels={({ datum }) => `x: ${datum.x}, y: ${datum.y}`}
              labelComponent={
                <VictoryTooltip />
              }
            />
          </VictoryChart>
          </div>

<br/>


          <table className="table">
            <thead>
              <tr>
                <th>Tidspunkt</th>
                <th>Temperatur (C&deg;)</th>
                <th>Vind (m/s)</th>
                <th>Vindkast (nå, maks, min)(m/s)</th>
                <th>Nedbør</th>
              </tr>
            </thead>
            <tbody>
            {[...data].reverse().map(item => {
                return (
                <tr key="item.timestamp">
                  <td>{item.timestampAsDate().toLocaleTimeString()}</td>
                  <td>{item.temperature()}</td>
                  <td>{item.windspeed()}</td>
                  <td>
                    {item.currentWindGust()} - {item.windGustMax()} - {item.windGustMin()}
                  </td>
                  <td>{item.data.RainTotal }</td>
                </tr>
              )}
            )}     
            </tbody>       
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
