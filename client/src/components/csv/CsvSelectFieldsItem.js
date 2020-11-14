import React, { Fragment, useContext, useState, useRef, useEffect } from 'react';
import PresetContext from '../../context/preset/presetContext';
import DeleteButton from '../presets/DeleteButton';
import DropdownMenu from '../presets/DropdownMenu';
import CsvRows from './CsvRows';
import FirstCsvRow from './FirstCsvRow';
const CsvSelectFieldsItem = ({ header, rowItem, fieldSelect }) => {
  //console.log(Object.keys(Item.row));
  //  console.log(Object.entries(row).map((key) => key));
  const presetContext = useContext(PresetContext);
  const { month, year, doSubmitCsv, updateCsvPresets, addPreset, removeCSV } = presetContext;
  const { row } = rowItem;
  // console.log(row.length);
  //console.log('rowitem');
  //console.log(Object.keys(row));
  //console.log(Object.keys(row).map((r) => r));
  // console.log(Object.keys(row));
  //console.log(row);
  /*   for (let key in Item) {
    console.log(key);

    console.log(Item[key]);
  } */
  //console.log(Item.map((m) => m));
  /*   const arr = [];
  console.log(row);
  for (let key in row) {
    console.log(key);
    arr.push(
    
        <div>{row[key]}</div>
        <div>{key} </div>
     
    ); */
  // console.log(row[key]);
  //  }
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
    /*     <div className='flexrow__csvrow'>
     {row.map((col) => (
       <CsvRows col={col[1]} />
     ))}
   </div> */
  );
};
export default CsvSelectFieldsItem;
