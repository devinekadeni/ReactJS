import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
// import { robots } from './robot';

import { setSearchField, requestRobots } from '../action';

import './App.css';

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     robots: [],
  //     // searchField: '',
  //   }
  // }

  componentDidMount() {
    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then(response => response.json())
    //     .then(users => this.setState({ robots: users }))
    this.props.onRequestRobots();
  }

  // onChangeText = (event) => {
  //   this.setState({ searchField: event.target.value });
  //   console.log(this.state.searchField);
  // }

  render() {
    // const { robots } = this.state;   // searchField
    const { onSearchChange, searchField, isPending, robots, error } = this.props;
    const filteredRobot = robots.filter(val => {
      return val.name.toLowerCase().includes(searchField.toLowerCase())
    });
    return isPending ? 
      <h1>Loading</h1>
      :
      <div className='tc'>
        <h1 className='f1' >RoboFriends</h1>
        <SearchBox onchangeText={onSearchChange} />
        <Scroll>
          <CardList robots={filteredRobot} />
        </Scroll>
      </div>
    
  }
}

const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    isPending: state.requestRobots.isPending,
    robots: state.requestRobots.robots,
    error: state.requestRobots.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => requestRobots(dispatch),
    // onRequestRobots: () => dispatch(requestRobots()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);