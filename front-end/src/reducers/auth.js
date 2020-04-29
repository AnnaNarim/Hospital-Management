import {
  LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT,
  FETCH_USER, USER_SUCCESS, USER_ERROR,
} from '../events';

const localStorage = window.localStorage;

const initState = {
  loading: false,
  currentUserLoading: false,
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
      return Object.assign({}, state, { currentUserLoading: true });

    case USER_SUCCESS:
      return Object.assign({}, initState, { user: action.user, currentUserLoading: false });

    case USER_ERROR:
      if (action.status !== 401) {
        error = action.error;
      } else {
        error = false;
      }
      return Object.assign({}, initState, { error, currentUserLoading: false });

    case LOGIN:
    return Object.assign({}, initState, { loading: true });

    case LOGIN_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.user));
      return Object.assign({}, initState, { user: action.user });

    case LOGOUT:
      localStorage.removeItem('user');
      return Object.assign({}, initState);

    case LOGIN_ERROR:
      return Object.assign({}, initState, { error });

    default: return Object.assign({}, state);
  }
};

export default user;
