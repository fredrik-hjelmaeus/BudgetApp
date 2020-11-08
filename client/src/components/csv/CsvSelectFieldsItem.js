import React, { Fragment, useContext, useState, useRef, useEffect } from 'react';
import PresetContext from '../../context/preset/presetContext';
import DeleteButton from '../presets/DeleteButton';
import DropdownMenu from '../presets/DropdownMenu';
import CsvRows from './CsvRows';
const CsvSelectFieldsItem = ({ rowItem }) => {
  //console.log(Object.keys(Item.row));
  //  console.log(Object.entries(row).map((key) => key));
  const presetContext = useContext(PresetContext);
  const { month, year, doSubmitCsv, updateCsvPresets, addPreset, removeCSV } = presetContext;
  const { row } = rowItem;
  console.log(row.length);
  console.log(row);
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
  return (
    <div>
      {row.map((col) => (
        <CsvRows col={col} />
      ))}
    </div>
  );
};
export default CsvSelectFieldsItem;
