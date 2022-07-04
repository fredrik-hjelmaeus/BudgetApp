import { IAuthState } from "../../frontend-types/IAuthContext";
import { IError } from "../../frontend-types/IErrorResponse";

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
  UPDATE_PASSWORD_SUCCESS,
  CLEAR_ALERTS,
  UPDATE_DETAILS_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  SEND_VERIFICATION_SUCCESS,
  SEND_VERIFICATION_FAIL,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAIL,
} from "../types";

type ActionType =
  | { type: typeof USER_LOADED; payload: object }
  | { type: typeof REGISTER_SUCCESS; payload: string }
  | { type: typeof REGISTER_FAIL; payload: IError[] }
  | { type: typeof LOGIN_SUCCESS; payload: string }
  | { type: typeof LOGIN_FAIL; payload: IError[] }
  | { type: typeof AUTH_ERROR; payload: IError[] }
  | { type: typeof LOGOUT }
  | { type: typeof FORGOT_FAIL; payload: IError[] }
  | { type: typeof FORGOT_SUCCESS; payload: string }
  | { type: typeof UPDATE_PASSWORD_FAIL; payload: IError[] }
  | { type: typeof UPDATE_DETAILS_FAIL; payload: IError[] }
  | { type: typeof UPDATE_PASSWORD_SUCCESS; payload: string }
  | { type: typeof CLEAR_ERRORS }
  | { type: typeof CLEAR_ALERTS }
  | { type: typeof UPDATE_DETAILS_SUCCESS; payload: string }
  | { type: typeof RESET_PASSWORD_FAIL; payload: IError[] }
  | { type: typeof RESET_PASSWORD_SUCCESS; payload: string }
  | { type: typeof SEND_VERIFICATION_SUCCESS; payload: string }
  | { type: typeof SEND_VERIFICATION_FAIL; payload: IError[] }
  | { type: typeof VERIFY_EMAIL_SUCCESS; payload: string }
  | { type: typeof VERIFY_EMAIL_FAIL; payload: IError[] };

const authReducer = (state: IAuthState, action: ActionType) => {
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
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        // ...action.payload,
        // token: action.payload, TODO: could make checking auth quicker, just not on page reload.
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case FORGOT_FAIL:
    case SEND_VERIFICATION_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        errors: [...state.errors, ...action.payload],
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: [],
      };
    case FORGOT_SUCCESS:
    case SEND_VERIFICATION_SUCCESS:
      return {
        ...state,
        mailsentmsg: action.payload,
      };
    case UPDATE_PASSWORD_FAIL:
    case UPDATE_DETAILS_FAIL:
    case RESET_PASSWORD_FAIL:
    case VERIFY_EMAIL_FAIL:
      return {
        ...state,
        errors: [...state.errors, ...action.payload],
      };
    case UPDATE_PASSWORD_SUCCESS:
    case UPDATE_DETAILS_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
    case VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        alerts: [...state.alerts, action.payload],
      };
    case CLEAR_ALERTS:
      return {
        ...state,
        alerts: [],
      };

    default:
      return state;
  }
};

export default authReducer;
