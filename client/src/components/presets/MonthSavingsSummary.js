import React, { useContext, useEffect, useState } from 'react';
import PresetContext from '../../context/preset/presetContext';
import MonthSavingsItem from './MonthSavingsItem';

const MonthSavingsSummary = () => {
  const presetContext = useContext(PresetContext);
  const {
    presets,
    monthsavingspresets,
    setTotalOfAllPiggybanksThisMonth,
    month,
    year,
  } = presetContext;

  const [localPiggy, setLocalPiggy] = useState(null);

  useEffect(() => {
    let monthpurchasewithpiggybank;
    let filteroutbymonth;
    let savedAmounts;
    let SumOfAllPiggyBanksByMonthByPreset;
    let TotalOfAllPiggybanksThisMonth;

    const calcPiggySavings = () => {
      // filters out presets that is type purchase and has piggybank savings
      monthpurchasewithpiggybank = presets.filter(
        (preset) => preset.type === 'purchase' && preset.piggybank.length !== 0
      );

      // filters out piggybankvalues made in active month
      filteroutbymonth = monthpurchasewithpiggybank.map((purchase) =>
        purchase.piggybank.filter(
          (piggybank) =>
            piggybank.month === presetContext.month &&
            piggybank.savedAmount !== 0 &&
            piggybank.year.toString() === presetContext.year.toString()
        )
      );

      // store only savedAmounts in an array
      savedAmounts = filteroutbymonth.map((first) =>
        first.map((second) => second.savedAmount)
      );
      // sift through savedAmounts and count totalsum
      SumOfAllPiggyBanksByMonthByPreset = savedAmounts.map((inner) =>
        inner.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
      );
      TotalOfAllPiggybanksThisMonth = SumOfAllPiggyBanksByMonthByPreset.reduce(
        (a, b) => parseFloat(a) + parseFloat(b),
        0
      );
    };
    if (presets) {
      calcPiggySavings();
    }
    const createSavingsItem = () => {
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
    };

    if (presets) {
      setLocalPiggy(createSavingsItem());
    }
    TotalOfAllPiggybanksThisMonth &&
      TotalOfAllPiggybanksThisMonth !== 0 &&
      setTotalOfAllPiggybanksThisMonth(TotalOfAllPiggybanksThisMonth);
    // eslint-disable-next-line
  }, [month, presets, year]);

  // If no piggybankdeposit exist the total will be zero. If that is the case, don't render this component at all
  if (localPiggy || (monthsavingspresets && monthsavingspresets.length > 0)) {
    return (
      <div className='card_monthright_surplussavings bold'>
        <div>
          <h3 className='all-center text-gray underline'>
            Month Surplus put to Savings
          </h3>
        </div>
        {monthsavingspresets.map((preset) => (
          <MonthSavingsItem
            Item={preset}
            SumOfPreset={preset.number}
            key={preset._id}
          />
        ))}
        {localPiggy &&
          localPiggy.length !== 0 &&
          localPiggy.map((piggy) => (
            <MonthSavingsItem
              Item={piggy.Item}
              SumOfPreset={piggy.SumOfPreset}
              key={piggy._id}
            />
          ))}
      </div>
    );
  } else return null;
};
export default MonthSavingsSummary;
