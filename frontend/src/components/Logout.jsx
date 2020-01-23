import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { Redirect } from "react-router-dom";

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
      this.setState({
          isRedirect: true
      });
    } else {
        console.log('Failed')
    }
  };
  
  render() {
      if(this.state.isRedirect) {
          return <Redirect to={'/login'}/>
      }
    return <div></div>;
  }
}

export default withCookies(Logout);
