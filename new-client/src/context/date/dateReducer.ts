import { IDateState } from "../../frontend-types/IDateContext";
import { SET_DATE } from "../types";

type ActionType = { type: typeof SET_DATE; payload: Array<string | number> };

function dateReducer(state: IDateState, action: ActionType) {
  switch (action.type) {
    case SET_DATE:
      return {
        ...state,
        dateList: action.payload,
      };

    default:
      return state;
  }
}
export default dateReducer;
