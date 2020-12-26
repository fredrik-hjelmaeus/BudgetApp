import React from 'react';
import DotStepsMenu from './DotStepsMenu';

const GuideSteps = ({ text, setGuide, guide, nextStep, onExit }) => {
  return (
    <>
      <div className='guide__card'>
        <DotStepsMenu guide={guide} setGuide={setGuide} />
        <div className='guide__text'>{text}</div>
        <div className='guide__btn__group'>
          {nextStep && (
            <button className='guide__btn__group__next' onClick={nextStep}>
              Next
            </button>
          )}
          <button className='guide__btn__group__exit' onClick={onExit}>
            Exit
          </button>
        </div>
      </div>
    </>
  );
};

export default GuideSteps;
