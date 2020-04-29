import { parseJSON, checkStatus } from './request';
import {
  GET_DEPART_DOCTORS, GET_DEPART_DOCTORS_SUCCESS, GET_DEPART_DOCTORS_ERROR,
  GET_INDIVIDUAL_DOCTOR, GET_INDIVIDUAL_DOCTOR_SUCCESS, GET_INDIVIDUAL_DOCTOR_ERROR,
} from '../events';

const APIPATH = `http://localhost:3030`;

export const getDepartmentDoctors = (token, name) => {
  return (
  (dispatch) => {
    dispatch({ type: GET_DEPART_DOCTORS });

    return fetch(`${APIPATH}/home/departments/${name}/doctors`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(response => dispatch({ type: GET_DEPART_DOCTORS_SUCCESS, departDoctors: response }))
      .catch((error) => {
        return dispatch({
          type: GET_DEPART_DOCTORS_ERROR,
          error: error.message
        });
      });
  });
}

export const getIndividualDoctor = (token, id) => {
  return (
  (dispatch) => {
    dispatch({ type: GET_INDIVIDUAL_DOCTOR });

    return fetch(`${APIPATH}/home/departments/doctors/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(response => dispatch({ type: GET_INDIVIDUAL_DOCTOR_SUCCESS, singleDoctor: response }))
      .catch((error) => {
        return dispatch({
          type: GET_INDIVIDUAL_DOCTOR_ERROR,
          error: error.message
        });
      });
  });
}

