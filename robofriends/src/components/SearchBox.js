import React, { Component } from 'react';

const SearchBox = ({onchangeText}) => {
  return (
    <div className='pa2' >
      <input 
        className='pa3 ba b--green bg-lightest-blue' 
        type='search' 
        placeholder='Search Robots'
        onChange={onchangeText} />
    </div>
  );
};

export default SearchBox;