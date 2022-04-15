import React, { useReducer, createContext, useContext, useState, ReactNode } from "react";
//import cssReducer from "./cssReducer";
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
  setNavbar: (navbar: boolean) => void;
  setModal: (modal: string) => void;
  setYearSummary: (yearsummary: string) => void;
  setModalprops: (props: string | null) => void;
  setDimensions: () => void;
}

const cssContext = createContext<ICssContext | null>(null);

// Provider in your app
const useCssContext: ICssContext = {
  navbar: true,
  modal: "",
  modalprops: null,
  yearsummary: "balance",
  dimensions: {
    height: window.innerHeight,
    width: window.innerWidth,
  },
  setNavbar: (navbar: boolean) => {
    console.log("setNavbar");
  },
  setModal: (modal: string) => {
    console.log("setModal");
  },
  setYearSummary: (yearsummary: string) => {
    console.log("setYearSummary");
  },
  setModalprops: (props: string | null) => {
    console.log("setModalprops");
  },
  setDimensions: () => {
    console.log("setDimensions");
  },
};

const CssContext = (props: { children: ReactNode | null }) => (
  <cssContext.Provider value={useCssContext}>{props?.children}</cssContext.Provider>
);
export default CssContext;
/* 

// consume in your app
export const PostInfo = () => {
  const cssContext = useContext(CssContext);
  return (
    <div>
      <h1>{cssContext?.navbar}</h1>
    </div>
  );
}; */
