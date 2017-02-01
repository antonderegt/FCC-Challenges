import React, { Component } from 'react';
import './App.css';

class App extends Component {

  render() {
    return (
      <div>
        <h1>Simon Game</h1>
        <div className="flexContainer">
          <div className="flexRow">
            <div className="square green"></div>
            <div className="square red"></div>
          </div>
          <div className="flexRow">
            <div className="square yellow"></div>
            <div className="square blue"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
