import React, { useReducer } from 'react';
import CssContext from './cssContext';
import cssReducer from './cssReducer';
import { HIDE_NAVBAR, TOGGLE_MODAL, SET_YEARSUMMARY } from '../types';

const CssState = props => {
  const initialState = {
    navbar: true,
    modal: '',
    yearsummary: 'balance'
  };

  const [state, dispatch] = useReducer(cssReducer, initialState);

  // Toggle Navbar
  const toggleNavbar = navbar =>
    dispatch({ type: HIDE_NAVBAR, payload: navbar });

  // Toggle modal
  const toggleModal = modal => dispatch({ type: TOGGLE_MODAL, payload: modal });

  // Set Yearsummary
  const setYearSummary = yearsummary => {
    dispatch({ type: SET_YEARSUMMARY, payload: yearsummary });
  };

  return (
    <CssContext.Provider
      value={{
        navbar: state.navbar,
        modal: state.modal,
        yearsummary: state.yearsummary,
        toggleNavbar,
        toggleModal,
        setYearSummary
      }}
    >
      {props.children}
    </CssContext.Provider>
  );
};

export default CssState;
