import { parseJSON, checkStatus } from './request';
import {
  GET_MY_PATIENTS, GET_MY_PATIENTS_SUCCESS, GET_MY_PATIENTS_ERROR,
  GET_MY_INDIVIDUAL_PATIENT, GET_MY_INDIVIDUAL_PATIENT_SUCCESS, GET_MY_INDIVIDUAL_PATIENT_ERROR,
  GET_EMAILS_PATIENTS, GET_EMAILS_PATIENTS_SUCCESS, GET_EMAILS_PATIENTS_ERROR,
  ADD_PATIENT, ADD_PATIENT_SUCCESS, ADD_PATIENT_ERROR,
  EDIT_TREATMENT, EDIT_TREATMENT_SUCCESS, EDIT_TREATMENT_ERROR,
  RESET_INDICATORS
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

export const getEmailsOfPatients = token => {
  return (
  (dispatch) => {
    dispatch({ type: GET_EMAILS_PATIENTS });

    return fetch(`${APIPATH}/home/myPatients/add`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(response => dispatch({ type: GET_EMAILS_PATIENTS_SUCCESS, emailsPatients: response }))
      .catch((error) => {
        return dispatch({
          type: GET_EMAILS_PATIENTS_ERROR,
          error: error.message
        });
      });
  });
}

export const addPatient = (token, id, data) => {
  return (
  (dispatch) => {
    dispatch({ type: ADD_PATIENT });

    return fetch(`${APIPATH}/home/myPatients/add/${id}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(response => dispatch({ type: ADD_PATIENT_SUCCESS, message: response }))
      .catch((error) => {
        return dispatch({
          type: ADD_PATIENT_ERROR,
          error: error.message
        });
      });
  });
}

export const editTreatment = (token, id, startDate, newTreatment) => {
  return (
  (dispatch) => {
    dispatch({ type: EDIT_TREATMENT });

    return fetch(`${APIPATH}/home/myPatients/edit/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ startDate, newTreatment }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(response => dispatch({ type: EDIT_TREATMENT_SUCCESS, message: response }))
      .catch((error) => {
        return dispatch({
          type: EDIT_TREATMENT_ERROR,
          error: error.message
        });
      });
  });
}

export const resetIndicatorsPatient = () => {
  return (
  (dispatch) => {
    dispatch({ type: RESET_INDICATORS });
  });
}

