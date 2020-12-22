import React from 'react';

const DotStepsMenu = ({ guide, setGuide }) => {
  const onStepBtnClick = (e) => {
    setGuide(e.target.value);
  };

  return (
    <div className='guide__dotcontainer'>
      <button value='2' onClick={onStepBtnClick} className={guide === '2' ? 'guide__dots guide__dots__active' : 'guide__dots'}></button>
      <button value='3' onClick={onStepBtnClick} className={guide === '3' ? 'guide__dots guide__dots__active' : 'guide__dots'}></button>
      <button value='4' onClick={onStepBtnClick} className={guide === '4' ? 'guide__dots guide__dots__active' : 'guide__dots'}></button>
      <button value='5' onClick={onStepBtnClick} className={guide === '5' ? 'guide__dots guide__dots__active' : 'guide__dots'}></button>
      <button value='6' onClick={onStepBtnClick} className={guide === '6' ? 'guide__dots guide__dots__active' : 'guide__dots'}></button>
      <button value='7' onClick={onStepBtnClick} className={guide === '7' ? 'guide__dots guide__dots__active' : 'guide__dots'}></button>
      <button value='8' onClick={onStepBtnClick} className={guide === '8' ? 'guide__dots guide__dots__active' : 'guide__dots'}></button>
      <button value='9' onClick={onStepBtnClick} className={guide === '9' ? 'guide__dots guide__dots__active' : 'guide__dots'}></button>
      <button value='10' onClick={onStepBtnClick} className={guide === '10' ? 'guide__dots guide__dots__active' : 'guide__dots'}></button>
      <button value='11' onClick={onStepBtnClick} className={guide === '11' ? 'guide__dots guide__dots__active' : 'guide__dots'}></button>
      <button value='12' onClick={onStepBtnClick} className={guide === '12' ? 'guide__dots guide__dots__active' : 'guide__dots'}></button>
      <button value='13' onClick={onStepBtnClick} className={guide === '13' ? 'guide__dots guide__dots__active' : 'guide__dots'}></button>
    </div>
  );
};

export default DotStepsMenu;
