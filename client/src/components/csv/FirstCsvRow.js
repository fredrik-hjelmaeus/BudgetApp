import React from 'react';

function CsvRows({ col, fieldSelect }) {
  return (
    <button className='csvrows__flex' onClick={fieldSelect} value={col}>
      {col}
      {/*  {col[1]} */}
    </button>
  );
}

export default CsvRows;
