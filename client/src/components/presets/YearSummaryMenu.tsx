import React, { useContext } from "react";
import CssContext from "../../context/css/cssContext";
import GuideContext from "../../context/guide/guideContext";

const YearSummaryMenu = () => {
  const cssContext = useContext(CssContext);
  const { yearsummary, setYearSummary, dimensions } = cssContext;
  const { guide } = useContext(GuideContext);

  React.useEffect(() => {
    guide === "2" && setYearSummary("balance");
    guide === "3" && setYearSummary("balance");
    guide === "13" && setYearSummary("balance");
    guide === "14" && setYearSummary("expense");
    guide === "15" && setYearSummary("income");
    guide === "16" && setYearSummary("savings");
    //eslint-disable-next-line
  }, [guide]);

  // sets css color when button is pressed and creates class for unselected that is used in css to hide buttons that ar not active in mobile-size
  const textcolor = (input: string) => (yearsummary === input ? `text-dark` : `text-gray ${input}`);

  // sets contextvariable setYearSummary so right grid on year is switched
  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const castTarget = e.target as HTMLButtonElement;
    setYearSummary(castTarget.value);
  };

  return (
    <div className="yearbalance__container card bg-light yearSummaryMenu ">
      <span className={guide === "13" ? "guide__expense" : undefined}>
        <button value="balance" onClick={onClick} className={textcolor("balance")}>
          01.
        </button>
        <button
          value="balance"
          onClick={onClick}
          className={textcolor("balance")}
          data-tooltip={guide === "13" && dimensions.width > 800 ? "Balance Summary" : null}
        >
          Balance Summary: Presented in barchart representing month surplus.
        </button>
      </span>
      <span className={guide === "14" ? "guide__expense" : undefined}>
        <button value="expense" onClick={onClick} className={textcolor("expense")}>
          02.
        </button>

        <button
          value="expense"
          onClick={onClick}
          className={textcolor("expense")}
          data-tooltip={
            guide === "14" && dimensions.width > 800
              ? "To get to Expense Summary you press here"
              : null
          }
        >
          Expense Summary: Presented in donut-chart representing spending by category
        </button>
      </span>
      <span className={guide === "15" ? "guide__expense" : undefined}>
        <button value="income" onClick={onClick} className={textcolor("income")}>
          03.
        </button>

        <button
          value="income"
          onClick={onClick}
          className={textcolor("income")}
          data-tooltip={
            guide === "15" && dimensions.width > 800
              ? "To get to Income Summary you press here"
              : null
          }
        >
          Income Summary: Presented in donut-chart representing spending by category
        </button>
      </span>
      <span className={guide === "16" ? "guide__expense" : undefined}>
        <button value="savings" onClick={onClick} className={textcolor("savings")}>
          04.
        </button>

        <button
          value="savings"
          onClick={onClick}
          className={textcolor("savings")}
          data-tooltip={
            guide === "16" && dimensions.width > 800
              ? "To get to Savings Summary you press here"
              : null
          }
        >
          Savings Summary
        </button>
      </span>

      {/*Mobile Buttons */}
      <div className="YearSummaryMenuMinimizedButtonsContainer">
        <div className="YearSummaryMenuMinimizedButtons">
          <button
            value="balance"
            className="YearSummaryMinimizedButtonRectangle"
            style={
              yearsummary === "balance"
                ? { backgroundColor: "#000000" }
                : { backgroundColor: "#8c8c8c" }
            }
            onClick={onClick}
          ></button>
          <button
            value="expense"
            className="YearSummaryMinimizedButtonRectangle"
            style={
              yearsummary === "expense"
                ? { backgroundColor: "#000000" }
                : { backgroundColor: "#8c8c8c" }
            }
            onClick={onClick}
          ></button>
          <button
            value="income"
            className="YearSummaryMinimizedButtonRectangle"
            style={
              yearsummary === "income"
                ? { backgroundColor: "#000000" }
                : { backgroundColor: "#8c8c8c" }
            }
            onClick={onClick}
          ></button>
          <button
            value="savings"
            className="YearSummaryMinimizedButtonRectangle"
            style={
              yearsummary === "savings"
                ? { backgroundColor: "#000000" }
                : { backgroundColor: "#8c8c8c" }
            }
            onClick={onClick}
          ></button>
        </div>
      </div>
    </div>
  );
};
export default YearSummaryMenu;
