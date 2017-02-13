import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { showRecent, showAlltime, fetchUsersRecent } from '../actions/actions'
import Request from 'superagent'
const ALLTIME = 'ALLTIME'
const RECENT = 'RECENT'

class ShowUsers extends Component {
  constructor(){
    super()
    this.state = {
      display: RECENT
    }
  }
  componentWillMount() {
    this.props.fetchUsersRecent()
  }
  render() {
    const display = this.state.display
    const clickHandlerAlltime = () => {
      this.setState({
        display: ALLTIME
      })
      this.props.showAlltime()
    }
    const clickHandlerRecent = () => {
      this.setState({
        display: RECENT
      })
      this.props.showRecent()
    }
    return (
      <div>
      <h1>Leaderboard</h1>
      <table>
        <tbody>
        <tr>
          <th>#</th>
          <th>Camper Name</th>
          <th onClick={clickHandlerRecent}>Recent points</th>
          <th onClick={clickHandlerAlltime}>Alltime points</th>
        </tr>
        { this.props.loaded ? (display === RECENT ? (
            this.props.usersRecent.map((user, i) =>
              <tr key={user.username}>
                <td>{i+1}</td>
                  <td><a href={`https://www.freecodecamp.com/${user.username}`} target="_blank" rel="noopener">
                    <img src={user.img} alt={user.username}/> {user.username}</a></td>
                <td className="center">{user.recent}</td>
                <td className="center">{user.alltime}</td>
              </tr>
            )
          ) : (
            this.props.usersAlltime.map((user, i) =>
              <tr key={user.username}>
                <td>{i+1}</td>
                <td><a href={`https://www.freecodecamp.com/${user.username}`} target="_blank" rel="noopener">
                  <img src={user.img} alt={user.username}/> {user.username}</a></td>
                <td className="center">{user.recent}</td>
                <td className="center">{user.alltime}</td>
              </tr>
            )
          )
        ) : <tr><td>Loading...</td></tr>
        }
        </tbody>
      </table>
      </div>
    )
  }
}

// Get acces to the store
function mapStateToProps(state) {
  return {
    usersRecent: state.users.usersRecent,
    usersAlltime: state.users.usersAlltime,
    loaded: state.users.loaded
  }
}

// Get acces to addUser action
function matchDispatchToProps(dispatch) {
  return bindActionCreators({showRecent, showAlltime, fetchUsersRecent}, dispatch)
}

// Connect store and actions to the class UserAdd
export default connect(mapStateToProps, matchDispatchToProps)(ShowUsers)
