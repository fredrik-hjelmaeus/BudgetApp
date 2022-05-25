import React, { useContext, useEffect, useState } from "react";
import PresetContext from "../../context/preset/presetContext";
import { IPiggybank } from "../../frontend-types/IPiggybank";
import { IPreset } from "../../frontend-types/IPreset";
import MonthSavingsItem from "./MonthSavingsItem";

interface ISavingsItem {
  Item: IPreset;
  SumOfPreset: number;
  key: string | undefined;
}
const MonthSavingsSummary = () => {
  const presetContext = useContext(PresetContext);
  const { presets, monthsavingspresets, setTotalOfAllPiggybanksThisMonth, month, year } =
    presetContext;

  const [localPiggy, setLocalPiggy] = useState<ISavingsItem[]>([]);

  useEffect(() => {
    let monthpurchasewithpiggybank: IPreset[] | null;
    let filteroutbymonth: IPiggybank[][] | null;
    let savedAmounts: Array<number[]> | null;
    let SumOfAllPiggyBanksByMonthByPreset: number[] | null;
    let TotalOfAllPiggybanksThisMonth: number;

    const calcPiggySavings = () => {
      // filters out presets that is type purchase and has piggybank savings
      monthpurchasewithpiggybank =
        presets &&
        presets.filter((preset) => preset.type === "purchase" && preset.piggybank.length !== 0);

      // filters out piggybankvalues made in active month
      filteroutbymonth =
        monthpurchasewithpiggybank &&
        monthpurchasewithpiggybank.map((purchase) =>
          purchase.piggybank.filter(
            (piggybank) =>
              piggybank.month === month &&
              piggybank.savedAmount !== 0 &&
              piggybank.year.toString() === year?.toString()
          )
        );
      //  console.log("filteroutbymonth: ", filteroutbymonth);
      // store only savedAmounts in an array
      savedAmounts =
        filteroutbymonth &&
        filteroutbymonth.map((first) => first.map((second) => second.savedAmount));
      // TODO: savedAmounts occured as strings somewhere, this is a an ugly fix for this.
      const savedAmountsNumbers =
        savedAmounts &&
        savedAmounts?.map((item) =>
          item.map((inner) => (typeof inner === "string" ? parseFloat(inner) : inner))
        );

      // sift through savedAmountsNumbers and count totalsum
      SumOfAllPiggyBanksByMonthByPreset =
        savedAmountsNumbers && savedAmountsNumbers.map((inner) => inner.reduce((a, b) => a + b, 0));
      if (SumOfAllPiggyBanksByMonthByPreset) {
        console.log(SumOfAllPiggyBanksByMonthByPreset);
        const TotalOfAllPiggybanksThisMonth = SumOfAllPiggyBanksByMonthByPreset?.reduce(
          (a, b) => a + b,
          0
        );
        console.log("calculating TotalOfAllPiggybanksThisMonth", TotalOfAllPiggybanksThisMonth);
        return TotalOfAllPiggybanksThisMonth;
      } else return 0;
    };

    const createSavingsItem = () => {
      if (SumOfAllPiggyBanksByMonthByPreset && monthpurchasewithpiggybank) {
        let i;
        let MyArray = [];
        for (i = 0; i < SumOfAllPiggyBanksByMonthByPreset.length; i++) {
          if (SumOfAllPiggyBanksByMonthByPreset[i] > 0) {
            MyArray.push({
              Item: monthpurchasewithpiggybank[i],
              SumOfPreset: SumOfAllPiggyBanksByMonthByPreset[i],
              key: monthpurchasewithpiggybank[i]._id,
            });
          }
        }

        return MyArray;
      }
    };

    if (presets) {
      setTotalOfAllPiggybanksThisMonth(calcPiggySavings());
      // if piggybank deposits have been made in this month, set them in localpiggy state for display.
      const savingsItem = createSavingsItem();
      savingsItem && setLocalPiggy(savingsItem);
    } else setLocalPiggy([]);

    // eslint-disable-next-line
  }, [month, presets, year]);

  // If no piggybankdeposits exist , don't render this component at all
  if (localPiggy || (monthsavingspresets && monthsavingspresets.length > 0)) {
    return (
      <div className="card_monthright_surplussavings bold">
        <div>
          <h3 className="all-center text-gray underline">Month Surplus put to Savings</h3>
        </div>
        {monthsavingspresets?.map((preset) => (
          <MonthSavingsItem Item={preset} SumOfPreset={preset.number} key={preset._id} />
        ))}
        {localPiggy &&
          localPiggy.length !== 0 &&
          localPiggy.map((piggy) => (
            <MonthSavingsItem Item={piggy.Item} SumOfPreset={piggy.SumOfPreset} key={piggy.key} />
          ))}
      </div>
    );
  } else return null;
};
export default MonthSavingsSummary;
