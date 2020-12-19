import React, { useContext } from 'react';
import DonutChart from '../layout/DonutChart';
import PresetContext from '../../context/preset/presetContext';

const Expense = () => {
  const presetContext = useContext(PresetContext);
  const { categorysumonlynegnumbyyear, categorynameonlynegnumbyyear } = presetContext;

  const YearExpense = categorysumonlynegnumbyyear.reduce((a, b) => a + b, 0);
  //colors set here so expense and income can have different colors in their chart
  const colors = [
    '#67b7dc',
    '#6794dc',
    '#6771dc',
    '#8067dc',
    '#a367dc',
    '#c767dc',
    '#dc67ce',
    '#dc67ab',
    '#dc6788',
    '#ec5362',
    '#ef4141',
    '#ef6a41',
    '#ef8741',
    '#f2ae4e',
    '#f6e365',
    '#abd951',
    '#9ded76',
    '#9ded77',
    '#76ed98',
    '#76edc2',
    '#67cec3',
    '#6ec5d2',
  ];
  const yearmonthavg = parseInt(parseFloat(YearExpense / 12));
  return (
    <div>
      <div className='expense__card'>
        <div style={{ margin: '0 0 1rem 0' }}>
          <DonutChart sums={categorysumonlynegnumbyyear} names={categorynameonlynegnumbyyear} colors={colors} />
        </div>
        <div className='donuttitle'>Expenses</div>
        <div className='flexrow'>
          <div className='flexcolumn'>
            <div className='flexrow'>
              <div>Year Expenses: </div>
              <div className={'text-danger px'}>{YearExpense}</div>
            </div>
            <div className='flexrow'>
              <div>Monthly Average: </div>
              <div className={'text-danger px'}>{yearmonthavg}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Expense;
