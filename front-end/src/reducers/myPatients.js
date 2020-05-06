import {
  GET_MY_PATIENTS, GET_MY_PATIENTS_SUCCESS, GET_MY_PATIENTS_ERROR,
  GET_MY_INDIVIDUAL_PATIENT, GET_MY_INDIVIDUAL_PATIENT_SUCCESS, GET_MY_INDIVIDUAL_PATIENT_ERROR,
  GET_EMAILS_PATIENTS, GET_EMAILS_PATIENTS_SUCCESS, GET_EMAILS_PATIENTS_ERROR,
  ADD_PATIENT, ADD_PATIENT_SUCCESS, ADD_PATIENT_ERROR,
  EDIT_TREATMENT, EDIT_TREATMENT_SUCCESS, EDIT_TREATMENT_ERROR,
  RESET_INDICATORS
} from '../events';

const initState = {
  myPatientsLoading: false,
  singlePatientLoading: false,
  myPatients: [],
  singlePatient: {},
  error: '',
  emailsPatients: [],
  getEmailsPatientsLoading: false,
  addPatientLoading: false,
  editPatientLoading: false,
  message: ''
};

const home = (state = initState, action) => {
  switch (action.type) {
    case GET_MY_INDIVIDUAL_PATIENT:
      return Object.assign({}, state, { singlePatientLoading: true });

    case GET_MY_INDIVIDUAL_PATIENT_SUCCESS:
      return Object.assign({}, state, { singlePatient: action.singlePatient, singlePatientLoading: false });

    case GET_MY_INDIVIDUAL_PATIENT_ERROR:
      return Object.assign({}, state, { error: action.error, singlePatientLoading: false });

    case GET_MY_PATIENTS:
      return Object.assign({}, state, { myPatientsLoading: true });

    case GET_MY_PATIENTS_SUCCESS:
      return Object.assign({}, state, { myPatients: action.myPatients, myPatientsLoading: false });

    case GET_MY_PATIENTS_ERROR:
      return Object.assign({}, state, { error: action.error, myPatientsLoading: false });

    case GET_EMAILS_PATIENTS:
      return Object.assign({}, state, { getEmailsPatientsLoading: true });

    case GET_EMAILS_PATIENTS_SUCCESS:
      return Object.assign({}, state, { emailsPatients: action.emailsPatients, getEmailsPatientsLoading: false });

    case GET_EMAILS_PATIENTS_ERROR:
      return Object.assign({}, state, { error: action.error, getEmailsPatientsLoading: false });

    case ADD_PATIENT:
      return Object.assign({}, state, { addPatientLoading: true });

    case ADD_PATIENT_SUCCESS:
      return Object.assign({}, state, { message: action.message, addPatientLoading: false });

    case ADD_PATIENT_ERROR:
      return Object.assign({}, state, { error: action.error, addPatientLoading: false });

    case EDIT_TREATMENT:
      return Object.assign({}, state, { editPatientLoading: true });

    case EDIT_TREATMENT_SUCCESS:
      return Object.assign({}, state, { message: action.message, editPatientLoading: false });

    case EDIT_TREATMENT_ERROR:
      return Object.assign({}, state, { error: action.error, editPatientLoading: false });

    case RESET_INDICATORS:
      return Object.assign({}, state, { message: '', error: '' });

    default: return Object.assign({}, state);
  }
};

export default home;
