import React, { ReactNode, useReducer } from "react";
import uuid from "uuid";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";

export interface alertObject {
  msg: string;
  type: string;
  id: string;
}
type setAlert = (msg: string, type: string, timeout?: number) => void;

const AlertState = (props: { children: ReactNode }) => {
  const initialState: alertObject[] = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert: setAlert = (msg, type, timeout = 5000) => {
    const id = uuid.v4();

    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
