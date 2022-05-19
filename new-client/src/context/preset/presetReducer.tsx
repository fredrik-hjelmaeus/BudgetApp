import { ICsvPreset } from "../../../../middleware/ICsvPreset";
import { ICategoryAndSumItem } from "../../frontend-types/ICategoryAndSumItem";
import { INewPreset } from "../../frontend-types/INewPreset";
import { IPiggybank } from "../../frontend-types/IPiggybank";
import { IPreset } from "../../frontend-types/IPreset";
import { IPresetState } from "../../frontend-types/IPresetContext";
import {
  GET_PRESETS,
  ADD_PRESET,
  DELETE_PRESET,
  EDIT_PRESET,
  CANCEL_EDIT,
  SEND_EDIT,
  SUM,
  PRESET_ERROR,
  CLEAR_PRESETS,
  ADD_MONTH,
  MONTHSUM,
  FILTER_POSNUMANDMONTH,
  FILTER_NEGNUMANDMONTH,
  POSMONTHSUM,
  NEGMONTHSUM,
  CATEGORYMONTHSUM,
  RESET_SUMS,
  SET_YEAR,
  CATEGORYYEARSUM,
  YEARSUM,
  CALCSAVINGS,
  SET_SAVINGS_LIST,
  CALCCAPITAL,
  SET_PURCHASE,
  CATEGORY_NAMEONLYPOSNUM_BYYEAR,
  CATEGORY_SUMONLYPOSNUM_BYYEAR,
  CATEGORY_SUMONLYNEGNUM_BYYEAR,
  CATEGORY_NAMEONLYNEGNUM_BYYEAR,
  SET_ALLMONTHSUM,
  RESET_ALLMONTHSUM,
  ADDTO_PIGGYBANK,
  SET_ACTIVE_PIGGYBANK,
  CLEAR_PIGGYBANKS,
  CALC_MONTH_SAVINGS,
  GET_MONTHSAVINGS,
  GET_MONTHPIGGYSAVINGS,
  SUM_PIGGYBANKS_MONTH,
  CALC_MONTH_BALANCE,
  UPLOAD_CSV,
  UPDATE_CSV,
  SUBMIT_CSV,
  CLEAR_CSV,
  REMOVE_CSV,
  LOGOUT,
  PRESET_CLEAR_ERRORS,
  SET_CAPITAL_LIST,
  SET_NEWPRESETS,
} from "../types";

type ActionType =
  | { type: typeof GET_PRESETS; payload: IPreset[] }
  | { type: typeof PRESET_ERROR; payload: string }
  | { type: typeof ADD_PRESET; payload: IPreset }
  | { type: typeof DELETE_PRESET; payload: string }
  | { type: typeof EDIT_PRESET; payload: IPreset }
  | { type: typeof CANCEL_EDIT }
  | { type: typeof SEND_EDIT; payload: IPreset }
  | { type: typeof CLEAR_PRESETS }
  | { type: typeof SUM; payload: number }
  | { type: typeof ADD_MONTH; payload: string }
  | { type: typeof MONTHSUM; payload: number }
  | { type: typeof SET_YEAR; payload: number }
  | { type: typeof FILTER_POSNUMANDMONTH; payload: string }
  | { type: typeof FILTER_NEGNUMANDMONTH; payload: string }
  | { type: typeof RESET_SUMS }
  | { type: typeof POSMONTHSUM; payload: number }
  | { type: typeof NEGMONTHSUM; payload: number }
  | { type: typeof CATEGORYMONTHSUM; payload: Array<ICategoryAndSumItem> }
  | { type: typeof CATEGORYYEARSUM; payload: Array<ICategoryAndSumItem> }
  | { type: typeof UPLOAD_CSV; payload: Array<ICsvPreset> }
  | { type: typeof SET_ALLMONTHSUM; payload: number }
  | { type: typeof RESET_ALLMONTHSUM }
  | { type: typeof YEARSUM; payload: number }
  | { type: typeof CALCSAVINGS; payload: number }
  | { type: typeof CALCCAPITAL; payload: number }
  | { type: typeof CATEGORY_NAMEONLYNEGNUM_BYYEAR; payload: string[] }
  | { type: typeof CATEGORY_NAMEONLYPOSNUM_BYYEAR; payload: string[] }
  | { type: typeof SET_PURCHASE }
  | { type: typeof CATEGORY_SUMONLYPOSNUM_BYYEAR; payload: number[] }
  | { type: typeof CATEGORY_SUMONLYNEGNUM_BYYEAR; payload: number[] }
  | { type: typeof ADDTO_PIGGYBANK; payload: IPiggybank }
  | { type: typeof SET_ACTIVE_PIGGYBANK; payload: IPiggybank[] }
  | { type: typeof CLEAR_PIGGYBANKS }
  | { type: typeof GET_MONTHPIGGYSAVINGS; payload: Array<IPiggybank[]> | 0 }
  | { type: typeof GET_MONTHSAVINGS; payload: Array<IPreset> }
  | { type: typeof CALC_MONTH_SAVINGS; payload: number }
  | { type: typeof SUM_PIGGYBANKS_MONTH; payload: number }
  | { type: typeof CALC_MONTH_BALANCE; payload: number }
  | { type: typeof SUBMIT_CSV; payload: string }
  | { type: typeof SET_SAVINGS_LIST; payload: Array<IPreset> }
  | { type: typeof UPDATE_CSV; payload: ICsvPreset }
  | { type: typeof SET_NEWPRESETS; payload: INewPreset[] }
  | { type: typeof SET_CAPITAL_LIST; payload: Array<IPreset> }
  | { type: typeof REMOVE_CSV; payload: string }
  | { type: typeof CLEAR_CSV }
  | { type: typeof PRESET_CLEAR_ERRORS }
  | { type: typeof LOGOUT };

function presetReducer(state: IPresetState, action: ActionType) {
  switch (action.type) {
    case GET_PRESETS:
      return {
        ...state,
        presets: action.payload,
        loading: false,
      };
    case PRESET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_PRESET:
      return {
        ...state,
        presets: state.presets && [...state.presets, action.payload],
        loading: false,
      };
    case DELETE_PRESET:
      return {
        ...state,
        presets: state.presets && state.presets?.filter((preset) => preset.id !== action.payload),
        loading: false,
      };
    case SEND_EDIT:
      return {
        ...state,
        presets:
          state.presets &&
          state.presets?.map((preset) =>
            preset.id === action.payload.id ? action.payload : preset
          ),
        loading: false,
      };
    case EDIT_PRESET:
      return {
        ...state,
        edit: action.payload,
      };
    case CANCEL_EDIT:
      return {
        ...state,
        edit: null,
      };
    //case LOGOUT:
    case CLEAR_PRESETS:
      return {
        ...state,
        presets: null,
        error: null,
        edit: null,
        sum: null,
        MonthSum: null,
        AllMonthSum: [],
        PosMonthSum: null,
        NegMonthSum: null,
        filteredmonthandposnum: null,
        filteredmonthandnegnum: null,
        categorymonthsum: [],
        categoryyearsum: [],
        year: null,
        yearsum: null,
        savings: null,
        capital: null,
        MonthBalance: null,
        purchases: null,
        csvpresets: null,
        //year: '2019',
        month: null,
      };
    case SUM:
      return {
        ...state,
        sum: action.payload,
      };
    case SET_YEAR:
      return {
        ...state,
        year: action.payload,
        month: null,
      };
    case ADD_MONTH:
      return {
        ...state,
        month: action.payload,
      };
    case MONTHSUM:
      return {
        ...state,
        MonthSum: action.payload,
      };
    case FILTER_POSNUMANDMONTH:
      return {
        ...state,
        filteredmonthandposnum:
          state.presets &&
          state.presets.filter(
            (preset) =>
              preset.month === action.payload &&
              preset.number > 0 &&
              preset.type !== "savings" &&
              preset.type !== "capital" &&
              preset.type !== "purchase" &&
              preset.year.toString() === state.year?.toString() // multiple datatypes
          ),
      };
    case FILTER_NEGNUMANDMONTH:
      return {
        ...state,
        filteredmonthandnegnum:
          state.presets &&
          state.presets.filter(
            (preset) =>
              preset.month === action.payload &&
              preset.number < 0 &&
              preset.type !== "savings" &&
              preset.type !== "capital" &&
              preset.type !== "purchase" &&
              preset.year.toString() === state.year?.toString() // multiple datatypes
          ),
      };
    case RESET_SUMS:
      return {
        ...state,
        sum: null,
        MonthSum: null,
        PosMonthSum: null,
        NegMonthSum: null,
        categorymonthsum: null,
      };

    case UPLOAD_CSV:
      return {
        ...state,
        csvpresets: action.payload,
      };
    case SET_ALLMONTHSUM:
      return {
        ...state,
        AllMonthSum: [...state.AllMonthSum, action.payload],
      };
    case RESET_ALLMONTHSUM:
      return {
        ...state,
        AllMonthSum: [],
      };
    case POSMONTHSUM:
      return {
        ...state,
        PosMonthSum: action.payload,
      };
    case NEGMONTHSUM:
      return {
        ...state,
        NegMonthSum: action.payload,
      };
    case CATEGORYMONTHSUM:
      return {
        ...state,
        categorymonthsum: state.categorymonthsum && action.payload,
      };
    case CATEGORYYEARSUM:
      return {
        ...state,
        categoryyearsum: action.payload,
      };
    case YEARSUM:
      return {
        ...state,
        yearsum: action.payload,
      };
    case CALCSAVINGS:
      return {
        ...state,
        savings: action.payload,
      };
    case CALCCAPITAL:
      return {
        ...state,
        capital: action.payload,
      };
    case CATEGORY_NAMEONLYNEGNUM_BYYEAR:
      return {
        ...state,
        categorynameonlynegnumbyyear: action.payload,
      };
    case CATEGORY_NAMEONLYPOSNUM_BYYEAR:
      return {
        ...state,
        categorynameonlyposnumbyyear: action.payload,
      };
    case SET_PURCHASE:
      return {
        ...state,
        purchases: state.presets && state.presets.filter((preset) => preset.type === "purchase"),
      };
    case CATEGORY_SUMONLYPOSNUM_BYYEAR:
      return {
        ...state,
        categorysumonlyposnumbyyear: action.payload,
      };
    case CATEGORY_SUMONLYNEGNUM_BYYEAR:
      return {
        ...state,
        categorysumonlynegnumbyyear: action.payload,
      };
    case ADDTO_PIGGYBANK:
      return {
        ...state,
        piggybanks: [...state.piggybanks, action.payload],
      };
    case SET_ACTIVE_PIGGYBANK:
      return {
        ...state,
        piggybanks: action.payload,
      };
    case CLEAR_PIGGYBANKS:
      return {
        ...state,
        piggybanks: [],
      };
    case GET_MONTHPIGGYSAVINGS:
      return {
        ...state,
        monthpiggysavings: action.payload,
        /* state.presets &&
          state.year &&
          action.payload &&
          state.presets
            .filter((preset) => preset.type === "purchase" && preset.piggybank.length !== 0)
            .map((preset) =>
              preset.piggybank.filter(
                (piggybank) => piggybank.month === action.payload && piggybank.year === state.year
              )
            ),  */
      };
    case GET_MONTHSAVINGS:
      return {
        ...state,
        monthsavingspresets: action.payload,
      };

    case SUM_PIGGYBANKS_MONTH:
      return {
        ...state,
        SumPiggybanksMonth: action.payload,
      };
    case CALC_MONTH_SAVINGS:
      return {
        ...state,
        monthsavings: action.payload,
      };
    case CALC_MONTH_BALANCE:
      return {
        ...state,
        MonthBalance: action.payload,
      };
    case SUBMIT_CSV:
      return {
        ...state,
        doSubmitCsv: action.payload,
      };
    case SET_SAVINGS_LIST:
      return {
        ...state,
        savingsList: action.payload,
      };
    case UPDATE_CSV:
      return {
        ...state,
        csvpresets:
          state.csvpresets &&
          state.csvpresets.map((preset) =>
            preset.id === action.payload.id ? action.payload : preset
          ),
      };
    case SET_NEWPRESETS:
      return {
        ...state,
        newPresets: action.payload,
      };
    case SET_CAPITAL_LIST:
      return {
        ...state,
        capitalList: action.payload,
      };
    case REMOVE_CSV:
      return {
        ...state,
        csvpresets:
          state.csvpresets && state.csvpresets.filter((preset) => preset.id === action.payload),
      };
    case PRESET_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_CSV:
      return {
        ...state,
        csvpresets: null,
      };

    default:
      return state;
  }
}

export default presetReducer;
