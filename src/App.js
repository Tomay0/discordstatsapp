
import logo from './logo.svg';
import './App.css';
import Amplify, { API } from 'aws-amplify';

Amplify.configure({
  API: {
    endpoints: [
      {
        name: "DiscordStatsAPI",
        endpoint: "https://ai7pkjomr4.execute-api.ap-southeast-2.amazonaws.com/dev"
      }
    ]
  }
});

function App() {
  const apiName = 'DiscordStatsAPI';
  const path = '/';
  const myInit = { // OPTIONAL
    headers: {}, // OPTIONAL
    response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
    queryStringParameters: {  // OPTIONAL
      "type": "num_messages",
      "time_interval": "alltime",
      "guild": 746609150842372138n,
      "timezone": "Pacific/Auckland"
    },
  };
  API
    .get(apiName, path, myInit)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error.response);
    });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;