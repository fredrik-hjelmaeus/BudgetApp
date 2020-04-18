import React, { useContext, useEffect } from 'react';
import CssContext from '../../context/css/cssContext';
import PresetContext from '../../context/preset/presetContext';
const YearSummaryMenu = () => {
  const cssContext = useContext(CssContext);
  const presetContext = useContext(PresetContext);
  const { yearsummary, setYearSummary } = cssContext;

  useEffect(() => {
    yearsummary === undefined && console.log('error');
  }, [yearsummary]);
  // sets css color when button is pressed and creates class for unselected that is used in css to hide buttons that ar not active in mobile-size
  const textcolor = (input) =>
    yearsummary === input ? `text-dark` : `text-gray ${input}`;

  // sets css color depending on active tab
  const fillcolor = (input) => (yearsummary === input ? '#2b2b2b' : '#8c8c8c');

  // sets contextvariable setYearSummary so right grid on year is switched
  const onClick = (e) => {
    console.log(e.target.value);
    setYearSummary(e.target.value);
  };

  return (
    <div className='container card bg-light yearSummaryMenu '>
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
      {/*Mobile Buttons */}
      <div className='YearSummaryMenuMinimizedButtonsContainer'>
        <div className='YearSummaryMenuMinimizedButtons'>
          <button
            value='balance'
            className='YearSummaryMinimizedButtonRectangle'
            style={
              yearsummary === 'balance'
                ? { backgroundColor: '#000000' }
                : { backgroundColor: '#8c8c8c' }
            }
            onClick={onClick}
          ></button>
          <button
            value='expense'
            className='YearSummaryMinimizedButtonRectangle'
            style={
              yearsummary === 'expense'
                ? { backgroundColor: '#000000' }
                : { backgroundColor: '#8c8c8c' }
            }
            onClick={onClick}
          ></button>
          <button
            value='income'
            className='YearSummaryMinimizedButtonRectangle'
            style={
              yearsummary === 'income'
                ? { backgroundColor: '#000000' }
                : { backgroundColor: '#8c8c8c' }
            }
            onClick={onClick}
          ></button>
          <button
            value='savings'
            className='YearSummaryMinimizedButtonRectangle'
            style={
              yearsummary === 'savings'
                ? { backgroundColor: '#000000' }
                : { backgroundColor: '#8c8c8c' }
            }
            onClick={onClick}
          ></button>
        </div>
      </div>
    </div>
  );
};
export default YearSummaryMenu;
