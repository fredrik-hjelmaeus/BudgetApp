import React from "react";

interface FirstCsvRowProps {
  col: string;
  fieldSelect: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function CsvRows({ col, fieldSelect }: FirstCsvRowProps) {
  return (
    <button className="CsvRows__item" onClick={fieldSelect} value={col}>
      {col}
    </button>
  );
}

export default CsvRows;
