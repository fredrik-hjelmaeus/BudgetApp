import React, { useContext, useState } from "react";
import piggyicon from "../layout/images/piggybank.svg";
import PresetContext from "../../context/preset/presetContext";
import PiggyItem from "./PiggyItem";

const PiggyBankSavingItem = ({ purchase }) => {
  const presetContext = useContext(PresetContext);
  const { year, sendEdit } = presetContext;
  const { name, number, piggybank, _id } = purchase;

  /* Look witch year it is and filter out years above this year and savedAmounts that is zero */
  const filterpiggybanks = piggybank.filter(
    (item, index) => item.year && item.year <= year && index !== 0
  );

  /*take the filtered yearlist and create a var for the sums saved */
  const sumoffilteredpiggybanks = filterpiggybanks.map((item) => item.savedAmount);
  /* sum up the amounts */
  const totalsum = sumoffilteredpiggybanks.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);

  const [showIndividualPiggyItems, setShowIndividualPiggyItems] = useState(false);
  const onClick = () => {
    setShowIndividualPiggyItems(!showIndividualPiggyItems);
  };

  const onPiggyItemDelete = (piggyItemId) => {
    // construct new piggybank-list where provided id is filtered out.
    const newPiggybankList = piggybank.filter((piggyItem) => piggyItem._id !== piggyItemId);

    // add new piggybank to deconstructed preset
    const newPreset = { ...purchase, piggybank: newPiggybankList };

    // update preset using _id
    sendEdit(newPreset);
  };

  return (
    <>
      <button className="card-piggy card-piggybanksavingitem" onClick={onClick}>
        <div className="no-wrap piggybanksavingname" style={{ overflow: "hidden" }}>
          {name}
        </div>
        <div className="flexrow-piggycard">
          <img src={piggyicon} alt="" style={{ width: "26px" }} />
          <div className="px text-orange expandbutton">{totalsum}</div>
          <div className="text-light">of</div>
          <div className="text-gray px">({number})</div>
        </div>
      </button>
      {showIndividualPiggyItems &&
        filterpiggybanks &&
        filterpiggybanks.map((piggyItem) => (
          <PiggyItem
            onPiggyItemDelete={onPiggyItemDelete}
            piggyItem={piggyItem}
            key={piggyItem._id}
          />
        ))}
    </>
  );
};

export default PiggyBankSavingItem;
