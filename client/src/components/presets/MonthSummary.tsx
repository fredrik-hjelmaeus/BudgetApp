import React, { useContext, useEffect } from "react";
import PresetContext from "../../context/preset/presetContext";
import PresetFilter from "./PresetFilter";
import PresetNegativeFilter from "./PresetNegativeFilter";
import GuideContext from "../../context/guide/guideContext";

const MonthSummary = () => {
  const presetContext = useContext(PresetContext);
  const { getPresets, presets } = presetContext;
  const { guide } = useContext(GuideContext);
  useEffect(() => {
    // TODO may need to not render on first render
    console.log("monthSummary useEffect here");
    //presets && !guide && getPresets(); // do we need to get presets here?
    !presets && !guide && getPresets(); // TODO: we should only get presets if they are not already loaded ?
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="card_monthright bold">
        <div className="monthsummary__grid-2">
          <div className="grid-2__column">
            <h3 className="all-center text-gray underline">Income</h3>
            <PresetFilter />
          </div>
          <div className="grid-2__column">
            <h3 className="all-center text-gray underline">Expenses</h3>
            <PresetNegativeFilter />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MonthSummary;
