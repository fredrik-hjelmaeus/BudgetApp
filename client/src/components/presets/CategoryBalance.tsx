import React, { useEffect, useContext } from "react";
import PresetContext from "../../context/preset/presetContext";
import SumByCategoryItem from "./SumByCategoryItem";

const CategoryBalance = () => {
  const presetContext = useContext(PresetContext);

  const { month, categorymonthsum, presets, calcCategoryByMonth, year } = presetContext;

  useEffect(() => {
    if (month !== null && presets !== null) {
      calcCategoryByMonth(month);
    } // eslint-disable-next-line
  }, [month, presets, year]);

  return (
    <div className="categorybalance">
      <h4 className="all-center text-gray">Balance By Category</h4>
      {categorymonthsum &&
        categorymonthsum.map((catsumitem) => (
          <SumByCategoryItem catsumitem={catsumitem} key={catsumitem.id} />
        ))}
    </div>
  );
};
export default CategoryBalance;
