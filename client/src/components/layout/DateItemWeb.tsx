import React, { useState, useContext, useEffect } from "react";
import PresetContext from "../../context/preset/presetContext";
import GuideContext from "../../context/guide/guideContext";

const DateItemWeb = () => {
  const presetContext = useContext(PresetContext);
  const guideContext = useContext(GuideContext);
  const { year, setYear, addMonth, month } = presetContext;
  const { guide, setGuide } = guideContext;
  const [prevYear, setPrevYear] = useState<string>("");
  const [nextYear, setNextYear] = useState<string>("");
  const [LocalMonth, setLocalMonth] = useState<string>("");

  useEffect(() => {
    year === null && setYear(2021);
    year === null && setLocalMonth("2021");
    month !== null && setLocalMonth(month);
    LocalMonth === "" && year && setLocalMonth(year.toString());
    year !== null && setPrevYear((year - 1).toString());
    year !== null && setNextYear((year + 1).toString());
  }, [month, year, LocalMonth, prevYear, nextYear, setYear]);

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log("pressed some", e.currentTarget.value);
    if (e.currentTarget.value !== undefined) {
      if (isNaN(parseInt(e.currentTarget.value))) {
        console.log("month button pressed", e.currentTarget.value);
        // month pressed
        addMonth(e.currentTarget.value);
        setLocalMonth(e.currentTarget.value);
      } else {
        console.log("some year button was pressed");
        // previous year arrow pressed
        if (e.currentTarget.value.toString() === prevYear.toString()) {
          setYear(parseInt(prevYear));
          addMonth(null);

          setLocalMonth(e.currentTarget.value);
        }
        // next year arrow pressed
        if (e.currentTarget.value.toString() === nextYear.toString()) {
          setYear(parseInt(nextYear));
          addMonth(null);
          setLocalMonth(e.currentTarget.value);
        }
      }
    }
    // year pressed
    if (e.currentTarget.value === year?.toString()) {
      console.log("this also ran");
      if (guide === "12") {
        setYear(parseInt("2021"));
        setGuide((parseInt(guide) + 1).toString());
      } else {
        setYear(parseInt(e.currentTarget.value));
        addMonth(null);
      }
    }
  };

  return (
    <div
      data-tooltip={
        guide === "2" ? "This is the datemenu. Here you navigate in your timeline" : null
      }
      className={"datemenu"}
    >
      <ul>
        <button onClick={onClick} className="btn-Datemenu" value={prevYear} name={prevYear}>
          {year === parseInt(prevYear) ? <strong className="text-dark">{`<`}</strong> : `<`}
        </button>
      </ul>
      <ul>
        <button
          onClick={onClick}
          className={
            guide === "3" || guide === "12" ? "btn-Datemenu guide__step3and4" : "btn-Datemenu"
          }
          data-tooltip={guide === "3" || guide === "12" ? "Here you navigate to Year" : null}
          value={year?.toString()}
          name={year?.toString()}
        >
          {LocalMonth && year && LocalMonth.toString() === year.toString() ? (
            <strong className="text-dark">{` ${year}`}</strong>
          ) : (
            ` ${year}`
          )}
        </button>
      </ul>
      <ul>
        <button
          onClick={onClick}
          className={guide === "4" ? "btn-Datemenu guide__step3and4" : "btn-Datemenu"}
          data-tooltip={guide === "4" ? "Here you navigate to Month by pressing any month" : null}
          value="January"
          name="January"
        >
          {LocalMonth === "January" ? <strong className="text-dark">January</strong> : "January"}
        </button>
      </ul>
      <ul>
        <button onClick={onClick} className="btn-Datemenu" value="February" name="February">
          {LocalMonth === "February" ? <strong className="text-dark">February</strong> : "February"}
        </button>
      </ul>
      <ul>
        <button onClick={onClick} className="btn-Datemenu" value="March" name="March">
          {LocalMonth === "March" ? <strong className="text-dark">March</strong> : "March"}
        </button>
      </ul>
      <ul>
        <button onClick={onClick} className="btn-Datemenu" value="April" name="April">
          {LocalMonth === "April" ? <strong className="text-dark">April</strong> : "April"}
        </button>
      </ul>
      <ul>
        <button onClick={onClick} className="btn-Datemenu" value="May" name="May">
          {LocalMonth === "May" ? <strong className="text-dark">May</strong> : "May"}
        </button>
      </ul>
      <ul>
        {" "}
        <button onClick={onClick} className="btn-Datemenu" value="June" name="June">
          {LocalMonth === "June" ? <strong className="text-dark">June</strong> : "June"}
        </button>
      </ul>
      <ul>
        {" "}
        <button onClick={onClick} className="btn-Datemenu" value="July" name="July">
          {LocalMonth === "July" ? <strong className="text-dark">July</strong> : "July"}
        </button>
      </ul>
      <ul>
        {" "}
        <button onClick={onClick} className="btn-Datemenu" value="August" name="August">
          {LocalMonth === "August" ? <strong className="text-dark">August</strong> : "August"}
        </button>
      </ul>
      <ul>
        {" "}
        <button onClick={onClick} className="btn-Datemenu" value="September" name="September">
          {LocalMonth === "September" ? (
            <strong className="text-dark">September</strong>
          ) : (
            "September"
          )}
        </button>
      </ul>
      <ul>
        {" "}
        <button onClick={onClick} className="btn-Datemenu" value="October" name="October">
          {LocalMonth === "October" ? <strong className="text-dark">October</strong> : "October"}
        </button>
      </ul>
      <ul>
        {" "}
        <button onClick={onClick} className="btn-Datemenu" value="November" name="November">
          {LocalMonth === "November" ? <strong className="text-dark">November</strong> : "November"}
        </button>
      </ul>
      <ul>
        {" "}
        <button onClick={onClick} className="btn-Datemenu" value="December" name="December">
          {LocalMonth === "December" ? <strong className="text-dark">December</strong> : "December"}
        </button>
      </ul>
      <ul>
        <button onClick={onClick} className="btn-Datemenu" value={nextYear} name={nextYear}>
          {LocalMonth && nextYear && LocalMonth.toString() === nextYear.toString() ? (
            <strong className="text-dark">{`>`}</strong>
          ) : (
            `>`
          )}
        </button>
      </ul>
    </div>
  );
};
export default DateItemWeb;
