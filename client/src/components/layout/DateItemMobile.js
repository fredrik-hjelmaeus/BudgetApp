import React, { useState, useContext } from 'react';
import PresetContext from '../../context/preset/presetContext';
import GuideContext from '../../context/guide/guideContext';
import DateContext from '../../context/date/dateContext';

// Uses dateList as a base to figure out what months to show
// Was first intended to show 5 dateitems and arrows,but took too much space after adjusting fontsize to mobile
// If ever developed for ipad, 5 dateitems may be fitting.

const DateItemMobile = () => {
  const presetContext = useContext(PresetContext);
  const { year, setYear, addMonth } = presetContext;
  const { guide } = useContext(GuideContext);
  const { dateList, setDate } = useContext(DateContext);

  const [LocalMonth] = useState(null);

  const onDateClick = (event) => {
    //shift the datelist
    const rotateDateList = (event, shiftedDateList) => {
      if (event.target.name === 'next') {
        const removed = shiftedDateList.shift();
        shiftedDateList.push(removed);
      } else {
        const removed = shiftedDateList.pop();
        shiftedDateList.unshift(removed);
      }
      setDate(shiftedDateList);

      addMonth(shiftedDateList[6]);
      return shiftedDateList;
    };

    /**
     * Adjusts year if menu is centered on december when swiping prev
     * or centered on year when swiping next
     */
    const checkYear = (event, shiftedDateList) => {
      if (event.target.value === 'prev' && shiftedDateList[6] === 'December') {
        setYear(parseInt(year - 1));
        addMonth('December');
      }

      if ((event.target.value === 'next' && !isNaN(shiftedDateList[6])) || (!isNaN(event.target.value) && !isNaN(shiftedDateList[6]))) {
        const dateListWithNewYear = [...shiftedDateList];
        dateListWithNewYear[6] = parseInt(year + 1);
        setDate(dateListWithNewYear);
        setYear(parseInt(year + 1));
        addMonth(null);
      }
    };

    // what year to display is not always what year is active.
    // This function solves this problem.
    const displayYear = (event, dateList) => {
      if (event.target.value === 'prev' && dateList[5] === 'November') {
        const newDateList = [...dateList];
        newDateList[7] = parseInt(year);
        return newDateList;
      }

      if (
        (event.target.value === 'next' && dateList[7] === 'December') ||
        (event.target.value === 'December' && dateList[7] === 'December')
      ) {
        const newDateList = [...dateList];
        newDateList[8] = parseInt(year + 1);
        return newDateList;
      }

      return dateList;
    };

    // pipeline for dateList below. Made to be run in below order or will break.
    const newDateList = displayYear(event, dateList);
    const shiftedDateList = rotateDateList(event, newDateList);
    checkYear(event, shiftedDateList);
  };

  // This makes sure year is defined when onClick is pressed and switching to month by addMonth-function.
  // If year is not defined when switching to month ,
  // the calculations on the presets will fail as they are using a defined presetContext-year value
  // we also make sure year is of type number as if we switch from Web where string is used, DateItemMobile will otherwise make calc on string-year.
  React.useEffect(() => {
    !year && setYear(parseInt(dateList[6]));
    year && typeof year === 'string' && setYear(parseInt(year));
    // eslint-disable-next-line
  }, []);

  return (
    <div
      data-tooltip={guide === '2' ? 'This is the datemenu. Here you navigate in your timeline' : null}
      className={guide === '2' ? 'datemenu specialorder guide__datemenu' : 'datemenu specialorder'}
    >
      <ul>
        <button onClick={onDateClick} className='btn-Datemenu prev' value='prev' name='prev'>
          {year === 'prev' ? <strong className='text-dark'>{`<`}</strong> : `<`}
        </button>
      </ul>

      <ul>
        <button onClick={onDateClick} className='btn-Datemenu' value={'prev'} name={dateList[5]}>
          {dateList[5]}
        </button>
      </ul>
      <ul>
        <button onClick={onDateClick} className='btn-Datemenu-mobilefocus' value={'active'} name={dateList[6]}>
          {dateList[6]}
        </button>
      </ul>
      <ul>
        <button onClick={onDateClick} className='btn-Datemenu' value={dateList[7]} name='next'>
          {dateList[7]}
        </button>
      </ul>
      <ul>
        <button onClick={onDateClick} className='btn-Datemenu next' value='next' name='next'>
          {LocalMonth === 'next' ? <strong className='text-dark'>{`>`}</strong> : `>`}
        </button>
      </ul>
    </div>
  );
};
export default DateItemMobile;
