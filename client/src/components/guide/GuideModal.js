import React, { useContext } from 'react';
import GuideContext from '../../context/guide/guideContext';
import AuthContext from '../../context/auth/authContext';
import PresetContext from '../../context/preset/presetContext';
import Test from './Test';
import GuideSteps from './GuideSteps';

import { animateScroll } from 'react-scroll';

const GuideModal = () => {
  const authContext = useContext(AuthContext);
  const guideContext = useContext(GuideContext);
  const { guide, setGuide, setUserExited, exitedguide } = guideContext;
  const { getGuidePresets, clearPresets, presets, setYear, year, getPresets, addMonth } = useContext(PresetContext);
  //authContext && console.log(authContext.user.name);
  const { isAuthenticated, user } = authContext;

  const onExit = () => {
    clearPresets();
    setGuide(null);
    setUserExited(true);
    getPresets();
  };
  const nextStep = () => {
    year !== '2019' && setYear('2019');
    guide === '3' && addMonth('January');
    !isNaN(guide) && parseInt(guide) < 10 && animateScroll.scrollToTop(); // if guidestep less than 10 scroll to top
    !isNaN(guide) && parseInt(guide) > 14 && animateScroll.scrollToTop(); // if guidestep less than 10 scroll to top
    guide === '10' && animateScroll.scrollToBottom();
    guide === '11' && animateScroll.scrollToTop();
    guide === '12' && setYear('2019');
    guide === '12' && animateScroll.scrollToTop();
    //if guide reach last number,finish and exit guide by null,else increment guide by 1
    guide === '16' ? setGuide(null) : setGuide((parseInt(guide) + 1).toString());
  };
  React.useEffect(() => {
    !isNaN(guide) && parseInt(guide) >= 2 && getGuidePresets();
  }, [guide]);

  return (
    <>
      <div className='guide__modal'></div>
      <div>
        {guide === '1' && (
          <div className='guide__card'>
            <h1 className='guide__title'>Budget App Guide</h1>
            <h3>Welcome {isAuthenticated && user.name}!</h3>
            <p>To be able to properly use this App we suggest following this quick guided tour of all the features.</p>
            <div className='guide__btn__group'>
              <button className='guide__btn__group__next' onClick={nextStep}>
                Start Guide
              </button>
              <button className='guide__btn__group__exit' onClick={onExit}>
                Decline
              </button>
            </div>
          </div>
        )}
        {guide === '2' && (
          <GuideSteps
            nextStep={nextStep}
            onExit={onExit}
            text={'The date-menu is your main navigationpoint in the app. Here you navigate in your timeline'}
            guide={guide}
            setGuide={setGuide}
          />
        )}
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
          <GuideSteps nextStep={nextStep} onExit={onExit} text={'Add to Budget: Overhead'} guide={guide} setGuide={setGuide} />
        )}
        {guide === '7' && (
          <GuideSteps nextStep={nextStep} onExit={onExit} text={'Add to Budget: Upload CSV'} guide={guide} setGuide={setGuide} />
        )}
        {guide === '8' && (
          <GuideSteps nextStep={nextStep} onExit={onExit} text={'Add to Budget: Capital'} guide={guide} setGuide={setGuide} />
        )}
        {guide === '9' && (
          <GuideSteps nextStep={nextStep} onExit={onExit} text={'Add to Budget: Savings'} guide={guide} setGuide={setGuide} />
        )}
        {guide === '10' && (
          <GuideSteps
            nextStep={nextStep}
            onExit={onExit}
            text={`You can make a purchase plan for things you wish to buy or do. Then, whenever you have a 
          month surplus, you can add some amount to that planned purchase piggybank`}
            guide={guide}
            setGuide={setGuide}
          />
        )}
        {guide === '11' && (
          <GuideSteps
            nextStep={nextStep}
            onExit={onExit}
            text={`if the month has sufficient month surplus your planned purchases becomes visible at the bottom of your month tab . 
          Here you can delegate your monthly surplus into separate piggybanks for every purchase goal. 
          You get feedback how many more monthly deposits of this months surplus you need to be able to finance it fully. 
          When you have enough piggybank savings and your month surplus is enough an buy button will be shown and your purchase will 
          then be booked into that months transactions.`}
            guide={guide}
            setGuide={setGuide}
          />
        )}
        {guide === '12' && (
          <GuideSteps
            nextStep={nextStep}
            onExit={onExit}
            text={'To go back to year summary you press the year in the datemenu'}
            guide={guide}
            setGuide={setGuide}
          />
        )}
        {guide === '13' && (
          <GuideSteps
            nextStep={nextStep}
            onExit={onExit}
            text={'Under expense summary you get a good overview of your expenditure during the year'}
            guide={guide}
            setGuide={setGuide}
          />
        )}
        {guide === '14' && (
          <GuideSteps
            nextStep={nextStep}
            onExit={onExit}
            text={'Income summary gives you a chart representation of your income divided into categories'}
            guide={guide}
            setGuide={setGuide}
          />
        )}
        {guide === '15' && (
          <GuideSteps
            nextStep={nextStep}
            onExit={onExit}
            text={`Savings summary gives you overview of all your savings: general savings not delegated to, capital and piggybank savings and their progress`}
            guide={guide}
            setGuide={setGuide}
          />
        )}
        {guide === '16' && (
          <GuideSteps
            nextStep={false}
            onExit={onExit}
            text={`Guide complete!. 
            A good startingpoint now is to add your initial capital under month/add to budget, and from there you can then input your monthly transactions`}
            guide={guide}
            setGuide={setGuide}
          />
        )}
      </div>
    </>
  );
};
export default GuideModal;
