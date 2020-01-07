import React from 'react';
import TrashiconSVG from '../layout/images/TrashiconSVG';
import piggyicon from '../layout/images/piggybank.svg';

const PiggyBankSavingItem = ({ purchase }) => {
  const { name, number, piggybank } = purchase;
  return (
    <div className='card-piggy grid-2'>
      <div>{name}</div>{' '}
      <div className='flexrow-piggycard'>
        <img src={piggyicon} alt='' style={{ width: '26px' }} />
        <div className='px text-orange'>{piggybank}</div>
        <div className='text-light'>of</div>
        <div className='text-gray px'>({number})</div>
        <TrashiconSVG />
      </div>
    </div>
  );
};
export default PiggyBankSavingItem;
