import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import chaiJquery from 'chai-jquery';

// window --> global
/* testing environment, run like a browser in the command line */
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>'); //creating fake DOM
global.window = global.document.defaultView;
const $ = jquery(global.window);

/* helper that should render the given class */
function renderComponent(ComponentClass, props, state) {
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props}/>
    </Provider>
  );

  return $(ReactDOM.findDOMNode(componentInstance));  //produces HTML
}

// $('div').simulate()
$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
}

//set up chai jquery
chaiJquery(chai, chai.util, $);

export { renderComponent , expect };