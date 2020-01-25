import React, {Profiler} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Navigation from "./components/Nav";
import Component1 from "./components/Component1";
import Component2 from "./components/Component2";
import Component3 from "./components/Component3";
import Component4 from "./components/Component4";
import Profile from "./components/Profile";
import Login from './components/Login';
import Signup from './components/Signup';
import WrappedDynamicRule from "./components/WrappedDynamicRule";
import Logout from './components/Logout';
import DashBoard from "./components/DashBoard";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Component 2"
    };
  }
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <div>
              <h1>Roomroom</h1>
            </div>
          </header>
          <DashBoard/>
           <WrappedDynamicRule/>
          <Route component={Navigation} />
          <Switch>
            <Route exact path={"/component1"} component={Component1} />
            <Route exact path={"/component2"} component={Component2} />
            <Route exact path={"/component3"} component={Component3} />
            <Route path={"/component4"} component={Component4} />
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

export default App;
