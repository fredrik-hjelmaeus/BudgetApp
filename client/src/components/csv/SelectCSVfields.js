import React, { useContext, useEffect, useState, Fragment } from 'react';
import PresetContext from '../../context/preset/presetContext';
import CsvSelectFieldsItem from './CsvSelectFieldsItem';
import CssContext from '../../context/css/cssContext';

const SelectCSVfields = () => {
  // context
  const presetContext = useContext(PresetContext);
  const { csvpresets, submitCsvItems, clearCsv, updateCsvPresets } = presetContext;
  const cssContext = useContext(CssContext);
  const { toggleModal } = cssContext;

  // state
  const [selectPhase, setSelectPhase] = useState('description');
  const [fields, setFields] = useState({ description: '', value: '' });
  const [phaseInstruction, setPhaseInstruction] = useState('Please select the description field');

  // logic
  const onClick = () => {};
  // when a field is selected
  const fieldSelect = (e) => {
    if (selectPhase === 'description') {
      setFields({ ...fields, description: e.target.value });
      setSelectPhase('value');
      setPhaseInstruction('Please select the value field');
    }

    if (selectPhase === 'value') {
      setFields({ ...fields, value: e.target.value });
      updateAndExit(e.target.value);
    }
  };

  const updateAndExit = (fieldValue) => {
    // Preparing data
    csvpresets.map((preset) =>
      updateCsvPresets({
        id: preset.id,
        name: preset.row[fields.description],
        number: preset.row[fieldValue],
      })
    );
    // Moving on to CsvPresetCreateModal / Create Transactions
    toggleModal('');
  };

  // jsx
  return (
    <Fragment>
      <div id='myModal' className='modal-csvpresets' style={{ display: 'block' }}>
        <div className='modal-csvpresets__card'>
          {/* Title */}
          <h1 className='all-center m-1'>Select CSV fields</h1>
          {/* description/instruction */}
          <p>{phaseInstruction}</p>

          {/* Header-field constructed from CSV */}
          <CsvSelectFieldsItem rowItem={csvpresets[0]} key={0} header={true} fieldSelect={fieldSelect} />

          {/* csv-list */}
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
