import React, { Fragment, useContext, useEffect, useState } from 'react';
import Datemenu from '../layout/Datemenu';
import PresetContext from '../../context/preset/presetContext';
import CssContext from '../../context/css/cssContext';
import Savings from './Savings';
import YearBalance from './YearBalance';
import Expense from './Expense';
import Income from './Income';
import YearCategoryBalance from './YearCategoryBalance';
import YearGridLeft from './YearGridLeft';
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

  const [cssp1display, setCssp1display] = useState('block');
  const [cssp2display, setCssp2display] = useState('none');
  const [startingX, setStartingX] = useState('');
  const [movingX, setMovingX] = useState('');

  let change;
  let cssLeftChange = 0;
  let cssPage2LeftChange = '100%';
  //let cssp2display;
  const onTouchStart = (e) => {
    setStartingX(e.touches[0].clientX);
    setCssp2display('block');
    // console.log(`startingX:${startingX}`);
  };

  const onTouchMove = (e) => {
    setMovingX(e.touches[0].clientX);
    change = parseFloat(startingX) - parseFloat(movingX);
    cssLeftChange = `-${change}px`;
    const ScreenW = window.screen.width;
    const page2change = parseFloat(ScreenW) - parseFloat(change);
    const cssPage2LeftChange = `${page2change}px`;
    e.preventDefault();
    if (change < 0) {
      return;
    }
    //console.log(movingX);
  };
  // screenX = 2474-2194 = 280     touchend = 2474-screenX * (100/224)
  //screen width 375     touchstart = startingX * (100/375)
  const onTouchEnd = (e) => {
    //change = parseFloat(startingX) - parseFloat(e.changedTouches[0].clientX);

    let touchend = parseFloat(2474) - parseFloat(e.changedTouches[0].screenX);
    touchend = touchend * (100 / 280);
    touchend = parseFloat(100) - parseFloat(touchend);
    console.log(`touchend: ${touchend} %`);

    let touchstart = parseFloat(startingX) * parseFloat(100 / 375);
    console.log(`touchstart: ${touchstart} %`);

    //percentchange
    let change = parseFloat(touchstart) - parseFloat(touchend);
    //console.log(change);

    //console.log(e.changedTouches[0].screenX);
    // console.log(window.screen.width);

    const threshold = 33;
    if (change < threshold) {
      setCssp2display('none');
      setCssp1display('block');
      cssLeftChange = '-100%';
      cssPage2LeftChange = '100%';
    } else {
      setCssp2display('block');
      setCssp1display('none');
      cssLeftChange = '100%';
      cssPage2LeftChange = '0';
    }
    // console.log(`startingX:${startingX}`);
    console.log(`Change:${change}`);
    //console.log(`threshold: ${window.screen.width / 3}`);
    //console.log(`changedtouches: ${e.changedTouches[0].clientX}`);
    //console.log(e.changedTouches[0].clientX);
    // console.log(movingX);
  };

  return (
    <Fragment>
      <div
        className='page1'
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ left: cssLeftChange, display: cssp1display }}
      >
        Page1
      </div>
      <div
        className='page2'
        style={{ left: cssPage2LeftChange, display: cssp2display }}
      >
        Page2
      </div>

      {/*    <Datemenu />
      <div className='grid-2'>
        <div>
          <YearTitle />
          {dimensions.width > 700 && <YearSummaryMenu />}
        </div>
        <div>
          {yearsummary === 'savings' && <Savings />}
          {yearsummary === 'expense' && <Expense />}
          {yearsummary === 'balance' && <YearBalance />}
          {yearsummary === 'category' && <YearCategoryBalance />}
          {yearsummary === 'income' && <Income />}
          {dimensions.width < 700 && <YearSummaryMenu />}
        </div>
      </div> */}
    </Fragment>
  );
};

export default Year;
