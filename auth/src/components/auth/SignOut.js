import React, { Component } from 'react';
import { connect }from 'react-redux';
import * as actions from '../../actions';

class SignOut extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  componentDidMount() {
    this.props.signOutUser(() => {
      this.props.history.push('/signIn');
    });
  }

  render() {
    return (
      <div>Sorry to see you go...</div>
    );
  }
}

export default connect(null, actions)(SignOut);