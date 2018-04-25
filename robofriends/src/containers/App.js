import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
// import { robots } from './robot';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      robots: [],
      searchField: '',
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
        .then(users => this.setState({ robots: users }))
  }

  onChangeText = (event) => {
    this.setState({ searchField: event.target.value });
    console.log(this.state.searchField);
  }

  render() {
    const { robots, searchField } = this.state
    const filteredRobot = robots.filter(val => {
      return val.name.toLowerCase().includes(searchField.toLowerCase())
    });
    return !robots.length ? 
      <h1>Loading</h1>
      :
      <div className='tc'>
        <h1 className='f1' >RoboFriends</h1>
        <SearchBox onchangeText={this.onChangeText} />
        <Scroll>
          <CardList robots={filteredRobot} />
        </Scroll>
      </div>
    
  }
}

export default App;