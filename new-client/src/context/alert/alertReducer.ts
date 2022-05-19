import { alertObject, IAlertState } from "../../frontend-types/IAlertContext";
import { SET_ALERT, REMOVE_ALERT } from "../types";

type ActionType =
  | { type: typeof SET_ALERT; payload: alertObject }
  | { type: typeof REMOVE_ALERT; payload: string };

function alertReducer(state: IAlertState, action: ActionType) {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, action.payload],
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.payload),
      };
    default:
      return state;
  }
}
export default alertReducer;
