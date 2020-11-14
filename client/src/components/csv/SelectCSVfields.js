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
  // console.log(csvpresets);
  // state
  const [selectPhase, setSelectPhase] = useState('description');
  const [fields, setFields] = useState({ description: '', value: '', category: '' });
  const [phaseInstruction, setPhaseInstruction] = useState('Please select the description field');
  const [newPreset, setNewPreset] = useState({
    id: '',
    name: '',
    number: '',
    category: '',
  });
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
      setSelectPhase('category');
      setPhaseInstruction('If category field exist,please select it. Otherwise,press');
    }
    if (selectPhase === 'category') {
      setFields({ ...fields, category: e.target.value });
      setSelectPhase('completed');
      // Preparing data

      // create new object with the fields we want to update csvpresets with

      csvpresets.map((preset) =>
        updateCsvPresets({
          id: preset.id,
          name: preset.row[fields.description],
          number: preset.row[fields.value],
          category: preset.row[fields.category],
        })
      );
      // console.log(arr);
      /*   newpresets.push({
        number: JSON.stringify(row).split(',')[10],
        name: JSON.stringify(row).split(',')[9],
        id: uuidv4(),
      }) */
      // Moving on to CsvPresetCreateModal / Create Transactions
      toggleModal('');
    }
  };
  const onSkip = () => {
    setSelectPhase('completed');
  };
  //console.log(csvpresets);
  // jsx
  return (
    <Fragment>
      <div id='myModal' className='modal-csvpresets' style={{ display: 'block' }}>
        <div className='modal-csvpresets__card'>
          {/* Title */}
          <h1 className='all-center m-1'>Select CSV fields</h1>
          {/* description/instruction */}
          <p>
            {phaseInstruction}
            {selectPhase === 'category' && (
              <button className='btn' onClick={onSkip}>
                Skip
              </button>
            )}
          </p>

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
