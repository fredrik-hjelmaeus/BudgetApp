import { SET_ALERT, REMOVE_ALERT } from "../types";
import { alertObject } from "./AlertState";

type ActionType =
  | { type: typeof SET_ALERT; payload: alertObject }
  | { type: typeof REMOVE_ALERT; payload: string };

function alertReducer(state: alertObject[], action: ActionType) {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
}
export default alertReducer;
