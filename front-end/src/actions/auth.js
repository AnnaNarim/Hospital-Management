import { fetchOptions, parseJSON } from './request';
import {
  REGISTER, REGISTER_SUCCESS, REGISTER_ERROR,
  LOGIN, LOGIN_SUCCESS, LOGIN_ERROR,
  FETCH_USER, USER_SUCCESS, USER_ERROR,
  LOGOUT
} from '../events';

const APIPATH = `http://localhost:3002`;

// export const fetchCurrentUser = () => (
//   (dispatch) => {
//     dispatch({ type: FETCH_USER });

//     return fetch(`${APIPATH}/user`, fetchOptions({
//       method: 'GET'
//     }))
//       .then(checkStatus)
//       .then(parseJSON)
//       .then(response => Object.assign({}, response, { isLoggedIn: true }))
//       .then(response => dispatch({ type: USER_SUCCESS, user: response }))
//       .catch((error) => {
//         dispatch({
//           type: USER_ERROR,
//           user: {
//             isLoggedIn: false
//           },
//           error: error.message,
//           status: error.status || 'server_down'
//         });
//         if (!error.status) {
//           dispatch({ type: SERVER_DOWN })
//         }
//         sendError(error);
//       });
//   });

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

export const login = data => {
  console.log('here', JSON.stringify(data))
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
      .then(parseJSON)
      .then(response => Object.assign({}, response, { isLoggedIn: true }))
      .then(response => {
        console.log('---> response', response)
        return dispatch({ type: LOGIN_SUCCESS, user: response })
      })
      .catch((error) => {
        console.log('---> error', error)
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

// export const logout = () => ( // TODO error handling
//   dispatch => fetch(`${APIPATH}/logout`, fetchOptions({
//     method: 'GET'
//   }))
//     .then(checkStatus)
//     .then(parseJSON)
//     .then(() => dispatch({ type: LOGOUT })
//   )
// );
