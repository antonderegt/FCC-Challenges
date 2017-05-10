import * as types from './mutation-types'

export const mutations = {
  [types.GET_USER] (state, count_payload) {
    state.user = count_payload
  },
  [types.SIGN_OUT] (state) {
    state.user = {}
  },
  [types.GET_BARS] (state, bars_payload) {
    state.bars = bars_payload
  },
  [types.GOING_USERS] (state, going_users_payload) {
    state.goingUsers = going_users_payload
  },
  [types.SAVE_LOCATION] (state, location_payload) {
    state.location = location_payload[0].location
  }
}
