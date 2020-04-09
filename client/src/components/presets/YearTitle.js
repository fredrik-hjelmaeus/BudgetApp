import React, { useContext } from 'react';
import PresetContext from '../../context/preset/presetContext';
const YearTitle = () => {
  const presetContext = useContext(PresetContext);
  const { year } = presetContext;

  return (
    <div className='card bg-light yearTitle'>
      <h1 className='x-large'>{year}</h1>
      <h4>
        Yearly summary and comparison analysis with last year. Here you can also
        see differences in income/costs over the year.
      </h4>
    </div>
  );
};
export default YearTitle;
