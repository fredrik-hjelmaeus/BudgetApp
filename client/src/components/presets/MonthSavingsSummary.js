import React, { useContext, useEffect } from 'react';
import PresetContext from '../../context/preset/presetContext';
import MonthSavingsItem from './MonthSavingsItem';

const MonthSavingsSummary = () => {
  const presetContext = useContext(PresetContext);
  const {
    presets,
    monthsavingspresets,
    setTotalOfAllPiggybanksThisMonth,
    month
  } = presetContext;

  // filters out presets that is type purchase and has piggybank savings
  const monthpurchasewithpiggybank = presets.filter(
    preset => preset.type === 'purchase' && preset.piggybank.length !== 0
  );

  // filters out piggybankvalues made in active month
  const filteroutbymonth = monthpurchasewithpiggybank.map(purchase =>
    purchase.piggybank.filter(
      piggybank =>
        piggybank.month === presetContext.month && piggybank.savedAmount !== 0
    )
  );

  // store only savedAmounts in an array
  const savedAmounts = filteroutbymonth.map(first =>
    first.map(second => second.savedAmount)
  );
  // sift through savedAmounts and count totalsum
  const SumOfAllPiggyBanksByMonthByPreset = savedAmounts.map(inner =>
    inner.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
  );
  const TotalOfAllPiggybanksThisMonth = SumOfAllPiggyBanksByMonthByPreset.reduce(
    (a, b) => parseFloat(a) + parseFloat(b),
    0
  );

  useEffect(() => {
    setTotalOfAllPiggybanksThisMonth(TotalOfAllPiggybanksThisMonth);
    // eslint-disable-next-line
  }, [month, presets]);

  const createSavingsItem = () => {
    let i;
    let MyArray = [];
    for (i = 0; i < SumOfAllPiggyBanksByMonthByPreset.length; i++) {
      if (SumOfAllPiggyBanksByMonthByPreset[i] > 0) {
        MyArray.push(
          <MonthSavingsItem
            Item={monthpurchasewithpiggybank[i]}
            SumOfPreset={SumOfAllPiggyBanksByMonthByPreset[i]}
            key={monthpurchasewithpiggybank[i]._id}
          />
        );
      }
    }
    monthsavingspresets.map(preset =>
      MyArray.push(
        <MonthSavingsItem
          Item={preset}
          SumOfPreset={preset.number}
          key={preset._id}
        />
      )
    );
    return MyArray.map(Item => Item);
  };

  // If no piggybankdeposit exist the total will be zero. If that is the case, don't render this component at all
  if (
    TotalOfAllPiggybanksThisMonth !== 0 ||
    (monthsavingspresets && monthsavingspresets.length > 0)
  ) {
    return (
      <div className='card_monthright_surplussavings bold'>
        <div>
          <h3 className='all-center text-gray underline'>
            Month Surplus put to Savings
          </h3>
        </div>
        {SumOfAllPiggyBanksByMonthByPreset !== undefined && createSavingsItem()}
      </div>
    );
  } else return null;
};
export default MonthSavingsSummary;
