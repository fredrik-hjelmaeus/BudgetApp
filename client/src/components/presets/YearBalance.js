import React, { useContext } from 'react';
import BarChart from '../layout/BarChart';
import PresetContext from '../../context/preset/presetContext';

const YearBalance = () => {
  const presetContext = useContext(PresetContext);
  const yearmonthavg = parseInt(parseFloat(presetContext.yearsum / 12));

  return (
    <div>
      <div className='container'>
        <div className='yearbalance__card bold'>
          <div className='flexrow chartmonth__textpadding'>
            <ul className='chartmonth'>Jan</ul>
            <ul className='chartmonth'>Feb</ul>
            <ul className='chartmonth'>Mar</ul>
            <ul className='chartmonth'>Apr</ul>
            <ul className='chartmonth'>May</ul>
            <ul className='chartmonth'>Jun</ul>
            <ul className='chartmonth'>Jul</ul>
            <ul className='chartmonth'>Aug</ul>
            <ul className='chartmonth'>Sep</ul>
            <ul className='chartmonth'>Oct</ul>
            <ul className='chartmonth'>Nov</ul>
            <ul className='chartmonth'>Dec</ul>
          </div>
          <div>
            <div className='barchart'>{/*       <BarChart /> */}</div>
          </div>
          <div className='flexrow chartsummarytext'>
            <div className='flexcolumn'>
              <ul className='flexrow'>
                <li>Year Summary: </li>
                <li name='year_summary_number' className={presetContext.yearsum > 0 ? 'text-success px' : 'text-danger px'}>
                  {presetContext.yearsum}
                </li>
              </ul>
              <ul className='flexrow'>
                <li>Monthly Average: </li>
                <li className={yearmonthavg > 0 ? 'text-success px' : 'text-danger px'}>{yearmonthavg}</li>
              </ul>
            </div>
            <div className='flexcolumn'>
              <ul className='flexrow'>
                <li>Capital: </li>
                <li className={presetContext.capital > 0 ? 'text-primary px' : 'text-danger px'}>{presetContext.capital}</li>
              </ul>
              <ul className='flexrow'>
                <li>Savings: </li>
                <li className={presetContext.savings > 0 ? 'text-primary px' : 'text-danger px'}>{presetContext.savings}</li>
              </ul>
              <ul className='flexrow'>
                <li>Account Balance: </li>
                <li className={presetContext.sum > 0 ? 'text-success px' : 'text-danger px'}>{presetContext.sum}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default YearBalance;
