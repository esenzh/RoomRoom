import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";


import Navigation from './Navigation/Nav'
import Component1 from './Component1'
import Component2 from './Component2'
import Component3 from './Component3'
import Component4 from './Component4'

class App  extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      text: 'Component 2',
    }
  }
  render(){
    return(
        <Router>
          <div className="App">
            <header className="App-header">
              <div><h1>Roomroom</h1></div>
            </header>

            <Route component={Navigation}  />
            <Switch>
              <Route exact path={"/component1"} component={Component1}/>
              <Route exact path={"/component2"} component={Component2} />
              <Route exact path={"/component3"} component={Component3} />
              <Route path={"/component4"} component={Component4} />

              <Route render={(props) =>{
                return (
                    <div>
                      ERROR!!!!!!!!!!
                    </div>
                );
              }} />
            </Switch>

          </div>
        </Router>
    )
  }

}

export default App;

// require('test-pages')