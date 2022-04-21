import React, { ReactNode, useReducer } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import PresetContext from "./presetContext";
import presetReducer from "./presetReducer";
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
  PRESET_CLEAR_ERRORS,
} from "../types";
import { IPresetContext, IPresetState } from "../../frontend-types/IPresetContext";
import { IPreset } from "../../frontend-types/IPreset";
import { ICategoryAndSumItem } from "../../frontend-types/ICategoryAndSumItem";

const PresetState = (props: { children: ReactNode }) => {
  const initialState: IPresetState = {
    presets: null,
    loading: true,
    edit: null,
    sum: null,
    month: null, // year implemented. Only indirect affects
    error: null,
    MonthSum: null, // year implemented
    year: null, // year implemented. needs more strict control of datatype. it changes between string and number
    filteredmonthandposnum: null, // year implemented
    filteredmonthandnegnum: null, // year implemented
    /*  
    
   
    AllMonthSum: [], // year implemented
    PosMonthSum: null, // gets data from filteredmonthandnegnum
    NegMonthSum: null, // gets data from filteredmonthandposnum
  
    categorymonthsum: [], // year implemented
    categoryyearsum: [], // year implemented
   
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
    capitalList: [],  */
  };

  const [state, dispatch] = useReducer(presetReducer, initialState);

  // Get Presets
  const getPresets: IPresetContext["getPresets"] = async () => {
    try {
      const res: AxiosResponse = await axios.get("/api/userpreset");

      dispatch({ type: GET_PRESETS, payload: res.data });
    } catch (err: unknown | AxiosError) {
      if (axios.isAxiosError(err)) {
        dispatch({
          type: PRESET_ERROR,
          payload: err?.response?.data.msg,
        });
      } else {
        // TODO: this error should be in the logger
        console.log(err);
      }
    }
  };
  // Add preset
  const addPreset: IPresetContext["addPreset"] = async (preset) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/userpreset", preset, config);

      dispatch({ type: ADD_PRESET, payload: res.data });
    } catch (err: unknown | AxiosError) {
      if (axios.isAxiosError(err)) {
        if (err.response === undefined) {
          dispatch({
            type: PRESET_ERROR,
            payload: "Server or you are offline",
          });
        } else {
          dispatch({
            type: PRESET_ERROR,
            payload: err?.response?.data.msg,
          });
        }
      } else {
        console.log(err);
      }
    }
  };
  // Delete preset
  const deletePreset: IPresetContext["deletePreset"] = async (id) => {
    try {
      await axios.delete(`/api/userpreset/${id}`);
      dispatch({
        type: DELETE_PRESET,
        payload: id,
      });
    } catch (err: unknown | AxiosError) {
      if (axios.isAxiosError(err)) {
        dispatch({
          type: PRESET_ERROR,
          payload: err?.response?.data.msg,
        });
      } else {
        console.log(err);
      }
    }
  };
  // send edit
  const sendEdit: IPresetContext["sendEdit"] = async (preset) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(`/api/userpreset/${preset.id}`, preset, config);

      dispatch({ type: SEND_EDIT, payload: res.data });
    } catch (err: unknown | AxiosError) {
      if (axios.isAxiosError(err)) {
        dispatch({
          type: PRESET_ERROR,
          payload: err?.response?.data.msg,
        });
      } else {
        console.log(err);
      }
    }
    //Recalc ALL
    resetSums();
    preset.type !== "purchase" && calcSum();
    state.month && filterOutPositiveNumsAndMonth(state.month);
    state.month && filterOutNegativeNumsAndMonth(state.month);
  };
  // edit preset
  const setEdit: IPresetContext["setEdit"] = (preset) => {
    dispatch({ type: EDIT_PRESET, payload: preset });
  };

  // cancel edit preset
  const cancelEdit: IPresetContext["cancelEdit"] = () => {
    dispatch({ type: CANCEL_EDIT });
  };

  // Clear presets
  const clearPresets: IPresetContext["clearPresets"] = () => {
    dispatch({ type: CLEAR_PRESETS });
  };

  const calcSum: IPresetContext["calcSum"] = () => {
    let TotalSum = 0;

    const dispatchSum = (sumArray: number[]) => {
      // checks if no presets exist then don't use .reduce , just return 0 for dispatch.
      if (sumArray.length !== 0) {
        TotalSum = sumArray.reduce((a, b) => a + b, 0);
        dispatch({ type: SUM, payload: TotalSum });
      } else {
        dispatch({ type: SUM, payload: 0 });
      }
    };
    const sumArray: number[] = [];
    state.presets?.map((preset: IPreset) => {
      if (preset.type !== "purchase" && preset.type !== "savings") {
        return sumArray.push(preset.number);
      } else {
        if (preset.type === "savings") {
          return sumArray.push(preset.number * -1);
        }
      }
    });

    dispatchSum(sumArray);
  };

  // Add month-val coming from Datemenu
  const addMonth: IPresetContext["addMonth"] = (month) => {
    dispatch({ type: ADD_MONTH, payload: month });
  };

  // Calc month sum
  const calcMonthSum: IPresetContext["calcMonthSum"] = (month) => {
    //array att iterera igenom
    let presetArray: number[] = [];
    //håller uträknade summan
    let TotalMonthSum = 0;
    if (state.year === 2019) {
      state.presets?.map((preset: IPreset) => {
        return (
          preset.year === undefined ||
          (preset.year === parseInt("2019") &&
            preset.month === month &&
            preset.type !== "savings" &&
            preset.type !== "capital" &&
            preset.type !== "purchase" &&
            presetArray.push(preset.number))
        );
      });
    } else {
      state.presets?.map((preset: IPreset) => {
        return (
          preset.year === state.year &&
          preset.month === month &&
          preset.type !== "savings" &&
          preset.type !== "capital" &&
          preset.type !== "purchase" &&
          presetArray.push(preset.number)
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

  // set year when yearbutton is pressed in datemenucomponent
  const setYear: IPresetContext["setYear"] = (year) => {
    dispatch({ type: SET_YEAR, payload: year });
  };

  // Reset Sums before recalc
  const resetSums: IPresetContext["resetSums"] = () => {
    dispatch({ type: RESET_SUMS });
  };

  // Filter out all presets with positive numbers and provided month and year
  const filterOutPositiveNumsAndMonth: IPresetContext["filterOutPositiveNumsAndMonth"] = (
    month
  ) => {
    dispatch({ type: FILTER_POSNUMANDMONTH, payload: month });
  };

  // Filter out all presets with negative numbers and provided month
  const filterOutNegativeNumsAndMonth: IPresetContext["filterOutNegativeNumsAndMonth"] = (
    month
  ) => {
    dispatch({ type: FILTER_NEGNUMANDMONTH, payload: month });
  };
  /*  

 

  // Upload CSV
  const uploadCSV:IPresetContext["uploadCSV"] = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.post("/api/userpreset/upload", formData, config);
      dispatch({ type: UPLOAD_CSV, payload: res.data });
    } catch (err:unknown | AxiosError) {
      if (axios.isAxiosError(err)) {dispatch({
        type: PRESET_ERROR,
        payload: err?.response?.data,
      })
    } else {
      console.log(err)
    }
      
      
    }
  };

  //Update CSV
  const updateCsvPresets:IPresetContext["updateCsvPresets"] = (preset) => {
    dispatch({ type: UPDATE_CSV, payload: preset });
  };

  //Remove CSV
  const removeCSV:IPresetContext["removeCSV"] = (preset) => {
    dispatch({ type: REMOVE_CSV, payload: preset });
  };

  // Clear CSV
  const clearCsv:IPresetContext["clearCsv"] = () => {
    dispatch({ type: CLEAR_CSV });
  };

  

 

  

  

  const setPurchase:IPresetContext["setPurchase"] = () => {
    dispatch({ type: SET_PURCHASE });
  }; 

  
  //  Calculate AccountBalance
  //  Sum of overhead & capital presets minus savings and piggybank savings.
   
   

  

  // Calc _ALL_ months sum
  const calcAllMonthSum:IPresetContext["calcAllMonthSum"] = (montharray) => {
    dispatch({ type: RESET_ALLMONTHSUM });
    //iterera igenom alla månader
    montharray.map((month) => {
      //array att iterera igenom
      let presetArray:number[] = [];

      //håller uträknade summan
      let TotalMonthSum = 0;
      if (state.year === "2019" || state.year === 2019) {
        state.presets?.map((preset:IPreset) => {
          return (
            preset.year === undefined ||
            //preset.year === "2019" ||
            (preset.year === 2019 &&
              preset.month === month &&
              preset.type !== "savings" &&
              preset.type !== "capital" &&
              preset.type !== "purchase" &&
              presetArray.push(preset.number))
          );
        });
      } else {
        state.presets?.map((preset:IPreset) => {
          return (
            preset.year === parseInt(state.year) &&
            preset.month === month &&
            preset.type !== "savings" &&
            preset.type !== "capital" &&
            preset.type !== "purchase" &&
            presetArray.push(preset.number)
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

 

  // Calc Positive month sum
  const calcPosMonth:IPresetContext["calcPosMonth"] = () => {
    //array att iterera igenom
    let presetArray:number[] = [];
    //håller uträknade summan
    let TotalMonthSum = 0;
    state.filteredmonthandposnum &&
      state.filteredmonthandposnum.map((preset:IPreset) => {
        return presetArray.push(preset.number);
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
  const calcNegMonth:IPresetContext["calcNegMonth"] = () => {
    //array att iterera igenom
    let presetArray:number[] = [];
    //håller uträknade summan
    let negnum = 0;
    state.filteredmonthandnegnum &&
      state.filteredmonthandnegnum.map((preset:IPreset) => {
        return presetArray.push(preset.number);
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
  const calcCategoryByMonth:IPresetContext["calcCategoryByMonth"] = (month) => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray:string[] = [];
    state.presets?.map((preset:IPreset) => {
      return (
        preset.type !== null &&
        preset.type !== "purchase" &&
        preset.type !== "savings" &&
        preset.type !== "capital" &&
        preset.month === month &&
        categoriesArray.push(preset.category)
      );
    });
    let UniqueCatThisMonth = categoriesArray.filter(function (item, i, ar) {
      return ar.indexOf(item) === i;
    });

    let MajorArray = [];

    for (let i = 0; i < UniqueCatThisMonth.length; i++) {
      let presetByCatArray:number[] = [];
      let SumOfCat;
      let newCatAndSumObject = {} as ICategoryAndSumItem;

      // Inner loop som itererar igenom varje preset och stämmer månad och kategori(i) lägg till i array.
      if (state.year === "2019" || state.year === 2019) {
        state.presets?.map((preset:IPreset) => {
          return (
            preset.year === undefined ||
            preset.year === parseInt("2019") &&
              preset.type !== null &&
              preset.type !== "purchase" &&
              preset.type !== "savings" &&
              preset.type !== "capital" &&
              preset.month === month &&
              preset.category === UniqueCatThisMonth[i] &&
              presetByCatArray.push(preset.number)
          );
        }); // end inner loop
      } else {
        state.presets?.map((preset:IPreset) => {
          return (
            preset.year === parseInt(state.year) &&
            preset.type !== null &&
            preset.type !== "purchase" &&
            preset.type !== "savings" &&
            preset.type !== "capital" &&
            preset.month === month &&
            preset.category === UniqueCatThisMonth[i] &&
            presetByCatArray.push(preset.number)
          );
        }); // end inner loop
      }

      SumOfCat = presetByCatArray.reduce((a, b) => a + b, 0);
      let cat = UniqueCatThisMonth[i];

      newCatAndSumObject = {
        id: i,
        SumOfCat,
        cat,
      };
      SumOfCat !== 0 && MajorArray.push(newCatAndSumObject);
    }
    dispatch({ type: CATEGORYMONTHSUM, payload: MajorArray });
  };

  // calculate sum of provided category and year and put together in one array
  const calcCategoryByYear:IPresetContext["calcCategoryByYear"] = () => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray:string[] = [];
    if (state.year === "2019" || state.year === 2019) {
      state.presets?.map((preset:IPreset) => {
        return (
          preset.year === undefined ||
          (preset.year === parseInt("2019") &&
            preset.type !== null &&
            preset.type !== "purchase" &&
            preset.type !== "savings" &&
            preset.type !== "capital" &&
            categoriesArray.push(preset.category))
        );
      });
    } else {
      state.presets?.map((preset:IPreset) => {
        return (
          preset.year === parseInt(state.year) &&
          preset.type !== null &&
          preset.type !== "purchase" &&
          preset.type !== "savings" &&
          preset.type !== "capital" &&
          categoriesArray.push(preset.category)
        );
      });
    }
    let UniqueCatThisMonth = categoriesArray.filter(function (item, i, ar) {
      return ar.indexOf(item) === i;
    });

    let MajorArray = [];

    for (let i = 0; i < UniqueCatThisMonth.length; i++) {
      let presetByCatArray:number[] = [];
      let SumOfCat;
      let newCatAndSumObject = {} as ICategoryAndSumItem;

      // Inner loop som itererar igenom varje preset och stämmer månad och kategori(i) lägg till i array.
      if (state.year === "2019" || state.year === 2019) {
        state.presets?.map((preset:IPreset) => {
          return (
            preset.year === undefined ||
            (preset.year === parseInt("2019") &&
              preset.type !== null &&
              preset.type !== "purchase" &&
              preset.type !== "savings" &&
              preset.type !== "capital" &&
              preset.category === UniqueCatThisMonth[i] &&
              presetByCatArray.push(preset.number))
          );
        }); // end inner loop
      } else {
        state.presets?.map((preset:IPreset) => {
          return (
            preset.year === parseInt(state.year) &&
            preset.type !== null &&
            preset.type !== "purchase" &&
            preset.type !== "savings" &&
            preset.type !== "capital" &&
            preset.category === UniqueCatThisMonth[i] &&
            presetByCatArray.push(preset.number)
          );
        }); // end inner loop
      }
      SumOfCat = presetByCatArray.reduce((a, b) => a + b, 0);
      let cat = UniqueCatThisMonth[i];
      newCatAndSumObject = {
        id: i,
        SumOfCat,
        cat,
      };
      MajorArray.push(newCatAndSumObject);
    }
    dispatch({ type: CATEGORYYEARSUM, payload: MajorArray });
  };

  // calculate sum of provided category and year and put _only_ the _POSITIVE_ sum in an array.
  const calcCategorySumOnlyPosNumByYear:IPresetContext["calcCategorySumOnlyPosNumByYear"] = () => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray:string[] = [];
    if (state.year === "2019" || state.year === 2019) {
      state.presets?.map((preset:IPreset) => {
        return (
          preset.year === undefined ||
          (preset.year === parseInt("2019") &&
            preset.type !== null &&
            preset.type !== "purchase" &&
            preset.type !== "savings" &&
            preset.type !== "capital" &&
            preset.number > 0 &&
            categoriesArray.push(preset.category))
        );
      });
    } else {
      state.presets?.map((preset:IPreset) => {
        return (
          preset.year === parseInt(state.year) &&
          preset.type !== null &&
          preset.type !== "purchase" &&
          preset.type !== "savings" &&
          preset.type !== "capital" &&
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
      let presetByCatArray:number[] = [];
      let SumOfCat;

      // Inner loop som itererar igenom varje preset och stämmer månad och kategori(i) lägg till i array.
      if (state.year === "2019" || state.year === 2019) {
        state.presets?.map((preset:IPreset) => {
          return (
            preset.year === undefined ||
            (preset.year === parseInt("2019") &&
              preset.type !== null &&
              preset.type !== "purchase" &&
              preset.type !== "savings" &&
              preset.type !== "capital" &&
              preset.number > 0 &&
              preset.category === UniqueCatThisMonth[i] &&
              presetByCatArray.push(preset.number))
          );
        }); // end inner loop
      } else {
        state.presets?.map((preset:IPreset) => {
          return (
            preset.year === parseInt(state.year) &&
            preset.type !== null &&
            preset.type !== "purchase" &&
            preset.type !== "savings" &&
            preset.type !== "capital" &&
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
  const calcCategorySumOnlyNegNumByYear:IPresetContext["calcCategorySumOnlyNegNumByYear"] = () => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray:string[] = [];
    if (state.year === "2019" || state.year === 2019) {
      state.presets?.map((preset:IPreset) => {
        return (
          preset.year === undefined ||
          (preset.year === parseInt("2019") &&
            preset.type !== null &&
            preset.type !== "purchase" &&
            preset.type !== "savings" &&
            preset.type !== "capital" &&
            preset.number < 0 &&
            categoriesArray.push(preset.category))
        );
      });
    } else {
      state.presets?.map((preset:IPreset) => {
        return (
          preset.year === parseInt(state.year) &&
          preset.type !== null &&
          preset.type !== "purchase" &&
          preset.type !== "savings" &&
          preset.type !== "capital" &&
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
      let presetByCatArray:number[] = [];
      let SumOfCat;

      // Inner loop som itererar igenom varje preset och stämmer månad och kategori(i) lägg till i array.
      if (state.year === "2019" || state.year === 2019) {
        state.presets?.map((preset:IPreset) => {
          return (
            preset.year === undefined ||
            (preset.year === parseInt("2019") &&
              preset.type !== null &&
              preset.type !== "purchase" &&
              preset.type !== "savings" &&
              preset.type !== "capital" &&
              preset.number < 0 &&
              preset.category === UniqueCatThisMonth[i] &&
              presetByCatArray.push(preset.number))
          );
        }); // end inner loop
      } else {
        state.presets?.map((preset:IPreset) => {
          return (
            preset.year === parseInt(state.year) &&
            preset.type !== null &&
            preset.type !== "purchase" &&
            preset.type !== "savings" &&
            preset.type !== "capital" &&
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

  // get POSITIVE ONLY categoryNAME by year to use in apexcharts
  const setCategoryNameOnlyPosNumByYear:IPresetContext["setCategoryNameOnlyPosNumByYear"] = () => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray:string[] = [];
    if (state.year === "2019" || state.year === 2019) {
      state.presets?.map((preset:IPreset) => {
        return (
          preset.year === undefined ||
          (preset.year === parseInt("2019") &&
            preset.type !== null &&
            preset.type !== "purchase" &&
            preset.type !== "savings" &&
            preset.type !== "capital" &&
            preset.number > 0 &&
            categoriesArray.push(preset.category))
        );
      });
    } else {
      state.presets?.map((preset:IPreset) => {
        return (
          preset.year === parseInt(state.year) &&
          preset.type !== null &&
          preset.type !== "purchase" &&
          preset.type !== "savings" &&
          preset.type !== "capital" &&
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
  const setCategoryNameOnlyNegNumByYear:IPresetContext["setCategoryNameOnlyNegNumByYear"] = () => {
    // array som håller presets kategorier och ska itereras igenom för att hitta alla unika categorier denna månad
    let categoriesArray:string[] = [];
    if (state.year === "2019" || state.year === 2019) {
      state.presets?.map((preset:IPreset) => {
        return (
          preset.year === undefined ||
          (preset.year === parseInt("2019") &&
            preset.type !== null &&
            preset.type !== "purchase" &&
            preset.type !== "savings" &&
            preset.type !== "capital" &&
            preset.number < 0 &&
            categoriesArray.push(preset.category))
        );
      });
    } else {
      state.presets?.map((preset:IPreset) => {
        return (
          preset.year === parseInt(state.year) &&
          preset.type !== null &&
          preset.type !== "purchase" &&
          preset.type !== "savings" &&
          preset.type !== "capital" &&
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
  const calcYearsum:IPresetContext["calcYearsum"] = (year) => {
    let numberArray:number[] = [];
    if (year === 2019) {
      state.presets?.map((preset:IPreset) => {
        return (
          preset.year === undefined ||
          (preset.year === parseInt("2019") &&
            preset.type !== null &&
            preset.type !== "purchase" && // måste ha NOT eftersom det finns vissa värden i databasen som saknar preset.type helt
            preset.type !== "savings" && // då de las in före .type las till i backend.
            preset.type !== "capital" &&
            numberArray.push(preset.number))
        );
      });
    } else {
      state.presets?.map((preset:IPreset) => {
        return (
          preset.year === parseInt(state.year) &&
          preset.type !== null &&
          preset.type !== "purchase" && // måste ha NOT eftersom det finns vissa värden i databasen som saknar preset.type helt
          preset.type !== "savings" && // då de las in före .type las till i backend.
          preset.type !== "capital" &&
          numberArray.push(preset.number)
        );
      });
    }

    // checks if no presets exist then don't use .reduce , just return presetnum-value for dispatch.
    if (numberArray.length !== 0) {
      const TotalSum = numberArray.reduce((a, b) => a + b, 0);
      dispatch({ type: YEARSUM, payload: TotalSum });
    } else dispatch({ type: YEARSUM, payload: 0 });
  };

  const getSavingsList:IPresetContext["getSavingsList"] = () => {
    const listOfSavings:IPreset[] = state.presets?.filter((preset:IPreset) => {
      return preset.type === "savings" && preset;
    });
    dispatch({ type: SET_SAVINGS_LIST, payload: listOfSavings });
  }; 

   const getCapitalList:IPresetContext["getCapitalList"] = () => {
    const listOfCapitalItems:IPreset[] = state.presets?.filter((preset:IPreset) => {
      return preset.type === "capital" && preset;
    });

    dispatch({ type: SET_CAPITAL_LIST, payload: listOfCapitalItems });
  };

  // Calc savings sum
  const calcSavings:IPresetContext["calcSavings"] = () => {
    //array att iterera igenom
    let presetArray:number[] = [];
    //håller uträknade summan
    let TotalMonthSum = 0;
    state.presets?.map((preset:IPreset) => {
      return preset.type === "savings" && presetArray.push(preset.number);
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
  const calcMonthSavings:IPresetContext["calcMonthSavings"] = () => {
    //array att iterera igenom
    let presetArray:number[] = [];
    //håller uträknade summan
    let TotalMonthSum = 0;
    if (state.year === 2019 || state.year === "2019") {
      state.presets?.map((preset:IPreset) => {
        return (
          preset.year === undefined ||
          (preset.year === parseInt("2019") &&
            preset.type === "savings" &&
            preset.month === state.month &&
            presetArray.push(preset.number))
        );
      });
    } else {
      state.presets?.map((preset:IPreset) => {
        return (
          preset.year === parseInt(state.year) &&
          preset.type === "savings" &&
          preset.month === state.month &&
          presetArray.push(preset.number)
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
  const calcMonthBalance:IPresetContext["calcMonthBalance"] = () => {
    const totalsum = state.MonthSum - state.monthsavings - state.SumPiggybanksMonth;
    dispatch({ type: CALC_MONTH_BALANCE, payload: totalsum });
  };

  // Get presets with savings added in this month and purchases with piggybanksavings added in this month
  const getMonthSavings: IPresetContext["getMonthSavings"] = (month) => {
    if (state.year === "2019" || state.year === 2019) {
      const filter: IPreset[] = state.presets.filter(
        (preset: IPreset) =>
          preset.year === undefined ||
          (preset.year === parseInt("2019") &&
            preset.type === "savings" &&
            preset.month === month)
      );
      dispatch({ type: GET_MONTHSAVINGS, payload: filter });
    } else {
      const filter = state.presets.filter(
        (preset: IPreset) =>
          preset.year=== parseInt(state.year) &&
          preset.type === "savings" &&
          preset.month === month
      );
      dispatch({ type: GET_MONTHSAVINGS, payload: filter });
    }
  };

  // Get presets with piggybank-savings added this month
  const getMonthPiggySavings:IPresetContext["getMonthPiggySavings"] = () => {
    dispatch({ type: GET_MONTHPIGGYSAVINGS, payload: state.month });
  }; 
  // Calc capital sum
   const calcCapital = () => {
    //array att iterera igenom
    let presetArray:number[] = [];
    //håller uträknade summan
    let TotalMonthSum = 0;
    state.presets?.map((preset:IPreset) => {
      return preset.type === "capital" && presetArray.push(preset.number);
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

  const setActivePiggybank:IPresetContext["setActivePiggybank"] = (piggybankArray) => {
    dispatch({ type: SET_ACTIVE_PIGGYBANK, payload: piggybankArray });
  };

  const addtoPiggybanks:IPresetContext["addtoPiggybanks"] = (object) => {
    dispatch({ type: ADDTO_PIGGYBANK, payload: object });
  };

  const clearPiggybanks:IPresetContext["clearPiggybanks"] = () => {
    dispatch({ type: CLEAR_PIGGYBANKS });
  };

  const setTotalOfAllPiggybanksThisMonth:IPresetContext["setTotalOfAllPiggybanksThisMonth"] = (Sum) => {
    dispatch({ type: SUM_PIGGYBANKS_MONTH, payload: Sum });
  };

  const submitCsvItems:IPresetContext["submitCsvItems"] = (string) => {
    dispatch({ type: SUBMIT_CSV, payload: string });
  }; 

  // Get guidePresets
   const getGuidePresets:IPresetContext["getGuidePresets"] = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get("/api/guide", config);
      dispatch({ type: GET_PRESETS, payload: res.data });
    } catch (err:unknown | AxiosError) {
      if(axios.isAxiosError(err)){
        dispatch({
          type: PRESET_ERROR,
          payload: err?.response?.data.msg,
        });

      }else{
        console.log(err);
      }
    }
  };  */

  return (
    <PresetContext.Provider
      value={{
        presets: state.presets,
        edit: state.edit,
        loading: state.loading,
        sum: state.sum,
        month: state.month,
        error: state.error,
        MonthSum: state.MonthSum,
        year: state.year,
        filteredmonthandposnum: state.filteredmonthandposnum,
        filteredmonthandnegnum: state.filteredmonthandnegnum,
        /*   
        
        PosMonthSum: state.PosMonthSum,
        NegMonthSum: state.NegMonthSum,
        categorymonthsum: state.categorymonthsum,
        categoryyearsum: state.categoryyearsum,
       
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
       
       
        
        
          */
        calcSum,
        cancelEdit,
        setEdit,
        sendEdit,
        getPresets,
        addPreset,
        deletePreset,
        clearPresets,
        addMonth,
        calcMonthSum,
        setYear,
        filterOutPositiveNumsAndMonth,
        filterOutNegativeNumsAndMonth,
        resetSums,
        /*   
        calcPosMonth,
        calcNegMonth,
        calcCategoryByMonth,
        calcCategoryByYear,
       
        calcYearsum,
        calcSavings,
        calcCapital,
        setPurchase,
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
        getCapitalList, */
      }}
    >
      {props.children}
    </PresetContext.Provider>
  );
};

export default PresetState;
