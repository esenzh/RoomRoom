import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { AddIsLogin } from "../redux/type";

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
      this.props.cookies.remove("isLogin");
      this.props.addIsLogin(false)
      this.setState({
          isRedirect: true
      });
    }
  };
  
  render() {
      if(this.state.isRedirect) {
          return <Redirect to={'/login'}/>
      }
    return <div></div>;
  }
}

function mapDispatchToProps(dispatch) {
  return {
      addIsLogin: (toogle) => {
          dispatch(AddIsLogin(toogle));
      }
  };
}

export default withCookies(connect(null, mapDispatchToProps)(Logout));
