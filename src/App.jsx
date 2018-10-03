import React from 'react';
import { Container } from 'reactstrap';
import TwitchAccounts from './TwitchAccounts';
import './App.css';

const App = () => (
  <Container>
    <div className="App">
      <div className="App-header">
        <h2>Twitch Monitor App</h2>
      </div>
      <TwitchAccounts />
    </div>
  </Container>
);

export default App;
