import React, { Fragment, useContext, useEffect } from "react";
import PresetContext from "../../context/preset/presetContext";

const Sum = () => {
  const presetContext = useContext(PresetContext);

  const {
    month,
    presets,
    calcPosMonth,
    calcNegMonth,
    filteredmonthandposnum,
    filteredmonthandnegnum,
    monthsavings,
    MonthSum,
    sum,
    SumPiggybanksMonth,
    MonthBalance,
    calcMonthBalance,
    calcSum,
    PosMonthSum,
    NegMonthSum,
  } = presetContext;

  useEffect(() => {
    if (
      month !== null &&
      presets !== null &&
      filteredmonthandposnum !== null &&
      filteredmonthandnegnum !== null
    ) {
      calcPosMonth();
      calcNegMonth();
      calcMonthBalance();
      calcSum();
    } // eslint-disable-next-line
  }, [
    month,
    presets,
    filteredmonthandposnum,
    filteredmonthandnegnum,
    monthsavings,
    MonthSum,
    SumPiggybanksMonth,
  ]);

  return (
    <Fragment>
      <div className="card_top_monthright bold Sum__grid no-wrap">
        {/* Income Month */}
        <div className="text-gray">
          Month Income:{"    "}
          <span className={PosMonthSum && PosMonthSum > 0 ? "text-success " : "text-gray "}>
            {PosMonthSum}
          </span>
        </div>
        {/* Surplus Month */}
        <div>
          <span className={MonthSum && MonthSum > 0 ? "text-primary" : "text-primary"}>
            {MonthSum && MonthSum > 0 ? "Month Surplus:" : "Balance Month:"}
          </span>
          <span className={MonthSum && MonthSum > 0 ? "text-success" : "text-danger"}>
            {presetContext.MonthSum}
          </span>
        </div>
        {/* Expenses Month */}
        <div className="text-gray">
          Month Expenses:{"    "}
          <span className={NegMonthSum && NegMonthSum > 0 ? "text-success" : "text-danger"}>
            {presetContext.NegMonthSum}
          </span>
        </div>
        {/* Account Balance */}
        <div className="text-gray">
          Account Balance:
          <span className={sum && sum > 0 ? "text-success" : "text-danger"}>{sum} </span>
        </div>
        {/* Month Balance */}
        <div>
          Month Balance:
          <span className={MonthBalance && MonthBalance > 0 ? "text-success" : "text-danger"}>
            {MonthBalance}
          </span>
        </div>
        {/*  Savings Month*/}
        <div>
          Month Savings:
          <span className={"text-orange"}>
            {" "}
            {monthsavings && monthsavings + SumPiggybanksMonth}
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default Sum;
