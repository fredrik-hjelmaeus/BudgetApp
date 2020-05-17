import React from 'react';
import PresetFilter from '../presets/PresetFilter';
import PresetNegativeFilter from '../presets/PresetNegativeFilter';

const MonthSummary = () => {
  return (
    <div>
      <div className='card_monthright bold'>
        <div className='monthsummary__grid-2'>
          <div className='grid-2__column'>
            <h3 className='all-center text-gray underline'>Income</h3>
            <PresetFilter />
          </div>
          <div className='grid-2__column'>
            <h3 className='all-center text-gray underline'>Expenses</h3>
            <PresetNegativeFilter />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MonthSummary;
