import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Home from './pages/Home.js'
// import Report from './pages/Report.js'
import Messenger from './pages/Messenger.js'
import EditQuestions from './pages/EditQuestions.js'
import Messages from './pages/Messages.js'
import Reports from './pages/Reports.js'
import MessageView from './components/MessageView.js'

//https://reacttraining.com/react-router/web/guides/basic-components

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/messageview/" component={MessageView} />
        {/* <Route path="/report/" component={Report} /> */}
        <Route path="/messenger" component={MessageView} />
        <Route path="/reports/" component={Reports} />
        <Route path="/messages/" component={Messages} />
        <Route path="/edit/" component={EditQuestions} />
        {/* when none of the above match, <NoMatch> will be rendered */}
        <Route component={Home} />
      </Switch>
    );
  }
}

export default App;
