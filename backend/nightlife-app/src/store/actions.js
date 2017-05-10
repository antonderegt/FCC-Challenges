import * as types from './mutation-types'
import axios from 'axios'

export const getUser = ({commit}) => {
  axios.get('/isauth')
  .then( response => {
    commit(types.GET_USER, response.data)
  })
  .catch( error => {
    console.log(error)
  })
}

export const signOut = ({commit}) => {
  commit(types.SIGN_OUT)
}

export const getBars = ({commit}, location) => {
  axios.post(`/api/yelp`, { location })
  .then( response => {
    commit(types.GET_BARS, response.data.result)
  })
  .catch( error => {
    console.log(error)
  })
}

export const getGoingUsers = ({commit}) => {
  axios.get(`/api/yelp/goingusers`)
  .then( response => {
    commit(types.GOING_USERS, response.data.result)
  })
  .catch( error => {
    console.log(error)
  })
}

export const userIsGoing = ({commit}, { idBar, idUser }) => {
  axios.post(`/api/yelp/goingusers`, { idBar, idUser })
  .then( response => {
    commit(types.GOING_USERS, response.data.result)
  })
  .catch( error => {
    console.log(error)
  })
}

export const userIsBackingOut = ({commit}, { idBar, idUser }) => {
  axios.post(`/api/yelp/userbackingout`, { idBar, idUser})
  .then( response => {
    commit(types.GOING_USERS, response.data.result)
  })
  .catch( error => {
    console.log(error)
  })
}

export const saveLocation = ({commit}, location) => {
  axios.post(`/api/yelp/location`, { location })
  .then( response => {
    commit(types.SAVE_LOCATION, response.data.result)
  })
  .catch( error => {
    console.log(error)
  })
}

export const getLocation = ({commit}, location) => {
  axios.get(`/api/yelp/location`)
  .then( response => {
    commit(types.SAVE_LOCATION, response.data.result)
  })
  .catch( error => {
    console.log(error)
  })
}
