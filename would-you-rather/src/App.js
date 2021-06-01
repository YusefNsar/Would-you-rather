import React, { useEffect } from "react";
import "./App.scss";
import { connect } from "react-redux";
import { handleRecevieData } from "./redux/actions/shared";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddPoll from "./pages/AddPoll";
import Nav from "./components/Nav";
import LoadingBar from 'react-redux-loading'
import PollPage from "./pages/PollPage";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App({ users, polls, dispatch }) {
  useEffect(() => {
    dispatch(handleRecevieData());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <LoadingBar style={{ zIndex: 2000}}/>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path='/add' component={AddPoll}/>
          <Route path='/questions/:id' component={PollPage} />
          <Route path='/leaderboard' component={Leaderboard} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="*">
            <p className="no-results">ERROR 404: didn't found that URL</p>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default connect()(App);
