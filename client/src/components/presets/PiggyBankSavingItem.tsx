import React, { useContext, useState } from "react";
//import piggyicon from "../layout/images/piggybank.svg";
import PresetContext from "../../context/preset/presetContext";
import AlertContext from "../../context/alert/alertContext";
import PiggyItem from "./PiggyItem";
import PiggybankSVG from "../layout/images/PiggybankSVG";
import { IPreset } from "../../frontend-types/IPreset";

interface PiggyBankSavingItemProps {
  preset: IPreset;
}

const PiggyBankSavingItem = ({ preset }: PiggyBankSavingItemProps) => {
  const presetContext = useContext(PresetContext);
  const { year, sendEdit } = presetContext;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const { name, number, piggybank } = preset;

  /* Look witch year it is and filter out years above this year and savedAmounts that is zero */
  const filterpiggybanks =
    year && piggybank.filter((item, index) => item.year && item.year <= year && index !== 0);

  /*take the filtered yearlist and create a var for the sums saved */
  const sumoffilteredpiggybanks =
    filterpiggybanks !== 0 && filterpiggybanks?.map((item) => item.savedAmount);
  /* sum up the amounts */
  const totalsum = sumoffilteredpiggybanks && sumoffilteredpiggybanks.reduce((a, b) => a + b, 0);

  const [showIndividualPiggyItems, setShowIndividualPiggyItems] = useState(false);
  const onClick = () => {
    setShowIndividualPiggyItems(!showIndividualPiggyItems);
  };

  const onPiggyItemDelete = (piggyItemId: string | undefined) => {
    if (piggyItemId === undefined) {
      setAlert("No id found for this piggybank item!", "danger");
    }
    // construct new piggybank-list where provided id is filtered out.
    const newPiggybankList = piggybank.filter((piggyItem) => piggyItem._id !== piggyItemId);

    // add new piggybank to deconstructed preset
    const newPreset = { ...preset, piggybank: newPiggybankList };

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
          <div>
            <PiggybankSVG fill="var(--gray-color)" />{" "}
            {/* TODO: confirm this is working and remove below */}
            {/*    <img src={piggyicon} alt="" style={{ width: "26px" }} /> */}
          </div>
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
