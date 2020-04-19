import React, { useContext } from 'react';
import TrashiconSVG from '../layout/images/TrashiconSVG';
import piggyicon from '../layout/images/piggybank.svg';
import PresetContext from '../../context/preset/presetContext';

const PiggyBankSavingItem = ({ purchase }) => {
  const presetContext = useContext(PresetContext);
  const { year } = presetContext;
  const { name, number, piggybank } = purchase;

  /* Look witch year it is and filter out years above this year  */
  const filterpiggybanks = piggybank.filter(
    (item) => item.year && item.year <= year
  );
  /*take the filtered yearlist and create a var for the sums saved */
  const sumoffilteredpiggybanks = filterpiggybanks.map(
    (item) => item.savedAmount
  );
  /* sum up the amounts */
  const totalsum = sumoffilteredpiggybanks.reduce(
    (a, b) => parseFloat(a) + parseFloat(b),
    0
  );

  return (
    <div className='card-piggy'>
      <div className='no-wrap' style={{ overflow: 'hidden' }}>
        {name}
      </div>{' '}
      <div className='flexrow-piggycard'>
        <img src={piggyicon} alt='' style={{ width: '26px' }} />
        <div className='px text-orange'>{totalsum}</div>
        <div className='text-light'>of</div>
        <div className='text-gray px'>({number})</div>
        <TrashiconSVG />
      </div>
    </div>
  );
};
export default PiggyBankSavingItem;
