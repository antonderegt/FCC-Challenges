import React, { Component } from 'react'
import Container from '../containers/container'
import Header from '../containers/header'
require('../../scss/style.scss')

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Container />
      </div>
    )
  }
}

export default App
