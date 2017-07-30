import React, { Component } from 'react';
import TwitchAccounts from './TwitchAccounts.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Twitch Monitor App</h2>
        </div>
        <TwitchAccounts />
      </div>
    );
  }
}

export default App;
