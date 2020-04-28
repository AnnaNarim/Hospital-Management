import {
  LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT,
  FETCH_USER, USER_SUCCESS, USER_ERROR,
  REGISTER, REGISTER_SUCCESS, REGISTER_ERROR
} from '../events';

const initState = {
  loading: false,
  resetLoading: false,
  passChangeLoading: false,
  error: false,
  errorServerDown: false,
  message: '',
  profMessage: '',
  user: {
    isLoggedIn: false
  },
  errorSignUp: false,
  success: false
};

const user = (state = initState, action) => {
  let error = action.error;

  switch (action.type) {
    case FETCH_USER:
      return Object.assign({}, state, { loading: true });

    case USER_SUCCESS:
      return Object.assign({}, initState, { user: action.user });

    case USER_ERROR:
      if (action.status !== 401) {
        error = action.error;
      } else {
        error = false;
      }
      return Object.assign({}, initState, { error });

    case LOGIN:
    return Object.assign({}, initState, { loading: true });

    case LOGIN_SUCCESS: return Object.assign({}, initState, { user: action.user });

    case LOGOUT: return Object.assign({}, initState);

    case LOGIN_ERROR:
      return Object.assign({}, initState, { error });

    default: return Object.assign({}, state);
  }
};

export default user;
