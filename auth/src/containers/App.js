import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Header from '../components/Header';
import SignIn from '../components/auth/SignIn';
import SignOut from '../components/auth/SignOut';
import SignUp from '../components/auth/SignUp';
import Feature from '../components/Feature';
import RequireAuth from '../components/auth/require_auth';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={null}/>            
            <Route path="/signIn" component={SignIn}/>
            <Route path="/signUp" component={SignUp}/>
            <Route path="/signOut" component={SignOut}/>
            <Route path="/feature" component={RequireAuth(Feature)}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
