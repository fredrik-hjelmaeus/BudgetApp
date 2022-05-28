import React from "react";
import { ICategoryAndSumItem } from "../../frontend-types/ICategoryAndSumItem";

const SumByCategoryItem = ({ catsumitem }: { catsumitem: ICategoryAndSumItem }) => {
  return (
    <div className="card-categorybalance bg-white">
      <span className="text-gray items-categorybalance">
        {catsumitem.cat}:
        <div
          className={
            catsumitem.SumOfCat > 0
              ? "text-success numberitem-categorybalance"
              : "text-danger numberitem-categorybalance"
          }
        >
          {catsumitem.SumOfCat}
        </div>
      </span>
    </div>
  );
};

export default SumByCategoryItem;
