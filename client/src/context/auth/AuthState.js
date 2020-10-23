import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
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

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
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
      const res = await axios.get('/api/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'My_User-Agent': 'react',
      },
    };

    try {
      const res = await axios.post('/api/users', formData, config); //endpoint/url

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'My_User-Agent': 'react',
      },
    };

    try {
      const res = await axios.post('/api/auth', formData, config); //endpoint/url

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
  // Logout
  const logout = () => dispatch({ type: LOGOUT });
  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  //Forgot Password
  const forgotPassword = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'My_User-Agent': 'react',
      },
    };

    try {
      const res = await axios.post('/api/auth/forgotpassword', formData, config); //endpoint/url

      dispatch({
        type: FORGOT_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      /*  dispatch({
        type: FORGOT_FAIL,
        payload: err,
      }); */
    }
  };

  //Reset Password
  const resetPassword = async (formData) => {
    const { token } = formData;
    // console.log(password);
    // console.log(token);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`/api/auth/resetpassword/${token}`, formData); //endpoint/url
      console.log('success');
    } catch (err) {
      /*  dispatch({
        type: FORGOT_FAIL,
        payload: err.res.data,
      }); */
      console.log(err);
    }
  };

  //update userdetails
  const updateDetails = async (formData) => {
    console.log(formData);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put('/api/auth/updatedetails', formData, config);
      console.log('success');
      loadUser();
    } catch (err) {
      console.log(err);
      dispatch({
        type: UPDATE_DETAILS_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  //update Password
  const updatePassword = async (formData) => {
    console.log(formData);
    const config = {
      'Content-Type': 'application/json',
    };
    try {
      const res = await axios.put('/api/auth/updatepassword', formData, config);
      console.log('success');
    } catch (err) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
