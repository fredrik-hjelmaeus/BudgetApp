import React, { useContext, useState, useEffect } from 'react';

import PresetContext from '../../context/preset/presetContext';
import CssContext from '../../context/css/cssContext';
import PiggybankSVG from '../layout/images/PiggybankSVG';

const AddtoPiggybankModal = ({ Item }) => {
  // preset context
  const presetContext = useContext(PresetContext);
  const {
    sendEdit,
    MonthSum,
    setActivePiggybank,
    addtoPiggybanks,
    MonthBalance
  } = presetContext;

  // Css: modal context
  const cssContext = useContext(CssContext);
  const { toggleModal, modalprops } = cssContext;

  //preset/item local state
  const [preset, setPreset] = useState({
    _id: Item._id,
    name: Item.name,
    number: Item.number,
    month: Item.month,
    category: Item.category,
    type: 'purchase',
    piggybank: Item.piggybank
  });

  let AmountToSave; //init startvalue

  // store only savedAmounts in an array
  const savedAmounts = Item.piggybank.map(item => item.savedAmount);
  // sift through savedAmounts and count totalsum
  const SumOfPiggybanks = savedAmounts.reduce(
    (a, b) => parseFloat(a) + parseFloat(b),
    0
  );
  const SumLeftToSave = parseFloat(Item.number) - parseFloat(SumOfPiggybanks);
  // Calc Amount to save
  console.log(`Sumleft = ${SumLeftToSave}`);
  if (parseInt(MonthBalance) > parseInt(SumLeftToSave)) {
    console.log('Balance is larger');
    AmountToSave = SumLeftToSave;
  } else {
    console.log('SumLeftToSave is larger than Month Balance');
    AmountToSave = MonthBalance;
  }

  //piggybankstate, local state used for onChange-slider
  const [piggybank, setPiggybank] = useState({ number: AmountToSave });

  //when Item changes,set Item to default value of presetContext.piggybanks
  useEffect(() => {
    setActivePiggybank(modalprops.piggybank);
    // eslint-disable-next-line
  }, []);

  // sets value from amount to save slider
  const onChange = e => {
    setPiggybank({
      ...piggybank,
      [e.target.name]: e.target.value
    });
  };

  // on submit, add month and amount to save in presetContext.piggybanks
  const onSubmit = () => {
    addtoPiggybanks({
      month: presetContext.month,
      savedAmount: parseFloat(piggybank.number)
    });
  };

  // on presetContext.piggybanks change,set local preset with new presetContext.piggybanks-value.
  useEffect(() => {
    if (
      presetContext.piggybanks.length !== undefined &&
      presetContext.piggybanks.length !== 0 &&
      presetContext.piggybanks.length !== modalprops.piggybank.length
    ) {
      console.log('setPreset ran');
      setPreset({
        ...preset,
        _id: Item._id,
        name: Item.name,
        number: Item.number,
        month: Item.month,
        category: Item.category,
        type: 'purchase',
        piggybank: presetContext.piggybanks
      });
    } // eslint-disable-next-line
  }, [presetContext.piggybanks, modalprops.piggybank.length]);

  // on sending preset to database,wait and then close modal first then reset/unload presetContext.piggybanks
  const sendMyEdit = async preset => {
    await sendEdit(preset);
    toggleModal('');
    setActivePiggybank([]);
  };

  // on local preset change, push new preset to database
  useEffect(() => {
    if (
      presetContext.piggybanks.length !== undefined &&
      presetContext.piggybanks.length !== 0 &&
      presetContext.piggybanks.length !== modalprops.piggybank.length
    ) {
      console.log('sendMyPreset ran');
      console.log(preset);
      sendMyEdit(preset);
    } // eslint-disable-next-line
  }, [preset]);

  // Close modal
  const onClick = e => {
    toggleModal('');
  };

  return (
    <div id='myModal' className='modal-register' style={{ display: 'block' }}>
      <div className='modal-content-deletepurchase'>
        <span className='piggybankmodal-objname'>
          {Item.name}
          <button className='closebtn' value='close' onClick={onClick}></button>
        </span>

        <div className='modalpiggybankheader text-gray'>
          <h1 className='regular'>Amount to save</h1>
        </div>
        <div className='piggybankmodalnumbername'>{piggybank.number}</div>
        <input
          type='range'
          min='1'
          max={AmountToSave}
          name='number'
          value={piggybank.number}
          onChange={onChange}
        />
        <button
          className='text-primary piggybankmodalsubmitbutton'
          value='submit'
          onClick={onSubmit}
        >
          Submit{'  '}
          <PiggybankSVG fill='var(--primary-color)' />
        </button>
        <button
          className='btn btn-outline btn-block  p-3'
          value='delete'
          onClick={() => toggleModal('')}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddtoPiggybankModal;
