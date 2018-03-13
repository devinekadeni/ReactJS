import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            terms: ''
        };
    }

    onInputChange(event) {
        this.setState({terms: event.target.value});
        // console.log(this.state.terms);
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.props.fetchWeather(this.state.terms);
        this.setState({terms: ''});
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit.bind(this)} className="input-group" >
                <input 
                    value={this.state.terms} 
                    onChange={this.onInputChange.bind(this)} //bind = supaya "this" global bisa dipake di dalem onInputChange
                    placeholder="Get a Five-day forecast in your favorite cities"
                    className="form-control" />
                <span className="input-group-btn" >
                    <button type="submit" className="btn btn-secondary">Submit</button>
                </span>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchWeather
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
