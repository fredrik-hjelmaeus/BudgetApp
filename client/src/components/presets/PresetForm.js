import React, { Fragment, useState, useContext, useEffect, useRef } from 'react';
import PresetContext from '../../context/preset/presetContext';
import AlertContext from '../../context/alert/alertContext';
import CssContext from '../../context/css/cssContext';
import CheckBoxField from './CheckBoxField';
import SelectField from './SelectField';
import Alerts from '../layout/Alerts';

const PresetForm = () => {
  const alertContext = useContext(AlertContext);
  const presetContext = useContext(PresetContext);
  const cssContext = useContext(CssContext);

  const { presets, addPreset, edit, cancelEdit, sendEdit, calcSum, month, year } = presetContext;
  const { setAlert } = alertContext;
  const { toggleModal } = cssContext;

  useEffect(() => {
    if (edit !== null) {
      setPreset(edit);
    } else {
      setPreset({
        name: '',
        number: '',
        month,
        year,
        category,
        type: 'overhead',
        piggybank: [{ month, year, savedAmount: 0 }],
      });
    }
    // eslint-disable-next-line
  }, [edit, month, presets]);

  const [expand, setExpand] = useState(false);

  const [preset, setPreset] = useState(
    {
      name: '',
      number: '',
      month,
      year,
      category: 'Select an category ^',
      type: 'overhead',
      piggybank: [{ month, year, savedAmount: '' }],
    },
    [presetContext, edit]
  );

  const onChange = (e) => {
    setPreset({ ...preset, [e.target.name]: e.target.value });
  };

  const selectChange = (e) => {
    setPreset({ ...preset, category: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (preset.category !== 'Select an category') {
      if (edit === null) {
        addPreset(preset);
        if (preset.name !== '' || preset.number !== '') {
          calcSum();
        }
      } else {
        if (preset.name !== '' || preset.number !== '' || preset.category !== 'Select an category') {
          sendEdit(preset);
          calcSum();
        }
        cancelEdit();
      }
      if (preset.name === '' || preset.number === '') {
        setAlert('Please fill in both fields', 'danger');
        return;
      }

      setPreset({
        name: '',
        number: '',
        month,
        year,
        category,
        type: 'overhead',
      });
    } else {
      setAlert('Please select an category', 'danger');
    }
  };

  const clearAll = () => {
    cancelEdit();
  };

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const { name, number, category } = preset;

  return (
    <Fragment>
      {expand === true && <button className='btn closebtn mt-1' value='close' onClick={toggleExpand}></button>}
      {expand === true && (
        <form onSubmit={onSubmit} className='presetform'>
          <Alerts />
          <h2 className='text-primary all-center presetformtitle'>{edit === null ? 'ADD TO BUDGET' : 'EDIT VALUE'}</h2>
          <span className='presetformspan'>
            <input className='presetformname' type='text' placeholder='Name' name='name' value={name} onChange={onChange} />
            <input className='presetformnumber' type='text' placeholder='Number' name='number' value={number} onChange={onChange} />
          </span>
          <SelectField selectChange={selectChange} category={category} />
          <div className='presetform__optionsfield'>
            <CheckBoxField preset={preset} onChange={onChange} />
            <div>
              <button
                type='button'
                className='btn presetform__upload'
                onClick={() => {
                  toggleModal('SelectFile');
                }}
              >
                {' '}
                Upload CSV-file
              </button>
            </div>
          </div>

          <div>
            <input type='submit' value={edit === null ? 'ADD TO BUDGET' : 'UPDATE'} className='btn btn-presetformadd' />
          </div>
          {edit && (
            <div>
              <button className='btn btn-light btn-block' onClick={clearAll}>
                Cancel Edit
              </button>
            </div>
          )}
        </form>
      )}
      {expand === false && (
        <div className='presetformclosed'>
          <button className='btn btn-presetformadd' onClick={toggleExpand}>
            ADD TO BUDGET
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default PresetForm;
