import { SET_GUIDE, TOGGLE_EXIT } from '../types';

export default (state, action) => {
  switch (action.type) {
    case TOGGLE_EXIT:
      localStorage.setItem('exitedguide', action.payload);
      return {
        ...state,
        exitedguide: action.payload,
      };
    case SET_GUIDE:
      return {
        ...state,
        guide: action.payload,
      };
    default:
      return state;
  }
};
