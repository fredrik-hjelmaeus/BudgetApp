import React, { useContext, useEffect, useState, Fragment } from 'react';
import PresetContext from '../../context/preset/presetContext';
import CsvSelectFieldsItem from './CsvSelectFieldsItem';

const SelectCSVfields = () => {
  // context
  const presetContext = useContext(PresetContext);
  const { csvpresets, submitCsvItems, clearCsv } = presetContext;
  console.log(csvpresets);
  // state
  // console.log(csvpresets.map((c) => c));
  // logic
  const onClick = () => {};
  // jsx
  return (
    <Fragment>
      <div id='myModal' className='modal-csvpresets' style={{ display: 'block' }}>
        <div className='modal-csvpresets__card'>
          <h1 className='all-center m-1'>Select CSV fields</h1>
          <p>This app needs the description field and the fields that hold the values</p>

          <CsvSelectFieldsItem rowItem={csvpresets[0]} key={0} header={true} />

          {csvpresets.map((rowItem) => (
            <CsvSelectFieldsItem rowItem={rowItem} key={rowItem.id} />
          ))}

          <button className='btn modal-csvpresets__btn__addtobudget all-center' onClick={onClick}>
            ADD TO BUDGET
          </button>
          <button
            className='btn modal-csvpresets__btn__addtobudget modal-csvpresets__btn__addtobudget__cancel all-center'
            onClick={() => clearCsv()}
          >
            Cancel
          </button>
        </div>
      </div>
    </Fragment>
  );
};
export default SelectCSVfields;
