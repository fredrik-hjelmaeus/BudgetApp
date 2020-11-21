import React from 'react';
import CsvRows from './CsvRows';
import FirstCsvRow from './FirstCsvRow';

const CsvSelectFieldsItem = ({ header, rowItem, fieldSelect }) => {
  const { row } = rowItem;

  return (
    <div className='CsvSelectFieldsItem__flexrow'>
      {header
        ? Object.keys(row).map((col) => <FirstCsvRow col={col} fieldSelect={fieldSelect} />)
        : Object.keys(row).map((col) => <CsvRows col={col} row={row} />)}
    </div>
  );
};
export default CsvSelectFieldsItem;
