import React, { useContext, useState } from 'react';
import PresetContext from '../../context/preset/presetContext';

const PurchaseItem = ({ Item }) => {
  const presetContext = useContext(PresetContext);

  const {
    deletePreset,
    cancelEdit,
    setEdit,
    MonthSum,
    sendEdit,
    month,
    edit
  } = presetContext;

  const [preset] = useState(
    {
      name: Item.name,
      number: Item.number * -1,
      month,
      category: Item.category,
      type: 'overhead'
    },
    [presetContext, edit]
  );

  const onBuy = () => {
    sendEdit(preset);

    console.log(preset);
  };

  const onDelete = () => {
    deletePreset(Item._id);
    cancelEdit();
  };

  return (
    <div className='card bg-light'>
      <h4>
        <button
          onClick={() => setEdit(Item)}
          className={MonthSum > 0 ? 'text-primary' : 'text-danger'}
        >
          {Item.name} {Item.number}
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          x
        </button>
        {MonthSum >= Item.number ? (
          <button className='btn btn-primary btn-sm' onClick={onBuy}>
            o
          </button>
        ) : MonthSum > 0 &&
          parseFloat(Item.number / MonthSum) >= 0.0 &&
          parseFloat(Item.number / MonthSum) <= 2.0 ? (
          'Next Month!'
        ) : (
          `Can afford in ${parseInt(parseFloat(Item.number / MonthSum))} months`
        )}
      </h4>
    </div>
  );
};

export default PurchaseItem;
