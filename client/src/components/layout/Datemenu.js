import React, { useState, useContext, useEffect } from 'react';
import PresetContext from '../../context/preset/presetContext';

const Datemenu = () => {
  const presetContext = useContext(PresetContext);
  const [month, setMonth] = useState(null);

  useEffect(() => {
    setMonth('2019');

    return () => {
      //console.log('test');
    };
  }, [presetContext.month === null && presetContext.year === null]);

  const onClick = e => {
    if (e.target.value !== undefined) {
      setMonth(e.target.value);
      e.target.value === '2019'
        ? presetContext.setYear('2019')
        : presetContext.addMonth(e.target.value);
    }
  };

  return (
    <div className='datemenu'>
      <ul>
        <button
          onClick={onClick}
          className='btn-Datemenu'
          value='2018'
          name='2018'
        >
          {' '}
          {presetContext.year === '2018' ? (
            <strong className='text-dark'>{'2018 >'}</strong>
          ) : (
            '2018 >'
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
          value='2019'
          name='2019'
        >
          {presetContext.year === '2019' ? (
            <strong className='text-dark'>{'< 2019'}</strong>
          ) : (
            '< 2019'
          )}
        </button>
      </ul>
    </div>
  );
};
export default Datemenu;
