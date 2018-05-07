import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import RequireAuth from '../components/require_authentication';
import Header from '../components/header';
import Resources from '../components/resources';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/resources" component={RequireAuth(Resources)} exact/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
