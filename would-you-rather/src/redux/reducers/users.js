import { RECEIVE_USERS, ADD_USER } from '../actions/users'
import { ADD_POLL, ANSWER_POLL } from '../actions/polls'

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      const { users } = action
      return {
        ...state,
        ...users
      }
    case ADD_POLL:
      const { poll } = action
      return {
        ...state,
        [poll.author]: {
          ...state[poll.author],
          questions: state[poll.author].questions.concat([poll.id])
        }
      }
    case ANSWER_POLL:
      return {
        ...state,
        [action.authUser]: {
          ...state[action.authUser],
          answers: {
            ...state[action.authUser].answers,
            [action.id]: [action.option]
          }
        }
      }
    case ADD_USER:
      return {
        ...state,
        [action.user.id]: {
          ...action.user
        }
      }
    default:
      return state;
  }
}