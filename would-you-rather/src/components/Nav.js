import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/authUser";
import "../styles/components/nav.scss";
import {
  AiOutlineHome,
  AiOutlinePlusSquare,
  AiOutlineCrown,
  AiOutlineLogin,
  AiOutlineLogout,
} from "react-icons/ai";

const Nav = ({ logedUser, dispatch }) => {
  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="navbar">
      <div className="upper-section">
        <Link to="/">
          <AiOutlineHome title="Home" className="nav-icons" />
        </Link>
        <Link to="/add">
          <AiOutlinePlusSquare title="Add Poll" className="nav-icons" />
        </Link>
        <Link to="/leaderboard">
          <AiOutlineCrown title="Leaderboard" className="nav-icons" />
        </Link>
        {logedUser ? (
          <Link to="/">
            <AiOutlineLogout title="Log out" className="nav-icons" onClick={logout} />
          </Link>
        ) : (
          <Link to="/login">
            <AiOutlineLogin title="Log in" className="nav-icons" />
          </Link>
        )}
      </div>
      {logedUser && (
      <div className="lower-section">
        <img src={process.env.PUBLIC_URL + "/images/" + logedUser.avatarURL} className="nav-avatar" alt="user-avatar" />
        <p className="welcome-user">Hello, {logedUser.name.split(' ')[0]}</p>
        {/* <p>{logedUser.name.split(' ')[0]}</p> */}
      </div>
      )}
    </div>
  );
};

Nav.propTypes = {
  logedUser: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authUser, users }) => {
  const logedUser = Object.keys(users).find((uid) => uid === authUser);

  return {
    logedUser: users[logedUser],
  };
};

export default connect(mapStateToProps)(Nav);
