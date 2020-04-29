import { parseJSON, checkStatus } from './request';
import {
  GET_DEPART_NURSES, GET_DEPART_NURSES_SUCCESS, GET_DEPART_NURSES_ERROR,
  GET_INDIVIDUAL_NURSE, GET_INDIVIDUAL_NURSE_SUCCESS, GET_INDIVIDUAL_NURSE_ERROR,
} from '../events';

const APIPATH = `http://localhost:3030`;

export const getDepartmentNurses = (token, name) => {
  return (
  (dispatch) => {
    dispatch({ type: GET_DEPART_NURSES });

    return fetch(`${APIPATH}/home/departments/${name}/nurses`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(response => dispatch({ type: GET_DEPART_NURSES_SUCCESS, departNurses: response }))
      .catch((error) => {
        return dispatch({
          type: GET_DEPART_NURSES_ERROR,
          error: error.message
        });
      });
  });
}

export const getIndividualNurse = (token, id) => {
  return (
  (dispatch) => {
    dispatch({ type: GET_INDIVIDUAL_NURSE });

    return fetch(`${APIPATH}/home/departments/nurses/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(response => dispatch({ type: GET_INDIVIDUAL_NURSE_SUCCESS, singleNurse: response }))
      .catch((error) => {
        return dispatch({
          type: GET_INDIVIDUAL_NURSE_ERROR,
          error: error.message
        });
      });
  });
}

