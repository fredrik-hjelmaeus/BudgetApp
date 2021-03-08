import React, { useContext, useState, useEffect } from 'react';
import PresetContext from '../../context/preset/presetContext';
import CssContext from '../../context/css/cssContext';
import PiggybankSVG from '../layout/images/PiggybankSVG';
import TrashDeleteButton from './TrashDeleteButton';

const PurchaseItem = ({ Item }) => {
  console.log(Item);
  const presetContext = useContext(PresetContext);
  const cssContext = useContext(CssContext);
  const { toggleModal, setModalprops, modal } = cssContext;

  const { setEdit, MonthBalance, sendEdit, addPreset, month, year } = presetContext;

  const [MonthsLeftBeforePurchase, setMonthsLeftBeforePurchase] = useState('');

  const calcPiggybankSum = () => {
    // store only savedAmounts in an array
    const savedAmounts = Item.piggybank.map((item) => item.savedAmount);
    // sift through savedAmounts and count totalsum
    const SumOfPiggybanks = savedAmounts.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
    const ItemAfterPiggy = Item.number - SumOfPiggybanks;
    let MonthsLeft;
    MonthBalance > 0 && MonthBalance !== null
      ? (MonthsLeft = parseInt(parseFloat(ItemAfterPiggy) / parseFloat(MonthBalance)))
      : (MonthsLeft = '+50');

    setMonthsLeftBeforePurchase(MonthsLeft);
  };

  //updates purchase values after modal change
  useEffect(() => {
    calcPiggybankSum();
    // eslint-disable-next-line
  }, [modal, MonthBalance, Item]);

  // when buy, create one post under income and one under expenses . May be better written
  const [expensepreset] = useState({
    _id: Item._id,
    name: Item.name,
    number: Item.number * -1,
    month: Item.month,
    year: Item.year,
    category: Item.category,
    type: 'overhead',
    piggybank: [{ month, year, savedAmount: '' }],
  });
  const [incomepreset] = useState({
    _id: Item._id,
    name: Item.name,
    number: Math.abs(Item.number),
    month: Item.month,
    year: Item.year,
    category: Item.category,
    type: 'overhead',
    piggybank: [{ month, year, savedAmount: '' }],
  });

  const onBuy = () => {
    sendEdit(expensepreset); //switch from type:purchase to type overhead .
    //addPreset(incomepreset); //switch from type:purchase to type overhead .
  };

  const onSave = () => {
    //activate modal
    MonthBalance > 0 && setModalprops(Item);
    MonthBalance > 0 && toggleModal('addtopiggybank');
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
    MonthBalance > 0 && setPiggyHover(true);
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
  const onPiggybank = (MonthsLeftBeforePurchase) => {
    switch (MonthsLeftBeforePurchase) {
      case 0:
        return null;
      case 1:
        return PiggyHover === true && MonthBalance > 0 ? ( // 1 month left
          <PiggybankSVG fill='var(--success-color)' /> //onHover show green
        ) : Item.piggybank !== 0 ? (
          <PiggybankSVG fill='var(--orange-color)' />
        ) : (
          <PiggybankSVG fill='var(--gray-color)' />
        );
      default:
        return PiggyHover === true && MonthBalance > 0 ? ( // many months left
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
        <button onClick={() => setEdit(Item)} className={'purchasetitlebtn no-wrap text-gray'}>
          {Item.name}
        </button>
        <button
          onClick={() => setEdit(Item)}
          className={MonthBalance > 0 ? 'purchasenumberbtn no-wrap text-danger bold' : 'purchasenumberbtn no-wrap text-danger bold'}
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
          <button className={MonthBalance > 0 ? 'btn-moremonthsleft' : 'btn-moremonthsleftNoHoverConnection'} onClick={onSave}>
            {`${MonthsLeftBeforePurchase} months`}
          </button>
        )}
        <TrashDeleteButton onDelete={onDelete} onTrashHover={onTrashHover} stopTrashHover={stopTrashHover} TrashHover={TrashHover} />
      </span>
    </div>
  );
};

export default PurchaseItem;
