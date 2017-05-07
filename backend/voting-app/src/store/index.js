import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

const state = {
  user: {},
  polls: [
    {name: 'No Polls Yet...', votes: 0}
  ],
  mypolls: {
    result: [
      {name: 'No Polls Yet...', votes: 0}
    ]
  },
  poll: {
    result: {
      name: 'No poll selected'
    }
  },
  counts: {
    count: -1
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
