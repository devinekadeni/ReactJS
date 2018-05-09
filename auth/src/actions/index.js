import axios from 'axios';

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from './types';

const ROOT_URL = 'http://localhost:2000';

export function signInUser(values, callback) {
  // console.log('masuk');
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signIn`, { email: values.email, password: values.password})
      .then(response => {
        
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        callback();
      })
      .catch(err => {
        dispatch(authError('Bad Login Info'));
      })
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  }
}

export function signOutUser(callback) {
  localStorage.removeItem('token');
  callback();
  return { type: UNAUTH_USER }
}

export function signUpUser(values, callback) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signUp`, { email: values.email, password: values.password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response);
        callback();
      })
      .catch(error => 
        // console.log(error);
        dispatch(authError(error.response.data.error))
      );
  }
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      })
  }
}