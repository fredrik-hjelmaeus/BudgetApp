import React, { Fragment, useContext, useEffect } from 'react';
import Datemenu from '../layout/Datemenu';
import PresetContext from '../../context/preset/presetContext';
import CssContext from '../../context/css/cssContext';
import Savings from './Savings';
import YearBalance from './YearBalance';
import Expense from './Expense';
import Income from './Income';
import YearCategoryBalance from './YearCategoryBalance';
import YearSummaryMenu from './YearSummaryMenu';
import YearTitle from './YearTitle';

const Year = () => {
  const presetContext = useContext(PresetContext);
  const cssContext = useContext(CssContext);

  const {
    getPresets,
    year,
    presets,
    calcCategoryByYear,
    calcYearsum,
    calcSavings,
    calcCapital,
    setCategoryNameOnlyPosNumByYear,
    calcCategorySumOnlyByYear,
    setCategoryNameOnlyByYear,
    calcCategorySumOnlyPosNumByYear,
    calcCategorySumOnlyNegNumByYear,
    setCategoryNameOnlyNegNumByYear,
    calcAllMonthSum,
  } = presetContext;

  const { yearsummary, dimensions } = cssContext;
  // loads presets from database when year-variable is updated
  useEffect(() => {
    getPresets();
    // eslint-disable-next-line
  }, [year]);

  // calculates initial account balance if and when presets is defined.
  useEffect(() => {
    presets && presetContext.calcSum(9, null, 'init');
    presets && calcCategoryByYear();
    presets && year === null && calcYearsum('2019');
    presets && year !== null && calcYearsum(year);
    presets && calcSavings();
    presets && calcCapital();
    presets && calcCategorySumOnlyByYear();
    presets && setCategoryNameOnlyByYear();
    presets && setCategoryNameOnlyPosNumByYear();
    presets && calcCategorySumOnlyPosNumByYear();
    presets && calcCategorySumOnlyNegNumByYear();
    presets && setCategoryNameOnlyNegNumByYear();
    presets &&
      calcAllMonthSum([
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]);
    // eslint-disable-next-line
  }, [presets, year]);

  return (
    <Fragment>
      <Datemenu />
      <div className='grid-2'>
        <div className='container'>
          <YearTitle />
          {dimensions.width > 700 && <YearSummaryMenu />}
        </div>
        <div>
          {yearsummary === 'savings' && <Savings />}
          {yearsummary === 'expense' && <Expense />}
          {yearsummary === 'balance' && <YearBalance />}
          {yearsummary === 'category' && <YearCategoryBalance />}
          {yearsummary === 'income' && <Income />}
          {dimensions.width < 800 && <YearSummaryMenu />}
        </div>
      </div>
    </Fragment>
  );
};

export default Year;
