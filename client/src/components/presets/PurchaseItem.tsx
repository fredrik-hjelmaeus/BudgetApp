import React, { useContext, useState, useEffect } from "react";
import PresetContext from "../../context/preset/presetContext";
import CssContext from "../../context/css/cssContext";
import PiggybankSVG from "../layout/images/PiggybankSVG";
import TrashDeleteButton from "./TrashDeleteButton";
import { IPreset } from "../../frontend-types/IPreset";

const PurchaseItem = ({ Item }: { Item: IPreset }) => {
  const presetContext = useContext(PresetContext);
  const cssContext = useContext(CssContext);
  const { toggleModal, setModalprops, modal } = cssContext;

  const { setEdit, MonthBalance, month, year, addPreset, deletePreset } = presetContext;

  const [MonthsLeftBeforePurchase, setMonthsLeftBeforePurchase] = useState<string | number>("");

  const calcPiggybankSum = () => {
    // store only savedAmounts in an array
    const savedAmounts = Item.piggybank.map((item) => item.savedAmount);
    // sift through savedAmounts and count totalsum
    const SumOfPiggybanks = savedAmounts.reduce((a, b) => a + b, 0); // TODO: removed parseFloat here because of ts.
    const ItemAfterPiggy = Item.number - SumOfPiggybanks;
    let MonthsLeft: number | string;
    MonthBalance && MonthBalance > 0 && MonthBalance !== null
      ? (MonthsLeft = ItemAfterPiggy / MonthBalance) // TODO: maybe use parseFloat here, ts conversion may have broken it.
      : (MonthsLeft = "+50");

    setMonthsLeftBeforePurchase(MonthsLeft);
  };

  //updates purchase values after modal change
  useEffect(() => {
    calcPiggybankSum();
    // eslint-disable-next-line
  }, [modal, MonthBalance, Item]);

  const onBuy = () => {
    // go through all Item.piggybank and convert to/create expense presets.
    // eslint-disable-next-line array-callback-return
    Item.piggybank.map((p) => {
      if (p.savedAmount !== 0) {
        addPreset({
          name: Item.name,
          number: p.savedAmount * -1,
          month: p.month,
          year: p.year,
          category: Item.category,
          type: "overhead",
          piggybank: [{ month: month ? month : "", year: year ? year : 0, savedAmount: 0 }],
        });
      }
    });
    // When we press BUY we use the income in this month to fill in what is rest to reach the purchase number
    // There is no piggybank saving for this so we calculate this by subtracting all saved amounts from purchase number
    // Then we can create an expense preset for this
    let counter = 0;
    const piggybankSumArray = Item.piggybank.map((p) => (counter = counter + p.savedAmount));
    const piggybanksAmount = piggybankSumArray[piggybankSumArray.length - 1];

    addPreset({
      name: Item.name,
      number: (Item.number - piggybanksAmount) * -1,
      month: month ? month : "",
      year: year ? year : 0,
      category: Item.category,
      type: "overhead",
      piggybank: [{ month: month ? month : "", year: year ? year : 0, savedAmount: 0 }],
    });
    // Delete purchase preset
    if (Item._id) deletePreset(Item._id);
  };

  const onSave = () => {
    //activate modal
    MonthBalance && MonthBalance > 0 && setModalprops(Item);
    MonthBalance && MonthBalance > 0 && toggleModal("addtopiggybank");
  };

  const onDelete = () => {
    //calls on <DeletePurchaseModal>  to activate in Month.js
    //<DeletePurchaseModal> handles the delete of purchase
    toggleModal("deletepurchase");
    //switch from purchase to savings. set piggybanksaving as number.
    setModalprops(Item);
  };

  // states to handle piggyhover
  const [PiggyHover, setPiggyHover] = useState(false);
  //on piggybank button hover
  const onPiggyHover = () => {
    MonthBalance && MonthBalance > 0 && setPiggyHover(true);
  };
  //on piggybank button stop hover
  const stopPiggyHover = () => {
    setPiggyHover(false);
  };

  // states to handle trashhover
  const [TrashHover, setTrashHover] = useState(false);
  //on trash button hover
  const onTrashHover = () => {
    setTrashHover(true);
  };
  //on trash button stop hover
  const stopTrashHover = () => {
    setTrashHover(false);
  };

  // display of piggybankicon
  const onPiggybank = (MonthsLeftBeforePurchase: number) => {
    switch (MonthsLeftBeforePurchase) {
      case 0:
        return null;
      case 1:
        return PiggyHover === true && MonthBalance && MonthBalance > 0 ? ( // 1 month left
          <PiggybankSVG fill="var(--success-color)" /> //onHover show green
        ) : Item.piggybank.length !== 0 ? ( // <-- TODO: changed to length, may be wrong.
          <PiggybankSVG fill="var(--orange-color)" />
        ) : (
          <PiggybankSVG fill="var(--gray-color)" />
        );
      default:
        return PiggyHover === true && MonthBalance && MonthBalance > 0 ? ( // many months left
          <PiggybankSVG fill="var(--success-color)" /> //onHover show green
        ) : Item.piggybank.length !== 0 ? ( // <-- TODO: changed to length, may be wrong.
          <PiggybankSVG fill="var(--orange-color)" />
        ) : (
          <PiggybankSVG fill="var(--gray-color)" />
        );
    }
  };

  // on name or number click, activate edit preset modal
  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setEdit(Item);
    toggleModal("editpreset");
  };

  return (
    <div className="card-categorybalance bg-white" data-testid="purchaseitem">
      <span className="text-gray purchasegrid">
        <button onClick={onClick} className={"purchasetitlebtn no-wrap text-gray"}>
          {Item.name}
        </button>
        <button
          onClick={onClick}
          className={
            MonthBalance && MonthBalance > 0
              ? "purchasenumberbtn no-wrap text-danger bold"
              : "purchasenumberbtn no-wrap text-danger bold"
          }
        >
          {Item.number}
        </button>
        <button
          data-testid="piggybank_icon"
          className="btn text-primary purchasepiggybankbtn"
          value="piggybank"
          name="piggybank"
          onClick={onSave}
          onMouseEnter={onPiggyHover}
          onMouseLeave={stopPiggyHover}
        >
          {typeof MonthsLeftBeforePurchase === "number" && onPiggybank(MonthsLeftBeforePurchase)}
        </button>

        {MonthsLeftBeforePurchase === 0 ? (
          <button className="btn btn-success btn-buy" onClick={onBuy}>
            BUY
          </button>
        ) : MonthsLeftBeforePurchase === 1 ? (
          <button className="btn-onemonthleft" onClick={onSave}>
            1 Month
          </button>
        ) : (
          <button
            className={
              MonthBalance && MonthBalance > 0
                ? "btn-moremonthsleft"
                : "btn-moremonthsleftNoHoverConnection"
            }
            onClick={onSave}
          >
            {`${MonthsLeftBeforePurchase} months`}
          </button>
        )}
        <TrashDeleteButton
          onDelete={onDelete}
          onTrashHover={onTrashHover}
          stopTrashHover={stopTrashHover}
          TrashHover={TrashHover}
        />
      </span>
    </div>
  );
};

export default PurchaseItem;
