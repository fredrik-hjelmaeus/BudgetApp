import React, { useContext, useState, useEffect } from 'react';
import PresetContext from '../../context/preset/presetContext';
import piggyicon from '../layout/images/piggybank.svg';
import PiggybankSavings from './PiggybankSavings';
import GuideContext from '../../context/guide/guideContext';
import SavingsItem from './SavingsItem';

const Savings = () => {
  const { guide } = useContext(GuideContext);
  const presetContext = useContext(PresetContext);
  const { getSavingsList, savingsList, presets, savings, capital } = presetContext;
  const [showIndividualSavingsList, setShowIndividualSavingsList] = useState(false);
  useEffect(() => {
    getSavingsList();
  }, [presets]);
  const onClick = () => {
    setShowIndividualSavingsList(!showIndividualSavingsList);
  };
  return (
    <div>
      <div className={guide === '16' ? 'expense__card bold guide__expense__card' : 'expense__card bold'}>
        <div className='flexcolumn '>
          <div className='flexrow-2 borderdivider'>
            <div>General Savings: </div>
            <button onClick={onClick} className={'text-success px text-left'}>
              {savings}
            </button>
          </div>
          {showIndividualSavingsList &&
            savingsList &&
            savingsList.map((savingsItem) => <SavingsItem savingsItem={savingsItem} key={savingsItem.id} />)}
          <div className='flexrow-2 borderdivider'>
            <div>Capital: </div>
            <div className={'text-success px text-left'}>{capital}</div>
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
