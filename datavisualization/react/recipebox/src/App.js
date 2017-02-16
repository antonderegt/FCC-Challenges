import React, { Component } from 'react'
import './App.css'
import Recipes from './components/recipes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Recipe Box</h2>
        </div>
        <div className="Recipes">
          <Recipes />
        </div>
      </div>
    )
  }
}

export default App
