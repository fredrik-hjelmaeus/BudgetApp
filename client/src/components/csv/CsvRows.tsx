import React from "react";

interface CsvRowsProps {
  col: string;
  row: string;
}

function CsvRows({ col, row }: CsvRowsProps) {
  return <button className=" CsvRows__item">{row[parseInt(col)]}</button>;
}

export default CsvRows;
