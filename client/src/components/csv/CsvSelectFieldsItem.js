import React from 'react';
import CsvRows from './CsvRows';
import FirstCsvRow from './FirstCsvRow';

const CsvSelectFieldsItem = ({ header, rowItem, fieldSelect }) => {
  const { row } = rowItem;

  return header ? (
    <React.Fragment>
      <div className='flexrow__csvrow'>
        {Object.keys(row).map((col) => (
          <FirstCsvRow col={col} fieldSelect={fieldSelect} />
        ))}
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <div className='flexrow__csvrow'>
        {Object.keys(row).map((col) => (
          <CsvRows col={col} row={row} />
        ))}
      </div>
    </React.Fragment>
  );
};
export default CsvSelectFieldsItem;
