import React, { useContext } from 'react';
import GuideContext from '../../context/guide/guideContext';
import AuthContext from '../../context/auth/authContext';
import Test from './Test';
import GuideSteps from './GuideSteps';

const GuideModal = () => {
  const authContext = useContext(AuthContext);
  const guideContext = useContext(GuideContext);
  const { guide, setGuide } = guideContext;
  //authContext && console.log(authContext.user.name);
  const { isAuthenticated, user } = authContext;

  //return <Test />
  const onExit = () => {
    setGuide(null);
  };
  const nextStep = () => {
    //if guide reach last number,finish and exit guide by null,else increment guide by 1
    guide === '15' ? setGuide(null) : setGuide((parseInt(guide) + 1).toString());
  };

  return (
    <div className='guide__modal'>
      {guide === '1' && (
        <div className='guide__card'>
          <h1 className='guide__title'>Budget App Guide</h1>
          <h3>Welcome {isAuthenticated && user.name}!</h3>
          <p>To be able to properly use this App i suggest following this quick guided tour of all the features available.</p>
          <button onClick={onExit}>Decline</button>
          <button onClick={nextStep}>Start Guide</button>
        </div>
      )}
      {guide === '2' && <GuideSteps nextStep={nextStep} onExit={onExit} text={'Datemenu'} guide={guide} setGuide={setGuide} />}
      {guide === '3' && (
        <GuideSteps
          nextStep={nextStep}
          onExit={onExit}
          text={'Under year you will find a statistic summary for the year'}
          guide={guide}
          setGuide={setGuide}
        />
      )}

      {guide === '4' && (
        <GuideSteps
          nextStep={nextStep}
          onExit={onExit}
          text={'Under month you will find a statistic summary for the month'}
          guide={guide}
          setGuide={setGuide}
        />
      )}
      {guide === '5' && <GuideSteps nextStep={nextStep} onExit={onExit} text={'Add to Budget'} guide={guide} setGuide={setGuide} />}
      {guide === '6' && (
        <GuideSteps nextStep={nextStep} onExit={onExit} text={'Add to Budget: Overhead/uploadCSV'} guide={guide} setGuide={setGuide} />
      )}
      {guide === '7' && (
        <GuideSteps nextStep={nextStep} onExit={onExit} text={'Add to Budget: Capital'} guide={guide} setGuide={setGuide} />
      )}
      {guide === '8' && (
        <GuideSteps nextStep={nextStep} onExit={onExit} text={'Add to Budget: Savings'} guide={guide} setGuide={setGuide} />
      )}
      {guide === '9' && (
        <GuideSteps nextStep={nextStep} onExit={onExit} text={'Add to Budget: Purchase'} guide={guide} setGuide={setGuide} />
      )}
      {guide === '10' && (
        <GuideSteps nextStep={nextStep} onExit={onExit} text={'Add piggybank saving to purchase'} guide={guide} setGuide={setGuide} />
      )}
      {guide === '11' && <GuideSteps nextStep={nextStep} onExit={onExit} text={'year income'} guide={guide} setGuide={setGuide} />}
      {guide === '12' && <GuideSteps nextStep={nextStep} onExit={onExit} text={'year expenses'} guide={guide} setGuide={setGuide} />}
      {guide === '13' && <GuideSteps nextStep={nextStep} onExit={onExit} text={'year savings'} guide={guide} setGuide={setGuide} />}
    </div>
  );
};
export default GuideModal;
