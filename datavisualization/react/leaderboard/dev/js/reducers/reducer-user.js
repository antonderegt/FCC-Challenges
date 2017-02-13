import { SHOW_RECENT, SHOW_ALLTIME, LOAD_USERS } from '../actions/actions'

const userReducer = (state = {
  usersRecent: [],
  usersAlltime: [],
  loaded: false
}, action) => {
  switch (action.type) {
    case SHOW_RECENT:
      return state
      break;
    case SHOW_ALLTIME:
      return state
      break;
    case LOAD_USERS:
      return Object.assign({}, state, {
        usersRecent: action.usersRecent,
        usersAlltime: action.usersAlltime,
        loaded: true
      })
      break;
    default:
      return state
  }
}

export default userReducer
