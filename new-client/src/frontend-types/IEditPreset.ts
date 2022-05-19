import { IPreset } from "./IPreset";

export interface IEditPreset extends IPreset {
  user: string; // TODO: sufficient or make mongoose id or value object?
}
