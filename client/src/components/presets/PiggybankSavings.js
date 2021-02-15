import React, { Fragment, useContext, useEffect } from 'react';
import PiggyBankSavingItem from './PiggyBankSavingItem';
import PresetContext from '../../context/preset/presetContext';

const PiggybankSavings = () => {
  const presetContext = useContext(PresetContext);
  const { purchases } = presetContext;
  useEffect(() => {
    // important to check if presets exists as this sideeffect is
    // first to run in some occasions. For example when user press exit on guide in mobile version.
    presetContext.presets && presetContext.setPurchase();
    // eslint-disable-next-line
  }, [presetContext.presets]);

  return <Fragment>{purchases && purchases.map((purchase) => <PiggyBankSavingItem key={purchase._id} purchase={purchase} />)}</Fragment>;
};
export default PiggybankSavings;
