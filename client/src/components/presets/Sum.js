import React, { Fragment, useContext, useEffect } from 'react';
import PresetContext from '../../context/preset/presetContext';
import SumByCategoryItem from './SumByCategoryItem';

const Sum = () => {
  const presetContext = useContext(PresetContext);

  const {
    month,
    categorymonthsum,
    presets,
    calcPosMonth,
    calcNegMonth,
    calcMonthSum,
    filteredmonthandposnum,
    filteredmonthandnegnum
  } = presetContext;

  useEffect(() => {
    if (month !== null && presets !== null) {
      //resetSums();
      calcMonthSum(month);
      // filterOutPositiveNumsAndMonth(month);
      // filterOutNegativeNumsAndMonth(month);
      calcPosMonth(filteredmonthandposnum);
      calcNegMonth(filteredmonthandnegnum);
      //calcCategoryByMonth(month);
    } // eslint-disable-next-line
  }, [
    month,
    presets,
    filteredmonthandposnum,
    filteredmonthandnegnum,
    categorymonthsum
  ]);

  return (
    <Fragment>
      <div className='card bg-light'>
        <h4 className={presetContext.sum > 0 ? 'text-primary' : 'text-danger'}>
          Account Balance:{'    '}
          {presetContext.sum}
        </h4>
      </div>
      <div className='card bg-light'>
        <h4
          className={
            presetContext.PosMonthSum > 0 ? 'text-primary' : 'text-danger'
          }
        >
          Income Month:{'    '}
          {presetContext.PosMonthSum}
        </h4>
      </div>
      <div className='card bg-light'>
        <h4
          className={
            presetContext.NegMonthSum > 0 ? 'text-primary' : 'text-danger'
          }
        >
          Costs Month:{'    '}
          {presetContext.NegMonthSum}
        </h4>
      </div>
      <div className='card bg-light'>
        <h4
          className={
            presetContext.MonthSum > 0 ? 'text-primary' : 'text-danger'
          }
        >
          Balance Month:{'    '}
          {presetContext.MonthSum}
        </h4>
      </div>
      {categorymonthsum.map(catsumitem => (
        <SumByCategoryItem catsumitem={catsumitem} key={catsumitem.id} />
      ))}
    </Fragment>
  );
};

export default Sum;
