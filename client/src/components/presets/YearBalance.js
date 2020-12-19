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
            <div className='barchart'>
              <BarChart />
            </div>
          </div>
          <div className='flexrow chartsummarytext'>
            <div className='flexcolumn'>
              <div className='flexrow'>
                <div>Year Summary: </div>
                <div
                  className={
                    presetContext.yearsum > 0
                      ? 'text-success px'
                      : 'text-danger px'
                  }
                >
                  {presetContext.yearsum}
                </div>
              </div>
              <div className='flexrow'>
                <div>Monthly Average: </div>
                <div
                  className={
                    yearmonthavg > 0 ? 'text-success px' : 'text-danger px'
                  }
                >
                  {yearmonthavg}
                </div>
              </div>
            </div>
            <div className='flexcolumn'>
              <div className='flexrow'>
                <div>Capital: </div>
                <div
                  className={
                    presetContext.capital > 0
                      ? 'text-primary px'
                      : 'text-danger px'
                  }
                >
                  {presetContext.capital}
                </div>
              </div>
              <div className='flexrow'>
                <div>Savings: </div>
                <div
                  className={
                    presetContext.savings > 0
                      ? 'text-primary px'
                      : 'text-danger px'
                  }
                >
                  {presetContext.savings}
                </div>
              </div>
              <div className='flexrow'>
                <div>Account Balance: </div>
                <div
                  className={
                    presetContext.sum > 0 ? 'text-success px' : 'text-danger px'
                  }
                >
                  {presetContext.sum}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default YearBalance;
