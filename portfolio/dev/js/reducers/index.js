import { combineReducers } from 'redux'
import reducerState from './reducer-state'

const allReducers = combineReducers({
  state: reducerState
})

export default allReducers
