import React, { useContext, useEffect } from 'react';
import PurchaseItem from './PurchaseItem';
import PresetContext from '../../context/preset/presetContext';

const Purchases = () => {
  const presetContext = useContext(PresetContext);
  const {
    purchases,
    sendEdit,
    presets,
    calcMonthBalance,
    MonthBalance,
    piggybanks,
  } = presetContext;

  useEffect(() => {
    MonthBalance === null || (piggybanks === [] && calcMonthBalance());
  }, [sendEdit, presets, calcMonthBalance, MonthBalance, piggybanks]);

  return (
    <div className='categorybalance'>
      <h4 className='all-center text-gray'>Purchases</h4>

      {purchases &&
        purchases.map((Item) => <PurchaseItem Item={Item} key={Item._id} />)}
    </div>
  );
};
export default Purchases;
