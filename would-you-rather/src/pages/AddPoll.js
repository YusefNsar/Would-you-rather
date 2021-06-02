import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../styles/pages/addpoll.scss";
import { handleAddPoll } from "../redux/actions/polls";
import { useHistory } from "react-router-dom";
import Login from './Login'

const AddPoll = ({ authUser, dispatch }) => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [showLog, setShowLog] = useState(false)
  const history = useHistory()

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
    if (text1 !== "" && text2 !== "") {
      dispatch(
        handleAddPoll({
          optionOneText: text1,
          optionTwoText: text2,
          author: authUser,
        })
      );
      history.push("/");
    } else {
      alert("Please enter the two options");
      setText1("");
      setText2("");
    }
  };

  return (
    <div>
      <h2 className="heading">Would you rather ?</h2>
      <form>
        <div className="option-inputs">
          <span className="options">
            <input
              type="text"
              value={text1}
              placeholder="Option 1"
              onChange={(e) => setText1(e.target.value)}
            />
          </span>
          <p className="or">OR</p>
          <span className="options">
            <input
              type="text"
              value={text2}
              placeholder="Option 2"
              onChange={(e) => setText2(e.target.value)}
            />
          </span>
        </div>
        <button type="submit" className="add-btn button" onClick={handleSubmit}>
          Add this Poll
        </button>
      </form>
    </div>
  );
};

AddPoll.propTypes = {
  authUser: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({ authUser }) => ({
  authUser,
});

export default connect(mapStateToProps)(AddPoll);
