import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createPost } from '../actions';

class PostsNew extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className} >
                <label>{field.fieldTitle}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                    // onChange={field.input.onChange}
                    // onFocus={field.input.onChange}
                    // onBlur={field.input.onChange}
                />
                <div className="text-help" >
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        // console.log(values);
        this.props.createPost(values, () => {
            this.props.history.push('/');   //untuk balik ke halaman '/'
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                <Field 
                    fieldTitle="Title :"
                    name="title"
                    component={this.renderField}
                />
                <Field 
                    fieldTitle="Categories :"
                    name="categories"
                    component={this.renderField}
                />
                <Field 
                    fieldTitle="Content :"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary" >Submit</button>
                <Link className="btn btn-danger" to="/" style={{marginLeft: 10}} >Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    //console.log(values) -> { title: 'asdfasdf', categories: 'asdfsa', content: 'adf' }
    const errors = {};

    //validation
    if (!values.title || values.title.length < 3) {
        errors.title = "Enter a title that is at least 3 characters!";
    }
    if (!values.categories) {
        errors.categories = "Enter some categories!";
    }
    if (!values.content) {
        errors.content = "Enter some content!";
    }

    //if error is empty, the form is fine to submit
    return errors;
}

export default reduxForm({
    validate: validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostsNew)
);
