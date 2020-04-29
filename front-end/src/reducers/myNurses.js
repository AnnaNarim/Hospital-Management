import {
  GET_MY_NURSES, GET_MY_NURSES_SUCCESS, GET_MY_NURSES_ERROR,
  GET_MY_INDIVIDUAL_NURSE, GET_MY_INDIVIDUAL_NURSE_SUCCESS, GET_MY_INDIVIDUAL_NURSE_ERROR,
} from '../events';

const initState = {
  myNursesLoading: false,
  singleNurseLoading: false,
  myNurses: [],
  singleNurse: {},
  error: ''
};

const home = (state = initState, action) => {
  switch (action.type) {
    case GET_MY_INDIVIDUAL_NURSE:
      return Object.assign({}, state, { singleNurseLoading: true });

    case GET_MY_INDIVIDUAL_NURSE_SUCCESS:
      return Object.assign({}, state, { singleNurse: action.singleNurse, singleNurseLoading: false });

    case GET_MY_INDIVIDUAL_NURSE_ERROR:
      return Object.assign({}, state, { error: action.error, singleNurseLoading: false });

    case GET_MY_NURSES:
      return Object.assign({}, state, { myNursesLoading: true });

    case GET_MY_NURSES_SUCCESS:
      return Object.assign({}, state, { myNurses: action.myNurses, myNursesLoading: false });

    case GET_MY_NURSES_ERROR:
      return Object.assign({}, state, { error: action.error, myNursesLoading: false });

    default: return Object.assign({}, state);
  }
};

export default home;
