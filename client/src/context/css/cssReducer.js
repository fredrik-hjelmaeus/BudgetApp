import {
  HIDE_NAVBAR,
  TOGGLE_MODAL,
  SET_YEARSUMMARY,
  SET_MODAL_PROPS,
  SET_DIMENSIONS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case HIDE_NAVBAR:
      return {
        ...state,
        navbar: (action.payload = !action.payload)
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        modal: action.payload
      };
    case SET_MODAL_PROPS:
      return {
        ...state,
        modalprops: action.payload
      };
    case SET_YEARSUMMARY:
      return {
        ...state,
        yearsummary: action.payload
      };
    case SET_DIMENSIONS:
      return {
        ...state,
        dimensions: {
          height: window.innerHeight,
          width: window.innerWidth
        }
      };
    default:
      return state;
  }
};
