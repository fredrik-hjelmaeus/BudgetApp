import React from 'react';
import trashicon from '../layout/trashicon.svg';
import piggyicon from '../layout/piggybank.svg';

const PiggyBankSavingItem = ({ purchase }) => {
  const { name, number } = purchase;
  return (
    <div className='card-piggy grid-2'>
      <div>{name}</div>{' '}
      <div className='flexrow-piggycard'>
        <img src={piggyicon} alt='' style={{ width: '26px' }} />
        <div className='px text-orange'>6000</div>
        <div className='text-light'>of</div>
        <div className='text-gray px'>({number})</div>
        <img src={trashicon} alt='' style={{ width: '24px' }} />
      </div>
    </div>
  );
};
export default PiggyBankSavingItem;
