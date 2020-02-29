import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import WrappedDynamicRule from "./components/WrappedDynamicRule";
import Logout from "./components/Logout";
import DashBoard from "./components/DashBoard";
import EditProfile from "./components/EditProfile";
import Landing from "./components/Landing";
import Register_where_owner from "./components/user_owner/register_where/Register_where";
import Register_who_owner from "./components/user_owner/register_who/Register_who";
import Register_you_owner from "./components/user_owner/register_you/Register_you";
import Register_where_noowner from "./components/user_no_owner/registerNoOwnerWhere/RegisterWhereNoOwner";
import Register_who_noowner from "./components/user_no_owner/registerNoOwnerWho/RegisterWhoNoOwner";
import Register_you_noowner from "./components/user_no_owner/registerNoOwnerYou/RegisterYouNoOwner";


class App extends React.Component {
  render() {
    const isLogin = this.props.cookies.get("isLogin");
    return (
        <Router>
          {this.props.isLogin || isLogin ? <Navbar /> : ""}
          <Switch>
            <Route exact path={"/"} component={DashBoard} />
            <Route exact path={"/landing"} component={Landing} />
            <Route exact path={"/anketa"} component={WrappedDynamicRule} />
            <Route exact path={"/profile"} component={Profile} />
            <Route path={"/profile/edit"} component={EditProfile} />
            <Route exact path={"/signup/where_owner"} component={Register_where_owner} />
            <Route exact path={"/signup/who_owner"} component={Register_who_owner} />
            <Route exact path={"/signup/you_owner"} component={Register_you_owner} />
            <Route exact path={"/signup/where"} component={Register_where_noowner} />
            <Route exact path={"/signup/who"} component={Register_who_noowner} />
            <Route exact path={"/signup/you"} component={Register_you_noowner} />
            <Route exact path={"/login"} component={Login} />
            <Route exact path={"/signup"} component={Signup} />
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
