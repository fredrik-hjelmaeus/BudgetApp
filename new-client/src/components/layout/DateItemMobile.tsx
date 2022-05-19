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

  const onDateClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    //shift the datelist
    const rotateDateList = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      shiftedDateList: Array<string | number>
    ) => {
      const targetCast = event.target as HTMLButtonElement;
      if (targetCast.name === "next") {
        const removed = shiftedDateList.shift();
        removed && shiftedDateList.push(removed);
      } else {
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
        year && setYear(year - 1);
        addMonth("December");
      }
      // coming from january and pressing year
      if (
        castTarget.value === "prev" &&
        typeof shiftedDateList[6] === "number" &&
        !isNaN(shiftedDateList[6])
      ) {
        // addMonth(null); TODO: verify this change worked before removing this comment
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
          dateListWithNewYear[6] = year && year + 1;
        }
        setDate(dateListWithNewYear);
        year && setYear(year + 1);
        //addMonth(null); TODO: verify setYear setting month to null means this is excessive.
      }
    };

    // what year to display is not always what year is active.
    // This function solves this problem.
    const displayYear = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      dateList: (string | number)[]
    ) => {
      const castTarget = event.target as HTMLButtonElement;
      if (castTarget.value === "prev" && dateList[5] === "November") {
        const newDateList = [...dateList];
        newDateList[7] = year ? year : 0;
        return newDateList;
      }

      if (
        (castTarget.value === "next" && dateList[7] === "December") ||
        (castTarget.value === "December" && dateList[7] === "December")
      ) {
        const newDateList = [...dateList];
        newDateList[8] = year ? year + 1 : 0;
        return newDateList;
      }

      return dateList;
    };

    // pipeline for dateList below. Made to be run in below order or will break.
    const newDateList: Array<string | number> = displayYear(event, dateList);
    const shiftedDateList: Array<string | number> = rotateDateList(event, newDateList);
    checkYear(event, shiftedDateList);
  };

  // This makes sure year is defined when onClick is pressed and switching to month by addMonth-function.
  // If year is not defined when switching to month ,
  // the calculations on the presets will fail as they are using a defined presetContext-year value
  // we also make sure year is of type number as if we switch from Web where string is used,
  //DateItemMobile will otherwise make calc on string-year.
  React.useEffect(() => {
    !year && setYear(parseInt(dateList[6].toString()));
    year && typeof year === "string" && setYear(parseInt(year));
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
          value={"prev"}
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
