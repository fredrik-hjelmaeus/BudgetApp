import React, { useContext } from 'react';
import PresetContext from '../../context/preset/presetContext';
import piggyicon from '../layout/images/piggybank.svg';
import PiggybankSavings from './PiggybankSavings';

const Savings = () => {
  const presetContext = useContext(PresetContext);
  return (
    <div className='year-bg'>
      <div className='expense__card bold'>
        <div className='flexcolumn '>
          <div className='flexrow-2 borderdivider'>
            <div>General Savings: </div>
            <div className={'text-success px text-left'}>
              {presetContext.savings}
            </div>
          </div>

          <div className='flexrow-2 borderdivider'>
            <div>Capital: </div>
            <div className={'text-success px text-left'}>
              {presetContext.capital}
            </div>
          </div>
          <div className='flexrow-2 savings__piggyiconandtitle'>
            <div>
              <img src={piggyicon} alt='' className='savings__piggyicon' />{' '}
            </div>{' '}
            <div>Piggybank Purchase Savings</div>
          </div>
          <div>
            <PiggybankSavings />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Savings;
