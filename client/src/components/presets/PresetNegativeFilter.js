import React, { Fragment, useContext } from 'react';
import PresetContext from '../../context/preset/presetContext';
import PresetItem from './PresetItem';
import Spinner from '../layout/Spinner';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const PresetNegativeFilter = () => {
  const presetContext = useContext(PresetContext);
  const { filteredmonthandnegnum, loading } = presetContext;

  if (
    filteredmonthandnegnum !== null &&
    filteredmonthandnegnum.length === 0 &&
    !loading
  ) {
    return <h4>Please add a Value</h4>;
  }

  const reverseSort =
    filteredmonthandnegnum !== null &&
    filteredmonthandnegnum.sort(function (a, b) {
      if (a.number > b.number) {
        return 1;
      } else {
        return -1;
      }
    });

  return (
    <Fragment>
      {filteredmonthandnegnum && !loading ? (
        <TransitionGroup>
          {reverseSort.map((preset) => (
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
