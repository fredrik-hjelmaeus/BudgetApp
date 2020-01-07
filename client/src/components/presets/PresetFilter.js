import React, { Fragment, useContext, useEffect } from 'react';
import PresetContext from '../../context/preset/presetContext';
import PresetItem from './PresetItem';
import Spinner from '../layout/Spinner';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const PresetFilter = () => {
  const presetContext = useContext(PresetContext);
  const {
    month,
    filteredmonthandposnum,
    loading,
    getPresets,
    presets,
    filterOutNegativeNumsAndMonth,
    filterOutPositiveNumsAndMonth
  } = presetContext;

  useEffect(() => {
    getPresets();
    // eslint-disable-next-line
  }, [month]);

  useEffect(() => {
    if (month !== null && presets !== null) {
      filterOutPositiveNumsAndMonth(month);
      filterOutNegativeNumsAndMonth(month);
    } // eslint-disable-next-line
  }, [month, presets]);

  if (
    filteredmonthandposnum !== null &&
    filteredmonthandposnum.length === 0 &&
    !loading
  ) {
    return <h4>Please add a Value</h4>;
  }

  return (
    <Fragment>
      {filteredmonthandposnum && !loading ? (
        <TransitionGroup>
          {filteredmonthandposnum.map(preset => (
            <CSSTransition key={preset._id} timeout={250} classNames='item'>
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
export default PresetFilter;
