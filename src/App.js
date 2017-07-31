import React, { Component } from 'react';
import { Container } from 'reactstrap';
import TwitchAccounts from './TwitchAccounts.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <Container>
        <div className="App">
          <div className="App-header">
            <h2>Twitch Monitor App</h2>
          </div>
          <TwitchAccounts />
        </div>
      </Container>
    );
  }
}

export default App;
