import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { action } from '../actions/actions'
import { CONSTANT } from '../actions/actions'


class Header extends Component {
  render() {
    return (
      <div>
        <header>
          <h3>DitIsAnton</h3>
        </header>
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

// Get acces to addUser action
function matchDispatchToProps(dispatch) {
  return bindActionCreators({action}, dispatch)
}

// Connect store and actions to the class Header
export default connect(mapStateToProps, matchDispatchToProps)(Header)
