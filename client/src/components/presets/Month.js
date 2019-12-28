import React, { Fragment, useContext, useEffect } from 'react';
import PresetForm from '../presets/PresetForm';

import Sum from '../presets/Sum';
import Datemenu from '../layout/Datemenu';
import PresetContext from '../../context/preset/presetContext';
import Purchases from './Purchases';
import MonthSummary from './MonthSummary';

const Month = () => {
  const presetContext = useContext(PresetContext);

  useEffect(() => {
    presetContext.presets && presetContext.calcSum(9, null, 'init');
    presetContext.presets && presetContext.setPurchase();
    // eslint-disable-next-line
  }, [presetContext.presets]);

  return (
    <Fragment>
      <Datemenu />
      <div className='monthgrid'>
        <div>
          <PresetForm />
          {presetContext.sum === null ? null : <Sum />}
          <Purchases />
        </div>
        <div>
          <MonthSummary />
        </div>
      </div>
    </Fragment>
  );
};

export default Month;
