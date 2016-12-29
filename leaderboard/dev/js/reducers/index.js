import { combineReducers } from 'redux'
import reducerUser from './reducer-user'

const allReducers = combineReducers({
  users: reducerUser
})

export default allReducers
