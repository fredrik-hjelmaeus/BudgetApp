import React, { useContext, useEffect } from 'react';
import PurchaseItem from './PurchaseItem';
import PresetContext from '../../context/preset/presetContext';

const Purchases = () => {
  const presetContext = useContext(PresetContext);
  const { purchases } = presetContext;

  useEffect(() => {}, [presetContext.sendEdit]);
  //purchases ? console.log(purchases) : console.log('no');
  return (
    <div className='categorybalance'>
      <h4 className='all-center text-gray'>Purchases</h4>

      {purchases &&
        purchases.map(Item => <PurchaseItem Item={Item} key={Item._id} />)}
    </div>
  );
};
export default Purchases;
