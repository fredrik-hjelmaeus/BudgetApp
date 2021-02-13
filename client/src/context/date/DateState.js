import React, { useReducer } from 'react';
import DateContext from './dateContext';
import dateReducer from './dateReducer';
import { SET_DATE } from '../types';

const START_YEAR = 2021;

const DateState = (props) => {
  const initialState = {
    dateList: [
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
      START_YEAR,
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
    ],
  };

  const [state, dispatch] = useReducer(dateReducer, initialState);

  // Set date
  const setDate = (dateListArray) => {
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
