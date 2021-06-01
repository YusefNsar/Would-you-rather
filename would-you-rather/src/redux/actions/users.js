import { _saveNewUser } from '../../utils/_DATA'
import { setAuthUser } from './authUser'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_USERS = "RECEIVE_USERS"
export const ADD_USER = "ADD_USER"

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function addUser(user) {
  return {
    type: ADD_USER,
    user,
  }
}

export function handleAddUser(newUser) {
  return (dispatch) => {
    dispatch(showLoading())
    _saveNewUser(newUser).then(() => {
      dispatch(addUser(newUser))
      dispatch(setAuthUser(newUser.id))
      dispatch(hideLoading())
    })
  }
}