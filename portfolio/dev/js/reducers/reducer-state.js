import { CONSTANT } from '../actions/actions'

const reducerState = (state = {}, action) => {
  switch (action.type) {
    case CONSTANT:
      return state
      break;
    default:
      return state
  }
}

export default reducerState
