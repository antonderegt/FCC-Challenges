import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { action } from '../actions/actions'
import { CONSTANT } from '../actions/actions'

class Container extends Component {
  render() {
    return (
      <div className="container">
        in progress
      </div>
    )
  }
}

// Get acces to the store
function mapStateToProps(state) {
  return {
    state
  }
}

// Connect store and actions to the class Container
export default connect(mapStateToProps)(Container)
