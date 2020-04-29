import { parseJSON, checkStatus } from './request';
import {
  GET_MY_PATIENTS, GET_MY_PATIENTS_SUCCESS, GET_MY_PATIENTS_ERROR,
  GET_MY_INDIVIDUAL_PATIENT, GET_MY_INDIVIDUAL_PATIENT_SUCCESS, GET_MY_INDIVIDUAL_PATIENT_ERROR,
} from '../events';

const APIPATH = `http://localhost:3030`;

export const getMyPatients = token => {
  return (
  (dispatch) => {
    dispatch({ type: GET_MY_PATIENTS });

    return fetch(`${APIPATH}/home/myPatients/view`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(response => dispatch({ type: GET_MY_PATIENTS_SUCCESS, myPatients: response }))
      .catch((error) => {
        return dispatch({
          type: GET_MY_PATIENTS_ERROR,
          error: error.message
        });
      });
  });
}

export const getIndividualPatient = (token, id) => {
  return (
  (dispatch) => {
    dispatch({ type: GET_MY_INDIVIDUAL_PATIENT });

    return fetch(`${APIPATH}/home/myPatients/view/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(response => dispatch({ type: GET_MY_INDIVIDUAL_PATIENT_SUCCESS, singlePatient: response }))
      .catch((error) => {
        return dispatch({
          type: GET_MY_INDIVIDUAL_PATIENT_ERROR,
          error: error.message
        });
      });
  });
}

