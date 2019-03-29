import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Home from './Home.js'
import Messanger from './Messanger.js'
import Report from './Report.js'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/messanger/" component={Messanger} />
        <Route path="/report/" component={Report} />
        {/* when none of the above match, <NoMatch> will be rendered */}
        <Route component={Home} />
      </Switch>
    );
  }
}

export default App;
