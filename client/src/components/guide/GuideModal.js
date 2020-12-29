import React, { useContext } from 'react';
import GuideContext from '../../context/guide/guideContext';
import AuthContext from '../../context/auth/authContext';
import PresetContext from '../../context/preset/presetContext';
import GuideSteps from './GuideSteps';
import { animateScroll } from 'react-scroll';

/* 
Actions triggered to make this guide work:
1.this modal is first triggered in Year-component if user dont have any presets and havent exited this guide.
2.useEffect in this component sets year,month,scroll and loads guidedata based on guide-step.
3.This component sets guidesteps based on nextStep.
4.DotsStepsMenu sets guidesteps based on dot clicked.
5.onExit in this component clears dummydata,exit guidemodal and set localStorage to never ask user if they want to run guide again.
6.YearSummaryMenu switches between balance,expense,income and savings-screen.
7.Alot off css-classes with position and zindex is used to bring elements in focus on top of overlay. Search for guide__ to see.
8.data-tooltip is used to show tooltips throughout components. Search for data-tooltip too find.
9.react-scroll is used to focus user to top,bottom or on element. Search for scrollToElement() or scrollToTop()
10.In PresetForm there is plenty of actions, search for guide in that component to find them.
*/

const GuideModal = () => {
  const authContext = useContext(AuthContext);
  const guideContext = useContext(GuideContext);
  const { guide, setGuide, setUserExited } = guideContext;
  const { getGuidePresets, clearPresets, setYear, getPresets, addMonth } = useContext(PresetContext);
  const { isAuthenticated, user } = authContext;

  // When user exits guide
  const onExit = () => {
    // clear the dummy/guidedata
    clearPresets();
    // deactivate guide-modal-component
    setGuide(null);
    // deactivate popup-question from guide-modal to user about running the guide. Uses localstorage.
    setUserExited(true);
    // loads actual user-data,which could be empty but neverteless wipes out the dummydata.
    getPresets();
  };

  const nextStep = () => {
    setGuide((parseInt(guide) + 1).toString());
  };

  const prevStep = () => {
    !isNaN(guide) && parseInt(guide) > 1 && setGuide((parseInt(guide) - 1).toString());
  };

  // These guide-actions is in useeffect as both nextStep and DotStepsMenu should trigger these changes/actions.
  React.useEffect(() => {
    // between step 4 and step 11 the guide is in the month tab. Rest of the steps is in year-tab.
    guide === '1' && setYear('2019');
    guide === '2' && setYear('2019');
    guide === '3' && setYear('2019');
    guide === '4' && addMonth('January');
    guide === '5' && addMonth('January');
    guide === '6' && addMonth('January');
    guide === '7' && addMonth('January');
    guide === '8' && addMonth('January');
    guide === '9' && addMonth('January');
    guide === '10' && addMonth('January');
    guide === '11' && addMonth('January');
    guide === '12' && addMonth('January');
    guide === '13' && setYear('2019');
    guide === '14' && setYear('2019');
    guide === '15' && setYear('2019');
    // scroll view
    !isNaN(guide) && parseInt(guide) <= 10 && animateScroll.scrollToTop(); // if guidestep less than 11 scroll to top
    !isNaN(guide) && parseInt(guide) > 14 && animateScroll.scrollToTop(); // if guidestep more than 14 scroll to top

    guide === '11' && animateScroll.scrollToBottom();
    guide === '12' && animateScroll.scrollToTop();
    guide === '13' && animateScroll.scrollToTop();

    // Loads guide-data. Dummydata to have something to show the user.
    !isNaN(guide) && parseInt(guide) >= 2 && getGuidePresets();
  }, [guide]);

  return (
    <>
      <div className='guide__modal'></div>
      <div>
        {guide === '1' && (
          <div className='guide__card'>
            <h1 className='guide__title'>Budget App Guide</h1>
            <h3 className='guide__title__h3'>Welcome {isAuthenticated && user.name}!</h3>
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
            prevStep={prevStep}
            onExit={onExit}
            text={'The date-menu is your main navigationpoint in the app. Here you navigate in your timeline'}
            guide={guide}
            setGuide={setGuide}
          />
        )}
        {guide === '3' && (
          <GuideSteps
            nextStep={nextStep}
            prevStep={prevStep}
            onExit={onExit}
            text={'Under year you will find a statistic summary for the year'}
            guide={guide}
            setGuide={setGuide}
          />
        )}

        {guide === '4' && (
          <GuideSteps
            nextStep={nextStep}
            prevStep={prevStep}
            onExit={onExit}
            text={'Under month you will find a statistic summary for the month'}
            guide={guide}
            setGuide={setGuide}
          />
        )}
        {guide === '5' && (
          <GuideSteps prevStep={prevStep} nextStep={nextStep} onExit={onExit} text={'Add to Budget'} guide={guide} setGuide={setGuide} />
        )}
        {guide === '6' && (
          <GuideSteps
            prevStep={prevStep}
            nextStep={nextStep}
            onExit={onExit}
            text={'Add to Budget: Overhead'}
            guide={guide}
            setGuide={setGuide}
          />
        )}
        {guide === '7' && (
          <GuideSteps
            prevStep={prevStep}
            nextStep={nextStep}
            onExit={onExit}
            text={'Add to Budget: Upload CSV'}
            guide={guide}
            setGuide={setGuide}
          />
        )}
        {guide === '8' && (
          <GuideSteps
            prevStep={prevStep}
            nextStep={nextStep}
            onExit={onExit}
            text={'Add to Budget: Capital'}
            guide={guide}
            setGuide={setGuide}
          />
        )}
        {guide === '9' && (
          <GuideSteps
            prevStep={prevStep}
            nextStep={nextStep}
            onExit={onExit}
            text={'Add to Budget: Savings'}
            guide={guide}
            setGuide={setGuide}
          />
        )}
        {guide === '10' && (
          <GuideSteps
            prevStep={prevStep}
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
            prevStep={prevStep}
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
            prevStep={prevStep}
            nextStep={nextStep}
            onExit={onExit}
            text={'To go back to year summary you press the year in the datemenu'}
            guide={guide}
            setGuide={setGuide}
          />
        )}
        {guide === '13' && (
          <GuideSteps
            prevStep={prevStep}
            nextStep={nextStep}
            onExit={onExit}
            text={'Under expense summary you get a good overview of your expenditure during the year'}
            guide={guide}
            setGuide={setGuide}
          />
        )}
        {guide === '14' && (
          <GuideSteps
            prevStep={prevStep}
            nextStep={nextStep}
            onExit={onExit}
            text={'Income summary gives you a chart representation of your income divided into categories'}
            guide={guide}
            setGuide={setGuide}
          />
        )}
        {guide === '15' && (
          <GuideSteps
            prevStep={prevStep}
            nextStep={nextStep}
            onExit={onExit}
            text={`Savings summary gives you overview of all your savings: general savings not delegated to, capital and piggybank savings and their progress`}
            guide={guide}
            setGuide={setGuide}
          />
        )}
        {guide === '16' && (
          <GuideSteps
            prevStep={prevStep}
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
