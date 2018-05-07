import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class CommentBox extends Component {
  constructor(props) {
    super(props);

    this.state = { comment: '' };
  }
  
  handleChange(event) {
    this.setState({ comment: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ comment: '' });
    this.props.saveComment(this.state.comment);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)} className="comment-box">
        <h4>Add a comment</h4>
        <textarea 
          onChange={this.handleChange.bind(this)}
          value={this.state.comment}/>
        <button action="submit">Submit Comment</button>
      </form>
    )
  }
};

export default connect(null, actions)(CommentBox);