import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    const loggedIn = this.props.loggedIn ? (<li><Link to="/signOut">Sign Out</Link></li>) : (<li><Link to="/signIn">Sign In </Link><Link to="/signUp"> Sign Up</Link></li>);

    return (
      <nav className="navbar navbar-light">
        <ul style={{ display: 'flex', flexDirection: 'row', listStyle: 'none'}}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/feature">Feature</Link>
          </li>
          {loggedIn}
        </ul>
      </nav>      
    );
  }
}

function mapStateToProps(state) {
  return { loggedIn: state.auth.authenticated }
}

export default connect(mapStateToProps)(Header);