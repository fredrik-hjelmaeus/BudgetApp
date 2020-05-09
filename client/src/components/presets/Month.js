import React, { Fragment, useContext, useEffect } from 'react';
import PresetForm from '../presets/PresetForm';
import DeletePurchaseModal from './DeletePurchaseModal';
import AddtoPiggybankModal from './AddtoPiggybankModal';
import CsvPresetCreateModal from './CsvPresetCreateModal';
import Datemenu from '../layout/Datemenu';
import PresetContext from '../../context/preset/presetContext';
import CssContext from '../../context/css/cssContext';
import Purchases from './Purchases';
import MonthSummary from './MonthSummary';
import CategoryBalance from './CategoryBalance';
import Sum from '../presets/Sum';
import MonthSavingsSummary from '../presets/MonthSavingsSummary';

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
    month,
    calcMonthSavings,
    monthsavings,
    getMonthSavings,
    getMonthPiggySavings,
    monthpiggysavings,
    csvpresets,
  } = presetContext;

  useEffect(() => {
    presets && calcSum(9, null, 'init');
    presets && setPurchase();
    presets && calcMonthSum(month);
    presets && calcMonthSavings();
    presets && getMonthSavings(month);
    presets && getMonthPiggySavings();
    // eslint-disable-next-line
  }, [presets, month]);
  return (
    <Fragment>
      {csvpresets && <CsvPresetCreateModal />}
      {modal === 'deletepurchase' && <DeletePurchaseModal Item={modalprops} />}
      {modal === 'addtopiggybank' && <AddtoPiggybankModal Item={modalprops} />}
      <Datemenu />
      <div className='monthgrid'>
        <div className='monthgrid__presetformOrder'>
          <PresetForm />
        </div>

        <div className='monthgrid__CategoryBalanceOrder'>
          <CategoryBalance />
        </div>

        <div className='monthgrid__PurchasesOrder'>
          {MonthSum !== null && MonthSum > 0 && <Purchases />}
        </div>

        <div className='bgmonthright monthgrid__sums'>
          <Sum />
          {(monthsavings !== null && <MonthSavingsSummary />) ||
            (monthpiggysavings !== null && <MonthSavingsSummary />)}
          <MonthSummary />
        </div>
      </div>
    </Fragment>
  );
};

export default Month;
