import React, { Profiler } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

import Navbar from "./components/Navbar";
import Component1 from "./components/Component1";
import Component2 from "./components/Component2";

import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import WrappedDynamicRule from "./components/WrappedDynamicRule";
import Logout from "./components/Logout";
import DashBoard from "./components/DashBoard";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const isLogin = this.props.cookies.get("isLogin");
    return (
      <Router>
        <div>
          {this.props.isLogin || isLogin ? <Navbar /> : ""}
          <Switch>
            <Route exact path={"/"} component={DashBoard} />
            <Route exact path={"/anketa"} component={WrappedDynamicRule} />
            <Route exact path={"/component2"} component={Component2} />
            <Route path={"/profile"} component={Profile} />
            <Route exact path={"/login"} component={Login} />
            <Route exact path={"/signup"} component={Signup} />
            <Route exact path={"/logout"} component={Logout} />
          </Switch>
        </div>
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
