import React, { Component } from 'react';

// const SearchBar = () => {
//     return <input />;
// };

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: 'Input'
        };
    }

    render() {
        return (
            <div>
                <input value={this.state.term} onChange={(event) => this.setState({term: event.target.value})} />      
                <input type={'button'} />  
            </div>
        );
    }
}

export default SearchBar;
