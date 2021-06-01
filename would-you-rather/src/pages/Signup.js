import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleAddUser } from "../redux/actions/users";
import { Link, useHistory } from "react-router-dom";

const Signup = ({ authUser, users, dispatch }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (authUser !== "") {
      alert("You are already logged in");
      history.push("/");
    }
  }, [authUser, history]);

  const handleSubmit = (e) => {
    if (username !== "" && password !== "") {
      e.preventDefault();
      
      const newUser = {
        name: username,
        id: username.toLowerCase().replace(" ", ""),
        avatarURL: "no-img.jpeg",
        answers: {},
        questions: [],
        password: password,
      };

      if(!Object.keys(users).find(uid => uid === newUser.id)) {
        dispatch(handleAddUser(newUser));
        history.push("/");
      } else {
        alert("username already exists")
      }

      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="login-page">
      <h2 className="heading">Would you rather ?</h2>
      <h3 className="main-header">sign up</h3>
      <form className="login-form">
        <input
          className="username-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="username-input"
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="button login-btn"
          type="submit"
          onClick={handleSubmit}
          value="sign up"
        />
      </form>
      <p className="signup-message">
        already hava an account, <Link to="/login">Log in...</Link>
      </p>
    </div>
  );
};

Signup.propTypes = {
  authUser: PropTypes.string.isRequired,
  users: PropTypes.object.isRequired,
};

const mapStateToProps = ({ authUser, users }) => ({
  authUser,
  users,
});

export default connect(mapStateToProps)(Signup);
