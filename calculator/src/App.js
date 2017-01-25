import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Calc from './Calc'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Nuclear Calculator</h2>
        </div>
        <p className="App-intro">
          There are 3 kinds of people in this world...<br /> Those who are good at math and those who aren't
        </p>
        <Calc />
      </div>
    );
  }
}

export default App;
