import React from 'react';
import TrashiconSVG from '../layout/images/TrashiconSVG';

const SavingsItem = ({ savingsItem }) => {
  return (
    <div className='card-piggy'>
      <div className='no-wrap' style={{ overflow: 'hidden' }}>
        {savingsItem.name}
      </div>{' '}
      <div className='flexrow-piggycard'>
        <div className='px text-gray'>{savingsItem.category}</div>

        <div className='text-primary px'>{savingsItem.number}</div>
        <TrashiconSVG />
      </div>
    </div>
  );
};
export default SavingsItem;
