import React from 'react';
import DotStepsMenu from './DotStepsMenu';

const GuideSteps = ({ text, setGuide, guide, nextStep, onExit }) => {
  return (
    <>
      <div className='guide__datemenustep'>
        <DotStepsMenu guide={guide} setGuide={setGuide} />
        <div>{text}</div>
        <div>
          <button onClick={onExit}>Exit Guide</button>
          <button onClick={nextStep}>Next</button>
        </div>
      </div>
    </>
  );
};

export default GuideSteps;
