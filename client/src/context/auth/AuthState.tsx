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
} from "../types";
import { IRegisterFormData } from "../../frontend-types/IRegisterFormData";
import { IAuthState } from "../../frontend-types/IAuthContext";
import { ILoginFormData } from "../../frontend-types/ILoginFormData";

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

  // Load User
  const loadUser = async () => {
    // load token into global headers
    if (localStorage.token) {
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
        dispatch({
          type: AUTH_ERROR,
          payload: err?.response?.data?.msg /* err.response.data.errors[0] */,
        });
      } else {
        console.log(err);
      }
    }
  };

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
        payload: res.data,
      });

      loadUser();
    } catch (err: unknown | AxiosError) {
      if (axios.isAxiosError(err)) {
        dispatch({
          type: REGISTER_FAIL,
          payload: err?.response?.data.errors[0],
        });
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
      loadUser();
    } catch (err: unknown | AxiosError) {
      if (axios.isAxiosError(err)) {
        dispatch({
          type: LOGIN_FAIL,
          payload: err?.response?.data.errors[0],
        });
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
        dispatch({
          type: FORGOT_FAIL,
          payload: err?.response?.data.errors[0],
        });
      } else {
        console.log(err);
      }
    }
  };

  //Reset Password
  const resetPassword = async (formData: { token: string; password: string }): Promise<void> => {
    const { token } = formData;

    try {
      await axios.put(`/api/auth/resetpassword/${token}`, formData); //endpoint/url
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: "Email sent" });
    } catch (err: unknown | AxiosError) {
      if (axios.isAxiosError(err)) {
        dispatch({
          type: RESET_PASSWORD_FAIL,
          payload: err?.response?.data.errors[0],
        });
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
      loadUser();
    } catch (err: unknown | AxiosError) {
      if (axios.isAxiosError(err)) {
        // console.log("updatedetailsfail", err.response.data.errors[0].msg);
        dispatch({
          type: UPDATE_DETAILS_FAIL,
          payload: err?.response?.data.errors[0],
        });
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
        dispatch({
          type: UPDATE_PASSWORD_FAIL,
          payload: err?.response?.data.errors[0],
        });
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
