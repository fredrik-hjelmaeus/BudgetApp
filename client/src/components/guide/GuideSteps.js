import React from 'react';
import DotStepsMenu from './DotStepsMenu';

const GuideSteps = ({ text, setGuide, guide, nextStep, onExit, prevStep }) => {
  return (
    <>
      <div
        className={
          (!isNaN(guide) && parseInt(guide) >= 6 && parseInt(guide) < 10) || (parseInt(guide) >= 13 && parseInt(guide) < 15)
            ? 'guide__card guide__card__bottom'
            : guide === '10' || guide === '11'
            ? 'guide__card guide__card__top'
            : 'guide__card'
        }
      >
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

export default GuideSteps;
