import React, { useContext } from 'react';
import PresetContext from '../../context/preset/presetContext';

const PresetItem = ({ preset }) => {
  const presetContext = useContext(PresetContext);

  const { deletePreset, setEdit, cancelEdit, calcSum } = presetContext;

  const { _id, name, number, type } = preset;

  const onDelete = () => {
    deletePreset(_id);
    cancelEdit();
    calcSum(_id, null);
  };
  return (
    <div className='card bg-light'>
      <h4>
        <button
          onClick={() => setEdit(preset)}
          className={number > 0 ? 'text-primary' : 'text-danger'}
        >
          {name}
          {' : '}
        </button>

        <button
          onClick={() => setEdit(preset)}
          className={number > 0 ? 'text-primary' : 'text-danger'}
        >
          {number}
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          x
        </button>
        <button>{type}</button>
      </h4>
    </div>
  );
};

export default PresetItem;
