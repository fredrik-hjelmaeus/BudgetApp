import React from 'react';
import DotStepsMenu from './DotStepsMenu';

const GuideSteps = ({ text, setGuide, guide, nextStep, onExit, prevStep, placement }) => {
  return (
    <>
      <div className={placement}>
        <DotStepsMenu guide={guide} setGuide={setGuide} />
        <button className='guide__closebtn' value='close' onClick={onExit}></button>
        <div className='guide__text'>{text}</div>
        <div className='guide__btn__group'>
          {guide !== '2' && (
            <button className='guide__btn__group__prev' onClick={prevStep}>
              Previous
            </button>
          )}
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
GuideSteps.defaultProps = {
  placement: 'guide__card',
};
export default GuideSteps;
