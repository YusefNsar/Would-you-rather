import { _getQuestions, _getUsers } from "../../utils/_DATA";
import { receivePolls } from "./polls";
import { receiveUsers } from "./users";
import { setAuthUser } from "./authUser";
import { showLoading, hideLoading } from 'react-redux-loading'

//sarahedo - johndoe - tylermcginnis

export function handleRecevieData() {
  return async(dispatch) => {
    const auth = "tylermcginnis";
    dispatch(showLoading())
    await Promise.all([_getQuestions(), _getUsers()]).then(([polls, users]) => {
      dispatch(receivePolls(polls));
      dispatch(receiveUsers(users));
      dispatch(setAuthUser(auth));
      dispatch(hideLoading())
    });
  };
}