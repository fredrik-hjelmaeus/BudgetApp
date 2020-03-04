import React, { useState, useContext, useEffect } from 'react';
import PresetContext from '../../context/preset/presetContext';
import DateItemMobile from './DateItemMobile';
import DateItemWeb from './DateItemWeb';

const Datemenu = () => {
  const presetContext = useContext(PresetContext);
  const { year, setYear, addMonth, month } = presetContext;

  //const [LocalMonth, setLocalMonth] = useState(null);
  /*  const [prevYear, setPrevYear] = useState(null);
  const [nextYear, setNextYear] = useState(null); */
  /* const [DateList, setDateList] = useState([
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
    'December'
  ]); */
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  });

  useEffect(() => {
    // year === null && setYear('2019');
    // year === null && setLocalMonth('2019');
    // month !== null && setLocalMonth(month);
    // LocalMonth === null && setLocalMonth('2019');
    //year === '2019' && setLocalMonth(year);
    /* year !== null && setPrevYear(parseInt(year - 1).toString());
    year !== null && setNextYear((parseInt(year) + parseInt(1)).toString()); */
  }, [
    year,
    setYear,
    // setLocalMonth,
    // setNextYear,
    // setPrevYear,
    month
    // LocalMonth
  ]);

  /* const onClick = e => {
    if (e.target.value !== undefined) {
      if (isNaN(e.target.value)) {
        // month pressed
        addMonth(e.target.value);
      } else {
        // <-- year or arrow pressed

        // previous year arrow pressed
        if (e.target.value == prevYear) {
          if (dimensions.width < 700) {
            console.log('shiftlist left');
          } else {
            setYear(prevYear);
          }
        }
        // next year arrow pressed
        if (e.target.value == nextYear) {
          if (dimensions.width < 700) {
            console.log('shiftlist rigth');
          } else {
            setYear(nextYear);
          }
        }
        // arrow pressed
        if (e.target.value !== year.toString()) {
          console.log('arrow pressed');
          e.target.value !== prevYear && addMonth(e.target.value);
          e.target.value !== nextYear && addMonth(e.target.value);
        }
        // year pressed
        if (e.target.value === year) {
          addMonth(e.target.value);
          setYear(e.target.value);
          setLocalMonth(e.target.value);
          console.log(typeof e.target.value);
          console.log('year pressed');
        }
      }
    }
  }; */
  /* const adjustDateList = () => {
    console.log(DateList.length);
    let newDateList = DateList;
    console.log(`initial: ${newDateList}`);
    newDateList.splice(0, 1, year);
    console.log(`splice: ${newDateList}`);
    const cleanedDateList = newDateList.filter(item => item !== null);
    console.log(`filteroutnulls: ${cleanedDateList}`);
    const activeIndex = cleanedDateList.indexOf(LocalMonth);
    console.log(`activeIndex: ${activeIndex}`);
    //console.log(`LocalMonth: ${LocalMonth}`);
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
    //datelist to activeIndex
    console.log(`cleanedDateList before: ${cleanedDateList}`);
    let MiddleIndex = activeIndex;
    if (activeIndex !== 0) {
      MiddleIndex = activeIndex - 1;
    } else MiddleIndex = 12;
    console.log(`MiddleIndex: ${MiddleIndex}`);
    const ThirdIndex = shiftLeftDateList(cleanedDateList, MiddleIndex);
    console.log(`cleanedDateList after ThirdIndex: ${cleanedDateList}`);
    let smallDateList = [];

    const SecondIndex = shiftRightDateList(cleanedDateList, 1);
    console.log(`cleanedDateList after SecondIndex: ${cleanedDateList}`);

    const FirstIndex = shiftRightDateList(cleanedDateList, 1);
    console.log(`cleanedDateList after FirstIndex: ${cleanedDateList}`);
    smallDateList.push(FirstIndex);
    smallDateList.push(SecondIndex);
    smallDateList.push(ThirdIndex);
    console.log(`smallDateList after push: ${smallDateList}`);
    const FourthIndex = shiftLeftDateList(cleanedDateList, 3);
    console.log(`FourthIndex: ${FourthIndex}`);
    const FifthIndex = shiftLeftDateList(cleanedDateList, 1);
    console.log(`FifthIndex: ${FifthIndex}`);
    smallDateList.push(FourthIndex);
    smallDateList.push(FifthIndex);
    console.log(`smallDateList after 2nd push: ${smallDateList}`);

    setDateList(smallDateList);
  }; */

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }, 1000);

    window.addEventListener('resize', debouncedHandleResize);

    return _ => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  });

  function debounce(fn, ms) {
    let timer;
    return _ => {
      clearTimeout(timer);
      timer = setTimeout(_ => {
        timer = null;
        fn.apply(this, arguments);
      }, ms);
    };
  }

  if (dimensions.width < 700) {
    //console.log('Mobile');
    /* The viewport is less than, or equal to, 700 pixels wide */

    /*  const createDateItems = () => {
      let i;
      let MyArray = [];
      for (i = 0; i < 5; i++) {
        if (i !== 2) {
          MyArray.push(
            <ul>
              <button
                className='btn-Datemenu'
                value={DateList[i]}
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
                className='btn-Datemenu'
                value={DateList[i]}
                name={DateList[i]}
              >
                <strong className='text-dark'> {DateList[i]}</strong>
              </button>
            </ul>
          );
        }
      }
      return MyArray.map(Item => Item);
    }; */

    return (
      {
        /* <div className='datemenu specialorder'>
        <ul>
          <button
            onClick={onClick}
            className='btn-Datemenu'
            value={prevYear}
            name={prevYear}
          >
            {' '}
            {year == prevYear ? (
              <strong className='text-dark'>{`<`}</strong>
            ) : (
              `<`
            )}
          </button>
        </ul>
        {createDateItems()}
        <ul>
          <button
            onClick={onClick}
            className='btn-Datemenu'
            value={nextYear}
            name={nextYear}
          >
            {LocalMonth == { nextYear } ? (
              <strong className='text-dark'>{`>`}</strong>
            ) : (
              `>`
            )}
          </button>
        </ul>
      </div> */
      },
      (<DateItemMobile />)
    );
  } else {
    // console.log('Web');
    /* The viewport is greater than 700 pixels wide */

    return (
      /*   <div className='datemenu'>
        <ul>
          <button
            onClick={onClick}
            className='btn-Datemenu'
            value={prevYear}
            name={prevYear}
          >
            {' '}
            {year == prevYear ? (
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
            {LocalMonth == year ? (
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
            {LocalMonth === 'January' ? (
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
            {LocalMonth === 'February' ? (
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
            {LocalMonth === 'March' ? (
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
            {LocalMonth === 'April' ? (
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
            {LocalMonth === 'May' ? (
              <strong className='text-dark'>May</strong>
            ) : (
              'May'
            )}
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
            {LocalMonth === 'June' ? (
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
            {LocalMonth === 'July' ? (
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
            {LocalMonth === 'August' ? (
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
            {LocalMonth === 'September' ? (
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
            {LocalMonth === 'October' ? (
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
            {LocalMonth === 'November' ? (
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
            {LocalMonth === 'December' ? (
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
            {LocalMonth == { nextYear } ? (
              <strong className='text-dark'>{`>`}</strong>
            ) : (
              `>`
            )}
          </button>
        </ul>
      </div>
    ); */
      <DateItemWeb />
    );
  }
};

export default Datemenu;
