import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  FORGOT_FAIL,
  FORGOT_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_DETAILS_FAIL,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      console.log('payload', action.payload.token);
      console.log('action paylod:', action.payload);
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case FORGOT_SUCCESS:
      return {
        ...state,
        mailsentmsg: action.payload,
      };
    case FORGOT_FAIL:
      return {
        ...state,
        mailsentmsg: null,
      };
    case UPDATE_PASSWORD_FAIL:
    case UPDATE_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
