import {
  GET_MY_NURSES, GET_MY_NURSES_SUCCESS, GET_MY_NURSES_ERROR,
  GET_MY_INDIVIDUAL_NURSE, GET_MY_INDIVIDUAL_NURSE_SUCCESS, GET_MY_INDIVIDUAL_NURSE_ERROR,
  DELETE_MY_INDIVIDUAL_NURSE, DELETE_MY_INDIVIDUAL_NURSE_SUCCESS, DELETE_MY_INDIVIDUAL_NURSE_ERROR,
  GET_NURSES_DEPARTMENTS, GET_NURSES_DEPARTMENTS_SUCCESS, GET_NURSES_DEPARTMENTS_ERROR,
  ADD_NURSE, ADD_NURSE_SUCCESS, ADD_NURSE_ERROR,
  RESET_INDICATORS
} from '../events';

const initState = {
  myNursesLoading: false,
  singleNurseLoading: false,
  myNurses: [],
  singleNurse: {},
  nursesEmails: [],
  nursesDepartmentLoading: false,
  deleteNurseLoading: false,
  error: '',
  message: '',
  messageAdd: '',
  addLoading: false,
  errorAddNurse: false,
  errorDelete: false
};

const home = (state = initState, action) => {
  switch (action.type) {
    case GET_MY_INDIVIDUAL_NURSE:
      return Object.assign({}, state, { singleNurseLoading: true });

    case GET_MY_INDIVIDUAL_NURSE_SUCCESS:
      return Object.assign({}, state, { singleNurse: action.singleNurse, singleNurseLoading: false });

    case GET_MY_INDIVIDUAL_NURSE_ERROR:
      return Object.assign({}, state, { error: action.error, singleNurseLoading: false });

    case DELETE_MY_INDIVIDUAL_NURSE:
      return Object.assign({}, state, { deleteNurseLoading: true });

    case DELETE_MY_INDIVIDUAL_NURSE_SUCCESS:
      return Object.assign({}, state, { message: action.message, deleteNurseLoading: false });

    case DELETE_MY_INDIVIDUAL_NURSE_ERROR:
      return Object.assign({}, state, { errorDelete: action.error, deleteNurseLoading: false });

    case GET_MY_NURSES:
      return Object.assign({}, state, { myNursesLoading: true });

    case GET_MY_NURSES_SUCCESS:
      return Object.assign({}, state, { myNurses: action.myNurses, myNursesLoading: false });

    case GET_MY_NURSES_ERROR:
      return Object.assign({}, state, { error: action.error, myNursesLoading: false });

    case GET_NURSES_DEPARTMENTS:
      return Object.assign({}, state, { nursesDepartmentLoading: true });

    case GET_NURSES_DEPARTMENTS_SUCCESS:
      return Object.assign({}, state, { nursesEmails: action.nursesEmails, nursesDepartmentLoading: false });

    case GET_NURSES_DEPARTMENTS_ERROR:
      return Object.assign({}, state, { error: action.error, nursesDepartmentLoading: false });

    case ADD_NURSE:
      return Object.assign({}, state, { addLoading: true });

    case ADD_NURSE_SUCCESS:
      return Object.assign({}, state, { messageAdd: action.message, addLoading: false });

    case ADD_NURSE_ERROR:
      return Object.assign({}, state, { errorAddNurse: action.error, addLoading: false });

    case RESET_INDICATORS:
      return Object.assign({}, state, { messageAdd: '', message: '', errorAddNurse: '', errorDelete: '' });

    default: return Object.assign({}, state);
  }
};

export default home;
