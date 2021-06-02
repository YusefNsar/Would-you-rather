import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAuthUser } from "../redux/actions/authUser";
import { Link, useHistory } from "react-router-dom";
import "../styles/pages/login.scss";

const Login = ({ authUser, users, dispatch, showPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (authUser !== "" && !showPage) {
      alert("You are already logged in");
      history.push("/");
    }
  }, [authUser, history, showPage]);

  const handleSubmit = (e) => {
    if (username !== "" && password !== "") {
      e.preventDefault();
      const userId = Object.keys(users).find(
        (uId) => users[uId].name.toLowerCase() === username.toLowerCase()
      );
      if (!userId) {
        alert("wrong usename");
      } else {
        if (users[userId].password === password) {
          dispatch(setAuthUser(userId));
          if(!showPage) {
            history.push("/");
          } else {
            showPage();
          }
        } else {
          alert("wrong password");
        }
      }
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="login-page">
      <h2 className="heading">Would you rather ?</h2>
      <h3 className="main-header">{showPage ? "You should log in first" : "Log in"}</h3>
      <form className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="username-input"
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="username-input"
        />
        <input
          className="button login-btn"
          type="submit"
          onClick={handleSubmit}
          value="Log in"
        />
      </form>
      <p className="signup-message">
        don't have an account, <Link to="/signup">sign up...</Link>
      </p>
    </div>
  );
};

Login.propTypes = {
  authUser: PropTypes.string.isRequired,
  users: PropTypes.object.isRequired,
};

const mapStateToProps = ({ authUser, users }) => ({
  authUser,
  users,
});

export default connect(mapStateToProps)(Login);
