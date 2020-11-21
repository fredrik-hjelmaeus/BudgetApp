import React from 'react';

function CsvRows({ col, fieldSelect }) {
  return (
    <button className='CsvRows__item' onClick={fieldSelect} value={col}>
      {col}
    </button>
  );
}

export default CsvRows;
