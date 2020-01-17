import React, { Fragment, useContext, useEffect } from 'react';
import PresetForm from '../presets/PresetForm';
import DeletePurchaseModal from './DeletePurchaseModal';
import AddtoPiggybankModal from './AddtoPiggybankModal';
import Datemenu from '../layout/Datemenu';
import PresetContext from '../../context/preset/presetContext';
import CssContext from '../../context/css/cssContext';
import Purchases from './Purchases';
import MonthSummary from './MonthSummary';
import CategoryBalance from './CategoryBalance';
import Sum from '../presets/Sum';

const Month = () => {
  const presetContext = useContext(PresetContext);
  const cssContext = useContext(CssContext);
  const { modal, modalprops } = cssContext;
  const {
    presets,
    calcSum,
    setPurchase,
    MonthSum,
    calcMonthSum,
    month
  } = presetContext;

  useEffect(() => {
    presets && calcSum(9, null, 'init');
    presets && setPurchase();
    presets && calcMonthSum(month);
    // eslint-disable-next-line
  }, [presets, month]);

  /*   useEffect(() => {
    console.log('modalchange');
  }, [modal]); */
  return (
    <Fragment>
      {modal === 'deletepurchase' && <DeletePurchaseModal Item={modalprops} />}
      {modal === 'addtopiggybank' && <AddtoPiggybankModal Item={modalprops} />}
      <Datemenu />
      <div className='monthgrid'>
        <div>
          <PresetForm />
          <CategoryBalance />
          {MonthSum !== null && MonthSum > 0 && <Purchases />}
        </div>
        <div className='bgmonthright'>
          <Sum />
          <MonthSummary />
        </div>
      </div>
    </Fragment>
  );
};

export default Month;
