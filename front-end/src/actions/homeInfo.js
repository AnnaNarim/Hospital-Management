import { parseJSON, checkStatus } from './request';
import {
  GET_INFO, GET_INFO_SUCCESS, GET_INFO_ERROR
} from '../events';

const APIPATH = `http://localhost:3030`;

export const getInfo = (token, email) => {
  return (
  (dispatch) => {
    dispatch({ type: GET_INFO });

    return fetch(`${APIPATH}/home`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(response => dispatch({ type: GET_INFO_SUCCESS, info: response }))
      .catch((error) => {
        return dispatch({
          type: GET_INFO_ERROR,
          error: error.message
        });
      });
  });
}
