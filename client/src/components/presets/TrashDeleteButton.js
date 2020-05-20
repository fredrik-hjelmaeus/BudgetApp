import React from 'react';
import TrashiconSVG from '../layout/images/TrashiconSVG';

const TrashDeleteButton = ({
  onDelete,
  onTrashHover,
  stopTrashHover,
  TrashHover,
}) => {
  return (
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
  );
};
export default TrashDeleteButton;
