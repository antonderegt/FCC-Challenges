import React, { Component } from 'react'
import ShowUsers from '../containers/container-user'
require('../../scss/style.scss')

class App extends Component {
  render() {
    return (
      <div>
      <ShowUsers />
      </div>
    )
  }
}

export default App
