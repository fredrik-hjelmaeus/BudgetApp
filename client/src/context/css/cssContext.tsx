import React, { useReducer, createContext, ReactNode } from "react";
import cssReducer from "./cssReducer";
import {
  HIDE_NAVBAR,
  TOGGLE_MODAL,
  SET_YEARSUMMARY,
  SET_MODAL_PROPS,
  SET_DIMENSIONS,
} from "../types";

// Blueprint for the data we want to store in the context
interface ICssContext {
  navbar: boolean;
  modal: string;
  modalprops: string | null;
  yearsummary: string;
  dimensions: {
    height: number;
    width: number;
  };
  toggleNavbar: (navbar: boolean) => void;
  toggleModal: (modal: string) => void;
  setYearSummary: (yearsummary: string) => void;
  setModalprops: (props: string | null) => void;
  setDimensions: () => void;
}

const cssContext = createContext<ICssContext | null>(null);

// Provider in your app with Reducer
const CssContext = (props: { children: ReactNode }) => {
  const initialState = {
    navbar: true,
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
  const setModalprops = (props: any) => dispatch({ type: SET_MODAL_PROPS, payload: props });

  // Set Yearsummary
  const setYearSummary = (yearsummary: any) => {
    dispatch({ type: SET_YEARSUMMARY, payload: yearsummary });
  };

  // Set dimensions
  const setDimensions = () => {
    dispatch({ type: SET_DIMENSIONS });
  };
  return (
    <cssContext.Provider
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
    </cssContext.Provider>
  );
};

export default CssContext;
