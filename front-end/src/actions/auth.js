import { parseJSON, checkStatus } from './request';
import {
  LOGIN, LOGIN_SUCCESS, LOGIN_ERROR,
  FETCH_USER, USER_SUCCESS, USER_ERROR,
  LOGOUT
} from '../events';

const APIPATH = `http://localhost:3030`;
const localStorage = window.localStorage;

export const currentUser = () => (
  (dispatch) => {
    dispatch({ type: FETCH_USER });

    const _user = localStorage.getItem('user');

    if(_user && Object.keys(JSON.parse(_user)).length) {
      dispatch({ type: USER_SUCCESS, user: JSON.parse(_user) })
    } else {
      dispatch({ type: USER_ERROR })
    }
});

export const login = data => {
  return (
  (dispatch) => {
    dispatch({ type: LOGIN });

    return fetch(`${APIPATH}/users/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(response => Object.assign({}, response, { isLoggedIn: true }))
      .then(response => dispatch({ type: LOGIN_SUCCESS, user: response }))
      .catch((error) => {
        return dispatch({
          type: LOGIN_ERROR,
          user: {
            isLoggedIn: false
          },
          error: error.message
        });
      });
  });
}

export const logout = () => (
  (dispatch) => {
    dispatch({ type: LOGOUT })
});
