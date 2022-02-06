import React, { useReducer } from 'react';
import GuideContext from './guideContext';
import guideReducer from './guideReducer';
import { SET_GUIDE, TOGGLE_EXIT } from '../types';

const GuideState = (props) => {
  const initialState = {
    guide: null,
    exitedguide: localStorage.exitedguide || false,
  };

  const [state, dispatch] = useReducer(guideReducer, initialState);

  // Set guide-step
  const setGuide = (string) => dispatch({ type: SET_GUIDE, payload: string });

  // Set user exitedguide
  const setUserExited = (boolean) => {
    dispatch({ type: TOGGLE_EXIT, payload: boolean });
  };
  console.log(state.exitedguide);
  return (
    <GuideContext.Provider
      value={{
        guide: state.guide,
        exitedguide: state.exitedguide,
        setGuide,
        setUserExited,
      }}
    >
      {props.children}
    </GuideContext.Provider>
  );
};

export default GuideState;
