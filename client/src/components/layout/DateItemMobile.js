import React, { useState, useContext, useEffect } from 'react';
import PresetContext from '../../context/preset/presetContext';

// Uses DateList as a base to figure out what months to show
// 'year' gets replaced with active year in adjustlist
// Was first intended to show 5 dateitems and arrows,but took too much space after adjusting fontsize to mobile
// If ever developed for ipad,5 dateitems may be fitting.

const DateItemMobile = () => {
  const presetContext = useContext(PresetContext);
  const { year, setYear, addMonth, month } = presetContext;
  const [LocalYear, setLocalYear] = useState(null);
  const [LocalMonth, setLocalMonth] = useState(null);
  const [DateList, setDateList] = useState([
    'year',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]);

  const adjustDateList = () => {
    // shows previous year in the menu if december
    const yearInput =
      month === 'December' ? parseInt(LocalYear) + 1 : parseInt(year);

    let cleanedDateList = [];
    let activeIndex;
    let MiddleIndex;
    let ThirdIndex;
    let newDateList = DateList;

    if (DateList.length > 6) {
      newDateList.splice(0, 1, yearInput);

      cleanedDateList = newDateList.filter((item) => item !== null);
    }

    month === null
      ? (activeIndex = cleanedDateList.indexOf(LocalMonth))
      : (activeIndex = cleanedDateList.indexOf(LocalMonth));
    let i;
    let shiftedObj;
    const shiftLeftDateList = (arr, objIndex) => {
      for (i = 0; i < objIndex; i++) {
        shiftedObj = arr.shift();
        arr.push(shiftedObj);
      }
      return arr[1];
    };
    let rightshiftObj;
    const shiftRightDateList = (arr, objIndex) => {
      for (i = 0; i < objIndex; i++) {
        rightshiftObj = arr.unshift(arr.pop());
      }
      return arr[1];
    };
    MiddleIndex = activeIndex;
    if (activeIndex !== 0) {
      MiddleIndex = activeIndex - 1;
    } else MiddleIndex = 12;
    ThirdIndex = shiftLeftDateList(cleanedDateList, MiddleIndex);
    let smallDateList = [];
    const SecondIndex = shiftRightDateList(cleanedDateList, 1);
    const FirstIndex = shiftRightDateList(cleanedDateList, 1); // not used but will be if ipad-size is implemented
    smallDateList.push(SecondIndex);
    smallDateList.push(ThirdIndex);
    const FourthIndex = shiftLeftDateList(cleanedDateList, 3);
    const FifthIndex = shiftLeftDateList(cleanedDateList, 1); // not used but will be if ipad-size is implemented
    smallDateList.push(FourthIndex);

    setDateList(smallDateList);
  };

  const onClick = (e) => {
    if (e.target.value !== undefined) {
      // previous arrow pressed
      // reset Datelist
      if (e.target.value === 'prev') {
        setDateList([
          'year',
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ]);
        // when first item in datelist is december,change year
        DateList[0] === 'December' && setYear(parseInt(year - 1));
        if (DateList[0] !== LocalYear) {
          addMonth(DateList[0]);
          setLocalMonth(DateList[0]);
        } else {
          addMonth(null);
          setYear(DateList[0]);
          setLocalMonth(DateList[0]);
        }
      }
      // next arrow pressed
      // reset Datelist
      if (e.target.value === 'next') {
        setDateList([
          'year',
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ]);
        // If last menu-item is not localyear+1 then make last item active and handle it as a month
        if (DateList[2] != LocalYear + 1) {
          addMonth(DateList[2]);
          setLocalMonth(DateList[2]);
        } else {
          // last menu-item is year and is now about to get activated. Activate it by setting month to null and set new year state.
          addMonth(null);
          setYear(LocalYear + 1);
          setLocalMonth(DateList[1]);
        }
      }
    }
  };
  // Create jsx
  const createDateItems = () => {
    let i;
    let MyArray = [];
    for (i = 0; i < 3; i++) {
      if (i !== 1) {
        MyArray.push(
          <ul>
            <button
              onClick={onClick}
              className='btn-Datemenu'
              value={i === 0 ? 'prev' : 'next'}
              name={DateList[i]}
            >
              {DateList[i]}
            </button>
          </ul>
        );
      } else {
        MyArray.push(
          <ul>
            <button
              onClick={onClick}
              className='btn-Datemenu-mobilefocus'
              value={DateList[i]}
              name={DateList[i]}
            >
              {DateList[i]}
            </button>
          </ul>
        );
      }
    }
    // return jsx
    return MyArray.map((Item) => Item);
  };

  useEffect(() => {
    year === null && setYear(2019);
    year === null && setLocalMonth(2019);
    LocalMonth === null && year !== null && setLocalMonth(parseInt(year));
    month !== null && setLocalMonth(month);
    year !== null && setLocalYear(parseInt(year));
    DateList.length > 6 && LocalMonth !== null && adjustDateList();
  }, [
    year,
    month,
    LocalMonth,
    LocalYear,
    addMonth,
    setYear,
    DateList,
    adjustDateList,
  ]);

  return (
    <div className='datemenu specialorder '>
      <ul>
        <button
          onClick={onClick}
          className='btn-Datemenu prev'
          value='prev'
          name='prev'
        >
          {' '}
          {year == 'prev' ? <strong className='text-dark'>{`<`}</strong> : `<`}
        </button>
      </ul>
      {createDateItems()}
      <ul>
        <button
          onClick={onClick}
          className='btn-Datemenu next'
          value='next'
          name='next'
        >
          {LocalMonth == 'next' ? (
            <strong className='text-dark'>{`>`}</strong>
          ) : (
            `>`
          )}
        </button>
      </ul>
    </div>
  );
};
export default DateItemMobile;
