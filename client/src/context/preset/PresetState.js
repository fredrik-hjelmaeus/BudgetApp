import React, { useReducer } from 'react';
import axios from 'axios';
import PresetContext from './presetContext';
import presetReducer from './presetReducer';
import {
  ADD_PRESET,
  DELETE_PRESET,
  EDIT_PRESET,
  CANCEL_EDIT,
  SEND_EDIT,
  SUM,
  MONTHSUM,
  PRESET_ERROR,
  CLEAR_PRESETS,
  GET_PRESETS,
  ADD_MONTH,
  FILTER_PRESETS,
  CLEAR_FILTER,
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
  SET_CAPITAL_LIST,
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
  DELETE_PIGGYBANK,
  SUM_PIGGYBANKS_MONTH,
  CALC_MONTH_BALANCE,
  UPLOAD_CSV,
  UPDATE_CSV,
  SUBMIT_CSV,
  CLEAR_CSV,
  REMOVE_CSV,
  PRESET_CLEAR_ERRORS,
} from '../types';

const PresetState = (props) => {
  const initialState = {
    presets: null,
    sum: null,
    edit: null,
    error: null,
    month: null, // year implemented. Only indirect affects
    filtered: null, // not used atm
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
    categorysumonlybyyear: null, // year implemented  but NOT used atm.
    categorynameonlybyyear: null, // year implemented  but NOT used atm.
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
    doSubmitCsv: '',
    savingsList: [],
    capitalList: [],
  };

  const [state, dispatch] = useReducer(presetReducer, initialState);

  // Get Presets
  const getPresets = async () => {
    try {
      const res = await axios.get('/api/userpreset');
      dispatch({ type: GET_PRESETS, payload: res.data });
    } catch (err) {
      dispatch({
        type: PRESET_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add preset
  const addPreset = async (preset) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/userpreset', preset, config);
      dispatch({ type: ADD_PRESET, payload: res.data });
    } catch (err) {
      dispatch({
        type: PRESET_ERROR,
        payload: err.response.msg,
      });
      console.log(err);
    }
  };
  // Delete preset
  const deletePreset = async (id) => {
    try {
      await axios.delete(`/api/userpreset/${id}`);
      dispatch({
        type: DELETE_PRESET,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: PRESET_ERROR,
        payload: err.response.data.msg,
      });
    }
  };
  // send edit
  const sendEdit = async (preset) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`/api/userpreset/${preset._id}`, preset, config);
      dispatch({ type: SEND_EDIT, payload: res.data });
    } catch (err) {
      dispatch({
        type: PRESET_ERROR,
        payload: err.response.msg,
      });
    }
    //Recalc ALL
    resetSums();
    preset.type !== 'purchase' && calcSum(preset._id, preset.number, 'edit');
    filterOutPositiveNumsAndMonth(state.month);
    filterOutNegativeNumsAndMonth(state.month);
  };

  // Upload CSV
  const uploadCSV = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    try {
      const res = await axios.post('/api/userpreset/upload', formData, config);

      dispatch({ type: UPLOAD_CSV, payload: res.data });
    } catch (err) {
      dispatch({
        type: PRESET_ERROR,
        payload: err.response.data,
      });
    }
  };

  //Update CSV
  const updateCsvPresets = (preset) => {
    dispatch({ type: UPDATE_CSV, payload: preset });
  };

  //Remove CSV
  const removeCSV = (preset) => {
    dispatch({ type: REMOVE_CSV, payload: preset });
  };

  // Clear CSV
  const clearCsv = () => {
    dispatch({ type: CLEAR_CSV });
  };
  // Add month-val coming from Datemenu
  const addMonth = (month) => {
    dispatch({ type: ADD_MONTH, payload: month });
  };

  // set year when yearbutton is pressed in datemenucomponent
  const setYear = (year) => {
    dispatch({ type: SET_YEAR, payload: year });
  };

  // Clear presets
  const clearPresets = () => {
    dispatch({ type: CLEAR_PRESETS });
  };

  // Reset Sums before recalc
  const resetSums = () => {
    dispatch({ RESET_SUMS });
  };

  // edit preset
  const setEdit = (preset) => {
    dispatch({ type: EDIT_PRESET, payload: preset });
  };

  // cancel edit preset
  const cancelEdit = () => {
    dispatch({ type: CANCEL_EDIT });
  };

  // Filter presets
  const filterPresets = (month) => {
    dispatch({ type: FILTER_PRESETS, payload: month });
  };

  // Filter out all presets with positive numbers and provided month and year
  const filterOutPositiveNumsAndMonth = (month) => {
    dispatch({ type: FILTER_POSNUMANDMONTH, payload: month });
  };

  // Filter out all presets with negative numbers and provided month
  const filterOutNegativeNumsAndMonth = (month) => {
    dispatch({ type: FILTER_NEGNUMANDMONTH, payload: month });
  };

  // clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  const setPurchase = () => {
    dispatch({ type: SET_PURCHASE });
  };

  /**
   * Calculate AccountBalance
   * Sum of overhead & capital presets minus savings and piggybank savings.
   *
   * */

  const calcSum = () => {
    let TotalSum = 0;

    const dispatchSum = (sumArray) => {
      // checks if no presets exist then don't use .reduce , just return 0 for dispatch.
      if (sumArray.length !== 0) {
        TotalSum = sumArray.reduce((a, b) => a + b, 0);
        dispatch({ type: SUM, payload: TotalSum });
      } else {
        dispatch({ type: SUM, payload: 0 });
      }
    };
    const sumArray = [];
    state.presets.map((preset) => {
      if (preset.type !== 'purchase' && preset.type !== 'savings') {
        sumArray.push(parseFloat(preset.number));
      } else {
        if (preset.type === 'savings') {
          sumArray.push(parseFloat(preset.number * -1));
        }
      }
    });

    dispatchSum(sumArray);
  };

  // Calc _ALL_ months sum
  const calcAllMonthSum = (montharray) => {
    dispatch({ type: RESET_ALLMONTHSUM });
    //iterera igenom alla månader
    montharray.map((month) => {
      //array att iterera igenom
      let presetArray = [];

      //håller uträknade summan
      let TotalMonthSum = 0;
      if (state.year === '2019' || state.year === 2019) {
        state.presets.map((preset) => {
          return (
            preset.year === undefined ||
            preset.year === '2019' ||
            (preset.year === 2019 &&
              preset.month === month &&
              preset.type !== 'savings' &&
              preset.type !== 'capital' &&
              preset.type !== 'purchase' &&
              presetArray.push(parseFloat(preset.number)))
          );
        });
      } else {
        state.presets.map((preset) => {
          return (
            parseInt(preset.year) === parseInt(state.year) &&
            preset.month === month &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            preset.type !== 'purchase' &&
            presetArray.push(parseFloat(preset.number))
          );
        });
      }
      // checks if no presets exist then don't use .reduce , just return presetnum-value for dispatch.
      if (presetArray.length !== 0) {
        TotalMonthSum = presetArray.reduce((a, b) => a + b, 0);
        return dispatch({ type: SET_ALLMONTHSUM, payload: TotalMonthSum });
      } else {
        TotalMonthSum = 0;
        return dispatch({ type: SET_ALLMONTHSUM, payload: TotalMonthSum });
      }
    });
  };

  // Calc month sum
  const calcMonthSum = (month) => {
    //array att iterera igenom
    let presetArray = [];
    //håller uträknade summan
    let TotalMonthSum = 0;
    if (state.year === '2019' || state.year === 2019) {
      state.presets.map((preset) => {
        return (
          preset.year === undefined ||
          (parseInt(preset.year) === parseInt('2019') &&
            preset.month === month &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            preset.type !== 'purchase' &&
            presetArray.push(parseFloat(preset.number)))
        );
      });
    } else {
      state.presets.map((preset) => {
        return (
          parseInt(preset.year) === parseInt(state.year) &&
          preset.month === month &&
          preset.type !== 'savings' &&
          preset.type !== 'capital' &&
          preset.type !== 'purchase' &&
          presetArray.push(parseFloat(preset.number))
        );
      });
    }
    // checks if no presets exist then don't use .reduce , just return presetnum-value for dispatch.
    if (presetArray.length !== 0) {
      TotalMonthSum = presetArray.reduce((a, b) => a + b, 0);
      dispatch({ type: MONTHSUM, payload: TotalMonthSum });
    } else {
      TotalMonthSum = 0;
      dispatch({ type: MONTHSUM, payload: TotalMonthSum });
    }
  };

  // Calc Positive month sum
  const calcPosMonth = (filteredmonthandposnum) => {
    //array att iterera igenom
    let presetArray = [];
    //håller uträknade summan
    let TotalMonthSum = 0;
    filteredmonthandposnum &&
      state.filteredmonthandposnum.map((preset) => {
        return presetArray.push(parseFloat(preset.number));
      });
    // checks if no presets exist then don't use .reduce , just return presetnum-value for dispatch.
    if (presetArray.length !== 0) {
      TotalMonthSum = presetArray.reduce((a, b) => a + b, 0);
      dispatch({ type: POSMONTHSUM, payload: TotalMonthSum });
    } else {
      dispatch({ type: POSMONTHSUM, payload: 0 });
    }
  };

  // Calc Negative month sum
  const calcNegMonth = (filteredmonthandnegnum) => {
    //array att iterera igenom
    let presetArray = [];
    //håller uträknade summan
    let negnum = 0;
    filteredmonthandnegnum &&
      state.filteredmonthandnegnum.map((preset) => {
        return presetArray.push(parseFloat(preset.number));
      });
    // checks if no presets exist then don't use .reduce , just return presetnum-value for dispatch.
    if (presetArray.length !== 0) {
      negnum = presetArray.reduce((a, b) => a + b, 0);
      dispatch({ type: NEGMONTHSUM, payload: negnum });
    } else {
      dispatch({ type: NEGMONTHSUM, payload: 0 });
    }
  };

  // calculate sum of provided category and month
  const calcCategoryByMonth = (month) => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray = [];
    state.presets.map((preset) => {
      return (
        preset.type !== null &&
        preset.type !== 'purchase' &&
        preset.type !== 'savings' &&
        preset.type !== 'capital' &&
        preset.month === month &&
        categoriesArray.push(preset.category)
      );
    });
    let UniqueCatThisMonth = categoriesArray.filter(function (item, i, ar) {
      return ar.indexOf(item) === i;
    });

    let MajorArray = [];

    for (let i = 0; i < UniqueCatThisMonth.length; i++) {
      let presetByCatArray = [];
      let SumOfCat;
      let CatAndSumList = [];

      // Inner loop som itererar igenom varje preset och stämmer månad och kategori(i) lägg till i array.
      if (state.year === '2019' || state.year === 2019) {
        state.presets.map((preset) => {
          return (
            preset.year === undefined ||
            (parseInt(preset.year) === parseInt('2019') &&
              preset.type !== null &&
              preset.type !== 'purchase' &&
              preset.type !== 'savings' &&
              preset.type !== 'capital' &&
              preset.month === month &&
              preset.category === UniqueCatThisMonth[i] &&
              presetByCatArray.push(preset.number))
          );
        }); // end inner loop
      } else {
        state.presets.map((preset) => {
          return (
            parseInt(preset.year) === parseInt(state.year) &&
            preset.type !== null &&
            preset.type !== 'purchase' &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            preset.month === month &&
            preset.category === UniqueCatThisMonth[i] &&
            presetByCatArray.push(preset.number)
          );
        }); // end inner loop
      }
      SumOfCat = presetByCatArray.reduce((a, b) => a + b, 0);
      let cat = UniqueCatThisMonth[i];

      CatAndSumList = {
        id: i,
        SumOfCat,
        cat,
      };
      SumOfCat !== 0 && MajorArray.push(CatAndSumList);
    }
    dispatch({ type: CATEGORYMONTHSUM, payload: MajorArray });
  };

  // calculate sum of provided category and year and put together in one array
  const calcCategoryByYear = () => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray = [];
    if (state.year === '2019' || state.year === 2019) {
      state.presets.map((preset) => {
        return (
          preset.year === undefined ||
          (parseInt(preset.year) === parseInt('2019') &&
            preset.type !== null &&
            preset.type !== 'purchase' &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            categoriesArray.push(preset.category))
        );
      });
    } else {
      state.presets.map((preset) => {
        return (
          parseInt(preset.year) === parseInt(state.year) &&
          preset.type !== null &&
          preset.type !== 'purchase' &&
          preset.type !== 'savings' &&
          preset.type !== 'capital' &&
          categoriesArray.push(preset.category)
        );
      });
    }
    let UniqueCatThisMonth = categoriesArray.filter(function (item, i, ar) {
      return ar.indexOf(item) === i;
    });

    let MajorArray = [];

    for (let i = 0; i < UniqueCatThisMonth.length; i++) {
      let presetByCatArray = [];
      let SumOfCat;
      let CatAndSumList = [];

      // Inner loop som itererar igenom varje preset och stämmer månad och kategori(i) lägg till i array.
      if (state.year === '2019' || state.year === 2019) {
        state.presets.map((preset) => {
          return (
            preset.year === undefined ||
            (parseInt(preset.year) === parseInt('2019') &&
              preset.type !== null &&
              preset.type !== 'purchase' &&
              preset.type !== 'savings' &&
              preset.type !== 'capital' &&
              preset.category === UniqueCatThisMonth[i] &&
              presetByCatArray.push(preset.number))
          );
        }); // end inner loop
      } else {
        state.presets.map((preset) => {
          return (
            parseInt(preset.year) === parseInt(state.year) &&
            preset.type !== null &&
            preset.type !== 'purchase' &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            preset.category === UniqueCatThisMonth[i] &&
            presetByCatArray.push(preset.number)
          );
        }); // end inner loop
      }
      SumOfCat = presetByCatArray.reduce((a, b) => a + b, 0);
      let cat = UniqueCatThisMonth[i];
      CatAndSumList = {
        id: i,
        SumOfCat,
        cat,
      };
      MajorArray.push(CatAndSumList);
    }
    dispatch({ type: CATEGORYYEARSUM, payload: MajorArray });
  };

  // calculate sum of provided category and year and put _only_ the sum in an array.
  const calcCategorySumOnlyByYear = () => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray = [];
    if (state.year === '2019' || state.year === 2019) {
      state.presets.map((preset) => {
        return (
          preset.year === undefined ||
          (parseInt(preset.year) === parseInt('2019') &&
            preset.type !== null &&
            preset.type !== 'purchase' &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            categoriesArray.push(preset.category))
        );
      });
    } else {
      state.presets.map((preset) => {
        return (
          parseInt(preset.year) === parseInt(state.year) &&
          preset.type !== null &&
          preset.type !== 'purchase' &&
          preset.type !== 'savings' &&
          preset.type !== 'capital' &&
          categoriesArray.push(preset.category)
        );
      });
    }
    let UniqueCatThisMonth = categoriesArray.filter(function (item, i, ar) {
      return ar.indexOf(item) === i;
    });

    let MajorArray = [];

    for (let i = 0; i < UniqueCatThisMonth.length; i++) {
      let presetByCatArray = [];
      let SumOfCat;

      // Inner loop som itererar igenom varje preset och stämmer månad och kategori(i) lägg till i array.
      state.presets.map((preset) => {
        return (
          preset.type !== null &&
          preset.type !== 'purchase' &&
          preset.type !== 'savings' &&
          preset.type !== 'capital' &&
          preset.category === UniqueCatThisMonth[i] &&
          presetByCatArray.push(preset.number)
        );
      }); // end inner loop
      SumOfCat = presetByCatArray.reduce((a, b) => a + b, 0);
      MajorArray.push(SumOfCat);
    }
    dispatch({ type: CATEGORYSUMONLYBYYEAR, payload: MajorArray });
  };

  // calculate sum of provided category and year and put _only_ the _POSITIVE_ sum in an array.
  const calcCategorySumOnlyPosNumByYear = () => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray = [];
    if (state.year === '2019' || state.year === 2019) {
      state.presets.map((preset) => {
        return (
          preset.year === undefined ||
          (parseInt(preset.year) === parseInt('2019') &&
            preset.type !== null &&
            preset.type !== 'purchase' &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            preset.number > 0 &&
            categoriesArray.push(preset.category))
        );
      });
    } else {
      state.presets.map((preset) => {
        return (
          parseInt(preset.year) === parseInt(state.year) &&
          preset.type !== null &&
          preset.type !== 'purchase' &&
          preset.type !== 'savings' &&
          preset.type !== 'capital' &&
          preset.number > 0 &&
          categoriesArray.push(preset.category)
        );
      });
    }
    let UniqueCatThisMonth = categoriesArray.filter(function (item, i, ar) {
      return ar.indexOf(item) === i;
    });

    let MajorArray = [];

    for (let i = 0; i < UniqueCatThisMonth.length; i++) {
      let presetByCatArray = [];
      let SumOfCat;

      // Inner loop som itererar igenom varje preset och stämmer månad och kategori(i) lägg till i array.
      if (state.year === '2019' || state.year === 2019) {
        state.presets.map((preset) => {
          return (
            preset.year === undefined ||
            (parseInt(preset.year) === parseInt('2019') &&
              preset.type !== null &&
              preset.type !== 'purchase' &&
              preset.type !== 'savings' &&
              preset.type !== 'capital' &&
              preset.number > 0 &&
              preset.category === UniqueCatThisMonth[i] &&
              presetByCatArray.push(preset.number))
          );
        }); // end inner loop
      } else {
        state.presets.map((preset) => {
          return (
            parseInt(preset.year) === parseInt(state.year) &&
            preset.type !== null &&
            preset.type !== 'purchase' &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            preset.number > 0 &&
            preset.category === UniqueCatThisMonth[i] &&
            presetByCatArray.push(preset.number)
          );
        }); // end inner loop
      }
      SumOfCat = presetByCatArray.reduce((a, b) => a + b, 0);
      MajorArray.push(SumOfCat);
    }
    dispatch({ type: CATEGORY_SUMONLYPOSNUM_BYYEAR, payload: MajorArray });
  };

  // calculate sum of provided category and year and put _only_ the _NEGATIVE_ sum in an array.
  const calcCategorySumOnlyNegNumByYear = () => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray = [];
    if (state.year === '2019' || state.year === 2019) {
      state.presets.map((preset) => {
        return (
          preset.year === undefined ||
          (parseInt(preset.year) === parseInt('2019') &&
            preset.type !== null &&
            preset.type !== 'purchase' &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            preset.number < 0 &&
            categoriesArray.push(preset.category))
        );
      });
    } else {
      state.presets.map((preset) => {
        return (
          parseInt(preset.year) === parseInt(state.year) &&
          preset.type !== null &&
          preset.type !== 'purchase' &&
          preset.type !== 'savings' &&
          preset.type !== 'capital' &&
          preset.number < 0 &&
          categoriesArray.push(preset.category)
        );
      });
    }
    let UniqueCatThisMonth = categoriesArray.filter(function (item, i, ar) {
      return ar.indexOf(item) === i;
    });

    let MajorArray = [];

    for (let i = 0; i < UniqueCatThisMonth.length; i++) {
      let presetByCatArray = [];
      let SumOfCat;

      // Inner loop som itererar igenom varje preset och stämmer månad och kategori(i) lägg till i array.
      if (state.year === '2019' || state.year === 2019) {
        state.presets.map((preset) => {
          return (
            preset.year === undefined ||
            (parseInt(preset.year) === parseInt('2019') &&
              preset.type !== null &&
              preset.type !== 'purchase' &&
              preset.type !== 'savings' &&
              preset.type !== 'capital' &&
              preset.number < 0 &&
              preset.category === UniqueCatThisMonth[i] &&
              presetByCatArray.push(preset.number))
          );
        }); // end inner loop
      } else {
        state.presets.map((preset) => {
          return (
            parseInt(preset.year) === parseInt(state.year) &&
            preset.type !== null &&
            preset.type !== 'purchase' &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            preset.number < 0 &&
            preset.category === UniqueCatThisMonth[i] &&
            presetByCatArray.push(preset.number)
          );
        }); // end inner loop
      }
      SumOfCat = presetByCatArray.reduce((a, b) => a + b, 0);
      MajorArray.push(Math.abs(SumOfCat));
    }
    dispatch({ type: CATEGORY_SUMONLYNEGNUM_BYYEAR, payload: MajorArray });
  };

  // get ONLY categoryNAME by year to use in apexcharts
  const setCategoryNameOnlyByYear = () => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray = [];
    if (state.year === '2019' || state.year === 2019) {
      state.presets.map((preset) => {
        return (
          preset.year === undefined ||
          (parseInt(preset.year) === parseInt('2019') &&
            preset.type !== null &&
            preset.type !== 'purchase' &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            categoriesArray.push(preset.category))
        );
      });
    } else {
      state.presets.map((preset) => {
        return (
          parseInt(preset.year) === parseInt(state.year) &&
          preset.type !== null &&
          preset.type !== 'purchase' &&
          preset.type !== 'savings' &&
          preset.type !== 'capital' &&
          categoriesArray.push(preset.category)
        );
      });
    }
    let UniqueCatThisMonth = categoriesArray.filter(function (item, i, ar) {
      return ar.indexOf(item) === i;
    });

    dispatch({ type: CATEGORY_NAMEONLY_BYYEAR, payload: UniqueCatThisMonth });
  };

  // get POSITIVE ONLY categoryNAME by year to use in apexcharts
  const setCategoryNameOnlyPosNumByYear = () => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray = [];
    if (state.year === '2019' || state.year === 2019) {
      state.presets.map((preset) => {
        return (
          preset.year === undefined ||
          (parseInt(preset.year) === parseInt('2019') &&
            preset.type !== null &&
            preset.type !== 'purchase' &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            preset.number > 0 &&
            categoriesArray.push(preset.category))
        );
      });
    } else {
      state.presets.map((preset) => {
        return (
          parseInt(preset.year) === parseInt(state.year) &&
          preset.type !== null &&
          preset.type !== 'purchase' &&
          preset.type !== 'savings' &&
          preset.type !== 'capital' &&
          preset.number > 0 &&
          categoriesArray.push(preset.category)
        );
      });
    }
    let UniqueCatThisMonth = categoriesArray.filter(function (item, i, ar) {
      return ar.indexOf(item) === i;
    });

    dispatch({
      type: CATEGORY_NAMEONLYPOSNUM_BYYEAR,
      payload: UniqueCatThisMonth,
    });
  };

  // get _NEGATIVE_ ONLY categoryNAME by year to use in apexcharts
  const setCategoryNameOnlyNegNumByYear = () => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray = [];
    if (state.year === '2019' || state.year === 2019) {
      state.presets.map((preset) => {
        return (
          preset.year === undefined ||
          (parseInt(preset.year) === parseInt('2019') &&
            preset.type !== null &&
            preset.type !== 'purchase' &&
            preset.type !== 'savings' &&
            preset.type !== 'capital' &&
            preset.number < 0 &&
            categoriesArray.push(preset.category))
        );
      });
    } else {
      state.presets.map((preset) => {
        return (
          parseInt(preset.year) === parseInt(state.year) &&
          preset.type !== null &&
          preset.type !== 'purchase' &&
          preset.type !== 'savings' &&
          preset.type !== 'capital' &&
          preset.number < 0 &&
          categoriesArray.push(preset.category)
        );
      });
    }
    let UniqueCatThisMonth = categoriesArray.filter(function (item, i, ar) {
      return ar.indexOf(item) === i;
    });

    dispatch({
      type: CATEGORY_NAMEONLYNEGNUM_BYYEAR,
      payload: UniqueCatThisMonth,
    });
  };
  ////////////////////////////////////
  const calcYearsum = (year) => {
    let numberArray = [];
    if (year === '2019' || year === 2019) {
      state.presets.map((preset) => {
        return (
          preset.year === undefined ||
          (parseInt(preset.year) === parseInt('2019') &&
            preset.type !== null &&
            preset.type !== 'purchase' && // måste ha NOT eftersom det finns vissa värden i databasen som saknar preset.type helt
            preset.type !== 'savings' && // då de las in före .type las till i backend.
            preset.type !== 'capital' &&
            numberArray.push(parseFloat(preset.number)))
        );
      });
    } else {
      state.presets.map((preset) => {
        return (
          parseInt(preset.year) === parseInt(state.year) &&
          preset.type !== null &&
          preset.type !== 'purchase' && // måste ha NOT eftersom det finns vissa värden i databasen som saknar preset.type helt
          preset.type !== 'savings' && // då de las in före .type las till i backend.
          preset.type !== 'capital' &&
          numberArray.push(parseFloat(preset.number))
        );
      });
    }

    // checks if no presets exist then don't use .reduce , just return presetnum-value for dispatch.
    if (numberArray.length !== 0) {
      const TotalSum = numberArray.reduce((a, b) => a + b, 0);
      dispatch({ type: YEARSUM, payload: TotalSum });
    } else dispatch({ type: YEARSUM, payload: 0 });
  };

  const getSavingsList = () => {
    const listOfSavings = state.presets.filter((preset) => {
      return preset.type === 'savings' && preset;
    });
    dispatch({ type: SET_SAVINGS_LIST, payload: listOfSavings });
  };

  const getCapitalList = () => {
    const listOfCapitalItems = state.presets.filter((preset) => {
      return preset.type === 'capital' && preset;
    });
    console.log(listOfCapitalItems);
    dispatch({ type: SET_CAPITAL_LIST, payload: listOfCapitalItems });
  };

  // Calc savings sum
  const calcSavings = () => {
    //array att iterera igenom
    let presetArray = [];
    //håller uträknade summan
    let TotalMonthSum = 0;
    state.presets.map((preset) => {
      return preset.type === 'savings' && presetArray.push(parseFloat(preset.number));
    });

    // checks if no presets exist then don't use .reduce , just return presetnum-value for dispatch.
    if (presetArray.length !== 0) {
      TotalMonthSum = presetArray.reduce((a, b) => a + b, 0);
      dispatch({ type: CALCSAVINGS, payload: TotalMonthSum });
    } else {
      dispatch({ type: CALCSAVINGS, payload: 0 });
    }
  };

  // Calc savings by month
  const calcMonthSavings = () => {
    //array att iterera igenom
    let presetArray = [];
    //håller uträknade summan
    let TotalMonthSum = 0;
    if (state.year === 2019 || state.year === '2019') {
      state.presets.map((preset) => {
        return (
          preset.year === undefined ||
          (parseInt(preset.year) === parseInt('2019') &&
            preset.type === 'savings' &&
            preset.month === state.month &&
            presetArray.push(parseFloat(preset.number)))
        );
      });
    } else {
      state.presets.map((preset) => {
        return (
          parseInt(preset.year) === parseInt(state.year) &&
          preset.type === 'savings' &&
          preset.month === state.month &&
          presetArray.push(parseFloat(preset.number))
        );
      });
    }
    // checks if no presets exist then don't use .reduce , just return presetnum-value for dispatch.
    if (presetArray.length !== 0) {
      TotalMonthSum = presetArray.reduce((a, b) => a + b, 0);
      dispatch({ type: CALC_MONTH_SAVINGS, payload: TotalMonthSum });
    } else {
      dispatch({ type: CALC_MONTH_SAVINGS, payload: null });
    }
  };

  // calc month balance
  const calcMonthBalance = () => {
    const totalsum = state.MonthSum - state.monthsavings - state.SumPiggybanksMonth;
    dispatch({ type: CALC_MONTH_BALANCE, payload: totalsum });
  };

  // Get presets with savings added in this month and purchases with piggybanksavings added in this month
  const getMonthSavings = (month) => {
    if (state.year === '2019' || state.year === 2019) {
      const filter = state.presets.filter(
        (preset) =>
          preset.year === undefined || (parseInt(preset.year) === parseInt('2019') && preset.type === 'savings' && preset.month === month)
      );
      dispatch({ type: GET_MONTHSAVINGS, payload: filter });
    } else {
      const filter = state.presets.filter(
        (preset) => parseInt(preset.year) === parseInt(state.year) && preset.type === 'savings' && preset.month === month
      );
      dispatch({ type: GET_MONTHSAVINGS, payload: filter });
    }
  };

  // Get presets with piggybank-savings added this month
  const getMonthPiggySavings = () => {
    dispatch({ type: GET_MONTHPIGGYSAVINGS, payload: state.month });
  };
  // Calc capital sum
  const calcCapital = () => {
    //array att iterera igenom
    let presetArray = [];
    //håller uträknade summan
    let TotalMonthSum = 0;
    state.presets.map((preset) => {
      return preset.type === 'capital' && presetArray.push(parseFloat(preset.number));
    });
    // checks if no presets exist then don't use .reduce , just return presetnum-value for dispatch.
    if (presetArray.length !== 0) {
      TotalMonthSum = presetArray.reduce((a, b) => a + b, 0);
      dispatch({ type: CALCCAPITAL, payload: TotalMonthSum });
    } else {
      dispatch({ type: CALCCAPITAL, payload: 0 });
    }
  };
  const clearPresetErrors = () => {
    dispatch({ type: PRESET_CLEAR_ERRORS });
  };

  const setActivePiggybank = (piggybank) => {
    dispatch({ type: SET_ACTIVE_PIGGYBANK, payload: piggybank });
  };

  const addtoPiggybanks = (object) => {
    dispatch({ type: ADDTO_PIGGYBANK, payload: object });
  };

  const clearPiggybanks = () => {
    dispatch({ type: CLEAR_PIGGYBANKS });
  };

  const deletePiggybank = (Item) => {
    dispatch({ type: DELETE_PIGGYBANK, payload: Item });
  };

  const setTotalOfAllPiggybanksThisMonth = (Sum) => {
    dispatch({ type: SUM_PIGGYBANKS_MONTH, payload: Sum });
  };

  const submitCsvItems = (string) => {
    dispatch({ type: SUBMIT_CSV, payload: string });
  };

  // Get guidePresets
  const getGuidePresets = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.get('/api/guide', config);
      dispatch({ type: GET_PRESETS, payload: res.data });
    } catch (err) {
      dispatch({
        type: PRESET_ERROR,
        payload: err.response.msg,
      });
    }
  };

  return (
    <PresetContext.Provider
      value={{
        presets: state.presets,
        edit: state.edit,
        error: state.error,
        sum: state.sum,
        month: state.month,
        MonthSum: state.MonthSum,
        filteredmonthandposnum: state.filteredmonthandposnum,
        filteredmonthandnegnum: state.filteredmonthandnegnum,
        PosMonthSum: state.PosMonthSum,
        NegMonthSum: state.NegMonthSum,
        categorymonthsum: state.categorymonthsum,
        categoryyearsum: state.categoryyearsum,
        categorysumonlybyyear: state.categorysumonlybyyear,
        categorynameonlybyyear: state.categorynameonlybyyear,
        year: state.year,
        yearsum: state.yearsum,
        savings: state.savings,
        capital: state.capital,
        purchases: state.purchases,
        categorynameonlyposnumbyyear: state.categorynameonlyposnumbyyear,
        categorynameonlynegnumbyyear: state.categorynameonlynegnumbyyear,
        categorysumonlyposnumbyyear: state.categorysumonlyposnumbyyear,
        categorysumonlynegnumbyyear: state.categorysumonlynegnumbyyear,
        AllMonthSum: state.AllMonthSum,
        piggybanks: state.piggybanks,
        monthsavings: state.monthsavings,
        monthsavingspresets: state.monthsavingspresets,
        monthpiggysavings: state.monthpiggysavings,
        SumPiggybanksMonth: state.SumPiggybanksMonth,
        MonthBalance: state.MonthBalance,
        csvpresets: state.csvpresets,
        doSubmitCsv: state.doSubmitCsv,
        savingsList: state.savingsList,
        capitalList: state.capitalList,
        addPreset,
        calcSum,
        deletePreset,
        setEdit,
        cancelEdit,
        sendEdit,
        getPresets,
        clearPresets,
        addMonth,
        filterPresets,
        filtered: state.filtered,
        clearFilter,
        calcMonthSum,
        filterOutPositiveNumsAndMonth,
        filterOutNegativeNumsAndMonth,
        calcPosMonth,
        calcNegMonth,
        calcCategoryByMonth,
        calcCategoryByYear,
        resetSums,
        setYear,
        calcYearsum,
        calcSavings,
        calcCapital,
        setPurchase,
        calcCategorySumOnlyByYear,
        setCategoryNameOnlyByYear,
        setCategoryNameOnlyPosNumByYear,
        setCategoryNameOnlyNegNumByYear,
        calcCategorySumOnlyPosNumByYear,
        calcCategorySumOnlyNegNumByYear,
        calcAllMonthSum,
        addtoPiggybanks,
        setActivePiggybank,
        clearPiggybanks,
        calcMonthSavings,
        getMonthSavings,
        getMonthPiggySavings,
        deletePiggybank,
        setTotalOfAllPiggybanksThisMonth,
        calcMonthBalance,
        uploadCSV,
        submitCsvItems,
        updateCsvPresets,
        clearCsv,
        removeCSV,
        clearPresetErrors,
        getGuidePresets,
        getSavingsList,
        getCapitalList,
      }}
    >
      {props.children}
    </PresetContext.Provider>
  );
};

export default PresetState;
