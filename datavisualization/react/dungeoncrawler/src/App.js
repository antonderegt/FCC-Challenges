import React, { Component } from 'react';
import './App.css';
import Dungeon from './Dungeon'

class App extends Component {
  render() {
    return (
      <div>
        <h1>Dungeon Crawler</h1>
        <h3>Kill the Tomato Boss in dungeon 4</h3>
        <Dungeon />
      </div>
    );
  }
}

export default App;
