import React, { useContext, useState, useEffect } from 'react';

import PresetContext from '../../context/preset/presetContext';
import CssContext from '../../context/css/cssContext';
import PiggybankSVG from '../layout/images/PiggybankSVG';

const AddtoPiggybankModal = ({ Item }) => {
  const presetContext = useContext(PresetContext);
  const { setEdit, sendEdit, MonthSum, cancelEdit } = presetContext;

  useEffect(() => {
    setEdit(Item);
  }, []);
  // Css: modal context
  const cssContext = useContext(CssContext);
  const { toggleModal, modal, setModalprops } = cssContext;

  const onClick = e => {
    toggleModal('');
  };

  const [preset, setPreset] = useState(
    {
      _id: Item._id,
      name: Item.name,
      number: Item.number,
      month: Item.month,
      category: Item.category,
      type: 'purchase',
      piggybank: Item.piggybank
    },
    []
  );

  let AmountToSave = MonthSum; //default startvalue
  if (parseInt(MonthSum) + parseInt(Item.piggybank) > Item.number) {
    AmountToSave = parseInt(Item.number) - parseInt(Item.piggybank);
  }

  const [piggybank, setPiggybank] = useState({ number: AmountToSave });

  const onChange = e => {
    setPiggybank({
      ...piggybank,
      [e.target.name]: e.target.value
    });

    // sets piggybanknumber. Ratio of monthsum-surplus(e.target.value) and adds what was already in piggybank(Item.piggybank)
    setPreset({
      ...preset,
      piggybank: parseInt(e.target.value) + parseInt(Item.piggybank)
    });
    console.log(preset);
  };

  const onSubmit = () => {
    // add new number to preset.piggybank
    sendEdit(preset);
    setModalprops(null);
    cancelEdit();

    toggleModal('');
    //transfer local piggybankstate to preset.piggybank
  };
  return (
    <div id='myModal' class='modal-register' style={{ display: 'block' }}>
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
