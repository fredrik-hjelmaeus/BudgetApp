import React, { useContext } from 'react';
import CssContext from '../../context/css/cssContext';
import PresetContext from '../../context/preset/presetContext';
const YearSummaryMenu = () => {
  const cssContext = useContext(CssContext);
  const presetContext = useContext(PresetContext);
  const { year } = presetContext;
  const { yearsummary, setYearSummary } = cssContext;

  // sets css color when button is pressed
  const textcolor = input =>
    yearsummary === input ? 'text-dark' : 'text-gray';

  // sets contextvariable setYearSummary so right grid on year is switched
  const onClick = e => {
    setYearSummary(e.target.value);
  };

  return (
    <div className='card bg-light yearGridleft'>
      <span>
        <button
          value='balance'
          onClick={onClick}
          className={textcolor('balance')}
        >
          01.
        </button>
        <button
          value='balance'
          onClick={onClick}
          className={textcolor('balance')}
        >
          Balance Summary: Presented in barchart representing month surplus.
        </button>
      </span>
      <span>
        <button
          value='expense'
          onClick={onClick}
          className={textcolor('expense')}
        >
          02.
        </button>
        <button
          value='expense'
          onClick={onClick}
          className={textcolor('expense')}
        >
          Expense Summary: Presented in donut-chart representing spending by
          category
        </button>
      </span>
      <span>
        <button
          value='income'
          onClick={onClick}
          className={textcolor('income')}
        >
          03.
        </button>
        <button
          value='income'
          onClick={onClick}
          className={textcolor('income')}
        >
          Income Summary: Presented in donut-chart representing spending by
          category
        </button>
      </span>
      <span>
        <button
          value='savings'
          onClick={onClick}
          className={textcolor('savings')}
        >
          04.
        </button>
        <button
          value='savings'
          onClick={onClick}
          className={textcolor('savings')}
        >
          Savings Summary
        </button>
      </span>
    </div>
  );
};
export default YearSummaryMenu;
