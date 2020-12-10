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
  FILTER_PRESETS,
  CLEAR_FILTER,
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
  CALCCAPITAL,
  SET_PURCHASE,
  CATEGORYSUMONLYBYYEAR,
  CATEGORY_NAMEONLY_BYYEAR,
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
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_PRESETS:
      return {
        ...state,
        presets: action.payload,
        loading: false,
      };
    case LOGOUT:
    case CLEAR_PRESETS:
      return {
        ...state,
        presets: null,
        error: null,
        edit: null,
        sum: null,
        year: '2019',
        month: null,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
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
    case ADD_PRESET:
      return {
        ...state,
        presets: [...state.presets, action.payload],
        loading: false,
      };
    case UPLOAD_CSV:
      return {
        ...state,
        csvpresets: action.payload,
      };
    case UPDATE_CSV:
      return {
        ...state,
        csvpresets: state.csvpresets.map((preset) => (preset.id === action.payload.id ? action.payload : preset)),
      };
    case REMOVE_CSV:
      return {
        ...state,
        csvpresets: state.csvpresets.filter((preset) => preset.id === action.payload.id),
      };
    case CLEAR_CSV:
      return {
        ...state,
        csvpresets: null,
      };
    case SUBMIT_CSV:
      return {
        ...state,
        doSubmitCsv: action.payload,
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
    case SET_PURCHASE:
      return {
        ...state,
        purchases: state.presets.filter((preset) => preset.type === 'purchase'),
      };
    case GET_MONTHSAVINGS:
      return {
        ...state,
        monthsavingspresets: action.payload,
      };
    case GET_MONTHPIGGYSAVINGS:
      return {
        ...state,
        monthpiggysavings: state.presets
          .filter((preset) => preset.type === 'purchase' && preset.piggybank.length !== 0)
          .map((preset) =>
            preset.piggybank.filter((piggybank) => piggybank.month === action.payload && piggybank.year === parseInt(state.year))
          ),
      };
    case SUM_PIGGYBANKS_MONTH:
      return {
        ...state,
        SumPiggybanksMonth: action.payload,
      };
    case SET_ACTIVE_PIGGYBANK:
      return {
        ...state,
        piggybanks: action.payload,
      };
    case CLEAR_PIGGYBANKS:
      return {
        ...state,
        piggybanks: null,
      };
    case ADDTO_PIGGYBANK:
      return {
        ...state,
        piggybanks: [...state.piggybanks, action.payload],
      };
    case SUM:
      return {
        ...state,
        sum: action.payload,
      };
    case YEARSUM:
      return {
        ...state,
        yearsum: action.payload,
      };
    case RESET_ALLMONTHSUM:
      return {
        ...state,
        AllMonthSum: [],
      };
    case SET_ALLMONTHSUM:
      return {
        ...state,
        AllMonthSum: [...state.AllMonthSum, action.payload],
      };
    case MONTHSUM:
      return {
        ...state,
        MonthSum: action.payload,
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
        categorymonthsum: action.payload,
      };
    case CATEGORY_NAMEONLY_BYYEAR:
      return {
        ...state,
        categorynameonlybyyear: action.payload,
      };
    case CATEGORY_NAMEONLYPOSNUM_BYYEAR:
      return {
        ...state,
        categorynameonlyposnumbyyear: action.payload,
      };
    case CATEGORY_NAMEONLYNEGNUM_BYYEAR:
      return {
        ...state,
        categorynameonlynegnumbyyear: action.payload,
      };
    case CATEGORYSUMONLYBYYEAR:
      return {
        ...state,
        categorysumonlybyyear: action.payload,
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
    case CATEGORYYEARSUM:
      return {
        ...state,
        categoryyearsum: action.payload,
      };
    case CALCSAVINGS:
      return {
        ...state,
        savings: action.payload,
      };
    case CALC_MONTH_SAVINGS:
      return {
        ...state,
        monthsavings: action.payload,
      };
    case CALCCAPITAL:
      return {
        ...state,
        capital: action.payload,
      };
    case CALC_MONTH_BALANCE:
      return {
        ...state,
        MonthBalance: action.payload,
      };
    case SEND_EDIT:
      return {
        ...state,
        presets: state.presets.map((preset) => (preset._id === action.payload._id ? action.payload : preset)),
        loading: false,
      };
    case DELETE_PRESET:
      return {
        ...state,
        presets: state.presets.filter((preset) => preset._id !== action.payload),
        loading: false,
      };
    case FILTER_POSNUMANDMONTH:
      return {
        ...state,
        filteredmonthandposnum: state.presets.filter(
          (preset) =>
            preset.month === action.payload &&
            preset.number > 0 &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            preset.type !== 'purchase' &&
            preset.year.toString() === state.year.toString() // multiple datatypes
        ),
      };
    case FILTER_NEGNUMANDMONTH:
      return {
        ...state,
        filteredmonthandnegnum: state.presets.filter(
          (preset) =>
            preset.month === action.payload &&
            preset.number < 0 &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            preset.type !== 'purchase' &&
            preset.year.toString() === state.year.toString() // multiple datatypes
        ),
      };

    case FILTER_PRESETS:
      return {
        ...state,
        filtered: state.presets.filter((preset) => preset.month === action.payload),
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
    case PRESET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case PRESET_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
