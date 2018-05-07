import React, { Component } from 'react';
import './App.css';

import UserList from '../components/user_list';

class App extends Component {
  render() {
    return (
        <div>
          <UserList />
        </div>
    );
  }
}

export default App;
