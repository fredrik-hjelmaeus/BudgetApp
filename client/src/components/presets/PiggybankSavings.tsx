import React, { Fragment, FunctionComponent, useContext, useEffect } from "react";
import PiggyBankSavingItem from "./PiggyBankSavingItem";
import PresetContext from "../../context/preset/presetContext";

const PiggybankSavings: FunctionComponent = () => {
  const presetContext = useContext(PresetContext);
  const { purchases, presets, setPurchase } = presetContext;

  useEffect(() => {
    // important to check if presets exists as this sideeffect is
    // first to run in some occasions. For example when user press exit on guide in mobile version.

    presets && setPurchase();
    // eslint-disable-next-line
  }, [presets]);

  return (
    <Fragment>
      {purchases &&
        purchases.map((purchase) => <PiggyBankSavingItem key={purchase?._id} preset={purchase} />)}
    </Fragment>
  );
};
export default PiggybankSavings;
