import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  authButton() {
    if(this.props.authenticated) {
      return <button onClick={() => this.props.authenticate(false)}>Sign Out</button>
    }
    return <button onClick={() => this.props.authenticate(true)}>Sign In</button>
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav" style={{ display: 'flex', flexDirection: 'row', listStyleType: 'none' }}>
          <li className="nav-item" style={{ marginRight: '20px' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
          </li>
          <li className="nav-item" style={{ marginRight: '20px' }}>
            <Link to="/resources" style={{ textDecoration: 'none' }}>Resources</Link>
          </li>
          <li className="nav-item" style={{ marginRight: '20px' }}>
            {this.authButton()}
          </li>
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.authenticated };
}

export default connect(mapStateToProps, actions)(Header);