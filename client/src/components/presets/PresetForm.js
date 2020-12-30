import React, { Fragment, useState, useContext, useEffect, useRef } from 'react';
import PresetContext from '../../context/preset/presetContext';
import GuideContext from '../../context/guide/guideContext';
import AlertContext from '../../context/alert/alertContext';
import CssContext from '../../context/css/cssContext';
import CheckBoxField from './CheckBoxField';
import SelectField from './SelectField';
import Alerts from '../layout/Alerts';

const PresetForm = () => {
  const alertContext = useContext(AlertContext);
  const presetContext = useContext(PresetContext);
  const cssContext = useContext(CssContext);
  const guideContext = useContext(GuideContext);

  const { guide } = guideContext;
  const { presets, addPreset, edit, cancelEdit, sendEdit, calcSum, month, year } = presetContext;
  const { setAlert } = alertContext;
  const { toggleModal } = cssContext;

  useEffect(() => {
    if (edit !== null) {
      setPreset(edit);
    } else {
      if (guide !== '8' && guide !== '9' && guide !== '10') {
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
    }
    // eslint-disable-next-line
  }, [edit, month, presets]);

  // expands the budget tab for the guide
  useEffect(() => {
    !isNaN(guide) && parseInt(guide) >= 6 && parseInt(guide) <= 11 && setExpand(true);
    guide === '8' && setPreset({ ...preset, type: 'capital' });
    guide === '9' && setPreset({ ...preset, type: 'savings' });
    guide === '10' && setPreset({ ...preset, type: 'purchase' });
  }, [guide]);

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
        <form
          onSubmit={onSubmit}
          className={!isNaN(guide) && parseInt(guide) >= 6 && parseInt(guide) < 12 ? 'presetform guide__presetform' : 'presetform'}
        >
          <Alerts />
          <h2 className='text-primary all-center presetformtitle'>{edit === null ? 'ADD TO BUDGET' : 'EDIT VALUE'}</h2>
          <span className='presetformspan'>
            <input
              className={guide === '6' ? 'presetformname guide__presetformname' : 'presetformname'}
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={onChange}
            />
            <input
              className={guide === '6' ? 'presetformnumber guide__presetformnumber' : 'presetformnumber'}
              type='text'
              placeholder='Number'
              name='number'
              value={number}
              onChange={onChange}
            />
          </span>
          <SelectField guide={guide} selectChange={selectChange} category={category} />
          <div
            className='presetform__optionsfield'
            data-tooltip={
              guide === '8'
                ? 'To add initial capital to your account, you select capital here. This will be added to your account balance and year summary'
                : guide === '9'
                ? 'To add savings from your month surplus, you select savings'
                : guide === '10'
                ? 'To setup a purchase plan you select purchase here and fill in the cost of the purchase in Number field.'
                : null
            }
          >
            <CheckBoxField guide={guide} preset={preset} onChange={onChange} />
            <div>
              <button
                data-tooltip={guide === '7' ? 'You can also upload month-transactions from a file' : null}
                type='button'
                className={guide === '7' ? 'btn presetform__upload' : 'btn presetform__upload'}
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
        <div className={guide === '5' ? 'presetformclosed guide__presetformclosed' : 'presetformclosed'}>
          <button
            className='btn btn-presetformadd'
            onClick={toggleExpand}
            data-tooltip={guide === '5' ? 'To open add to budget you click here' : null}
          >
            ADD TO BUDGET
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default PresetForm;
