import React from "react";
import { ICsvPreset } from "../../../../middleware/ICsvPreset";
import CsvRows from "./CsvRows";
import FirstCsvRow from "./FirstCsvRow";

interface SelectCSVfieldsProps {
  header: boolean;
  rowItem: ICsvPreset;
  fieldSelect?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SelectCSVfieldsItem = ({ header, rowItem, fieldSelect }: SelectCSVfieldsProps) => {
  const { row } = rowItem; // rowItem is the csvpreset

  return (
    <>
      {row && (
        <div className="CsvSelectFieldsItem__flexrow">
          {header && fieldSelect
            ? Object.keys(row).map((col) => <FirstCsvRow col={col} fieldSelect={fieldSelect} />)
            : Object.keys(row).map((col) => <CsvRows col={col} row={row} />)}
        </div>
      )}
    </>
  );
};
export default SelectCSVfieldsItem;
