import { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Poll from "../components/Poll";
import "../styles/pages/home.scss";

const Home = ({ answeredPolls, unansweredPolls, authUser }) => {
  const [showAns, setShowAns] = useState(false);

  const pollList =
    showAns && answeredPolls.length === 0 ? (
      <p className="no-results">No current answered polls{authUser === "" && ", log in first"}</p>
    ) : !showAns && unansweredPolls.length === 0 ? (
      <p className="no-results">No current answered polls</p>
    ) : (
      (showAns ? answeredPolls : unansweredPolls).map((pollID) => (
        <li key={pollID}>
          <Poll id={pollID} isAnswered={showAns} />
        </li>
      ))
    );

  return (
    <div className="home">
      <ul>
        {pollList}
      </ul>
      <button
        className={`button toggle-answered ${showAns ? "answered" : ""}`}
        onClick={() => setShowAns((ans) => !ans)}
      >
        {showAns ? "Answered" : "Unanswered"}
      </button>
    </div>
  );
};

Home.propTypes = {
  answeredPolls: PropTypes.array.isRequired,
  unansweredPolls: PropTypes.array.isRequired,
  authUser: PropTypes.string.isRequired
};

const mapStateToProps = ({ polls, authUser }) => {
  const pollsIDs = Object.keys(polls);
  const answeredPolls = [];
  const unansweredPolls = [];
  if (pollsIDs.length !== 0) {
    pollsIDs.forEach((pollID) => {
      if (
        polls[pollID].optionOne.votes.includes(authUser) ||
        polls[pollID].optionTwo.votes.includes(authUser)
      ) {
        answeredPolls.push(pollID);
      } else {
        unansweredPolls.push(pollID);
      }
    });
  }
  const sortByTime = (a, b) => polls[b].timestamp - polls[a].timestamp;
  answeredPolls.sort(sortByTime);
  unansweredPolls.sort(sortByTime);

  return {
    answeredPolls,
    unansweredPolls,
    authUser
  };
};

export default connect(mapStateToProps)(Home);
