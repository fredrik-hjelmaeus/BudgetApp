import React, { useContext } from 'react';
import GuideContext from '../../context/guide/guideContext';
import AuthContext from '../../context/auth/authContext';
import ArrowSVG from '../layout/images/ArrowSVG';

const GuideModal = () => {
  const authContext = useContext(AuthContext);
  const guideContext = useContext(GuideContext);
  const { setGuide, guide } = guideContext;
  //authContext && console.log(authContext.user.name);
  const { isAuthenticated, user } = authContext;
  const onExit = () => {
    setGuide(null);
  };
  const nextStep = () => {
    //if guide reach last number,finish and exit guide by null,else increment guide by 1
    guide === '3' ? setGuide(null) : setGuide((parseInt(guide) + 1).toString());
  };
  return (
    <div className='guide__modal'>
      {guide === '1' && (
        <div className='guide__card'>
          <h1 className='guide__title'>Budget App Guide</h1>
          <h3>Welcome {isAuthenticated && user.name}!</h3>
          <p>
            To be able to properly use this App i suggest following this quick
            guide of all the features available.
          </p>
          <button onClick={onExit}>Decline</button>
          <button onClick={nextStep}>Start Guide</button>
        </div>
      )}
      {guide === '2' && (
        <React.Fragment>
          <div className='guide__arrowicon'>
            <ArrowSVG fill='orange' color='green' height='64' width='64' />
          </div>
          <div className='guide__datemenustep'>
            <div>
              {' '}
              This is the datemenu. Here you navigate in your timeline.
            </div>
            <div>
              {' '}
              <button onClick={onExit}>Exit Guide</button>
              <button onClick={nextStep}>Next</button>
            </div>
          </div>
        </React.Fragment>
      )}
      {guide === '3' && (
        <React.Fragment>
          <div className='guide__arrowicon'>
            <ArrowSVG fill='red' color='green' height='64' width='64' />
          </div>
          <div className='guide__datemenustep'>
            <div>
              Under year you will find a statistic summary for all values added
              regarding to that year
            </div>
            <div>
              <button onClick={onExit}>Exit Guide</button>
              <button onClick={nextStep}>Next</button>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
export default GuideModal;
