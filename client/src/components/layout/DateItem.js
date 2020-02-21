import React from 'react';

const DateItem = Item => {
  return (
    <ul>
      {' '}
      <button className='btn-Datemenu' value={Item} name={Item}>
        {Item}
      </button>
    </ul>
  );
};
export default DateItem;
