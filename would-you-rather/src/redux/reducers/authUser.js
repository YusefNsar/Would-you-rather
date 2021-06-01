import { SET_AUTHED_USER, LOGOUT_USER } from '../actions/authUser'

const authUser = (state = "", action) => {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.id
    case LOGOUT_USER:
      return ""
    default:
      return state
  }
}

export default authUser;