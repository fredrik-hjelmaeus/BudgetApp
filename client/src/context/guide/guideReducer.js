import { SET_GUIDE } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_GUIDE:
      return {
        ...state,
        guide: action.payload,
      };
    default:
      return state;
  }
};
