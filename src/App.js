
import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Home from './pages/Home.js'
import LandingPage from './containers/Home.js'
import Messenger from './pages/Messenger.js'
import Report from './pages/Report.js'
import EditQuestions from './pages/EditQuestions.js'
import Messages from './pages/Messages.js'
import Reports from './pages/Reports.js'
import Login from './containers/Login.js'
import Signup from './containers/Signup.js'
import Signup2 from './containers/Signup2.js'


//https://reacttraining.com/react-router/web/guides/basic-components

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route path="/messenger/" component={Messenger} />
        <Route path="/report/" component={Report} />
        <Route path="/reports/" component={Reports} />
        <Route path="/messages/" component={Messages} />
        <Route path="/edit/" component={EditQuestions} />
        <Route path="/login/" component={Login} />
        <Route path="/signup/" component={Signup} />
        <Route path="/signup2/" component={Signup2} />
        {/* when none of the above match, <NoMatch> will be rendered */}
        <Route component={Home} />
      </Switch>
    );
  }
}

export default App;

