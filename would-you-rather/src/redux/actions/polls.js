import { _saveQuestion, _saveQuestionAnswer } from "../../utils/_DATA";
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_POLLS = "RECEIVE_POLLS";
export const ADD_POLL = "ADD_POLL";
export const ANSWER_POLL = "ANSWER_POLL";

export function receivePolls(polls) {
  return {
    type: RECEIVE_POLLS,
    polls,
  };
}

export function addPoll(poll) {
  return {
    type: ADD_POLL,
    poll,
  };
}

export function answerPoll(authUser, id, option) {
  return {
    type: ANSWER_POLL,
    id,
    option,
    authUser,
  };
}

export function handleAddPoll(poll) {
  return (dispatch) => {
    dispatch(showLoading());
    _saveQuestion(poll).then((poll) => {
      dispatch(addPoll(poll));
      dispatch(hideLoading());
    });
  };
}

export function handleAnswerPoll({ authUser, qID, answer }) {
  return (dispatch) => {
    dispatch(showLoading());
    _saveQuestionAnswer({ authedUser: authUser, qid: qID, answer }).then(() => {
      dispatch(answerPoll(authUser, qID, answer));
      dispatch(hideLoading());
    });
  };
}
