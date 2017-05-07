import * as types from './mutation-types'

export const mutations = {
  [types.GET_USER] (state, user_payload) {
    state.user = user_payload
  },
  [types.FETCH_ALL_POLLS] (state, polls_payload) {
    state.polls = polls_payload
  },
  [types.FETCH_MY_POLLS] (state, polls_payload) {
    state.mypolls = polls_payload
  },
  [types.FETCH_POLL_BY_ID] (state, poll_payload) {
    state.poll = poll_payload
  },
  [types.VOTE] (state, vote_payload) {
    state.poll = vote_payload
  },
  [types.ADD_OPTION] (state, poll_payload) {
    state.poll = poll_payload
  },
  [types.ADD_POLL] (state, poll_payload) {
    state.poll = {}
  },
  [types.REMOVE_POLL] (state, poll_payload) {
    state.poll = {}
  },
  [types.SIGN_OUT] (state) {
    state.user = {}
  }
}
