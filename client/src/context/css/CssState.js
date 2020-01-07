import React, { useReducer } from 'react';
import CssContext from './cssContext';
import cssReducer from './cssReducer';
import {
  HIDE_NAVBAR,
  TOGGLE_MODAL,
  SET_YEARSUMMARY,
  SET_MODAL_PROPS
} from '../types';

const CssState = props => {
  const initialState = {
    navbar: true,
    modal: '',
    modalprops: null,
    yearsummary: 'balance'
  };

  const [state, dispatch] = useReducer(cssReducer, initialState);

  // Toggle Navbar
  const toggleNavbar = navbar =>
    dispatch({ type: HIDE_NAVBAR, payload: navbar });

  // Toggle modal
  const toggleModal = modal => dispatch({ type: TOGGLE_MODAL, payload: modal });

  // set modal props
  const setModalprops = what =>
    dispatch({ type: SET_MODAL_PROPS, payload: what });

  // Set Yearsummary
  const setYearSummary = yearsummary => {
    dispatch({ type: SET_YEARSUMMARY, payload: yearsummary });
  };

  return (
    <CssContext.Provider
      value={{
        navbar: state.navbar,
        modal: state.modal,
        modalprops: state.modalprops,
        yearsummary: state.yearsummary,
        toggleNavbar,
        toggleModal,
        setYearSummary,
        setModalprops
      }}
    >
      {props.children}
    </CssContext.Provider>
  );
};

export default CssState;
