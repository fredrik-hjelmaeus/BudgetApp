import React, { useContext, useState, useEffect } from 'react';

import PresetContext from '../../context/preset/presetContext';
import CssContext from '../../context/css/cssContext';
import PiggybankSVG from '../layout/images/PiggybankSVG';

const DeletePurchaseModal = ({ Item }) => {
  const presetContext = useContext(PresetContext);
  const { sendEdit, presets } = presetContext;

  // Css: modal context
  const cssContext = useContext(CssContext);
  const { toggleModal, modal } = cssContext;

  const onClick = e => {
    toggleModal('');
  };

  const [preset, setPreset] = useState({
    _id: Item._id,
    name: Item.name,
    number: Item.number,
    month: Item.month,
    category: Item.category,
    piggybank: Item.piggybank,
    type: Item.type
  });

  //cancel purchase
  const onDelete = () => {
    setPreset({
      ...preset,
      number: Item.piggybank, //transfer piggybanksavings from piggybank to number
      piggybank: 0,
      type: 'savings' //switch type from purchase to savings
    });
  };
  useEffect(() => {
    //OnDelete calls useState witch is async. Therefore, useEffect is watching preset and runs as callback on setPreset.
    preset.type === 'savings' && sendEdit(preset); // check if setPreset ran and update preset in db.
    preset.type === 'savings' && toggleModal(''); // close modal
  }, [preset]);

  return (
    <div id='myModal' class='modal-register' style={{ display: 'block' }}>
      <div className='modal-content-deletepurchase'>
        <span>
          <button className='closebtn' value='close' onClick={onClick}></button>
        </span>

        <div className='modalloginheader text-gray'>
          <h1 className='regular'>Confirm delete</h1>
        </div>
        <div className=' purchasemodalobjname'>{Item.name}</div>
        <button
          className='text-primary purchasemodaldeletebutton'
          value='delete'
          onClick={onDelete}
        >
          Delete{'  '}
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

export default DeletePurchaseModal;
