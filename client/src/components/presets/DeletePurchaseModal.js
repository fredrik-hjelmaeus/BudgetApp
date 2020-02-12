import React, { useContext, useState, useEffect } from 'react';

import PresetContext from '../../context/preset/presetContext';
import CssContext from '../../context/css/cssContext';
import PiggybankSVG from '../layout/images/PiggybankSVG';

const DeletePurchaseModal = ({ Item }) => {
  const presetContext = useContext(PresetContext);
  const { addPreset, deletePreset, month } = presetContext;

  // Css: modal context
  const cssContext = useContext(CssContext);
  const { toggleModal } = cssContext;

  const onClick = e => {
    toggleModal('');
  };

  //cancel purchase
  // for every piggybank that is not savedAmount 0,convert to new preset type savings at the month piggybankitem was registred. Then delete purchasepreset
  const onDelete = () => {
    const FilteredPiggybanks = Item.piggybank.filter(
      piggybank => piggybank.savedAmount !== 0
    );

    FilteredPiggybanks.map(newSaving =>
      addPreset({
        name: Item.name,
        number: newSaving.savedAmount,
        month: newSaving.month,
        year: newSaving.year,
        category: Item.category,
        type: 'savings', //switch type from purchase to savings)
        piggybank: [{ month, year: '2019', savedAmount: '' }]
      })
    );
    deletePreset(Item._id);
    toggleModal('');
  };

  return (
    <div id='myModal' className='modal-register' style={{ display: 'block' }}>
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
