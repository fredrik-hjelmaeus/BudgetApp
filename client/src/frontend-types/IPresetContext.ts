import { ICategoryAndSumItem } from "./ICategoryAndSumItem";
import { IPiggybank } from "./IPiggybank";
import { IPreset } from "./IPreset";

export interface IPresetState {
  presets: null | IPreset[];
  sum: null | number; // sum of all presets
  edit: null | IPreset;
  error: null | string; // TODO: change to string[]
  month: null | string; // "January"
  MonthSum: null | number; // sum of all presets in the current/active month
  AllMonthSum: number[]; // sum of all presets in all months for the current/active year
  PosMonthSum: null | number; // gets data from filteredmonthandnegnum
  NegMonthSum: null | number; // gets data from filteredmonthandposnum
  filteredmonthandposnum: null | IPreset[]; // positive presets in the current/active month
  filteredmonthandnegnum: null | IPreset[]; // negative presets in the current/active month
  categorymonthsum: ICategoryAndSumItem[]; // sum of all presets in the current/active month by category
  categoryyearsum: ICategoryAndSumItem[]; // sum of all presets in the current/active year by category
  year: null | number; // TODO: needs more strict control of datatype. it changes between string and number
  yearsum: null | number; // sum of all presets in the current/active year
  savings: null | number; // Sum of all savings
  capital: null | number; // Sum of all capital
  categorynameonlyposnumbyyear: null | string[]; // used in donut chart, setter fn name is setCategoryNameOnlyPosNumByYear
  categorynameonlynegnumbyyear: null | string[]; // used in donut chart, setter fn name is setCategoryNameOnlyNegNumByYear
  categorysumonlyposnumbyyear: null | number[]; // used in donut chart, setter fn name is calcCategorySumOnlyPosNumByYear
  categorysumonlynegnumbyyear: null | number[]; // used in donut char, setter fn name is calcCategorySumOnlyNegNumByYear
  piggybanks: IPiggybank[]; // used when editing piggybanks on one preset. Holds the edit values.
  monthsavings: null | number; // holds savings by month
  monthsavingspresets: null | IPreset[]; // presets with savings added this month and purchases with piggybanksavings added this month
  monthpiggysavings: null; // year implemented no legacy   <------- HERE
  SumPiggybanksMonth: 0; // year implemented
  MonthBalance: null; // year implemented
  purchases: null; // year independent
  csvpresets: null; // used to store values from csv-file in stagingarea
  doSubmitCsv: "";
  savingsList: [];
  capitalList: [];
}

export interface IPresetContext extends IPresetState {}
