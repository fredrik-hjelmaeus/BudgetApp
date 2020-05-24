import React from 'react';
import DeleteSVG from '../layout/images/DeleteSVG';
import AddSVG from '../layout/images/AddSVG';

const DeleteButton = ({
  name,
  onDelete,
  onHover,
  stopHover,
  localpreset,
  DelbtnColor,
}) => {
  return (
    <button
      className='btn text-primary modal-csvpresets__deletebtnadjust'
      value='delbtn'
      name={name}
      onMouseEnter={onHover}
      onMouseLeave={stopHover}
      onClick={onDelete}
    >
      {localpreset.markdelete === true ? (
        DelbtnColor === true ? (
          <AddSVG color='var(--success-color)' />
        ) : (
          <AddSVG color='var(--primary-color)' />
        )
      ) : DelbtnColor === true ? (
        <DeleteSVG fill='var(--danger-color)' />
      ) : (
        <DeleteSVG fill='var(--primary-color)' />
      )}
    </button>
  );
};
export default DeleteButton;
