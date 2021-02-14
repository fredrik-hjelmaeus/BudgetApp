import React, { useState, useContext, useEffect } from 'react';
import PresetContext from '../../context/preset/presetContext';
import GuideContext from '../../context/guide/guideContext';
import DateContext from '../../context/date/dateContext';

// Uses DateList as a base to figure out what months to show
// 'year' gets replaced with active year in adjustlist
// Was first intended to show 5 dateitems and arrows,but took too much space after adjusting fontsize to mobile
// If ever developed for ipad,5 dateitems may be fitting.

const DateItemMobile = () => {
  const presetContext = useContext(PresetContext);
  const { year, setYear, addMonth, month } = presetContext;
  const { guide } = useContext(GuideContext);
  const { dateList, setDate } = useContext(DateContext);

  const [LocalMonth, setLocalMonth] = useState(null);

  const onDateClick = (event) => {
    //shift the datelist

    const rotateDateList = (event, shiftedDateList) => {
      //const shiftedDateList = [...newDateList];

      if (event.target.name === 'next') {
        const removed = shiftedDateList.shift();
        shiftedDateList.push(removed);
      } else {
        const removed = shiftedDateList.pop();
        shiftedDateList.unshift(removed);
      }
      setDate(shiftedDateList); // TODO: this exec after displayYear/setDate so it resets the year to wrong year as shiftedDateList is created with the old state.

      addMonth(shiftedDateList[6]);
      return shiftedDateList;
    };
    // onClick, set new state, no update.
    /**
     * Adjusts year if menu is centered on december when swiping prev
     * or centered on year when swiping next
     */
    const checkYear = (event, shiftedDateList) => {
      if (event.target.value === 'prev' && shiftedDateList[6] === 'December') {
        console.log('Year to ' + parseInt(year - 1));

        setYear(parseInt(year - 1));
        addMonth('December');
      }
      //console.log(event.target.value, shiftedDateList[6]);
      if (event.target.value === 'next' && !isNaN(shiftedDateList[6])) {
        console.log('next year: ' + year);
        const dateListWithNewYear = [...shiftedDateList];
        dateListWithNewYear[6] = parseInt(year + 1);
        setDate(dateListWithNewYear);
        setYear(parseInt(year + 1));
        addMonth(null);
      }
    };

    const displayYear = (event, dateList) => {
      //  console.log(dateList[5], dateList[7]);
      if (event.target.value === 'prev' && dateList[5] === 'November') {
        const newDateList = [...dateList];
        newDateList[7] = year;
        //setDate(newDateList);
        // console.log('newDateList: ', newDateList);
        return newDateList;
      }
      // console.log(event.target.value, dateList[7]);
      if (event.target.value === 'next' && dateList[7] === 'December') {
        console.log('ran');
        const newDateList = [...dateList];
        newDateList[8] = parseInt(year + 1);
        return newDateList;
      }
      return dateList;
    };

    //console.log('dateList', dateList);
    const newDateList = displayYear(event, dateList);
    const shiftedDateList = rotateDateList(event, newDateList);

    checkYear(event, shiftedDateList); // TODO: MAKE YEAR SWITCH AND DISPLAY WORK WHEN PRESSING MONTHS AND NOT PREV/NEXT
  };

  // This makes sure year is defined when onClick is pressed and switching to month by addMonth-function.
  // If year is not defined when switching to month ,
  // the calculations on the presets will fail as they are using a defined presetContext-year value
  React.useEffect(() => {
    !year && setYear(dateList[6]);
  }, []);
  //console.log(!isNaN(dateList[7]) ? parseInt(dateList[7] + 1) : dateList[7]);
  // console.log(year);
  return (
    <div
      data-tooltip={guide === '2' ? 'This is the datemenu. Here you navigate in your timeline' : null}
      className={guide === '2' ? 'datemenu specialorder guide__datemenu' : 'datemenu specialorder'}
    >
      <ul>
        <button onClick={onDateClick} className='btn-Datemenu prev' value='prev' name='prev'>
          {year == 'prev' ? <strong className='text-dark'>{`<`}</strong> : `<`}
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
          {LocalMonth == 'next' ? <strong className='text-dark'>{`>`}</strong> : `>`}
        </button>
      </ul>
    </div>
  );
};
export default DateItemMobile;
