import React, { Fragment, useContext, useEffect } from "react";
import PresetForm from "./PresetForm";
import DeletePurchaseModal from "./DeletePurchaseModal";
import AddtoPiggybankModal from "./AddtoPiggybankModal";
import EditPiggybankModal from "./EditPiggybankModal";
import CsvPresetCreateModal from "../csv/CsvPresetCreateModal";
import Datemenu from "../layout/Datemenu";
import PresetContext from "../../context/preset/presetContext";
import GuideContext from "../../context/guide/guideContext";
import CssContext from "../../context/css/cssContext";
import Purchases from "./Purchases";
import MonthSummary from "./MonthSummary";
import CategoryBalance from "./CategoryBalance";
import Sum from "./Sum";
import MonthSavingsSummary from "./MonthSavingsSummary";
import UserProfileModal from "../auth/UserProfileModal";
import SelectFile from "../csv/SelectFile";
import SelectCSVfields from "../csv/SelectCSVfields";
import GuideModal from "../guide/GuideModal";
import EditPreset from "./EditPreset";

const Month = () => {
  const presetContext = useContext(PresetContext);
  const { guide } = useContext(GuideContext);
  const cssContext = useContext(CssContext);
  const { modal, modalprops, dimensions } = cssContext;
  const {
    presets,
    calcSum,
    setPurchase,
    purchases,
    MonthSum,
    calcMonthSum,
    month,
    calcMonthSavings,
    monthsavings,
    getMonthSavings,
    getMonthPiggySavings,
    monthpiggysavings,
    csvpresets,
  } = presetContext;

  useEffect(() => {
    presets && calcSum();
    presets && setPurchase();
    presets && month && calcMonthSum(month);
    presets && calcMonthSavings();
    presets && month && getMonthSavings(month);
    presets && month && getMonthPiggySavings(month);
    // eslint-disable-next-line
  }, [presets, month]);

  return (
    <Fragment>
      {modal === "editpreset" && <EditPreset />}
      {modal === "SelectFile" && <SelectFile />}
      {modal === "SelectCSVfields" && <SelectCSVfields />}
      {modal === "profile" && <UserProfileModal />}
      {csvpresets && modal === "" && <CsvPresetCreateModal />}
      {modal === "deletepurchase" && modalprops && <DeletePurchaseModal Item={modalprops} />}
      {modal === "addtopiggybank" && modalprops && <AddtoPiggybankModal Item={modalprops} />}
      {modal === "editpiggybank" && modalprops && <EditPiggybankModal Item={modalprops} />}
      <Datemenu />
      {guide && ((!isNaN(parseInt(guide)) && parseInt(guide) >= 4) || parseInt(guide) <= 9) && (
        <GuideModal />
      )}
      <div
        className="monthgrid"
        data-tooltip={
          guide === "6" && dimensions.width < 800
            ? "Here you add transactions for this month by giving the name,number and category. Overhead option will add it to your income and expenses"
            : null
        }
      >
        <div
          className="monthgrid__presetformOrder"
          data-tooltip={
            guide === "6" && dimensions.width > 800
              ? "Here you add transactions for this month by giving the name,number and category. Overhead option will add it to your income and expenses"
              : null
          }
        >
          <PresetForm />
        </div>

        <div className="monthgrid__CategoryBalanceOrder">
          <CategoryBalance />
        </div>

        {/*  <div className="monthgrid__PurchasesOrder">{MonthSum !== null && <Purchases />}</div> */}
        <div className="monthgrid__PurchasesOrder">{purchases && <Purchases />}</div>

        <div className="bgmonthright monthgrid__sums">
          <Sum />
          {(monthsavings !== null && <MonthSavingsSummary />) ||
            (monthpiggysavings !== 0 && monthpiggysavings?.length !== 0 && <MonthSavingsSummary />)}
          <MonthSummary />
        </div>
      </div>
    </Fragment>
  );
};

export default Month;
