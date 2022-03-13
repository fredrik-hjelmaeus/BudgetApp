import React, { useContext } from 'react';

import PresetContext from '../../context/preset/presetContext';
import CssContext from '../../context/css/cssContext';
import PiggybankSVG from '../layout/images/PiggybankSVG';

const DeletePurchaseModal = ({ Item }) => {
  const presetContext = useContext(PresetContext);
  const { deletePreset } = presetContext;

  // Css: modal context
  const cssContext = useContext(CssContext);
  const { toggleModal } = cssContext;

  const onClick = (e) => {
    toggleModal('');
  };

  //cancel purchase
  const onDelete = () => {
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
        <button className='text-primary purchasemodaldeletebutton' value='delete' onClick={onDelete}>
          Delete{'  '}
          <PiggybankSVG fill='var(--primary-color)' />
        </button>
        <button className='btn btn-outline btn-block  p-3' value='delete' onClick={() => toggleModal('')}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeletePurchaseModal;
