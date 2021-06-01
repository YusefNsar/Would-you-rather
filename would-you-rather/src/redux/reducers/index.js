import polls from './polls'
import users from './users'
import authUser from './authUser'
import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  users,
  polls,
  authUser,
  loadingBar: loadingBarReducer,
})