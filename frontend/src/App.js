import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Navigation from "./components/Navbar";
import Component1 from "./components/Component1";
import Component2 from "./components/Component2";
import Component3 from "./components/Component3";
import Component4 from "./components/Component4";
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
    return (
      <Router>
        <div>
          {/* TODO: use logical operator for navbar */}
          {/*<DashBoard/>*/}
          {/* <WrappedDynamicRule/> */}
          <Route component={Navigation} />
          <Switch>
            <Route exact path={"/home"} component={DashBoard} />
            <Route exact path={"/anketa"} component={WrappedDynamicRule} />
            <Route exact path={"/component2"} component={Component2} />
            <Route exact path={"/component3"} component={Component3} />
            <Route path={"/component4"} component={Component4} />
            <Route exact path={"/login"} component={Login} />
            <Route exact path={"/signup"} component={Signup} />
            <Route exact path={"/logout"} component={Logout} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
