import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  renderField = (field) => {
    // console.log(field);
    return (
      <div className="input-row">
        <input {...field.input} type={(field.input.name === 'password' || field.input.name === 'confirmPassword') ? 'password' : 'text'}/>
        {field.meta.touched && field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      </div>
    )
  }

  handleFormSignUp(values) {
    this.props.signUpUser(values, () => {
      this.props.history.push('/');
    });
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return <div>{this.props.errorMessage}</div>
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSignUp.bind(this))}>
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
        <fieldset className="form-group">
          <label htmlFor="">Confirm Password:</label>
          <Field 
            name="confirmPassword"
            component={this.renderField} 
            className="form-control"
          />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};
  const { email, password, confirmPassword } = formProps;

  if(!email) {
    errors.email = 'Please enter an email';
  }

  if(!password) {
    errors.password = 'Please enter a password';
  }

  if(!confirmPassword) {
    errors.confirmPassword = 'Please enter a confirm password';
  }

  if ( password !== confirmPassword) {
    errors.confirmPassword = 'Password did not match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage }
}

export default reduxForm({
  validate: validate,
  form: 'signup',
})(
  connect(mapStateToProps, actions)(SignUp)
);