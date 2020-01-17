import React, { useContext, useState, useEffect } from 'react';

import PresetContext from '../../context/preset/presetContext';
import CssContext from '../../context/css/cssContext';
import PiggybankSVG from '../layout/images/PiggybankSVG';

const AddtoPiggybankModal = ({ Item }) => {
  // preset context
  const presetContext = useContext(PresetContext);
  const {
    setEdit,
    sendEdit,
    MonthSum,
    cancelEdit,
    setActivePiggybank,
    addtoPiggybanks,
    piggybanks
  } = presetContext;

  // Css: modal context
  const cssContext = useContext(CssContext);
  const { toggleModal, setModalprops } = cssContext;

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
  // Calc Amount to save
  let AmountToSave = MonthSum; //default startvalue
  if (parseInt(MonthSum) + parseInt(Item.piggybank) > Item.number) {
    AmountToSave = parseInt(Item.number) - parseInt(Item.piggybank);
  }
  //piggybankstate
  const [piggybank, setPiggybank] = useState({ number: AmountToSave });

  //set Item to default value of piggybanks
  useEffect(() => {
    setActivePiggybank(Item);
  }, [Item]);

  useEffect(() => {
    piggybanks.length !== 0 &&
      console.log(
        'setActivePiggybank:',
        piggybanks.map(piggybank => piggybank.savedAmount),
        piggybanks.map(piggybank => piggybank.month)
      );
  }, [setActivePiggybank]);

  const onChange = e => {
    setPiggybank({
      ...piggybank,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = () => {
    addtoPiggybanks({
      month: presetContext.month,
      savedAmount: piggybank.number
    });
    //setActivePiggybank(null);
    //setModalprops(null);
    // cancelEdit();
    //toggleModal('');
    //calculate sum in piggybank.
  };
  useEffect(() => {
    presetContext.piggybanks !== undefined &&
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
    console.log('setPreset:', preset);
    presetContext.piggybanks[1] !== undefined &&
      console.log('banks:', presetContext.piggybanks);
  }, [presetContext.piggybanks]);
  useEffect(() => {
    // preset.piggybank !== undefined && console.log(preset.piggybank);
    presetContext.piggybanks[1] !== undefined && sendEdit(preset);
  }, [preset]);

  // Close modal
  const onClick = e => {
    //console.log(piggybanks);
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
