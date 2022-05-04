import { ICsvPreset } from "../../../middleware/ICsvPreset";
import { ICategoryAndSumItem } from "./ICategoryAndSumItem";
import { INewPreset } from "./INewPreset";
import { IPiggybank } from "./IPiggybank";
import { IPreset } from "./IPreset";
import { IUploadCsv } from "./IUploadCsv";

export interface IPresetState {
  presets: null | IPreset[];
  loading: boolean;
  edit: null | IPreset;
  sum: null | number; // sum of all presets
  month: null | string; // "January"
  error: null | string; // TODO: change to string[]
  MonthSum: null | number; // sum of all presets in the current/active month
  year: null | number; // TODO: needs more strict control of datatype. it changes between string and number
  filteredmonthandposnum: null | IPreset[]; // positive presets in the current/active month
  filteredmonthandnegnum: null | IPreset[]; // negative presets in the current/active month
  csvpresets: null | ICsvPreset[]; // used to store preset values from csv-file in stagingarea
  newPresets: null | INewPreset[]; // used to store preset values from csv-file in staging 2.
  AllMonthSum: number[]; // sum of all presets in all months for the current/active year
  PosMonthSum: null | number; // gets data from filteredmonthandnegnum
  NegMonthSum: null | number; // gets data from filteredmonthandposnum
  categorymonthsum: ICategoryAndSumItem[] | null; // sum of all presets in the current/active month by category
  categoryyearsum: ICategoryAndSumItem[]; // sum of all presets in the current/active year by category
  yearsum: null | number; // sum of all presets in the current/active year
  savings: null | number; // Sum of all savings
  capital: null | number; // Sum of all capital
  categorynameonlyposnumbyyear: null | string[]; // used in donut chart, setter fn name is setCategoryNameOnlyPosNumByYear
  categorynameonlynegnumbyyear: null | string[]; // used in donut chart, setter fn name is setCategoryNameOnlyNegNumByYear
  purchases: null | IPreset[]; // list of all purchases
  categorysumonlyposnumbyyear: null | number[]; // used in donut chart, setter fn name is calcCategorySumOnlyPosNumByYear
  categorysumonlynegnumbyyear: null | number[]; // used in donut char, setter fn name is calcCategorySumOnlyNegNumByYear
  piggybanks: IPiggybank[]; // used when editing piggybanks on one preset. Holds the edit values.
  // TODO: below monthpiggysavings should be more specific in its datatype
  monthpiggysavings: IPiggybank[][] | [] | 0; //IPreset[]; // purchase presets with piggybanksavings added this month,setter: getMonthPiggySavings
  monthsavings: null | number; // holds savings by month
  monthsavingspresets: null | IPreset[]; // presets with savings added this month , setter: getMonthSavings
  SumPiggybanksMonth: number; //  Sum of all piggybanks in current/active month, setter: setTotalOfAllPiggybanksThisMonth
  MonthBalance: null | number; // Sum of MonthSum-monthsavings-SumPiggybanksMonth, setter:calcMonthBalance
  doSubmitCsv: string;
  savingsList: IPreset[]; // List of savings, setter: getSavingsList
  capitalList: IPreset[]; // List of capital, setter: getCapitalList
}

export interface IPresetContext extends IPresetState {
  addPreset(preset: IPreset): void;
  getPresets(): Promise<void>;
  deletePreset(id: string): Promise<void>;
  setEdit(preset: IPreset): void;
  cancelEdit(): void;
  sendEdit(preset: IPreset): Promise<void>; // Should be named updatePreset ?. It sends the edit-preset.
  clearPresets(): void;
  calcSum(): void;
  addMonth(month: string): void;
  calcMonthSum(month: string): void;
  setYear(year: number): void;
  filterOutPositiveNumsAndMonth(month: string): void;
  filterOutNegativeNumsAndMonth(month: string): void;
  resetSums(): void;
  uploadCSV(formData: FormData): Promise<void>;
  calcPosMonth(): void;
  calcNegMonth(): void;
  calcCategoryByMonth(month: string): void;
  calcCategoryByYear(): void;
  calcYearsum(year: number): void;
  calcSavings(): void;
  calcCapital(): void;
  setCategoryNameOnlyPosNumByYear(): void;
  setCategoryNameOnlyNegNumByYear(): void;
  setPurchase(): void;
  calcCategorySumOnlyPosNumByYear(): void;
  calcCategorySumOnlyNegNumByYear(): void;
  calcAllMonthSum(montharray: string[]): void;
  addtoPiggybanks(object: IPiggybank): void;
  setActivePiggybank(piggybankArray: IPiggybank[]): void;
  clearPiggybanks(): void;
  getMonthPiggySavings(month: string): void;
  getMonthSavings(month: string): void;
  calcMonthSavings(): void;
  setTotalOfAllPiggybanksThisMonth(Sum: number): void;
  calcMonthBalance(): void;
  submitCsvItems(string: string): void;
  getSavingsList(): void;
  getCapitalList(): void;
  updateCsvPresets(preset: ICsvPreset): void;
  setNewPresets(preset: INewPreset): void;
  removeCSV(id: string): void;
  clearCsv(): void;
  getGuidePresets(): void;
  clearPresetErrors(): void;
}
