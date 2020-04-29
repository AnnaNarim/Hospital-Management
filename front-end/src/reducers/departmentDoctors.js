import {
  GET_DEPART_DOCTORS, GET_DEPART_DOCTORS_SUCCESS, GET_DEPART_DOCTORS_ERROR,
  GET_INDIVIDUAL_DOCTOR, GET_INDIVIDUAL_DOCTOR_SUCCESS, GET_INDIVIDUAL_DOCTOR_ERROR,
} from '../events';

const initState = {
  departDoctorsLoading: false,
  singleDoctorLoading: false,
  departDoctors: [],
  singleDoctor: {},
  error: ''
};

const home = (state = initState, action) => {
  switch (action.type) {
    case GET_INDIVIDUAL_DOCTOR:
      return Object.assign({}, state, { singleDoctorLoading: true });

    case GET_INDIVIDUAL_DOCTOR_SUCCESS:
      return Object.assign({}, state, { singleDoctor: action.singleDoctor, singleDoctorLoading: false });

    case GET_INDIVIDUAL_DOCTOR_ERROR:
      return Object.assign({}, state, { error: action.error, singleDoctorLoading: false });

    case GET_DEPART_DOCTORS:
      return Object.assign({}, state, { departDoctorsLoading: true });

    case GET_DEPART_DOCTORS_SUCCESS:
      return Object.assign({}, state, { departDoctors: action.departDoctors, departDoctorsLoading: false });

    case GET_DEPART_DOCTORS_ERROR:
      return Object.assign({}, state, { error: action.error, departDoctorsLoading: false });

    default: return Object.assign({}, state);
  }
};

export default home;
