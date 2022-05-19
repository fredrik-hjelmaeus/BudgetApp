import {
  HIDE_NAVBAR,
  TOGGLE_MODAL,
  SET_YEARSUMMARY,
  SET_MODAL_PROPS,
  SET_DIMENSIONS,
} from "../types";

type ActionType =
  | { type: typeof HIDE_NAVBAR; payload: boolean }
  | { type: typeof TOGGLE_MODAL; payload: string }
  | { type: typeof SET_YEARSUMMARY; payload: string }
  | { type: typeof SET_MODAL_PROPS; payload: object }
  | { type: typeof SET_DIMENSIONS };

const cssReducer = (state: any, action: ActionType) => {
  switch (action.type) {
    case HIDE_NAVBAR:
      return {
        ...state,
        navbar: (action.payload = !action.payload),
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    case SET_MODAL_PROPS:
      return {
        ...state,
        modalprops: action.payload,
      };
    case SET_YEARSUMMARY:
      return {
        ...state,
        yearsummary: action.payload,
      };
    case SET_DIMENSIONS:
      return {
        ...state,
        dimensions: {
          height: window.innerHeight,
          width: window.innerWidth,
        },
      };
    default:
      return state;
  }
};

export default cssReducer;
