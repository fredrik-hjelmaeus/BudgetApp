import React, { ReactNode, useReducer } from "react";
import GuideContext from "./guideContext";
import guideReducer from "./guideReducer";
import { SET_GUIDE, TOGGLE_EXIT } from "../types";
import { IGuideContext, IGuideState } from "../../frontend-types/IGuideContext";

const GuideState = (props: { children: ReactNode }) => {
  const initialState: IGuideState = {
    guide: null,
    exitedguide: localStorage.exitedguide || false,
  };

  const [state, dispatch] = useReducer(guideReducer, initialState);

  // Set guide-step
  const setGuide: IGuideContext["setGuide"] = (guideStr) =>
    dispatch({ type: SET_GUIDE, payload: guideStr });

  // Set user exitedguide
  const setUserExited: IGuideContext["setUserExited"] = (boolean) => {
    dispatch({ type: TOGGLE_EXIT, payload: boolean });
  };

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
