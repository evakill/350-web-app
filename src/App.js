
import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Home from './pages/Home.js'
import LandingPage from './containers/Home.js'
import Messenger from './pages/Messenger.js'
import EditQuestions from './pages/EditQuestions.js'
import Login from './containers/Login.js'
import Signup from './containers/Signup.js'
import Logout from './containers/Logout.js'

//https://reacttraining.com/react-router/web/guides/basic-components

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route path="/messenger/" component={Messenger} />
        <Route path="/edit/" component={EditQuestions} />
        <Route path="/login/" component={Login} />
        <Route path="/signup/" component={Signup} />
        <Route path="/logout/" component={Logout} />
        {/* when none of the above match, <NoMatch> will be rendered */}
        <Route component={Home} />
      </Switch>
    );
  }
}

export default App;
