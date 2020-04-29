import {
  GET_INFO, GET_INFO_SUCCESS, GET_INFO_ERROR
} from '../events';

const initState = {
  homeLoading: false,
  info: {},
  departDoctorsLoading: false,
  singleDoctorLoading: false,
  departDoctors: [],
  singleDoctor: {},
  error: ''
};

const home = (state = initState, action) => {
  switch (action.type) {

    case GET_INFO:
      return Object.assign({}, state, { homeLoading: true });

    case GET_INFO_SUCCESS:
      return Object.assign({}, state, { info: action.info, homeLoading: false });

    case GET_INFO_ERROR:
      return Object.assign({}, state, { error: action.error, homeLoading: false });

    default: return Object.assign({}, state);
  }
};

export default home;
