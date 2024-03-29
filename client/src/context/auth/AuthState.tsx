import React, { ReactNode, useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  FORGOT_SUCCESS,
  FORGOT_FAIL,
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
import { IRegisterFormData } from "../../frontend-types/IRegisterFormData";
import { IAuthState } from "../../frontend-types/IAuthContext";
import { ILoginFormData } from "../../frontend-types/ILoginFormData";
import { IErrorResponse } from "../../frontend-types/IErrorResponse";

const AuthState = (props: { children: ReactNode }) => {
  const initialState: IAuthState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
    user: null,
    errors: [],
    alerts: [],
    mailsentmsg: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  //console.log("AuthState ran, token: ", state.token);
  // set token on initial app loading
  //state.token && setAuthToken(state.token);

  // Load User
  const loadUser = async () => {
    // load token into global headers
    if (localStorage.token) {
      if (!state.token) {
        setAuthToken(localStorage.token);
      }

      try {
        const res = await axios.get("/api/auth");

        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
      } catch (err: unknown | AxiosError) {
        if (axios.isAxiosError(err)) {
          const serverError = err as AxiosError<IErrorResponse>;
          if (serverError.response) {
            dispatch({
              type: AUTH_ERROR,
              payload: serverError?.response?.data.errors /* err.response.data.errors[0] */,
            });
          }
        } else {
          console.log(err);
        }
      }
    } else {
      // This payload is not relevant to send to user, but AUTH_ERROR makes sure loading is set to false, otherwise endless loading
      // This is filtered out in loginmodal and registermodal show it isnt displayed for user
      dispatch({
        type: AUTH_ERROR,
        payload: [{ msg: "No token found" }],
      });
    }
  };

  // load user on first run or refresh
  if (state.loading) {
    loadUser();
  }

  // Register User
  const register = async (formData: IRegisterFormData): Promise<void> => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "My_User-Agent": "react",
      },
    };

    try {
      const res: AxiosResponse = await axios.post("/api/users", formData, config); //endpoint/url

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.token,
      });

      // loadUser();
    } catch (err: unknown | AxiosError) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<IErrorResponse>;
        if (serverError.response) {
          dispatch({
            type: REGISTER_FAIL,
            payload: serverError?.response?.data.errors,
          });
        }
      } else {
        console.log(err);
      }
    }
  };

  // Login User
  const login = async (formData: ILoginFormData): Promise<void> => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "My_User-Agent": "react",
      },
    };

    try {
      const res: AxiosResponse = await axios.post("/api/auth", formData, config); //endpoint/url

      if (res.data.token) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data.token,
        });
      }
      //loadUser();
    } catch (err: unknown | AxiosError) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<IErrorResponse>;
        if (serverError.response) {
          dispatch({
            type: LOGIN_FAIL,
            payload: serverError?.response?.data.errors,
          });
        }
      } else {
        console.log(err);
      }
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });
  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  //Forgot Password
  const forgotPassword = async (formData: { email: string }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "My_User-Agent": "react",
      },
    };

    try {
      const res: AxiosResponse = await axios.post("/api/auth/forgotpassword", formData, config);

      dispatch({
        type: FORGOT_SUCCESS,
        payload: res.data,
      });
    } catch (err: unknown | AxiosError) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<IErrorResponse>;
        if (serverError.response) {
          dispatch({
            type: FORGOT_FAIL,
            payload: serverError?.response?.data.errors, // TODO: check if we want to add errors[0] or the whole array as now.
          });
        }
      } else {
        console.log(err);
      }
    }
  };

  // sendEmailVerification
  const sendEmailVerification = async (formData: { email: string }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "My_User-Agent": "react",
      },
    };

    try {
      const res: AxiosResponse = await axios.post(
        "/api/auth/sendemailverification",
        formData,
        config
      );

      dispatch({
        type: SEND_VERIFICATION_SUCCESS,
        payload: res.data,
      });
    } catch (err: unknown | AxiosError) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<IErrorResponse>;
        if (serverError.response) {
          dispatch({
            type: SEND_VERIFICATION_FAIL,
            payload: serverError?.response?.data.errors,
          });
        }
      } else {
        console.log(err);
      }
    }
  };

  //Reset Password
  const resetPassword = async (formData: { token: string; password: string }): Promise<void> => {
    const { token } = formData;
    console.log(token);
    try {
      const res = await axios.put(`/api/auth/resetpassword/${token}`, formData); //endpoint/url
      console.log(res.data);
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: res.data });
    } catch (err: unknown | AxiosError) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<IErrorResponse>;
        if (serverError.response) {
          dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: serverError?.response?.data.errors,
          });
        }
      } else {
        console.log(err);
      }
    }
  };

  // verify Email
  const verifyEmail = async (token: string): Promise<void> => {
    try {
      const res = await axios.put(`/api/auth/verifyEmail/${token}`);

      dispatch({ type: VERIFY_EMAIL_SUCCESS, payload: res.data });
    } catch (err: unknown | AxiosError) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<IErrorResponse>;
        if (serverError.response) {
          dispatch({
            type: VERIFY_EMAIL_FAIL,
            payload: serverError?.response?.data.errors,
          });
        }
      } else {
        console.log(err);
      }
    }
  };

  //update userdetails
  const updateDetails = async (formData: { name: string; email: string }): Promise<void> => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.put("/api/auth/updatedetails", formData, config);

      dispatch({
        type: UPDATE_DETAILS_SUCCESS,
        payload: "User details updated",
      });
      //loadUser();
    } catch (err: unknown | AxiosError) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<IErrorResponse>;
        if (serverError.response) {
          dispatch({
            type: UPDATE_DETAILS_FAIL,
            payload: serverError?.response?.data.errors,
          });
        }
      } else {
        console.log(err);
      }
    }
  };

  //update Password
  const updatePassword = async (formData: {
    currentPassword: string;
    password: string;
  }): Promise<void> => {
    const config: AxiosRequestHeaders = {
      "Content-Type": "application/json",
    };
    try {
      await axios.put("/api/auth/updatepassword", formData, config);

      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: "Password updated",
      });
    } catch (err: unknown | AxiosError) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<IErrorResponse>;
        if (serverError.response) {
          dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: serverError?.response?.data.errors,
          });
        }
      } else {
        console.log(err);
      }
    }
  };

  const clearAlerts = () => dispatch({ type: CLEAR_ALERTS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        errors: state.errors,
        alerts: state.alerts,
        mailsentmsg: state.mailsentmsg,
        register,
        login,
        logout,
        clearErrors,
        loadUser,
        forgotPassword,
        resetPassword,
        updateDetails,
        updatePassword,
        clearAlerts,
        sendEmailVerification,
        verifyEmail,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
