import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserHeader extends Component {
  state = {  }

  render() {
    const { user } = this.props

    if (!user) {
      return <div className="header">Anonymous</div>
    }
    return (
      <div className="header">{user.name}</div>      
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.users.find(user => user.id === ownProps.userId)
})


export default connect(mapStateToProps)(UserHeader)