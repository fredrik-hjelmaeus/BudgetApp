import { createContext } from "react";
import { IPresetContext } from "../../frontend-types/IPresetContext";

const presetContext = createContext<IPresetContext | null>(
  null //{
  // presets: null,
  /*  sum: null,
  edit: null,
  error: null,
  month: null, // year implemented. Only indirect affects
  MonthSum: null, // year implemented
  AllMonthSum: [], // year implemented
  PosMonthSum: null, // gets data from filteredmonthandnegnum
  NegMonthSum: null, // gets data from filteredmonthandposnum
  filteredmonthandposnum: null, // year implemented
  filteredmonthandnegnum: null, // year implemented
  categorymonthsum: [], // year implemented
  categoryyearsum: [], // year implemented
  year: null, // year implemented. needs more strict control of datatype. it changes between string and number
  yearsum: null, // year implemented
  savings: null, // year not used
  capital: null, // year not used
  categorynameonlyposnumbyyear: null, // year implemented
  categorynameonlynegnumbyyear: null, // year implemented
  categorysumonlyposnumbyyear: null, // year implemented
  categorysumonlynegnumbyyear: null, // year implemented
  piggybanks: [], // year implemented
  monthsavings: null, // year implemented
  monthsavingspresets: null, // year implemented
  monthpiggysavings: null, // year implemented no legacy
  SumPiggybanksMonth: 0, // year implemented
  MonthBalance: null, // year implemented
  purchases: null, // year independent
  csvpresets: null, // used to store values from csv-file in stagingarea
  doSubmitCsv: "",
  savingsList: [],
  capitalList: [], */
  //  addPreset: (preset) => Promise.resolve(),
  /*  calcSum: () => {},
  deletePreset: (id) => Promise.resolve(),
  setEdit: (preset) => {},
  cancelEdit: () => {},
  sendEdit: (preset) => Promise.resolve(), // Should be named updatePreset ?. It sends the edit-preset.
  getPresets: () => Promise.resolve(),
  clearPresets: () => {},
  addMonth: (month) => {},
  calcMonthSum: (month) => {},
  filterOutPositiveNumsAndMonth: (month) => {},
  filterOutNegativeNumsAndMonth: (month) => {},
  calcPosMonth: () => {},
  calcNegMonth: () => {},
  calcCategoryByMonth: (month) => {},
  calcCategoryByYear: () => {},
  resetSums: () => {},
  setYear: (year) => {},
  calcYearsum: (year) => {},
  calcSavings: () => {},
  calcCapital: () => {},
  setPurchase: () => {},
  setCategoryNameOnlyPosNumByYear: () => {},
  setCategoryNameOnlyNegNumByYear: () => {},
  calcCategorySumOnlyPosNumByYear: () => {},
  calcCategorySumOnlyNegNumByYear: () => {},
  calcAllMonthSum: (montharray) => {},
  addtoPiggybanks: (object) => {},
  setActivePiggybank: (piggybankArray) => {},
  clearPiggybanks: () => {},
  calcMonthSavings: () => {},
  getMonthSavings: (month) => {},
  getMonthPiggySavings: () => {},
  setTotalOfAllPiggybanksThisMonth: (Sum) => {},
  calcMonthBalance: () => {},
  uploadCSV: (formData) => Promise.resolve(),
  getSavingsList: () => {},
  getCapitalList: () => {},
  updateCsvPresets: (preset) => {},
  removeCSV: (preset) => {},
  clearCsv: () => {},
  submitCsvItems: (string) => {},
  getGuidePresets: () => {}, */
  //}
);

export default presetContext;
