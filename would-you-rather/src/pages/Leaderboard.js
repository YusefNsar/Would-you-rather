import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../styles/pages/leaderboard.scss";
import Login from './Login'

const Leaderboard = ({ bestUsers, authUser }) => {
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

  return (
    <div className="leaderboard">
      <h2 className="heading">Leaderboard</h2>
      <ul>
        {bestUsers.map((user, index) => (
          <li key={user.id} className="leaderboard-item">
            <div className={`rank order${index + 1}`}>{index + 1}</div>
            <div className="user-info">
              <img
                className="user-image"
                src={process.env.PUBLIC_URL + "/images/" + user.avatar}
                alt="user avatar"
              />
              <p className="user-name">{user.username} {user.id === authUser ? "(you)" : ""}</p>
            </div>
            <div className="user-scores">
              <div className="pre-scores">
                <div className="asked-ps">
                  <span className="emoji">🗨️</span> {user.asked}
                </div>
                <div className="answered-ps">
                  <span className="emoji">✅</span> {user.answered}
                </div>
              </div>
              <div className="real-score">
                <span className="emoji">⭐</span> {user.score}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

Leaderboard.propTypes = {
  bestUsers: PropTypes.array.isRequired,
  authUser: PropTypes.string.isRequired,
};

const mapStateToProps = ({ authUser, users }) => {
  const bestUsers = [];
  Object.keys(users).forEach((id) => {
    const asked = Object.keys(users[id].answers).length;
    const answered = users[id].questions.length;
    bestUsers.push({
      id,
      asked,
      answered,
      score: asked + answered,
      avatar: users[id].avatarURL,
      username: users[id].name,
    });
  });
  bestUsers.sort((a, b) => b.score - a.score);

  return {
    bestUsers,
    authUser,
  };
};

export default connect(mapStateToProps)(Leaderboard);
