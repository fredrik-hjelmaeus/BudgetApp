import React, { useState, useContext } from "react";
import PresetContext from "../../context/preset/presetContext";
import GuideContext from "../../context/guide/guideContext";
import DateContext from "../../context/date/dateContext";

// Uses dateList as a base to figure out what months to show
// Was first intended to show 5 dateitems and arrows,but took too much space after adjusting fontsize to mobile
// If ever developed for ipad, 5 dateitems may be fitting.

const DateItemMobile = () => {
  const presetContext = useContext(PresetContext);
  const { year, setYear, addMonth } = presetContext;
  const { guide } = useContext(GuideContext);
  const { dateList, setDate } = useContext(DateContext);

  const [LocalMonth] = useState<string | null>(null);

  // possible unique events & actions:
  // [x] december is pressed when on active year -> month is set to december and year is decremented, displayYear is set to year+1
  // [x] prev is pressed when on active year -> month is set to december and year is decremented, displayYear is set to year+1
  // [x] next is pressed when on active year -> month is set to january
  // [x] january is pressed when on active year -> month is set to january
  // [x] year is pressed when december -> year is incremented and activated,displayYear is set to year
  // [x] next is pressed when december -> year is incremented and activated,displayYear is set to year
  // [x] year is pressed when on january -> year is activated
  // [x] prev is pressed when on january -> year is activated
  // [x] year is pressed when on year -> nothing happens
  // [x] december or next is pressed when on november -> month is set to december, displayYear is set to year+1
  // [x] january or prev is pressed when on february -> month is set to january, displayYear is set to year
  // [x] prev is pressed, change month and unshift datelist
  // [x] next is pressed, change month and shift datelist.
  // [x] month is pressed,find out direction and shift datelist accordingly
  const onDateClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    console.log(event.currentTarget.value, "activeyear: ", year);

    // december is pressed when on active year
    if (event.currentTarget.value === "December" && dateList[6] === year) {
      // year is decremented
      setYear(year - 1);
      // displayYear is set to year+1

      //newDateList[6] = year + 1;
      // month is set to december
      addMonth("December");
      // dateList is rotated to the left
      unshiftDateList();
      console.log("DECEMBER is pressed when on active year");
      return;
    }

    // prev is pressed when on active year
    if (event.currentTarget.value === "prev" && dateList[6] === year) {
      // year is decremented
      setYear(year - 1);
      // displayYear is set to year+1

      // month is set to december
      addMonth("December");
      // dateList is rotated to the left
      unshiftDateList();

      console.log("PREV is pressed when on active year");
      return;
    }

    // next is pressed when on active year
    if (event.currentTarget.value === "next" && dateList[6] === year) {
      shiftDateList();
      addMonth("January");

      console.log("NEXT is pressed when on active year");
      return;
    }
    // january is pressed when on active year
    if (event.currentTarget.value === "January" && dateList[6] === year) {
      shiftDateList();
      addMonth("January");

      console.log("JANUARY is pressed when on active year");
      return;
    }

    // year is pressed when on december
    if (event.currentTarget.value === (Number(year) + 1).toString() && dateList[6] === "December") {
      // year is incremented
      setYear(Number(year) + 1);
      // dateList is updated with year+1
      dateList[7] = year ? year + 1 : 0;
      // datelist is shifted to the right
      shiftDateList();
      // year gets activated by setting month to null
      addMonth(null);
      console.log("YEAR is pressed when on december");
      return;
    }
    // next is pressed when on december
    if (event.currentTarget.value === "next" && dateList[6] === "December") {
      // year is incremented
      setYear(Number(year) + 1);
      // dateList is updated with year+1
      dateList[7] = year ? year + 1 : 0;
      // datelist is shifted to the right
      shiftDateList();
      // year gets activated by setting month to null
      addMonth(null);
      console.log("NEXT is pressed when on december");
      return;
    }

    // year is pressed when on active year
    if (event.currentTarget.value === "active" && dateList[6] === year) {
      console.log("YEAR is pressed when on active year");
      return;
    }
    // year is pressed when on january
    if (event.currentTarget.value === year?.toString() && dateList[6] === "January") {
      addMonth(null);
      unshiftDateList();
      console.log("YEAR is pressed when on january");
      return;
    }
    // year is pressed when on january
    if (event.currentTarget.value === "prev" && dateList[6] === "January") {
      addMonth(null);
      unshiftDateList();
      console.log("PREV is pressed when on january");
      return;
    }

    // december is pressed when on november
    if (event.currentTarget.value === "December" && dateList[6] === "November") {
      console.log("DESEMBER is pressed when on november");
      //displayyear should be year + 1
      if (dateList[8] === year) {
        dateList[8] = year + 1;
      }
      shiftDateList();
      addMonth(event.currentTarget.value);
      return;
    }

    // next is pressed when on november
    if (event.currentTarget.value === "next" && dateList[6] === "November") {
      console.log("DECEMBER is pressed when on november");
      //displayyear should be year + 1
      if (dateList[8] === year) {
        dateList[8] = year + 1;
      }
      shiftDateList();
      addMonth("December");
      return;
    }

    // january is pressed when on february
    if (event.currentTarget.value === "January" && dateList[6] === "February") {
      console.log("JANUARY is pressed when on february");
      // displayed year is updated
      dateList[4] = year ? year : 0;
      unshiftDateList();
      console.log(dateList);
      addMonth(event.currentTarget.value);
      return;
    }

    // prev is pressed when on february
    if (event.currentTarget.value === "prev" && dateList[6] === "February") {
      console.log("PREV is pressed when on february");
      // displayed year is updated
      dateList[4] = year ? year : 0;
      unshiftDateList();
      console.log(dateList);
      addMonth(event.currentTarget.value);
      return;
    }
    // prev is pressed
    if (event.currentTarget.value === "prev") {
      console.log("prev found,no krusidulls");
      console.log("new active month should be:", dateList[5]);
      addMonth(dateList[5].toString());
      unshiftDateList();
      return;
    }
    // next is pressed
    if (event.currentTarget.value === "next") {
      console.log("next found,no krusidulls");
      console.log("new active month should be:", dateList[7]);
      addMonth(dateList[7].toString());
      shiftDateList();
      return;
    }
    // some month is pressed when on active month,find out what direction to shift
    console.log("fallback:", event.currentTarget.value, "current month: ", dateList[6]);
    if (event.currentTarget.value === dateList[5].toString()) {
      console.log("backwards");
      unshiftDateList();
      addMonth(event.currentTarget.value);
      return;
    } else {
      console.log("forwards");
      shiftDateList();
      addMonth(event.currentTarget.value);
      return;
    }

    //shift the datelist
    const rotateDateList = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      shiftedDateList: Array<string | number>
    ) => {
      console.log("rotatinglist?");
      const targetCast = event.target as HTMLButtonElement;
      if (targetCast.name === "next") {
        console.log("next");
        const removed = shiftedDateList.shift();
        removed && shiftedDateList.push(removed);
      } else {
        console.log("previous");
        const removed = shiftedDateList.pop();
        removed && shiftedDateList.unshift(removed);
      }
      setDate(shiftedDateList);

      shiftedDateList[6] && addMonth(shiftedDateList[6].toString());
      return shiftedDateList;
    };

    /**
     * Adjusts year if menu is centered on december when swiping prev
     * or centered on year when swiping next
     */
    const checkYear = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      shiftedDateList: Array<string | number>
    ) => {
      // coming from year and pressing december
      const castTarget = event.target as HTMLButtonElement;
      if (castTarget.value === "prev" && shiftedDateList[6] === "December") {
        console.log("changing year");
        year && setYear(year - 1);
        addMonth("December");
      }
      // coming from january and pressing year
      if (
        castTarget.value === "prev" &&
        typeof shiftedDateList[6] === "number" &&
        !isNaN(shiftedDateList[6])
      ) {
        console.log("changing year");
        addMonth(null); // TODO: verify this change worked before removing this comment
        year && setYear(parseInt(castTarget.value));
      }

      if (
        (castTarget.value === "next" &&
          typeof shiftedDateList[6] === "number" &&
          !isNaN(shiftedDateList[6])) ||
        (typeof shiftedDateList[6] === "number" &&
          !isNaN(parseInt(castTarget.value)) &&
          !isNaN(shiftedDateList[6]))
      ) {
        const dateListWithNewYear = [...shiftedDateList];
        if (year) {
          console.log("adding one to year");
          dateListWithNewYear[6] = year && year + 1;
        }
        setDate(dateListWithNewYear);
        addMonth(null); //TODO: verify setYear setting month to null means this is excessive.
        year && setYear(year + 1);
      }
    };

    // what year to display is not always what year is active.
    // This function solves this problem.
    const displayYear = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      dateList: (string | number)[]
    ) => {
      const castTarget = event.target as HTMLButtonElement;
      if (
        (castTarget.value === "prev" && dateList[5] === "November") ||
        (castTarget.value === "November" && dateList[5] === "November")
      ) {
        console.log("triggered displayyear backwards");
        const newDateList = [...dateList];
        newDateList[7] = year ? year : 0;
        return newDateList;
      }

      if (
        (castTarget.value === "next" && dateList[7] === "December") ||
        (castTarget.value === "December" && dateList[7] === "December")
      ) {
        console.log("triggered displayyear forward");
        const newDateList = [...dateList];
        newDateList[8] = year ? year + 1 : 0;
        return newDateList;
      }

      return dateList;
    };

    // pipeline for dateList below. Made to be run in below order or will break.
    // const newDateList: Array<string | number> = displayYear(event, dateList);
    //const shiftedDateList: Array<string | number> = rotateDateList(event, newDateList);
    //checkYear(event, shiftedDateList);
  };

  const shiftDateList = () => {
    const newDateList = [...dateList];
    const removed = newDateList.shift();
    removed && newDateList.push(removed);
    setDate(newDateList);
  };
  const unshiftDateList = () => {
    const newDateList = [...dateList];
    const removed = newDateList.pop();
    removed && newDateList.unshift(removed);
    setDate(newDateList);
  };
  // This makes sure year is defined when onClick is pressed and switching to month by addMonth-function.
  // If year is not defined when switching to month ,
  // the calculations on the presets will fail as they are using a defined presetContext-year value
  // we also make sure year is of type number as if we switch from Web where string is used,
  //DateItemMobile will otherwise make calc on string-year.
  React.useEffect(() => {
    !year && setYear(parseInt(dateList[6].toString()));
    // year && typeof year === "string" && setYear(parseInt(year));
    // eslint-disable-next-line
  }, []);

  return (
    <div
      data-tooltip={
        guide === "2" ? "This is the datemenu. Here you navigate in your timeline" : null
      }
      className={guide === "2" ? "datemenu specialorder guide__datemenu" : "datemenu specialorder"}
    >
      <ul>
        <button onClick={onDateClick} className="btn-Datemenu prev" value="prev" name="prev">
          {LocalMonth === "prev" ? <strong className="text-dark">{`<`}</strong> : `<`}
        </button>
      </ul>

      <ul>
        <button
          onClick={onDateClick}
          className="btn-Datemenu"
          value={dateList[5]}
          name={dateList[5].toString()}
        >
          {dateList[5]}
        </button>
      </ul>
      <ul>
        <button
          onClick={onDateClick}
          className="btn-Datemenu-mobilefocus"
          value={"active"}
          name={dateList[6].toString()}
        >
          {dateList[6]}
        </button>
      </ul>
      <ul>
        <button onClick={onDateClick} className="btn-Datemenu" value={dateList[7]} name="next">
          {dateList[7]}
        </button>
      </ul>
      <ul>
        <button onClick={onDateClick} className="btn-Datemenu next" value="next" name="next">
          {LocalMonth === "next" ? <strong className="text-dark">{`>`}</strong> : `>`}
        </button>
      </ul>
    </div>
  );
};
export default DateItemMobile;
