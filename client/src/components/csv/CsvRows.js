import React from 'react';

function CsvRows({ col, row }) {
  return <button className=' csvrows__flex'>{row[col]}</button>;
}

export default CsvRows;
