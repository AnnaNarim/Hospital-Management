import { parseJSON, checkStatus } from './request';
import {
  GET_MY_NURSES, GET_MY_NURSES_SUCCESS, GET_MY_NURSES_ERROR,
  GET_MY_INDIVIDUAL_NURSE, GET_MY_INDIVIDUAL_NURSE_SUCCESS, GET_MY_INDIVIDUAL_NURSE_ERROR,
} from '../events';

const APIPATH = `http://localhost:3030`;

export const getMyNurses = token => {
  return (
  (dispatch) => {
    dispatch({ type: GET_MY_NURSES });

    return fetch(`${APIPATH}/home/myNurses/view`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(response => dispatch({ type: GET_MY_NURSES_SUCCESS, myNurses: response }))
      .catch((error) => {
        return dispatch({
          type: GET_MY_NURSES_ERROR,
          error: error.message
        });
      });
  });
}

export const getIndividualNurse = (token, id) => {
  return (
  (dispatch) => {
    dispatch({ type: GET_MY_INDIVIDUAL_NURSE });

    return fetch(`${APIPATH}/home/myNurses/view/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(response => dispatch({ type: GET_MY_INDIVIDUAL_NURSE_SUCCESS, singleNurse: response }))
      .catch((error) => {
        return dispatch({
          type: GET_MY_INDIVIDUAL_NURSE_ERROR,
          error: error.message
        });
      });
  });
}

