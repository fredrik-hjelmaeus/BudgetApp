import React from 'react';

function CsvRows({ col }) {
  return (
    <button className=' csvrows__flex'>
      {col}
      {/*  {col[1]} */}
    </button>
  );
}

export default CsvRows;
