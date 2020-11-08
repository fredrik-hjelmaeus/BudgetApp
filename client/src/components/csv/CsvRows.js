import React from 'react';

function CsvRows({ col }) {
  console.log(col.length);
  return (
    <span>
      {col[0]}
      {'  '} {col[1]}
    </span>
  );
}

export default CsvRows;
