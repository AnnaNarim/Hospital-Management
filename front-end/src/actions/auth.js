import { fetchOptions, parseJSON, checkStatus, sendError } from './request';
import {
  REGISTER, REGISTER_SUCCESS, REGISTER_ERROR,
  LOGIN, LOGIN_SUCCESS, LOGIN_ERROR,
  FETCH_USER, USER_SUCCESS, USER_ERROR,
  LOGOUT
} from '../events';

// const APIPATH = `${Config.apiPath}/auth`;

export const fetchCurrentUser = () => (
  (dispatch) => {
    dispatch({ type: FETCH_USER });

    return fetch(`${APIPATH}/user`, fetchOptions({
      method: 'GET'
    }))
      .then(checkStatus)
      .then(parseJSON)
      .then(response => Object.assign({}, response, { isLoggedIn: true }))
      .then(response => dispatch({ type: USER_SUCCESS, user: response }))
      .catch((error) => {
        dispatch({
          type: USER_ERROR,
          user: {
            isLoggedIn: false
          },
          error: error.message,
          status: error.status || 'server_down'
        });
        if (!error.status) {
          dispatch({ type: SERVER_DOWN })
        }
        sendError(error);
      });
  });

// export const register = data => (
//   (dispatch) => {
//     dispatch({ type: REGISTER });

//     return fetch(`${APIPATH}/register`, fetchOptions({
//       method: 'POST',
//       body: JSON.stringify(data)
//     }))
//       .then(checkStatus)
//       .then(parseJSON)
//       .then(response => dispatch({ type: REGISTER_SUCCESS, user: response }))
//       .catch((error) => {
//         dispatch({
//           type: REGISTER_ERROR,
//           error: error.message,
//           status: error.status || 'server_down'
//         });
//         if (!error.status) {
//           dispatch({ type: SERVER_DOWN })
//         }
//         sendError(error);
//       });
//   });

export const login = data => (
  (dispatch) => {
    dispatch({ type: LOGIN });

    return fetch(`${APIPATH}/login`, fetchOptions({
      method: 'POST',
      body: JSON.stringify(data)
    }))
      .then(checkStatus)
      .then(parseJSON)
      .then(response => Object.assign({}, response, { isLoggedIn: true }))
      .then(response => dispatch({ type: LOGIN_SUCCESS, user: response }))
      .catch((error) => {
        dispatch({
          type: LOGIN_ERROR,
          user: {
            isLoggedIn: false
          },
          error: error.message,
          status: error.status || 'server_down'
        });
        if (!error.status) {
          dispatch({ type: SERVER_DOWN })
        }
        sendError(error);
      });
  });

export const logout = () => ( // TODO error handling
  dispatch => fetch(`${APIPATH}/logout`, fetchOptions({
    method: 'GET'
  }))
    .then(checkStatus)
    .then(parseJSON)
    .then(() => dispatch({ type: LOGOUT })
  )
);
