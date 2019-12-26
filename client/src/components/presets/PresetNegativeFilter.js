import React, { Fragment, useContext, useEffect } from 'react';
import PresetContext from '../../context/preset/presetContext';
import PresetItem from './PresetItem';
import Spinner from '../layout/Spinner';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const PresetNegativeFilter = () => {
  const presetContext = useContext(PresetContext);
  const { filteredmonthandnegnum, loading, getPresets } = presetContext;

  useEffect(() => {
    getPresets();
    // eslint-disable-next-line
  }, []);

  if (
    filteredmonthandnegnum !== null &&
    filteredmonthandnegnum.length === 0 &&
    !loading
  ) {
    return <h4>Please add a Value</h4>;
  }

  return (
    <Fragment>
      {filteredmonthandnegnum && !loading ? (
        <TransitionGroup>
          {filteredmonthandnegnum.map(preset => (
            <CSSTransition key={preset._id} timeout={500} classNames='item'>
              <PresetItem preset={preset} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};
export default PresetNegativeFilter;
