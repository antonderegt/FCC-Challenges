import * as types from './mutation-types'
import axios from 'axios'

export const getUser = ({commit}) => {
  axios.get(`/isauth`)
  .then( response => {
    commit(types.GET_USER, response.data)
  })
  .catch( error => {
    console.log(error)
  });
}

export const fetchAllPolls = ({commit}) => {
  axios.get(`/api/polls`)
  .then( response => {
    commit(types.FETCH_ALL_POLLS, response.data)
  })
  .catch( error => {
    console.log(error)
  })
}

export const fetchMyPolls = ({commit}, username) => {
  axios.get(`/api/polls/mypolls/${username}`)
  .then( response => {
    commit(types.FETCH_MY_POLLS, response.data)
  })
  .catch( error => {
    console.log(error)
  })
}

export const fetchPollById = (({commit}, id) => {
  axios.get(`/api/polls/${id}`)
  .then( response => {
    commit(types.FETCH_POLL_BY_ID, response.data)
  })
  .catch( error => {
    console.log(error)
  })
})

export const vote = (({commit}, updatedPoll) => {
  axios.post(`/api/polls/vote`, updatedPoll)
  .then( response => {
    commit(types.VOTE, response.data)
  })
  .catch( error => {
    console.log(error)
  })
})

export const addOption = (({commit}, newOption) => {
  axios.post(`/api/polls/addoption`, newOption)
  .then( response => {
    commit(types.ADD_OPTION, response.data)
  })
  .catch( error => {
    console.log(error)
  })
})

export const addPoll = (({commit}, newPoll) => {
  axios.post(`api/polls/addpoll`, newPoll)
  .then( response => {
    commit(types.ADD_POLL, response.data)
  })
  .catch( error => {
    console.log(error)
  })
})

export const removePoll = (({commit}, id) => {
  axios.post(`api/polls/removepoll/${id}`)
  .then( response => {
    commit(types.REMOVE_POLL, response.data)
  })
  .catch( error => {
    console.log(error)
  })
})

export const signOut = ({commit}) => {
  commit(types.SIGN_OUT)
}
