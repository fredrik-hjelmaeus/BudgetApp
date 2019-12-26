import React, { useContext } from 'react';
import PresetContext from '../../context/preset/presetContext';
import SumByCategoryItem from './SumByCategoryItem';
const YearCategoryBalance = () => {
  const presetContext = useContext(PresetContext);
  const { categoryyearsum } = presetContext;
  return (
    <div>
      YearCategoryBalance
      {categoryyearsum.map(catsumitem => (
        <SumByCategoryItem catsumitem={catsumitem} key={catsumitem.id} />
      ))}
    </div>
  );
};
export default YearCategoryBalance;
