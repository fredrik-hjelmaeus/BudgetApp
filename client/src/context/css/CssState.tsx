import React, { useReducer, ReactNode } from "react";
import CssContext from "./cssContext";
import cssReducer from "./cssReducer";
import {
  HIDE_NAVBAR,
  TOGGLE_MODAL,
  SET_YEARSUMMARY,
  SET_MODAL_PROPS,
  SET_DIMENSIONS,
} from "../types";

// Provider in your app with Reducer
const CssState = (props: { children: ReactNode }) => {
  const initialState = {
    navbar: false,
    modal: "",
    modalprops: null,
    yearsummary: "balance",
    dimensions: {
      height: window.innerHeight,
      width: window.innerWidth,
    },
  };
  const [state, dispatch] = useReducer(cssReducer, initialState);

  // Toggle Navbar
  const toggleNavbar = (navbar: boolean) => dispatch({ type: HIDE_NAVBAR, payload: navbar });

  // Toggle modal
  const toggleModal = (modal: string) => dispatch({ type: TOGGLE_MODAL, payload: modal });

  // set modal props
  const setModalprops = (props: object | null) => {
    if (props) {
      dispatch({ type: SET_MODAL_PROPS, payload: props });
    }
  };

  // Set Yearsummary
  const setYearSummary = (yearsummary: string) => {
    dispatch({ type: SET_YEARSUMMARY, payload: yearsummary });
  };

  // Set dimensions
  const setDimensions = () => {
    dispatch({ type: SET_DIMENSIONS });
  };
  return (
    <CssContext.Provider
      value={{
        navbar: state.navbar,
        modal: state.modal,
        modalprops: state.modalprops,
        yearsummary: state.yearsummary,
        dimensions: state.dimensions,
        toggleNavbar,
        toggleModal,
        setYearSummary,
        setModalprops,
        setDimensions,
      }}
    >
      {props.children}
    </CssContext.Provider>
  );
};

export default CssState;
