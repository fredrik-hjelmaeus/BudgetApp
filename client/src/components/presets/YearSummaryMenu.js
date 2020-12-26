import React, { useContext, useEffect } from 'react';
import CssContext from '../../context/css/cssContext';
import GuideContext from '../../context/guide/guideContext';

const YearSummaryMenu = () => {
  const cssContext = useContext(CssContext);
  const { yearsummary, setYearSummary } = cssContext;
  const { guide } = useContext(GuideContext);

  React.useEffect(() => {
    if (guide === '13') {
      setYearSummary('expense');
    }
    if (guide === '14') {
      setYearSummary('income');
    }
    if (guide === '15') {
      setYearSummary('savings');
    }
  }, [guide]);

  useEffect(() => {
    yearsummary === undefined && console.log('error');
  }, [yearsummary]);
  // sets css color when button is pressed and creates class for unselected that is used in css to hide buttons that ar not active in mobile-size
  const textcolor = (input) => (yearsummary === input ? `text-dark` : `text-gray ${input}`);

  // sets contextvariable setYearSummary so right grid on year is switched
  const onClick = (e) => {
    setYearSummary(e.target.value);
  };

  return (
    <div className='yearbalance__container card bg-light yearSummaryMenu '>
      <span>
        <button value='balance' onClick={onClick} className={textcolor('balance')}>
          01.
        </button>
        <button value='balance' onClick={onClick} className={textcolor('balance')}>
          Balance Summary: Presented in barchart representing month surplus.
        </button>
      </span>
      <span className={guide === '13' && 'guide__expense'}>
        <button value='expense' onClick={onClick} className={textcolor('expense')}>
          02.
        </button>

        <button
          value='expense'
          onClick={onClick}
          className={textcolor('expense')}
          data-tooltip={guide === '13' ? 'To get to Expense Summary you press here' : null}
        >
          Expense Summary: Presented in donut-chart representing spending by category
        </button>
      </span>
      <span className={guide === '14' && 'guide__expense'}>
        <button value='income' onClick={onClick} className={textcolor('income')}>
          03.
        </button>
        <button
          value='income'
          onClick={onClick}
          className={textcolor('income')}
          data-tooltip={guide === '14' ? 'To get to Income Summary you press here' : null}
        >
          Income Summary: Presented in donut-chart representing spending by category
        </button>
      </span>
      <span className={guide === '15' && 'guide__expense'}>
        <button value='savings' onClick={onClick} className={textcolor('savings')}>
          04.
        </button>
        <button
          value='savings'
          onClick={onClick}
          className={textcolor('savings')}
          data-tooltip={guide === '15' ? 'To get to Savings Summary you press here' : null}
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
            style={yearsummary === 'balance' ? { backgroundColor: '#000000' } : { backgroundColor: '#8c8c8c' }}
            onClick={onClick}
          ></button>
          <button
            value='expense'
            className='YearSummaryMinimizedButtonRectangle'
            style={yearsummary === 'expense' ? { backgroundColor: '#000000' } : { backgroundColor: '#8c8c8c' }}
            onClick={onClick}
          ></button>
          <button
            value='income'
            className='YearSummaryMinimizedButtonRectangle'
            style={yearsummary === 'income' ? { backgroundColor: '#000000' } : { backgroundColor: '#8c8c8c' }}
            onClick={onClick}
          ></button>
          <button
            value='savings'
            className='YearSummaryMinimizedButtonRectangle'
            style={yearsummary === 'savings' ? { backgroundColor: '#000000' } : { backgroundColor: '#8c8c8c' }}
            onClick={onClick}
          ></button>
        </div>
      </div>
    </div>
  );
};
export default YearSummaryMenu;
