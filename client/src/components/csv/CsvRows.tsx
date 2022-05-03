import React from 'react';

function CsvRows({ col, row }) {
  return <button className=' CsvRows__item'>{row[col]}</button>;
}

export default CsvRows;
