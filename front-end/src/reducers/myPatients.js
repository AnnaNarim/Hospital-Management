import {
  GET_MY_PATIENTS, GET_MY_PATIENTS_SUCCESS, GET_MY_PATIENTS_ERROR,
  GET_MY_INDIVIDUAL_PATIENT, GET_MY_INDIVIDUAL_PATIENT_SUCCESS, GET_MY_INDIVIDUAL_PATIENT_ERROR,
} from '../events';

const initState = {
  myPatientsLoading: false,
  singlePatientLoading: false,
  myPatients: [],
  singlePatient: {},
  error: ''
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

    default: return Object.assign({}, state);
  }
};

export default home;
