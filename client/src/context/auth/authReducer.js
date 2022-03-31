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
} from "../types";

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
      localStorage.setItem("token", action.payload.token);
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
    case FORGOT_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        errors: [...state.errors, action.payload],
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: [],
      };
    case FORGOT_SUCCESS:
      return {
        ...state,
        mailsentmsg: action.payload,
      };
    case UPDATE_PASSWORD_FAIL:
    case UPDATE_DETAILS_FAIL:
      console.log("eeror:", action.payload);
      return {
        ...state,
        errors: [state.errors, action.payload],
      };

    default:
      return state;
  }
};
