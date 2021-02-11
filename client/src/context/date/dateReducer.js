import { SET_DATE } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_DATE:
      return {
        ...state,
        dateList: action.payload,
      };

    default:
      return state;
  }
};
