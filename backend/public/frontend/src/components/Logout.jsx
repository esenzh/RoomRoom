import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { CleanReduxAC } from "../redux/type";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = { isRedirect: false };
  }

  componentDidMount = async () => {
    const response = await fetch("/api/logout", {
      headers: { "Content-Type": "application/json" }
    });
    const result = await response.json();
    if (result.response === "success") {
      await this.props.cookies.remove("isLogin");
      this.props.cleanStore();
      this.setState({
        isRedirect: true
      });
    }
  };

  render() {
    if (this.state.isRedirect) {
      return <Redirect to={'/login'} />
    }
    return <div></div>;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    cleanStore: () => {
      dispatch(CleanReduxAC());
    }
  };
}

export default withCookies(connect(null, mapDispatchToProps)(Logout));
