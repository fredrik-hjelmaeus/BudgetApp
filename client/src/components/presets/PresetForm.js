import React, { useState, useContext, useEffect } from 'react';
import PresetContext from '../../context/preset/presetContext';
import AlertContext from '../../context/alert/alertContext';

const PresetForm = () => {
  const alertContext = useContext(AlertContext);
  const presetContext = useContext(PresetContext);

  const {
    presets,
    addPreset,
    edit,
    cancelEdit,
    sendEdit,
    calcSum,
    month
  } = presetContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (edit !== null) {
      setPreset(edit);
    } else {
      setPreset({
        name: '',
        number: '',
        month,
        category,
        type: 'overhead'
      });
    } // eslint-disable-next-line
  }, [edit, month, presets]);

  const [preset, setPreset] = useState(
    {
      name: '',
      number: '',
      month,
      category: 'Commute',
      type: 'overhead'
    },
    [presetContext, edit]
  );
  const selectChange = e => {
    setPreset({ ...preset, category: e.target.value });
  };
  const onChange = e => {
    setPreset({ ...preset, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (edit === null) {
      addPreset(preset);
      if (preset.name !== '' || preset.number !== '') {
        calcSum(preset.id, preset.number, 'add');
      }
    } else {
      if (preset.name !== '' || preset.number !== '') {
        sendEdit(preset);
      }
      cancelEdit();
    }
    if (preset.name === '' || preset.number === '') {
      setAlert('Please fill in both fields', 'danger');
    }
    setPreset({
      name: '',
      number: '',
      month,
      category,
      type: 'overhead'
    });
  };

  const clearAll = () => {
    cancelEdit();
  };

  const { name, number, category } = preset;
  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {edit === null ? 'Add to budget' : 'Edit Value'}
      </h2>
      <input
        type='text'
        placeholder='name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='number'
        name='number'
        value={number}
        onChange={onChange}
      />
      <h5>Add to</h5>
      <input
        type='radio'
        name='type'
        value='overhead'
        checked={preset.type === 'overhead'}
        onChange={onChange}
      />{' '}
      Overhead{' '}
      <input
        type='radio'
        name='type'
        value='purchase'
        checked={preset.type === 'purchase'}
        onChange={onChange}
      />{' '}
      Purchase{' '}
      <input
        type='radio'
        name='type'
        value='savings'
        checked={preset.type === 'savings'}
        onChange={onChange}
      />{' '}
      Savings
      <input
        type='radio'
        name='type'
        value='capital'
        checked={preset.type === 'capital'}
        onChange={onChange}
      />{' '}
      Capital
      <span>
        <select onChange={selectChange}>
          <option name='Commute' value='Commute'>
            Commute
          </option>
          <option name='Car' value='Car'>
            Car
          </option>
          <option name='Travel' value='Travel'>
            Travel
          </option>
          <option name='Food' value='Food'>
            Food
          </option>
          <option name='Housing' value='Housing'>
            Housing
          </option>
          <option name='Insurance' value='Insurance'>
            Insurance
          </option>
          <option name='Child benefit' value='Child benefit'>
            Child benefit
          </option>
          <option name='Childcare' value='Childcare'>
            Childcare
          </option>
          <option name='Salary' value='Salary'>
            Salary
          </option>
          <option name='Sport Activities' value='Sport Activities'>
            Sport Activities
          </option>
          <option name='Clothing' value='Clothing'>
            Clothing
          </option>
          <option
            name='Entertainment Electronics'
            value='Entertainment Electronics'
          >
            Entertainment Electronics
          </option>
          <option
            name='Entertainment Subscriptions'
            value='Entertainment Subscriptions'
          >
            Entertainment Subscriptions
          </option>
          <option name='Entertainment Hobby' value='Entertainment Hobby'>
            Entertainment Hobby
          </option>
          <option name='Phone' value='Phone'>
            Phone
          </option>
          <option name='Internet' value='Internet'>
            Internet
          </option>
          <option name='Computer' value='Computer'>
            Computer
          </option>
          <option name='Giving' value='Giving'>
            Giving
          </option>
          <option name='Student loan' value='Student loan'>
            Student loan
          </option>
          <option name='Electrical bill' value='Electrical bill'>
            Electrical bill
          </option>
          <option name='Reminderfees' value='Reminderfees'>
            Reminderfees
          </option>
          <option name='Bank fee' value='Bank fee'>
            Bank fee
          </option>
        </select>
      </span>
      <div>
        <input
          type='submit'
          value={edit === null ? 'Add' : 'Update'}
          className='btn btn-primary btn-block'
        />
      </div>
      {edit && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Cancel Edit
          </button>
        </div>
      )}
    </form>
  );
};

export default PresetForm;
