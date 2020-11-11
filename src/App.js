  
import logo from './logo.svg';
import './App.css';
import Amplify, { API } from 'aws-amplify';

Amplify.configure({API: {
  endpoints: [
      {
          name: "DiscordStatsAPI",
          endpoint: "https://ai7pkjomr4.execute-api.ap-southeast-2.amazonaws.com/dev"
      }
  ]
}});




function App() {
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