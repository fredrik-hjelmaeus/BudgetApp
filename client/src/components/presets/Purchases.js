import React, { Fragment, useContext } from 'react';
import PurchaseItem from './PurchaseItem';
import PresetContext from '../../context/preset/presetContext';

const Purchases = () => {
  const presetContext = useContext(PresetContext);
  const { purchases, MonthSum } = presetContext;
  purchases ? console.log(purchases) : console.log('no');
  return (
    <Fragment>
      {MonthSum !== null && MonthSum > 0 ? (
        <h4>Planned Purchases</h4>
      ) : (
        <h4>Purchase: NOT POSSIBLE</h4>
      )}
      {purchases &&
        purchases.map(Item => <PurchaseItem Item={Item} key={Item._id} />)}
    </Fragment>
  );
};
export default Purchases;
