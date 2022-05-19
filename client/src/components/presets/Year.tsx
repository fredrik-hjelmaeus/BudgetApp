import React, { Fragment, useContext, useEffect } from "react";
import Datemenu from "../layout/Datemenu";
import PresetContext from "../../context/preset/presetContext";
import CssContext from "../../context/css/cssContext";
import GuideContext from "../../context/guide/guideContext";
import AuthContext from "../../context/auth/authContext";
import Savings from "./Savings";
import YearBalance from "./YearBalance";
import Expense from "./Expense";
import Income from "./Income";
import YearCategoryBalance from "./YearCategoryBalance";
import YearSummaryMenu from "./YearSummaryMenu";
import YearTitle from "./YearTitle";
import GuideModal from "../guide/GuideModal";
import UserProfileModal from "../auth/UserProfileModal";
import YearSwiper from "../layout/YearSwiper";

const Year = () => {
  const presetContext = useContext(PresetContext);
  const cssContext = useContext(CssContext);
  const guideContext = useContext(GuideContext);
  const authContext = useContext(AuthContext);

  const {
    getPresets,
    year,
    presets,
    calcCategoryByYear,
    calcYearsum,
    calcSavings,
    calcCapital,
    setCategoryNameOnlyPosNumByYear,
    calcCategorySumOnlyPosNumByYear,
    calcCategorySumOnlyNegNumByYear,
    setCategoryNameOnlyNegNumByYear,
    calcAllMonthSum,
  } = presetContext;

  const { setYearSummary, yearsummary, dimensions, modal } = cssContext;
  const { setGuide, guide, exitedguide } = guideContext;

  // loads presets from database when year-variable is updated
  useEffect(() => {
    console.log("year useEffect here");
    !guide && authContext.token && getPresets();
    // eslint-disable-next-line
  }, [year]);

  // calculates initial account balance if and when presets is defined.
  useEffect(() => {
    presets && presets.length === 0 && !exitedguide && !guide && setGuide("1");
    presets && presetContext.calcSum();
    presets && calcCategoryByYear();
    presets && year === null && calcYearsum(2019);
    presets && year !== null && calcYearsum(year);
    presets && calcSavings();
    presets && calcCapital();
    presets && setCategoryNameOnlyPosNumByYear();
    presets && calcCategorySumOnlyPosNumByYear();
    presets && calcCategorySumOnlyNegNumByYear();
    presets && setCategoryNameOnlyNegNumByYear();
    presets &&
      calcAllMonthSum([
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ]);

    // eslint-disable-next-line
  }, [presets, year]);

  return (
    <Fragment>
      {modal === "profile" && <UserProfileModal />}
      <Datemenu />
      {guide && <GuideModal />}

      <div className="grid-2">
        <div className="container">
          <YearTitle />
          {dimensions.width > 700 && <YearSummaryMenu />}
        </div>
        <div className="year-bg">
          {dimensions.width < 800 && guide && (
            <YearSwiper guide={guide} setYearSummary={setYearSummary} yearsummary={yearsummary} />
          )}
          {dimensions.width > 800 && yearsummary === "savings" && <Savings />}
          {dimensions.width > 800 && yearsummary === "expense" && <Expense />}
          {dimensions.width > 800 && yearsummary === "balance" && <YearBalance />}
          {dimensions.width > 800 && yearsummary === "category" && <YearCategoryBalance />}
          {dimensions.width > 800 && yearsummary === "income" && <Income />}
        </div>
        {dimensions.width < 800 && <YearSummaryMenu />}
      </div>
    </Fragment>
  );
};

export default Year;
