import React, { Fragment, useContext, useEffect } from 'react';
import Datemenu from '../layout/Datemenu';
import PresetContext from '../../context/preset/presetContext';
import CssContext from '../../context/css/cssContext';
import GuideContext from '../../context/guide/guideContext';
import Savings from './Savings';
import YearBalance from './YearBalance';
import Expense from './Expense';
import Income from './Income';
import YearCategoryBalance from './YearCategoryBalance';
import YearSummaryMenu from './YearSummaryMenu';
import YearTitle from './YearTitle';
import GuideModal from '../guide/GuideModal';
import Tooltip from '../guide/Tooltip';
import UserProfileModal from '../auth/UserProfileModal';
import YearSwiper from '../layout/YearSwiper';

const Year = () => {
  const presetContext = useContext(PresetContext);
  const cssContext = useContext(CssContext);
  const guideContext = useContext(GuideContext);

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

  const { yearsummary, dimensions, modal } = cssContext;
  const { setGuide, guide, exitedguide } = guideContext;

  // loads presets from database when year-variable is updated
  useEffect(() => {
    !guide && getPresets();
    // eslint-disable-next-line
  }, [year]);

  // calculates initial account balance if and when presets is defined.
  useEffect(() => {
    presets && presets.length === 0 && !exitedguide && !guide && setGuide('1');
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
  //if (dimensions.width < 800) return <YearSwiper />;
  return (
    <Fragment>
      {modal === 'profile' && <UserProfileModal />}
      <Datemenu />
      {guide && <GuideModal />}

      <div className='grid-2'>
        <div className='container'>
          <YearTitle />
          {dimensions.width > 700 && <YearSummaryMenu />}
        </div>
        <div className='year-bg'>
          {dimensions.width < 800 && <YearSwiper yearsummary={yearsummary} />}
          {dimensions.width > 800 && yearsummary === 'savings' && <Savings />}
          {dimensions.width > 800 && yearsummary === 'expense' && <Expense />}
          {dimensions.width > 800 && yearsummary === 'balance' && <YearBalance />}
          {dimensions.width > 800 && yearsummary === 'category' && <YearCategoryBalance />}
          {dimensions.width > 800 && yearsummary === 'income' && <Income />}
        </div>
        {/* {dimensions.width < 800 && <YearSummaryMenu />} */}
      </div>
    </Fragment>
  );
};

export default Year;
