import { IPiggybank } from "./IPiggybank";

export interface INewPreset {
  id: string;
  name: string;
  number: number;
  month: string;
  year: number;
  category: string;
  type: string;
  piggybank: IPiggybank[];
  markdelete: boolean;
}
