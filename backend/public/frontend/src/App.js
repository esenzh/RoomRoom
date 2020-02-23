import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SignupAll from "./components/SignupAll";

import WrappedDynamicRule from "./components/WrappedDynamicRule";
import Logout from "./components/Logout";
import DashBoard from "./components/DashBoard";
import EditProfile from "./components/EditProfile";

class App extends React.Component {
  render() {
    const isLogin = this.props.cookies.get("isLogin");
    return (
        <Router>
          {this.props.isLogin || isLogin ? <Navbar /> : ""}
          <Switch>
            <Route exact path={"/"} component={DashBoard} />
            <Route exact path={"/anketa"} component={WrappedDynamicRule} />
            <Route exact path={"/profile"} component={Profile} />
            <Route path={"/profile/edit"} component={EditProfile} />
            <Route exact path={"/login"} component={Login} />
            <Route exact path={"/signup"} component={SignupAll} />
            <Route exact path={"/signupAll"} component={SignupAll} />
            <Route exact path={"/logout"} component={Logout} />
          </Switch>
        </Router>
    );
  }
}

function mapStateToProps(store) {
  return {
    isLogin: store.isLogin
  };
}

export default withCookies(connect(mapStateToProps)(App));
