import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PresetItem from './PresetItem';
import PresetContext from '../../context/preset/presetContext';
import Spinner from '../layout/Spinner';

const Presets = () => {
  const presetContext = useContext(PresetContext);

  const { presets, getPresets, loading } = presetContext;

  useEffect(() => {
    getPresets();
    //presetContext.calcSum(5, 0, 'Update');
    // eslint-disable-next-line
  }, []);

  //if (presets !== null && presets.length === 0 && !loading) {
  //  return <h4>Please add a Value</h4>;
  // }

  return (
    <Fragment>
      {/* {presets !== null && !loading ? (
        <TransitionGroup>
          {presets.map(preset => (
            <CSSTransition key={preset._id} timeout={500} classNames='item'>
              <PresetItem preset={preset} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}                            */}
    </Fragment>
  );
};

export default Presets;
