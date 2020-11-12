
import logo from './logo.svg';
import './App.css';
import Amplify, { API } from 'aws-amplify';
import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

Amplify.configure({
  API: {
    endpoints: [
      {
        name: "DiscordStatsAPI",
        endpoint: "https://ai7pkjomr4.execute-api.ap-southeast-2.amazonaws.com"
      }
    ]
  }
});

function VerticalBarChart(props) {
  return (
    <BarChart width={800} height={50 * props.data.length} data={props.data} layout="vertical"
      margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="white" />
      <XAxis type="number" stroke="white" />
      <YAxis dataKey={props.yKey} type="category" stroke="white" />
      <Tooltip />
      <Legend />
      <Bar dataKey={props.xKey} fill="#8884d8" />
    </BarChart>
  );
}


class DataForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "num_messages",
      guild: "746609150842372138",
      timezone: "Pacific/Auckland"
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form onSubmit={e => {
        e.preventDefault();
        this.props.onSubmit(this.state.type, this.state.guild, this.state.timezone);
      }}>
        <label>Guild:
        <input name="guild" type="text" value={this.state.guild} onChange={this.handleChange} /></label>
        <br />

        <label>Type:
        <input name="type" type="text" value={this.state.type} onChange={this.handleChange} /></label>
        <br />

        <label>Timezone:
        <input name="timezone" type="text" value={this.state.timezone} onChange={this.handleChange} /></label>
        <br />

        <button type="submit">Submit</button>
      </form>
    );
  }

}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { chart: "-- no data yet --" };
    this.fetchData = this.fetchData.bind(this);
  }

  setData(response) {

    // shape the data
    const numDatapoints = Object.keys(response).length;

    if (numDatapoints == 1) {
      // bar graph

      const data = [];

      for (let time of Object.values(response)) {
        for (let name of Object.keys(time)) {
          if (time[name] <= 0) continue;
          
          data.push({ "Name": name, "Number of Messages": time[name] });
        }
      }

      data.sort((a, b) => { return b["Number of Messages"] - a["Number of Messages"]; });

      this.setState({ chart: (<VerticalBarChart data={data} xKey="Number of Messages" yKey="Name" />) });
    }
    else {
      // TODO line graph
      this.setState({ chart: "-- insert line graph --" });
    }
  }

  fetchData(type, guild, timezone) {
    const apiName = 'DiscordStatsAPI';
    const path = '/dev/stats';
    const myInit = {
      headers: {},
      body: {
        "type": type,
        "time_interval": "alltime",
        "guild": guild,
        "timezone": timezone
      }
    };

    API
      .post(apiName, path, myInit)
      .then(response => this.setData(response.body))
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="App">
        <DataForm onSubmit={this.fetchData} />
        {this.state.chart}
      </div>
    );
  }
}

export default App;