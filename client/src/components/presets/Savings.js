import React, { useContext, useState, useEffect } from 'react';
import PresetContext from '../../context/preset/presetContext';
import piggyicon from '../layout/images/piggybank.svg';
import PiggybankSavings from './PiggybankSavings';
import GuideContext from '../../context/guide/guideContext';
import SavingsItem from './SavingsItem';
import CapitalItem from './CapitalItem';

const Savings = () => {
  const { guide } = useContext(GuideContext);
  const presetContext = useContext(PresetContext);
  const { getSavingsList, savingsList, capitalList, presets, savings, capital, getCapitalList } = presetContext;
  const [showIndividualSavingsList, setShowIndividualSavingsList] = useState(false);
  const [showCapitalItems, setShowCapitalItems] = useState(false);
  useEffect(() => {
    getSavingsList();
    getCapitalList();
  }, [presets]);
  const onClick = () => {
    setShowIndividualSavingsList(!showIndividualSavingsList);
  };
  const onCapitalClick = () => {
    setShowCapitalItems(!showCapitalItems);
  };
  return (
    <div>
      <div className={guide === '16' ? 'expense__card bold guide__expense__card' : 'expense__card bold'}>
        <div className='flexcolumn '>
          <div className='flexrow-2 borderdivider'>
            <div>General Savings: </div>
            <button onClick={onClick} className={'text-success px text-left expandbutton'}>
              {savings}
            </button>
          </div>
          {showIndividualSavingsList &&
            savingsList &&
            savingsList.map((savingsItem) => <SavingsItem savingsItem={savingsItem} key={savingsItem.id} />)}
          <div className='flexrow-2 borderdivider'>
            <div>Capital: </div>
            <button onClick={onCapitalClick} className={'text-success px text-left expandbutton'}>
              {capital}
            </button>
          </div>
          {showCapitalItems &&
            capitalList &&
            capitalList.map((capitalItem) => <CapitalItem capitalItem={capitalItem} key={capitalItem.id} />)}
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
