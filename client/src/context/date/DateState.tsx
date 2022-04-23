import React, { ReactNode, useReducer } from "react";
import DateContext from "./dateContext";
import dateReducer from "./dateReducer";
import { SET_DATE } from "../types";
import { IDateState } from "../../frontend-types/IDateContext";

const START_YEAR = 2021;

const DateState = (props: { children: ReactNode }) => {
  const initialState: IDateState = {
    dateList: [
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
      START_YEAR,
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
    ],
  };

  const [state, dispatch] = useReducer(dateReducer, initialState);

  // Set date
  const setDate = (dateListArray: Array<string | number>) => {
    dispatch({ type: SET_DATE, payload: dateListArray });
  };

  return (
    <DateContext.Provider
      value={{
        dateList: state.dateList,
        setDate,
      }}
    >
      {props.children}
    </DateContext.Provider>
  );
};

export default DateState;
