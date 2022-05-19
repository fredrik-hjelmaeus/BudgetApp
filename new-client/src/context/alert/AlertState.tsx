import React, { ReactNode, useReducer } from "react";
import { v4 as uuid } from "uuid";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";
import { alertObject, IAlertContext, IAlertState } from "../../frontend-types/IAlertContext";

const AlertState = (props: { children: ReactNode }) => {
  const initialState: IAlertState = {
    alerts: [] as alertObject[],
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert: IAlertContext["setAlert"] = (msg, type, timeout = 5000) => {
    const id = uuid();

    const alertObj: alertObject = {
      msg,
      type,
      id,
    };
    dispatch({ type: SET_ALERT, payload: alertObj });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state.alerts,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
