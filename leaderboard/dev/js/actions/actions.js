import Request from 'superagent'
const urlRecent = "https://fcctop100.herokuapp.com/api/fccusers/top/recent"
const urlAlltime = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime"
export const SHOW_RECENT = 'SHOW_RECENT'
export const SHOW_ALLTIME = 'SHOW_ALLTIME'
export const LOAD_USERS = 'LOAD_USERS'

export const showRecent = () => {
  return {
    type: SHOW_RECENT
  }
}
export const showAlltime = () => {
  return {
    type: SHOW_ALLTIME
  }
}
const loadUsers = (usersR, usersA) => {
  return {
    type: LOAD_USERS,
    usersRecent: usersR,
    usersAlltime: usersA
  }
}
export const fetchUsersRecent = () => dispatch => {
  return Request.get(urlRecent)
    .then((responseR) => dispatch(fetchUsersAlltime(responseR.body)))
}
const fetchUsersAlltime = responseRecent => dispatch => {
  return Request.get(urlAlltime)
    .then((responseAlltime) => dispatch(loadUsers(responseRecent, responseAlltime.body)))
}
