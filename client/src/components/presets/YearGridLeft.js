import React, { useContext } from 'react';
import CssContext from '../../context/css/cssContext';
import PresetContext from '../../context/preset/presetContext';

//var Scroll   = require('react-scroll');

//const scroller = Scroll.scroller;
//<Element name="myScrollToElement"></Element>

// Somewhere else, even another file

const YearSummaryMenu = () => {
  const cssContext = useContext(CssContext);
  const presetContext = useContext(PresetContext);
  const { year } = presetContext;
  const { yearsummary, setYearSummary } = cssContext;

  // sets css color when button is pressed
  const textcolor = (input) => (yearsummary === input ? 'text-dark' : 'text-gray');

  // sets contextvariable setYearSummary so right grid on year is switched
  const onClick = (e) => {
    setYearSummary(e.target.value);
  };

  return (
    <div className='card bg-light yearGridleft'>
      <h1 className='x-large'>{year}</h1>
      <h4>Yearly summary and comparison analysis with last year. Here you can also see differences in income/costs over the year.</h4>
      <span>
        <button value='balance' onClick={onClick} className={textcolor('balance')}>
          01.
        </button>
        <button value='balance' onClick={onClick} className={textcolor('balance')}>
          Balance Summary: Presented in barchart representing month surplus.
        </button>
      </span>
      <span>
        <button value='expense' onClick={onClick} className={textcolor('expense')}>
          02.
        </button>

        <button value='expense' onClick={onClick} className={textcolor('expense')}>
          Expense Summary: Presented in donut-chart representing spending by category
        </button>
      </span>
      <span>
        <button value='income' onClick={onClick} className={textcolor('income')}>
          03.
        </button>
        <button value='income' onClick={onClick} className={textcolor('income')}>
          Income Summary: Presented in donut-chart representing spending by category
        </button>
      </span>
      <span>
        <button value='savings' onClick={onClick} className={textcolor('savings')}>
          04.
        </button>
        <button value='savings' onClick={onClick} className={textcolor('savings')}>
          Savings Summary
        </button>
      </span>
    </div>
  );
};
export default YearSummaryMenu;
