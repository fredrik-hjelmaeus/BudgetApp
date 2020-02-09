import React, { useState, useContext, useEffect } from 'react';
import PresetContext from '../../context/preset/presetContext';

const Datemenu = () => {
  const presetContext = useContext(PresetContext);
  const { year, setYear, addMonth } = presetContext;
  const [month, setMonth] = useState(null);
  const [prevYear, setPrevYear] = useState(null);
  const [nextYear, setNextYear] = useState(null);

  useEffect(() => {
    presetContext.month !== null && year !== null && setMonth('2019');
    year === null && setYear(2019);
    year !== null && setPrevYear(parseInt(year - 1).toString());
    year !== null && setNextYear((parseInt(year) + parseInt(1)).toString());
  }, [presetContext.month, year, prevYear, nextYear]);

  const onClick = e => {
    if (e.target.value !== undefined) {
      setMonth(e.target.value);
      if (e.target.value !== year.toString()) {
        e.target.value !== prevYear && addMonth(e.target.value);
        e.target.value !== nextYear && addMonth(e.target.value);
      }
      if (e.target.value === prevYear) {
        setYear(prevYear);
      }
      if (e.target.value === nextYear) {
        setYear(nextYear);
      }
      if (e.target.value === year.toString()) {
        addMonth(null);
      }
    }
  };

  return (
    <div className='datemenu'>
      <ul>
        <button
          onClick={onClick}
          className='btn-Datemenu'
          value={prevYear}
          name={prevYear}
        >
          {' '}
          {year === { prevYear } ? (
            <strong className='text-dark'>{`<`}</strong>
          ) : (
            `<`
          )}
        </button>
      </ul>
      <ul>
        <button
          onClick={onClick}
          className='btn-Datemenu'
          value={year}
          name={year}
        >
          {month === { year } ? (
            <strong className='text-dark'>{` ${year}`}</strong>
          ) : (
            ` ${year}`
          )}
        </button>
      </ul>
      <ul>
        <button
          onClick={onClick}
          className='btn-Datemenu'
          value='January'
          name='January'
        >
          {month === 'January' ? (
            <strong className='text-dark'>January</strong>
          ) : (
            'January'
          )}
        </button>
      </ul>
      <ul>
        <button
          onClick={onClick}
          className='btn-Datemenu'
          value='February'
          name='February'
        >
          {month === 'February' ? (
            <strong className='text-dark'>February</strong>
          ) : (
            'February'
          )}
        </button>
      </ul>
      <ul>
        <button
          onClick={onClick}
          className='btn-Datemenu'
          value='March'
          name='March'
        >
          {month === 'March' ? (
            <strong className='text-dark'>March</strong>
          ) : (
            'March'
          )}
        </button>
      </ul>
      <ul>
        <button
          onClick={onClick}
          className='btn-Datemenu'
          value='April'
          name='April'
        >
          {month === 'April' ? (
            <strong className='text-dark'>April</strong>
          ) : (
            'April'
          )}
        </button>
      </ul>
      <ul>
        <button
          onClick={onClick}
          className='btn-Datemenu'
          value='May'
          name='May'
        >
          {month === 'May' ? <strong className='text-dark'>May</strong> : 'May'}
        </button>
      </ul>
      <ul>
        {' '}
        <button
          onClick={onClick}
          className='btn-Datemenu'
          value='June'
          name='June'
        >
          {month === 'June' ? (
            <strong className='text-dark'>June</strong>
          ) : (
            'June'
          )}
        </button>
      </ul>
      <ul>
        {' '}
        <button
          onClick={onClick}
          className='btn-Datemenu'
          value='July'
          name='July'
        >
          {month === 'July' ? (
            <strong className='text-dark'>July</strong>
          ) : (
            'July'
          )}
        </button>
      </ul>
      <ul>
        {' '}
        <button
          onClick={onClick}
          className='btn-Datemenu'
          value='August'
          name='August'
        >
          {month === 'August' ? (
            <strong className='text-dark'>August</strong>
          ) : (
            'August'
          )}
        </button>
      </ul>
      <ul>
        {' '}
        <button
          onClick={onClick}
          className='btn-Datemenu'
          value='September'
          name='September'
        >
          {month === 'September' ? (
            <strong className='text-dark'>September</strong>
          ) : (
            'September'
          )}
        </button>
      </ul>
      <ul>
        {' '}
        <button
          onClick={onClick}
          className='btn-Datemenu'
          value='October'
          name='October'
        >
          {month === 'October' ? (
            <strong className='text-dark'>October</strong>
          ) : (
            'October'
          )}
        </button>
      </ul>
      <ul>
        {' '}
        <button
          onClick={onClick}
          className='btn-Datemenu'
          value='November'
          name='November'
        >
          {month === 'November' ? (
            <strong className='text-dark'>November</strong>
          ) : (
            'November'
          )}
        </button>
      </ul>
      <ul>
        {' '}
        <button
          onClick={onClick}
          className='btn-Datemenu'
          value='December'
          name='December'
        >
          {month === 'December' ? (
            <strong className='text-dark'>December</strong>
          ) : (
            'December'
          )}
        </button>
      </ul>
      <ul>
        <button
          onClick={onClick}
          className='btn-Datemenu'
          value={nextYear}
          name={nextYear}
        >
          {month === { nextYear } ? (
            <strong className='text-dark'>{`>`}</strong>
          ) : (
            `>`
          )}
        </button>
      </ul>
    </div>
  );
};
export default Datemenu;
