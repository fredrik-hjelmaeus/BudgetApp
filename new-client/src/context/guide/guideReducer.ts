import { SET_GUIDE, TOGGLE_EXIT } from "../types";
import { IGuideState } from "../../frontend-types/IGuideContext";

type ActionType =
  | { type: typeof TOGGLE_EXIT; payload: boolean | null }
  | { type: typeof SET_GUIDE; payload: string | null };

function guideReducer(state: IGuideState, action: ActionType) {
  switch (action.type) {
    case TOGGLE_EXIT:
      action.payload
        ? localStorage.setItem("exitedguide", action.payload.toString())
        : localStorage.removeItem("exitedguide");
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
}
export default guideReducer;
