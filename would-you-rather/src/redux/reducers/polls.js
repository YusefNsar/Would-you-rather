import { RECEIVE_POLLS, ADD_POLL, ANSWER_POLL } from "../actions/polls";

export default function polls(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POLLS:
      const { polls } = action;
      return {
        ...state,
        ...polls,
      };
    case ADD_POLL:
      const { poll } = action;
      return {
        ...state,
        [poll.id]: {
          ...poll,
        },
      };
    case ANSWER_POLL:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          [action.option]: {
            ...state[action.id][action.option],
            votes: state[action.id][action.option].votes.concat([
              action.authUser,
            ]),
          },
        },
      };
    default:
      return state;
  }
}
