import React, { useContext } from "react";
import DonutChart from "../layout/DonutChart";
import PresetContext from "../../context/preset/presetContext";
import GuideContext from "../../context/guide/guideContext";
import CssContext from "../../context/css/cssContext";
import Scroll from "react-scroll";

const Expense = () => {
  const presetContext = useContext(PresetContext);
  const { categorysumonlynegnumbyyear, categorynameonlynegnumbyyear } = presetContext;
  const { dimensions } = useContext(CssContext);
  const YearExpense =
    categorysumonlynegnumbyyear && categorysumonlynegnumbyyear.reduce((a, b) => a + b, 0);
  //colors set here so expense and income can have different colors in their chart
  const colors = [
    "#67b7dc",
    "#6794dc",
    "#6771dc",
    "#8067dc",
    "#a367dc",
    "#c767dc",
    "#dc67ce",
    "#dc67ab",
    "#dc6788",
    "#ec5362",
    "#ef4141",
    "#ef6a41",
    "#ef8741",
    "#f2ae4e",
    "#f6e365",
    "#abd951",
    "#9ded76",
    "#9ded77",
    "#76ed98",
    "#76edc2",
    "#67cec3",
    "#6ec5d2",
  ];
  const yearmonthavg = YearExpense !== undefined && YearExpense && YearExpense / 12.0;

  // Scroll for guide
  const { guide } = useContext(GuideContext);
  const scroller = Scroll.scroller;
  const Element = Scroll.Element;

  const scrollToElement = () => {
    scroller.scrollTo("myScrollToElement", {
      duration: 1500,
      delay: 100,
      smooth: true,
    });
  };

  React.useEffect(() => {
    if (guide === "14" && dimensions.width > 800) {
      scrollToElement();
    }
    //eslint-disable-next-line
  }, [guide, dimensions]);

  return (
    <div>
      <Element name="myScrollToElement"></Element>
      <div className={guide === "14" ? "expense__card guide__expense__card" : "expense__card"}>
        {categorysumonlynegnumbyyear && categorynameonlynegnumbyyear && (
          <div style={{ margin: "0 0 1rem 0" }}>
            <DonutChart
              sums={categorysumonlynegnumbyyear}
              names={categorynameonlynegnumbyyear}
              colors={colors}
            />
          </div>
        )}
        <div className="donuttitle">Expenses</div>
        <div className="flexrow">
          <div className="flexcolumn">
            <ul className="flexrow">
              <li>Year Expenses: </li>
              <li className={"text-danger px"}>{YearExpense}</li>
            </ul>
            <ul className="flexrow">
              <li>Monthly Average: </li>
              <li className={"text-danger px"}>{yearmonthavg}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Expense;
