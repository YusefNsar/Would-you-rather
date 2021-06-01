import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../styles/components/poll.scss";
import { Link } from "react-router-dom";

const Poll = ({ id, optionOne, optionTwo, name, avatar, isAnswered }) => {
  return (
    <div className="poll-container">
      <div className="upper-grid">
        <div className="upper-message">Hey, Would you rather ?</div>
      </div>
      <div className="middle-grid">
        <span className="message">{optionOne}</span>
        <img
          className="avatar"
          src={process.env.PUBLIC_URL + "/images/" + avatar}
          alt="user avatar"
        />
        <span className="message">{"or " + optionTwo}</span>
      </div>
      <div className="lower-grid">
        <div className="username">{name}</div>
        <Link to={`/questions/${id}`}>
          <button
            className="button"
            style={isAnswered ? { backgroundColor: "green" } : {}}
          >
            {isAnswered ? "View Poll" : "Answer Poll"}
          </button>
        </Link>
      </div>
    </div>
  );
};

Poll.propTypes = {
  id: PropTypes.string.isRequired,
  optionOne: PropTypes.string.isRequired,
  optionTwo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const mapStateToProps = ({ users, polls }, { id }) => {
  const poll = polls[id];
  const user = users[poll.author];

  return {
    id,
    optionOne: poll.optionOne.text,
    optionTwo: poll.optionTwo.text,
    name: user ? user.name.split(" ")[0] : "",
    avatar: user ? user.avatarURL : "",
  };
};

export default connect(mapStateToProps)(Poll);
