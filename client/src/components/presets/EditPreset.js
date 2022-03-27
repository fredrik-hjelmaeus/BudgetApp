import React, { useState, useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';
import CssContext from '../../context/css/cssContext';
import PresetContext from '../../context/preset/presetContext';
import SelectField from './SelectField';
import CheckBoxField from './CheckBoxField';

import Alerts from '../layout/Alerts';

const EditPreset = () => {
  // Context
  const alertContext = useContext(AlertContext);
  const presetContext = useContext(PresetContext);
  const cssContext = useContext(CssContext);

  const { edit, sendEdit, calcSum, MonthBalance, MonthSum } = presetContext;
  const { setAlert } = alertContext;
  const { toggleModal } = cssContext;
  //State
  const [localPreset, setLocalPreset] = useState({
    _id: edit?._id,
    name: edit?.name,
    number: edit?.number,
    month: edit?.month,
    type: edit?.type,
    category: edit?.category,
    piggybank: edit?.piggybank,
  });
  const { name, number, type, category, piggybank } = localPreset;

  // Logic
  const onChange = (e) => {
    setLocalPreset({ ...localPreset, [e.target.name]: e.target.value });
  };

  const selectChange = (e) => {
    setLocalPreset({ ...localPreset, category: e.target.value });
  };

  const onSubmitEditPreset = (e) => {
    e.preventDefault();
    // client side field validation
    if (type === 'savings' && number > MonthSum) {
      setAlert('Insufficient Month Surplus for this saving number', 'danger');
      return;
    }
    if (name === '' || number === '') {
      setAlert('Name and Number is required fields', 'danger');
      return;
    }
    if (category === 'Select an category') {
      setAlert('You need to provide an category', 'danger');
      return;
    }

    sendEdit(localPreset);
    calcSum();
    toggleModal('');
  };

  const onClick = (e) => {
    toggleModal('');
  };

  return (
    <div id='myModal' className='modal-register' style={{ display: 'block' }}>
      <div className='modal-content-register' style={{ height: 'auto' }}>
        <span>
          <button className='closebtn' value='close' onClick={onClick}></button>
        </span>

        <div className='modalloginheader'>
          <h1>Edit</h1>
        </div>

        <div className='form-container'>
          <Alerts />
          <form onSubmit={onSubmitEditPreset}>
            <div className='flexrow'>
              <div>
                <label className='form-text label' htmlFor='name'>
                  Name:
                </label>
              </div>
              <div className='form-text'>
                <input type='name' id='name' placeholder='Name' name='name' value={name} onChange={onChange} required />
              </div>
            </div>

            <div className='flexrow '>
              <div>
                <label className='form-text label' htmlFor='Number'>
                  Number
                </label>
              </div>
              <div className='form-text'>
                <input type='number' id='Number' placeholder='Number' name='number' value={number} onChange={onChange} required />
              </div>
            </div>
            <SelectField selectChange={selectChange} category={category} />
            <CheckBoxField preset={localPreset} onChange={onChange} />
            <button type='submit' className='btn btn-dark btn-block my-1' value='register'>
              Update
            </button>
          </form>
          <button onClick={onClick} className='btn btn-block my-1' value='close'>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPreset;
