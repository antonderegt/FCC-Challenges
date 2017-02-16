import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Recipes from './components/recipes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Recipe Box</h2>
        </div>
        <Recipes />
      </div>
    )
  }
}

export default App
