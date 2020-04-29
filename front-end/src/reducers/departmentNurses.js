import {
  GET_DEPART_NURSES, GET_DEPART_NURSES_SUCCESS, GET_DEPART_NURSES_ERROR,
  GET_INDIVIDUAL_NURSE, GET_INDIVIDUAL_NURSE_SUCCESS, GET_INDIVIDUAL_NURSE_ERROR,
} from '../events';

const initState = {
  departNursesLoading: false,
  singleNurseLoading: false,
  departNurses: [],
  singleNurse: {},
  error: ''
};

const home = (state = initState, action) => {
  switch (action.type) {
    case GET_INDIVIDUAL_NURSE:
      return Object.assign({}, state, { singleNurseLoading: true });

    case GET_INDIVIDUAL_NURSE_SUCCESS:
      return Object.assign({}, state, { singleNurse: action.singleNurse, singleNurseLoading: false });

    case GET_INDIVIDUAL_NURSE_ERROR:
      return Object.assign({}, state, { error: action.error, singleNurseLoading: false });

    case GET_DEPART_NURSES:
      return Object.assign({}, state, { departNursesLoading: true });

    case GET_DEPART_NURSES_SUCCESS:
      return Object.assign({}, state, { departNurses: action.departNurses, departNursesLoading: false });

    case GET_DEPART_NURSES_ERROR:
      return Object.assign({}, state, { error: action.error, departNursesLoading: false });

    default: return Object.assign({}, state);
  }
};

export default home;
