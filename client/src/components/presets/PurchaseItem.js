import React, { useContext, useState, useEffect } from 'react';
import PresetContext from '../../context/preset/presetContext';
import CssContext from '../../context/css/cssContext';
import TrashiconSVG from '../layout/images/TrashiconSVG';
import PiggybankSVG from '../layout/images/PiggybankSVG';

const PurchaseItem = ({ Item }) => {
  const presetContext = useContext(PresetContext);
  const cssContext = useContext(CssContext);
  const { toggleModal, setModalprops, modal } = cssContext;

  const { setEdit, MonthSum, sendEdit, addPreset } = presetContext;
  let counter = 0;
  const [MonthsLeftBeforePurchase, setMonthsLeftBeforePurchase] = useState(
    parseInt(parseFloat((Item.number - counter) / MonthSum))
  );

  const calcPiggybankSum = () => {
    counter = 0;
    Item.piggybank.map(Item => (counter = counter + Item.savedAmount));
  };
  //updates purchase values after modal change
  useEffect(() => {
    calcPiggybankSum();
    setMonthsLeftBeforePurchase(
      parseInt(parseFloat((Item.number - counter) / MonthSum))
    ); // eslint-disable-next-line
  }, [modal]);

  // when buy, create one post under income and one under expenses . May be better written
  const [expensepreset] = useState({
    _id: Item._id,
    name: Item.name,
    number: Math.abs(Item.number + (Item.number - Item.piggybank)) * -1,
    month: Item.month,
    category: Item.category,
    type: 'overhead',
    piggybank: 0
  });
  const [incomepreset] = useState({
    _id: Item._id,
    name: Item.name,
    number: Math.abs(Item.number),
    month: Item.month,
    category: Item.category,
    type: 'overhead',
    piggybank: 0
  });

  const onBuy = () => {
    sendEdit(expensepreset); //switch from type:purchase to type overhead .
    addPreset(incomepreset); //switch from type:purchase to type overhead .
  };

  const onSave = () => {
    //activate modal
    setModalprops(Item);
    toggleModal('addtopiggybank');
  };

  const onDelete = () => {
    //calls on modal to activate in Month.js
    toggleModal('deletepurchase');
    //switch from purchase to savings. set piggybanksaving as number.
    setModalprops(Item);
  };

  // states to handle piggyhover
  const [PiggyHover, setPiggyHover] = useState(false);
  //on piggybank button hover
  const onPiggyHover = () => {
    setPiggyHover(true);
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
  const onPiggybank = MonthsLeftBeforePurchase => {
    switch (MonthsLeftBeforePurchase) {
      case 0:
        return null;
      case 1:
        return PiggyHover === true ? ( // 1 month left
          <PiggybankSVG fill='var(--success-color)' /> //onHover show green
        ) : Item.piggybank !== 0 ? (
          <PiggybankSVG fill='var(--orange-color)' />
        ) : (
          <PiggybankSVG fill='var(--gray-color)' />
        );
      default:
        return PiggyHover === true ? ( // many months left
          <PiggybankSVG fill='var(--success-color)' /> //onHover show green
        ) : Item.piggybank !== 0 ? (
          <PiggybankSVG fill='var(--orange-color)' />
        ) : (
          <PiggybankSVG fill='var(--gray-color)' />
        );
    }
  };

  return (
    <div className='card-categorybalance bg-white'>
      <span className='text-gray purchasegrid'>
        <button
          onClick={() => setEdit(Item)}
          className={
            MonthSum > 0
              ? 'purchasetitlebtn no-wrap text-gray'
              : 'btn text-danger'
          }
        >
          {Item.name}
        </button>
        <button
          onClick={() => setEdit(Item)}
          className={
            MonthSum > 0
              ? 'purchasenumberbtn no-wrap text-danger bold'
              : 'purchasenumberbtn no-wrap text-danger bold'
          }
        >
          {Item.number}
        </button>
        <button
          className='btn text-primary purchasepiggybankbtn'
          value='piggybank'
          name='piggybank'
          onClick={onSave}
          onMouseEnter={onPiggyHover}
          onMouseLeave={stopPiggyHover}
        >
          {onPiggybank(MonthsLeftBeforePurchase)}
        </button>

        {MonthsLeftBeforePurchase === 0 ? (
          <button className='btn btn-success btn-buy' onClick={onBuy}>
            BUY
          </button>
        ) : MonthsLeftBeforePurchase === 1 ? (
          <button className='btn-onemonthleft' onClick={onSave}>
            1 Month
          </button>
        ) : (
          <button className='btn-moremonthsleft' onClick={onSave}>
            {`${MonthsLeftBeforePurchase} months`}
          </button>
        )}

        <button
          className='btn-trashicon'
          onClick={onDelete}
          onMouseEnter={onTrashHover}
          onMouseLeave={stopTrashHover}
          value='trashicon'
          name='trashicon'
        >
          {TrashHover === true ? (
            <TrashiconSVG fill='red' />
          ) : (
            <TrashiconSVG fill='var(--gray-color)' />
          )}
        </button>
      </span>
    </div>
  );
};

export default PurchaseItem;
