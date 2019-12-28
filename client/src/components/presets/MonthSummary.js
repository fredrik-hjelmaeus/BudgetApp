import React from 'react';
import PresetFilter from '../presets/PresetFilter';
import PresetNegativeFilter from '../presets/PresetNegativeFilter';

const MonthSummary = () => {
  return (
    <div className='bgtest'>
      <div className='card_monthright bold'>
        <div className='grid-2'>
          <div>
            <PresetFilter />
          </div>
          <div>
            <PresetNegativeFilter />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MonthSummary;
