import React, { Component } from "react";
import "materialize-loader";
import Login from "./pages/Login";
import Chat from "./components/Chat";
import { observer } from "mobx-react";
import appStore from "./Store";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import NewGroup from "./components/NewGroup";
import Profile from "./pages/Profile";
import LeaveGroup from "./components/LeaveGroup";
import JoinGroup from "./components/JoinGroup";

@observer
class App extends Component {
  render() {
    const { store } = this.props;
    return (
      <Router>
        <Route exact path='/' render={props => <Login store={appStore} />} />
        <Route
          exact
          path='/chat/:gId'
          render={props => <Chat {...props} store={appStore} />}
        />

        <Route
          exact
          path='/profile'
          render={props => <Profile {...props} store={appStore} />}
        />
        <Route
          exact
          path='/group'
          render={props => <NewGroup {...props} store={appStore} />}
        />

        <Route exact path='/test' component={LeaveGroup} />
        <Route
          exact
          path='/join-group'
          render={props => <JoinGroup {...props} store={appStore} />}
        />
      </Router>
    );
  }
}

export default App;
