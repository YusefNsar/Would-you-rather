import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleAnswerPoll } from "../redux/actions/polls";
import "../styles/pages/pollpage.scss";
import Login from './Login'

const PollPage = ({
  isAnswered,
  poll,
  authUser,
  authorName,
  avatar,
  dispatch,
  votes1,
  votes2,
  percentage1,
  percentage2,
}) => {
  const [option, setOption] = useState(isAnswered);
  const [showLog, setShowLog] = useState(false)

  useEffect(() => {
    if(authUser === "") {
      setShowLog(true)
    } else {
      setShowLog(false)
    }
  }, [authUser])

  if(showLog) {
    return <Login toHomePage={false} showPage={() => setShowLog(false)}/>
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let answer = option === 1 ? "optionOne" : "optionTwo";
    dispatch(handleAnswerPoll({ authUser, qID: poll.id, answer }));
    isAnswered = option;
  };

  if (!poll) {
    return <p className="no-results">ERROR 404: didn't found that poll</p>
  }

  const Options =
    isAnswered !== 0 ? (
      <div className="options-container-ans">
        <div className={`options ans ${option === 1 ? "chosen" : ""}`}>
          {poll && poll.optionOne.text}
          <div className="progress-container">
            <progress className="progress" max="100" value={percentage1} />
            {percentage1 + "%"}
          </div>
          <p>votes: {votes1}</p>
        </div>
        <div className={`options ans ${option === 2 ? "chosen" : ""}`}>
          {poll && poll.optionTwo.text}
          <div className="progress-container">
            <progress className="progress" max="100" value={percentage2} />
            {percentage2 + "%"}
          </div>
          <p>votes: {votes2}</p>
        </div>
      </div>
    ) : (
      <div className="options-container">
        <div
          className={`button options ${option === 1 ? "chosen" : ""}`}
          onClick={() => setOption(1)}
        >
          {poll && poll.optionOne.text}
        </div>
        <p className="or">or</p>
        <div
          className={`button options ${option === 2 ? "chosen" : ""}`}
          onClick={() => setOption(2)}
        >
          {poll && poll.optionTwo.text}
        </div>
      </div>
    );

  return (
    <div>
      <h2 className="page-headings main-header">Poll Page</h2>
      <h3 className="page-headings sub-header">A poll from {authorName}</h3>
      <img
        className="auther-avatar"
        src={process.env.PUBLIC_URL + "/images/" + avatar}
        alt="authorAvatar"
      />
      <form>
        <h3 className="page-headings poll-header">Would you rather ?</h3>
        {Options}
        {isAnswered === 0 && (
          <button
            disabled={option === 0}
            className="answer-poll-btn button"
            onClick={handleSubmit}
          >
            {option === 0
              ? "choose option"
              : option === 1
              ? "I rather option 1"
              : "I rather option 2"}
          </button>
        )}
      </form>
    </div>
  );
};

PollPage.propTypes = {
  isAnswered: PropTypes.number.isRequired,
  poll: PropTypes.object,
  authUser: PropTypes.string.isRequired,
  authorName: PropTypes.string,
  avatar: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  votes1: PropTypes.number,
  votes2: PropTypes.number,
  percentage1: PropTypes.number,
  percentage2: PropTypes.number,
};

const mapStateToProps = ({ polls, authUser, users }, { match }) => {
  const poll = polls[match.params.id];
  const author = poll && users[poll.author];
  const authorName = author && author.name;
  const avatar = author && author.avatarURL;

  let isAnswered = 0;
  if (poll) {
    if (poll.optionOne.votes.includes(authUser)) {
      isAnswered = 1;
    } else if (poll.optionTwo.votes.includes(authUser)) {
      isAnswered = 2;
    }
  }

  let votes1, votes2;
  let percentage1, percentage2;

  if (isAnswered !== 0) {
    votes1 = poll.optionOne.votes.length;
    votes2 = poll.optionTwo.votes.length;
    let totalVotes = votes1 + votes2;
    percentage1 = (votes1 / totalVotes) * 100;
    percentage1 = Math.round((percentage1 + Number.EPSILON) * 100) / 100;
    percentage2 = (votes2 / totalVotes) * 100;
    percentage2 = Math.round((percentage2 + Number.EPSILON) * 100) / 100;
  }

  return {
    poll,
    authUser,
    authorName,
    avatar,
    isAnswered,
    votes1,
    votes2,
    percentage1,
    percentage2,
  };
};

export default connect(mapStateToProps)(PollPage);
