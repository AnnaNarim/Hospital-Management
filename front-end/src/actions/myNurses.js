import { parseJSON, checkStatus } from './request';
import {
  GET_MY_NURSES, GET_MY_NURSES_SUCCESS, GET_MY_NURSES_ERROR,
  GET_MY_INDIVIDUAL_NURSE, GET_MY_INDIVIDUAL_NURSE_SUCCESS, GET_MY_INDIVIDUAL_NURSE_ERROR,
  DELETE_MY_INDIVIDUAL_NURSE, DELETE_MY_INDIVIDUAL_NURSE_SUCCESS, DELETE_MY_INDIVIDUAL_NURSE_ERROR,
  GET_NURSES_DEPARTMENTS, GET_NURSES_DEPARTMENTS_SUCCESS, GET_NURSES_DEPARTMENTS_ERROR,
  ADD_NURSE, ADD_NURSE_SUCCESS, ADD_NURSE_ERROR,
  RESET_INDICATORS
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

export const individualNurseDelete = (token, id) => {
  return (
  (dispatch) => {
    dispatch({ type: DELETE_MY_INDIVIDUAL_NURSE });

    return fetch(`${APIPATH}/home/myNurses/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(response => dispatch({ type: DELETE_MY_INDIVIDUAL_NURSE_SUCCESS, message: response }))
      .catch((error) => {
        return dispatch({
          type: DELETE_MY_INDIVIDUAL_NURSE_ERROR,
          error: error.message
        });
      });
  });
}

export const getNursesOfDepartments = (token, department) => {
  return (
  (dispatch) => {
    dispatch({ type: GET_NURSES_DEPARTMENTS });

    return fetch(`${APIPATH}/home/myNurses/add/${department}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(response => dispatch({ type: GET_NURSES_DEPARTMENTS_SUCCESS, nursesEmails: response }))
      .catch((error) => {
        return dispatch({
          type: GET_NURSES_DEPARTMENTS_ERROR,
          error: error.message
        });
      });
  });
}

export const addNurse = (token, id) => {
  return (
  (dispatch) => {
    dispatch({ type: ADD_NURSE });

    return fetch(`${APIPATH}/home/myNurses/add/${id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(response => dispatch({ type: ADD_NURSE_SUCCESS, message: response }))
      .catch((error) => {
        return dispatch({
          type: ADD_NURSE_ERROR,
          error: error.message
        });
      });
  });
}

export const resetIndicatorsNurse = () => {
  return (
  (dispatch) => {
    dispatch({ type: RESET_INDICATORS });
  });
}

