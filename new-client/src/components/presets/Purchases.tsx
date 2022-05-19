import React, { useContext, useEffect } from "react";
import PurchaseItem from "./PurchaseItem";
import PresetContext from "../../context/preset/presetContext";
import GuideContext from "../../context/guide/guideContext";

const Purchases = () => {
  const presetContext = useContext(PresetContext);
  const { purchases, sendEdit, presets, calcMonthBalance, MonthBalance, piggybanks } =
    presetContext;
  const { guide } = useContext(GuideContext);

  useEffect(() => {
    MonthBalance === null || (piggybanks === [] && calcMonthBalance());
  }, [sendEdit, presets, calcMonthBalance, MonthBalance, piggybanks]);

  return (
    <div
      className={
        guide === "11" ? "purchase__month__field guide__purchases" : "purchase__month__field"
      }
      data-tooltip={guide === "11" ? "Purchases" : null}
    >
      <h4 className="all-center text-gray">Purchases</h4>

      {purchases && purchases.map((Item) => <PurchaseItem Item={Item} key={Item.id} />)}
    </div>
  );
};
export default Purchases;
