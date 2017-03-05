import React, { Component } from 'react';
import Grid from './Grid'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Game Of Life</h1>
        <Grid />
      </div>
    );
  }
}

export default App;
