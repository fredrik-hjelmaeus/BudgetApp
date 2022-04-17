import { IPiggybank } from "./IPiggybank";

export interface IPreset {
  name: string;
  number: number;
  category: string;
  year: number;
  month: string;
  type: string;
  piggybank: IPiggybank[];
}
