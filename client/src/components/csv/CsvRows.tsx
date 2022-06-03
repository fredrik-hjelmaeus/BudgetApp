import React from "react";

interface CsvRowsProps {
  col: string;
  row: object | string;
}

function CsvRows({ col, row }: CsvRowsProps) {
  return typeof row === "object" ? (
    <button className=" CsvRows__item">{row[col as keyof typeof row]}</button>
  ) : (
    <button className=" CsvRows__item">{row}</button>
  );
}

export default CsvRows;
