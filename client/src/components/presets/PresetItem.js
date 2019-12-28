import React, { useContext } from 'react';
import PresetContext from '../../context/preset/presetContext';

const PresetItem = ({ preset }) => {
  const presetContext = useContext(PresetContext);

  const { deletePreset, setEdit, cancelEdit, calcSum } = presetContext;

  const { _id, name, number, category } = preset;
  console.log(category);
  const onDelete = () => {
    deletePreset(_id);
    cancelEdit();
    calcSum(_id, null);
  };
  return (
    <div className='monthitem'>
      <div>
        <h4>
          <button
            onClick={() => setEdit(preset)}
            className={
              number > 0 ? 'text-primary namebutton text-left' : 'text-danger'
            }
          >
            {name}
          </button>
        </h4>
      </div>
      <div>
        <button
          onClick={() => setEdit(preset)}
          className={number > 0 ? 'text-primary' : 'text-danger'}
        >
          {number}
        </button>
      </div>
      <div>
        <button onClick={() => setEdit(preset)}>{category}</button>
      </div>
      <div>
        <button className='btn text-primary' onClick={onDelete}>
          x
        </button>
      </div>
    </div>
  );
};

export default PresetItem;
