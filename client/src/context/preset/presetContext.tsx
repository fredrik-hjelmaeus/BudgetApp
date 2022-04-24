import { createContext } from "react";
import { IPresetContext } from "../../frontend-types/IPresetContext";

const presetContext = createContext<IPresetContext>({
  presets: [],
  loading: true,
  edit: null,
  sum: 0,
  month: "January",
  error: "whatever",
  MonthSum: 0,
  year: 0,
  filteredmonthandposnum: [],
  filteredmonthandnegnum: [],
  csvpresets: null,
  AllMonthSum: [],
  PosMonthSum: null,
  NegMonthSum: null,
  categorymonthsum: null,
  categoryyearsum: [],
  yearsum: null,
  savings: null,
  capital: null,
  categorynameonlyposnumbyyear: null,
  categorynameonlynegnumbyyear: null,
  purchases: null,
  categorysumonlyposnumbyyear: null,
  categorysumonlynegnumbyyear: null,
  piggybanks: [],
  monthpiggysavings: [],
  monthsavings: null,
  monthsavingspresets: null,
  SumPiggybanksMonth: 0,
  MonthBalance: null,
  doSubmitCsv: "",
  savingsList: [],
  capitalList: [],
  addPreset: () => {},
  getPresets: () => Promise.resolve(),
  deletePreset: () => Promise.resolve(),
  setEdit: () => {},
  cancelEdit: () => {},
  sendEdit: () => Promise.resolve(),
  clearPresets: () => {},
  calcSum: () => {},
  addMonth: () => {},
  calcMonthSum: () => {},
  setYear: () => {},
  filterOutPositiveNumsAndMonth: () => {},
  filterOutNegativeNumsAndMonth: () => {},
  resetSums: () => {},
  uploadCSV: () => Promise.resolve(),
  calcPosMonth: () => {},
  calcNegMonth: () => {},
  calcCategoryByMonth: () => {},
  calcCategoryByYear: () => {},
  calcYearsum: () => {},
  calcSavings: () => {},
  calcCapital: () => {},
  setCategoryNameOnlyPosNumByYear: () => {},
  setCategoryNameOnlyNegNumByYear: () => {},
  setPurchase: () => {},
  calcCategorySumOnlyPosNumByYear: () => {},
  calcCategorySumOnlyNegNumByYear: () => {},
  calcAllMonthSum: () => {},
  addtoPiggybanks: () => {},
  setActivePiggybank: () => {},
  clearPiggybanks: () => {},
  getMonthPiggySavings: () => {},
  getMonthSavings: () => {},
  calcMonthSavings: () => {},
  setTotalOfAllPiggybanksThisMonth: () => {},
  calcMonthBalance: () => {},
  submitCsvItems: () => {},
  getSavingsList: () => {},
  getCapitalList: () => {},
  updateCsvPresets: () => {},
  removeCSV: () => {},
  clearCsv: () => {},
  getGuidePresets: () => {},
  clearPresetErrors: () => {},
});

export default presetContext;
