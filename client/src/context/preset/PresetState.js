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
  CONTACT_ERROR,
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
  CALCCAPITAL,
  SET_PURCHASE,
  CATEGORYSUMONLYBYYEAR,
  CATEGORY_NAMEONLY_BYYEAR,
  CATEGORY_NAMEONLYPOSNUM_BYYEAR,
  CATEGORY_SUMONLYPOSNUM_BYYEAR,
  CATEGORY_SUMONLYNEGNUM_BYYEAR,
  CATEGORY_NAMEONLYNEGNUM_BYYEAR,
  SET_ALLMONTHSUM,
  RESET_ALLMONTHSUM
} from '../types';

const PresetState = props => {
  const initialState = {
    presets: null,
    sum: null,
    edit: null,
    error: null,
    month: null,
    filtered: null,
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
    purchasemonth: null,
    categorysumonlybyyear: null,
    categorynameonlybyyear: null,
    categorynameonlyposnumbyyear: null,
    categorynameonlynegnumbyyear: null,
    categorysumonlyposnumbyyear: null,
    categorysumonlynegnumbyyear: null
  };

  const [state, dispatch] = useReducer(presetReducer, initialState);

  // Get Presets
  const getPresets = async () => {
    try {
      const res = await axios.get('/api/userpreset');
      dispatch({ type: GET_PRESETS, payload: res.data });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add preset
  const addPreset = async preset => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/userpreset', preset, config);
      dispatch({ type: ADD_PRESET, payload: res.data });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      });
      console.log(err);
    }
  };
  // Delete preset
  const deletePreset = async id => {
    try {
      await axios.delete(`/api/userpreset/${id}`);
      dispatch({
        type: DELETE_PRESET,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data.msg
      });
    }
  };
  // send edit
  const sendEdit = async preset => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.put(
        `/api/userpreset/${preset._id}`,
        preset,
        config
      );
      dispatch({ type: SEND_EDIT, payload: res.data });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      });
    }

    //Recalc ALL
    resetSums();
    preset.type !== 'purchase' && calcSum(preset._id, preset.number, 'edit');
    filterOutPositiveNumsAndMonth(preset.month);
    filterOutNegativeNumsAndMonth(preset.month);
  };

  // Add month-val coming from Datemenu
  const addMonth = month => {
    dispatch({ type: ADD_MONTH, payload: month });
  };

  // set year when yearbutton is pressed in datemenucomponent
  const setYear = year => {
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
  const setEdit = preset => {
    dispatch({ type: EDIT_PRESET, payload: preset });
  };

  // cancel edit preset
  const cancelEdit = () => {
    dispatch({ type: CANCEL_EDIT });
  };

  // Filter presets
  const filterPresets = month => {
    dispatch({ type: FILTER_PRESETS, payload: month });
  };

  // Filter out all presets with positive numbers and provided month
  const filterOutPositiveNumsAndMonth = month => {
    dispatch({ type: FILTER_POSNUMANDMONTH, payload: month });
  };

  // Filter out all presets with negative numbers and provided month
  const filterOutNegativeNumsAndMonth = month => {
    dispatch({ type: FILTER_NEGNUMANDMONTH, payload: month });
  };

  // clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  const setPurchase = () => {
    dispatch({ type: SET_PURCHASE });
  };

  // Calculate Sum of presets
  const calcSum = (id, presetnum, type) => {
    let presetArray = [];
    let counter = 0;
    let TotalSum = 0;

    if (presetnum === null) {
      // calc when delete preset
      state.presets.map(preset => {
        if (preset._id !== id && preset.type !== 'purchase')
          presetArray.push(parseFloat(preset.number));
      });
    } else if (type === 'add') {
      // calc when add new preset
      state.presets.map(preset => {
        preset.type !== 'purchase' &&
          presetArray.push(parseFloat(preset.number));
        counter++;
        if (counter === presetArray.length && preset.type !== 'purchase') {
          presetArray.push(parseFloat(presetnum));
        }
      });
    } else {
      // calc when edit preset
      state.presets.map(preset => {
        if (preset._id !== id && preset.type !== 'purchase')
          presetArray.push(parseFloat(preset.number));
      });
      presetArray.push(parseFloat(presetnum));
    }
    // checks if no presets exist then don't use .reduce , just return presetnum-value for dispatch.
    if (presetArray.length !== 0) {
      TotalSum = presetArray.reduce((a, b) => a + b, 0);
      dispatch({ type: SUM, payload: TotalSum });
    } else {
      TotalSum = presetnum;
      dispatch({ type: SUM, payload: TotalSum });
    }
  };

  // Calc _ALL_ months sum
  const calcAllMonthSum = montharray => {
    dispatch({ type: RESET_ALLMONTHSUM });
    //iterera igenom alla månader
    montharray.map(month => {
      //array att iterera igenom
      let presetArray = [];
      //håller uträknade summan
      let TotalMonthSum = 0;
      state.presets.map(preset => {
        if (
          preset.month === month &&
          preset.type !== 'savings' &&
          preset.type !== 'capital' &&
          preset.type !== 'purchase'
        )
          presetArray.push(parseFloat(preset.number));
      });

      // checks if no presets exist then don't use .reduce , just return presetnum-value for dispatch.
      if (presetArray.length !== 0) {
        TotalMonthSum = presetArray.reduce((a, b) => a + b, 0);
        dispatch({ type: SET_ALLMONTHSUM, payload: TotalMonthSum });
      } else {
        console.log('no objects to calculate in this month');
      }
    });
  };

  // Calc month sum
  const calcMonthSum = month => {
    //array att iterera igenom
    let presetArray = [];
    //håller uträknade summan
    let TotalMonthSum = 0;
    state.presets.map(preset => {
      if (
        preset.month === month &&
        preset.type !== 'savings' &&
        preset.type !== 'capital' &&
        preset.type !== 'purchase'
      )
        presetArray.push(parseFloat(preset.number));
    });
    // checks if no presets exist then don't use .reduce , just return presetnum-value for dispatch.
    if (presetArray.length !== 0) {
      TotalMonthSum = presetArray.reduce((a, b) => a + b, 0);
      dispatch({ type: MONTHSUM, payload: TotalMonthSum });
    } else {
      console.log('no objects to calculate in this month');
    }
  };

  // Calc Positive month sum
  const calcPosMonth = filteredmonthandposnum => {
    //array att iterera igenom
    let presetArray = [];
    //håller uträknade summan
    let TotalMonthSum = 0;
    filteredmonthandposnum &&
      state.filteredmonthandposnum.map(preset => {
        presetArray.push(parseFloat(preset.number));
      });
    // checks if no presets exist then don't use .reduce , just return presetnum-value for dispatch.
    if (presetArray.length !== 0) {
      TotalMonthSum = presetArray.reduce((a, b) => a + b, 0);
      dispatch({ type: POSMONTHSUM, payload: TotalMonthSum });
    } else {
      console.log('no objects to calculate in this month');
      dispatch({ type: POSMONTHSUM, payload: 0 });
    }
  };

  // Calc Negative month sum
  const calcNegMonth = filteredmonthandnegnum => {
    //array att iterera igenom
    let presetArray = [];
    //håller uträknade summan
    let negnum = 0;
    filteredmonthandnegnum &&
      state.filteredmonthandnegnum.map(preset => {
        presetArray.push(parseFloat(preset.number));
      });
    // checks if no presets exist then don't use .reduce , just return presetnum-value for dispatch.
    if (presetArray.length !== 0) {
      negnum = presetArray.reduce((a, b) => a + b, 0);
      dispatch({ type: NEGMONTHSUM, payload: negnum });
    } else {
      console.log('no objects to calculate in this month');
      dispatch({ type: NEGMONTHSUM, payload: 0 });
    }
  };

  // calculate sum of provided category and month
  const calcCategoryByMonth = month => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray = [];
    state.presets.map(preset => {
      preset.type !== null &&
        preset.type !== 'purchase' &&
        preset.type !== 'savings' &&
        preset.type !== 'capital' &&
        preset.month === month &&
        categoriesArray.push(preset.category);
    });
    let UniqueCatThisMonth = categoriesArray.filter(function(item, i, ar) {
      return ar.indexOf(item) === i;
    });
    //console.log(`Unika kategorier: ${UniqueCatThisMonth.length}`);
    let MajorArray = [];
    let i; // yttre loop som itererar igenom kategorier
    for (i = 0; i < UniqueCatThisMonth.length; i++) {
      let presetByCatArray = [];
      let SumOfCat;
      let CatAndSumList = [];

      // Inner loop som itererar igenom varje preset och stämmer månad och kategori(i) lägg till i array.
      state.presets.map(preset => {
        preset.type !== null &&
          preset.type !== 'purchase' &&
          preset.type !== 'savings' &&
          preset.type !== 'capital' &&
          preset.month === month &&
          preset.category === UniqueCatThisMonth[i] &&
          presetByCatArray.push(preset.number);
      }); // end inner loop
      SumOfCat = presetByCatArray.reduce((a, b) => a + b, 0);
      let cat = UniqueCatThisMonth[i];

      CatAndSumList = {
        id: i,
        SumOfCat,
        cat
      };
      MajorArray.push(CatAndSumList);
    }
    dispatch({ type: CATEGORYMONTHSUM, payload: MajorArray });
  };

  // calculate sum of provided category and year and put together in one array
  const calcCategoryByYear = () => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray = [];
    state.presets.map(preset => {
      preset.type !== null &&
        preset.type !== 'purchase' &&
        preset.type !== 'savings' &&
        preset.type !== 'capital' &&
        categoriesArray.push(preset.category);
    });
    let UniqueCatThisMonth = categoriesArray.filter(function(item, i, ar) {
      return ar.indexOf(item) === i;
    });
    //console.log(`Unika kategorier: ${UniqueCatThisMonth.length}`);
    let MajorArray = [];
    let i; // yttre loop som itererar igenom kategorier
    for (i = 0; i < UniqueCatThisMonth.length; i++) {
      let presetByCatArray = [];
      let SumOfCat;
      let CatAndSumList = [];

      // Inner loop som itererar igenom varje preset och stämmer månad och kategori(i) lägg till i array.
      state.presets.map(preset => {
        preset.type !== null &&
          preset.type !== 'purchase' &&
          preset.type !== 'savings' &&
          preset.type !== 'capital' &&
          preset.category === UniqueCatThisMonth[i] &&
          presetByCatArray.push(preset.number);
      }); // end inner loop
      SumOfCat = presetByCatArray.reduce((a, b) => a + b, 0);
      let cat = UniqueCatThisMonth[i];

      CatAndSumList = {
        id: i,
        SumOfCat,
        cat
      };
      MajorArray.push(CatAndSumList);
    }
    dispatch({ type: CATEGORYYEARSUM, payload: MajorArray });
  };

  // calculate sum of provided category and year and put _only_ the sum in an array.
  const calcCategorySumOnlyByYear = () => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray = [];
    state.presets.map(preset => {
      preset.type !== null &&
        preset.type !== 'purchase' &&
        preset.type !== 'savings' &&
        preset.type !== 'capital' &&
        categoriesArray.push(preset.category);
    });
    let UniqueCatThisMonth = categoriesArray.filter(function(item, i, ar) {
      return ar.indexOf(item) === i;
    });
    //console.log(`Unika kategorier: ${UniqueCatThisMonth.length}`);
    let MajorArray = [];
    let i; // yttre loop som itererar igenom kategorier
    for (i = 0; i < UniqueCatThisMonth.length; i++) {
      let presetByCatArray = [];
      let SumOfCat;

      // Inner loop som itererar igenom varje preset och stämmer månad och kategori(i) lägg till i array.
      state.presets.map(preset => {
        preset.type !== null &&
          preset.type !== 'purchase' &&
          preset.type !== 'savings' &&
          preset.type !== 'capital' &&
          preset.category === UniqueCatThisMonth[i] &&
          presetByCatArray.push(preset.number);
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
    state.presets.map(preset => {
      preset.type !== null &&
        preset.type !== 'purchase' &&
        preset.type !== 'savings' &&
        preset.type !== 'capital' &&
        preset.number > 0 &&
        categoriesArray.push(preset.category);
    });
    let UniqueCatThisMonth = categoriesArray.filter(function(item, i, ar) {
      return ar.indexOf(item) === i;
    });
    //console.log(`Unika kategorier: ${UniqueCatThisMonth.length}`);
    let MajorArray = [];
    let i; // yttre loop som itererar igenom kategorier
    for (i = 0; i < UniqueCatThisMonth.length; i++) {
      let presetByCatArray = [];
      let SumOfCat;

      // Inner loop som itererar igenom varje preset och stämmer månad och kategori(i) lägg till i array.
      state.presets.map(preset => {
        preset.type !== null &&
          preset.type !== 'purchase' &&
          preset.type !== 'savings' &&
          preset.type !== 'capital' &&
          preset.number > 0 &&
          preset.category === UniqueCatThisMonth[i] &&
          presetByCatArray.push(preset.number);
      }); // end inner loop
      SumOfCat = presetByCatArray.reduce((a, b) => a + b, 0);
      MajorArray.push(SumOfCat);
    }
    dispatch({ type: CATEGORY_SUMONLYPOSNUM_BYYEAR, payload: MajorArray });
  };

  // calculate sum of provided category and year and put _only_ the _NEGATIVE_ sum in an array.
  const calcCategorySumOnlyNegNumByYear = () => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray = [];
    state.presets.map(preset => {
      preset.type !== null &&
        preset.type !== 'purchase' &&
        preset.type !== 'savings' &&
        preset.type !== 'capital' &&
        preset.number < 0 &&
        categoriesArray.push(preset.category);
    });
    let UniqueCatThisMonth = categoriesArray.filter(function(item, i, ar) {
      return ar.indexOf(item) === i;
    });
    //console.log(`Unika kategorier: ${UniqueCatThisMonth.length}`);
    let MajorArray = [];
    let i; // yttre loop som itererar igenom kategorier
    for (i = 0; i < UniqueCatThisMonth.length; i++) {
      let presetByCatArray = [];
      let SumOfCat;

      // Inner loop som itererar igenom varje preset och stämmer månad och kategori(i) lägg till i array.
      state.presets.map(preset => {
        preset.type !== null &&
          preset.type !== 'purchase' &&
          preset.type !== 'savings' &&
          preset.type !== 'capital' &&
          preset.number < 0 &&
          preset.category === UniqueCatThisMonth[i] &&
          presetByCatArray.push(preset.number);
      }); // end inner loop
      SumOfCat = presetByCatArray.reduce((a, b) => a + b, 0);
      MajorArray.push(Math.abs(SumOfCat));
    }
    dispatch({ type: CATEGORY_SUMONLYNEGNUM_BYYEAR, payload: MajorArray });
  };

  // get ONLY categoryNAME by year to use in apexcharts
  const setCategoryNameOnlyByYear = () => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray = [];
    state.presets.map(preset => {
      preset.type !== null &&
        preset.type !== 'purchase' &&
        preset.type !== 'savings' &&
        preset.type !== 'capital' &&
        categoriesArray.push(preset.category);
    });
    let UniqueCatThisMonth = categoriesArray.filter(function(item, i, ar) {
      return ar.indexOf(item) === i;
    });

    dispatch({ type: CATEGORY_NAMEONLY_BYYEAR, payload: UniqueCatThisMonth });
  };

  // get POSITIVE ONLY categoryNAME by year to use in apexcharts
  const setCategoryNameOnlyPosNumByYear = () => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray = [];
    state.presets.map(preset => {
      preset.type !== null &&
        preset.type !== 'purchase' &&
        preset.type !== 'savings' &&
        preset.type !== 'capital' &&
        preset.number > 0 &&
        categoriesArray.push(preset.category);
    });
    let UniqueCatThisMonth = categoriesArray.filter(function(item, i, ar) {
      return ar.indexOf(item) === i;
    });

    dispatch({
      type: CATEGORY_NAMEONLYPOSNUM_BYYEAR,
      payload: UniqueCatThisMonth
    });
  };

  // get _NEGATIVE_ ONLY categoryNAME by year to use in apexcharts
  const setCategoryNameOnlyNegNumByYear = () => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray = [];
    state.presets.map(preset => {
      preset.type !== null &&
        preset.type !== 'purchase' &&
        preset.type !== 'savings' &&
        preset.type !== 'capital' &&
        preset.number < 0 &&
        categoriesArray.push(preset.category);
    });
    let UniqueCatThisMonth = categoriesArray.filter(function(item, i, ar) {
      return ar.indexOf(item) === i;
    });

    dispatch({
      type: CATEGORY_NAMEONLYNEGNUM_BYYEAR,
      payload: UniqueCatThisMonth
    });
  };

  ////////////////////////////////////
  const calcYearsum = () => {
    let numberArray = [];
    state.presets.map(preset => {
      preset.type !== null &&
      preset.type !== 'purchase' && // måste ha NOT eftersom det finns vissa värden i databasen som saknar preset.type helt
      preset.type !== 'savings' && // då de las in före .type las till i backend.
        preset.type !== 'capital' &&
        numberArray.push(parseFloat(preset.number));
    });

    // checks if no presets exist then don't use .reduce , just return presetnum-value for dispatch.
    if (numberArray.length !== 0) {
      const TotalSum = numberArray.reduce((a, b) => a + b, 0);
      dispatch({ type: YEARSUM, payload: TotalSum });
    }
  };

  // Calc savings sum
  const calcSavings = () => {
    //array att iterera igenom
    let presetArray = [];
    //håller uträknade summan
    let TotalMonthSum = 0;
    state.presets.map(preset => {
      if (preset.type === 'savings')
        presetArray.push(parseFloat(preset.number));
    });
    // checks if no presets exist then don't use .reduce , just return presetnum-value for dispatch.
    if (presetArray.length !== 0) {
      TotalMonthSum = presetArray.reduce((a, b) => a + b, 0);
      dispatch({ type: CALCSAVINGS, payload: TotalMonthSum });
    } else {
      console.log('no savings to calculate ');
    }
  };

  // Calc capital sum
  const calcCapital = () => {
    //array att iterera igenom
    let presetArray = [];
    //håller uträknade summan
    let TotalMonthSum = 0;
    state.presets.map(preset => {
      if (preset.type === 'capital')
        presetArray.push(parseFloat(preset.number));
    });
    // checks if no presets exist then don't use .reduce , just return presetnum-value for dispatch.
    if (presetArray.length !== 0) {
      TotalMonthSum = presetArray.reduce((a, b) => a + b, 0);
      dispatch({ type: CALCCAPITAL, payload: TotalMonthSum });
    } else {
      console.log('no capital to calculate ');
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
        calcAllMonthSum
      }}
    >
      {props.children}
    </PresetContext.Provider>
  );
};

export default PresetState;
