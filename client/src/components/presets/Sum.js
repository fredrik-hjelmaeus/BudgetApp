import React, { Fragment, useContext, useEffect } from 'react';
import PresetContext from '../../context/preset/presetContext';

const Sum = () => {
  const presetContext = useContext(PresetContext);

  const {
    month,
    presets,
    calcPosMonth,
    calcNegMonth,
    filteredmonthandposnum,
    filteredmonthandnegnum
  } = presetContext;

  useEffect(() => {
    if (month !== null && presets !== null) {
      calcPosMonth(filteredmonthandposnum);
      calcNegMonth(filteredmonthandnegnum);
    } // eslint-disable-next-line
  }, [month, presets, filteredmonthandposnum, filteredmonthandnegnum]);

  return (
    <Fragment>
      <div className='card_top_monthright bold grid-3'>
        <div>
          <span
            className={
              presetContext.PosMonthSum > 0 ? 'text-gray' : 'text-gray'
            }
          >
            Income Month:{'    '}
          </span>
          <span
            className={
              presetContext.PosMonthSum > 0 ? 'text-success' : 'text-danger'
            }
          >
            {' '}
            {presetContext.PosMonthSum}
          </span>
        </div>
        <div>
          <span
            className={
              presetContext.MonthSum > 0 ? 'text-primary' : 'text-primary'
            }
          >
            Balance Month:{'    '}
          </span>
          <span
            className={
              presetContext.MonthSum > 0 ? 'text-success' : 'text-danger'
            }
          >
            {presetContext.MonthSum}
          </span>
        </div>
        <div>
          <span
            className={
              presetContext.NegMonthSum > 0 ? 'text-gray' : 'text-gray'
            }
          >
            Expenses Month:{'    '}
          </span>
          <span
            className={
              presetContext.NegMonthSum > 0 ? 'text-success' : 'text-danger'
            }
          >
            {presetContext.NegMonthSum}
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default Sum;
