import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  renderField = (field) => {
    // console.log(field);
    return (
      <div className="input-row">
        <input {...field.input} type={field.input.name === 'password' ? 'password' : 'text'}/>
        {field.meta.touched && field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      </div>
    )
  }
  
  handleFormSubmit(values) {
    console.log(values);
    this.props.signInUser(values, () => this.props.history.push('/feature'));
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong>{this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label htmlFor="">Email:</label>
          <Field 
            name="email" 
            component={this.renderField} 
            className="form-control"
          />
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="">Password:</label>
          <Field 
            name="password"
            component={this.renderField} 
            className="form-control"
          />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign In</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

export default reduxForm({
  form: 'signin'
})(
  connect(mapStateToProps, actions)(SignIn)
);