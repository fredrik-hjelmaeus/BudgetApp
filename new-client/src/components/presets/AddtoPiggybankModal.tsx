import React, { useContext, useState, useEffect } from "react";

import PresetContext from "../../context/preset/presetContext";
import CssContext from "../../context/css/cssContext";
import PiggybankSVG from "../layout/images/PiggybankSVG";
import { IPreset } from "../../frontend-types/IPreset";

const AddtoPiggybankModal = ({ Item }: { Item: IPreset }) => {
  // preset context
  const presetContext = useContext(PresetContext);
  const { sendEdit, setActivePiggybank, addtoPiggybanks, MonthBalance } = presetContext;

  // Css: modal context
  const cssContext = useContext(CssContext);
  const { toggleModal, modalprops } = cssContext;

  //preset/item local state
  const [preset, setPreset] = useState({
    id: Item.id,
    name: Item.name,
    number: Item.number,
    month: Item.month,
    year: Item.year,
    category: Item.category,
    type: "purchase",
    piggybank: Item.piggybank,
  });

  let AmountToSave; //init startvalue

  // store only savedAmounts in an array
  const savedAmounts = Item.piggybank.map((item) => item.savedAmount);
  // sift through savedAmounts and count totalsum
  const SumOfPiggybanks = savedAmounts.reduce((a, b) => a + b, 0);
  const SumLeftToSave = Item.number - SumOfPiggybanks;

  // Calc Amount to save
  if (MonthBalance && MonthBalance > SumLeftToSave) {
    AmountToSave = SumLeftToSave;
  } else {
    AmountToSave = MonthBalance;
  }

  //piggybankstate, local state used for onChange-slider
  const [piggybank, setPiggybank] = useState({ number: AmountToSave });

  //when Item changes,set Item to default value of presetContext.piggybanks
  useEffect(() => {
    modalprops && setActivePiggybank(modalprops.piggybank);
    // eslint-disable-next-line
  }, []);

  // sets value from amount to save slider
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPiggybank({
      ...piggybank,
      [e.target.name]: e.target.value,
    });
  };

  // on submit, add month and amount to save in presetContext.piggybanks
  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
    // console.log("add to piggybanks ran");
    addtoPiggybanks({
      month: presetContext.month ? presetContext.month : "",
      year: presetContext.year ? presetContext.year : 0,
      savedAmount: piggybank.number ? piggybank.number : 0,
    });
  };

  // on presetContext.piggybanks change,set local preset with new presetContext.piggybanks-value.
  useEffect(() => {
    if (
      presetContext.piggybanks.length !== undefined &&
      presetContext.piggybanks.length !== 0 &&
      presetContext.piggybanks.length !== modalprops?.piggybank.length
    ) {
      setPreset({
        ...preset,
        id: Item.id,
        name: Item.name,
        number: Item.number,
        month: Item.month,
        year: Item.year,
        category: Item.category,
        type: "purchase",
        piggybank: presetContext.piggybanks,
      });
    } // eslint-disable-next-line
  }, [presetContext.piggybanks, modalprops?.piggybank.length]);

  // on sending preset to database,wait and then close modal first then reset/unload presetContext.piggybanks
  const sendMyEdit = async (preset: IPreset) => {
    await sendEdit(preset);
    toggleModal("");
    setActivePiggybank([]);
  };

  // on local preset change, push new preset to database
  useEffect(() => {
    if (
      presetContext.piggybanks.length !== undefined &&
      presetContext.piggybanks.length !== 0 &&
      presetContext.piggybanks.length !== modalprops?.piggybank.length
    ) {
      sendMyEdit(preset);
    } // eslint-disable-next-line
  }, [preset]);

  // Close modal
  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    toggleModal("");
  };

  return (
    <div id="myModal" className="modal-register" style={{ display: "block" }}>
      <div className="modal-content-deletepurchase">
        <span className="piggybankmodal-objname">
          {Item.name}
          <button className="closebtn" value="close" onClick={onClick}></button>
        </span>

        <div className="modalpiggybankheader text-gray">
          <h1 className="regular">Amount to save</h1>
        </div>
        <div className="piggybankmodalnumbername">{piggybank.number}</div>
        <input
          type="range"
          min="1"
          max={AmountToSave ? AmountToSave : 0}
          name="number"
          value={piggybank.number ? piggybank.number : 0}
          onChange={onChange}
          data-testid="inputamountrange"
        />
        <button
          className="text-primary piggybankmodalsubmitbutton"
          value="submit"
          onClick={onSubmit}
        >
          Submit{"  "}
          <PiggybankSVG fill="var(--primary-color)" />
        </button>
        <button
          className="btn btn-outline btn-block  p-3"
          value="delete"
          onClick={() => toggleModal("")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddtoPiggybankModal;
