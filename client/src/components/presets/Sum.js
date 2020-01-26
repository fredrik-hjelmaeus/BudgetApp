import React, { Fragment, useContext, useEffect } from 'react';
import PresetContext from '../../context/preset/presetContext';

const Sum = () => {
  const presetContext = useContext(PresetContext);

  const {
    month,
    presets,
    calcPosMonth,
    calcNegMonth,
    filteredmonthandposnum,
    filteredmonthandnegnum,
    monthsavings,
    MonthSum,
    sum,
    SumPiggybanksMonth
  } = presetContext;

  useEffect(() => {
    if (month !== null && presets !== null) {
      calcPosMonth(filteredmonthandposnum);
      calcNegMonth(filteredmonthandnegnum);
      calcMonthBalance();
    } // eslint-disable-next-line
  }, [
    month,
    presets,
    filteredmonthandposnum,
    filteredmonthandnegnum,
    monthsavings,
    MonthSum
  ]);

  const calcMonthBalance = () => {
    return MonthSum - monthsavings - SumPiggybanksMonth;
  };

  return (
    <Fragment>
      <div className='card_top_monthright bold grid-3 no-wrap'>
        {/* Income Month */}
        <div className='text-gray'>
          Month Income:{'    '}
          <span
            className={
              presetContext.PosMonthSum > 0 ? 'text-success ' : 'text-gray '
            }
          >
            {presetContext.PosMonthSum}
          </span>
        </div>
        {/* Surplus Month */}
        <div>
          <span
            className={
              presetContext.MonthSum > 0 ? 'text-primary' : 'text-primary'
            }
          >
            {presetContext.MonthSum > 0 ? 'Month Surplus:' : 'Balance Month:'}
          </span>
          <span
            className={
              presetContext.MonthSum > 0 ? 'text-success' : 'text-danger'
            }
          >
            {presetContext.MonthSum}
          </span>
        </div>
        {/* Expenses Month */}
        <div className='text-gray'>
          Month Expenses:{'    '}
          <span
            className={
              presetContext.NegMonthSum > 0 ? 'text-success' : 'text-danger'
            }
          >
            {presetContext.NegMonthSum}
          </span>
        </div>
        {/* Account Balance */}
        <div className='text-gray'>
          Account Balance:
          <span
            className={
              presetContext.PosMonthSum > 0 ? 'text-success' : 'text-danger'
            }
          >
            {sum}{' '}
          </span>
        </div>
        {/* Month Balance */}
        <div>
          Month Balance:
          <span
            className={calcMonthBalance() > 0 ? 'text-success' : 'text-danger'}
          >
            {calcMonthBalance()}
          </span>
        </div>
        {/*  Savings Month*/}
        <div>
          Month Savings:
          <span className={'text-orange'}>
            {' '}
            {monthsavings + SumPiggybanksMonth}
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default Sum;
