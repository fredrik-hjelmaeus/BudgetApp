import React, { useReducer } from 'react';
import GuideContext from './guideContext';
import guideReducer from './guideReducer';
import { SET_GUIDE } from '../types';

const GuideState = (props) => {
  const initialState = {
    guide: null,
  };

  const [state, dispatch] = useReducer(guideReducer, initialState);

  // Set guide-step
  const setGuide = (string) => dispatch({ type: SET_GUIDE, payload: string });

  return (
    <GuideContext.Provider
      value={{
        guide: state.guide,
        setGuide,
      }}
    >
      {props.children}
    </GuideContext.Provider>
  );
};

export default GuideState;
