import React, { useContext, useState, useRef, useEffect } from 'react';
import PresetContext from '../../context/preset/presetContext';
import DeleteSVG from '../layout/images/DeleteSVG';

import {
  Bankfee,
  Commute,
  Salary,
  Insurance,
  ChildBenefit,
  Childcare,
  Food,
  Housing,
  Sport,
  Clothing,
  EntertainmentElectronics,
  EntertainmentSubscriptions,
  EntertainmentHobby,
  Phone,
  Internet,
  Computer,
  Giving,
  Studentloan,
  Electricalbill,
  Travel,
  Car,
} from '../layout/images/index';

const PresetItem = ({ preset }) => {
  const presetContext = useContext(PresetContext);

  const {
    deletePreset,
    setEdit,
    cancelEdit,
    calcSum,
    edit,
    sendEdit,
  } = presetContext;

  const { _id, name, number, category, month, year, savedAmount } = preset;

  //local preset used to update preset via function presetContext.sendEdit
  const [localpreset, setlocalPreset] = useState(
    {
      name: '',
      number: '',
      month,
      year,
      category: 'Select an category',
      type: 'overhead',
      piggybank: [{ month, year, savedAmount }],
    },
    [edit]
  );

  // setting the local preset
  const onLocalChange = (e) => {
    setlocalPreset({ ...localpreset, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (edit !== null) {
      console.log('settingEdittoLocalPreset');
      setlocalPreset(edit);
    } // eslint-disable-next-line
  }, [edit]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Commute':
        return Commute;
      case 'Bank fee':
        return Bankfee;
      case 'Salary':
        return Salary;
      case 'Insurance':
        return Insurance;
      case 'Child benefit':
        return ChildBenefit;
      case 'Childcare':
        return Childcare;
      case 'Food':
        return Food;
      case 'Housing':
        return Housing;
      case 'Sport Activities':
        return Sport;
      case 'Clothing':
        return Clothing;
      case 'Entertainment Electronics':
        return EntertainmentElectronics;
      case 'Entertainment Subscriptions':
        return EntertainmentSubscriptions;
      case 'Entertainment Hobby':
        return EntertainmentHobby;
      case 'Phone':
        return Phone;
      case 'Internet':
        return Internet;
      case 'Computer':
        return Computer;
      case 'Giving':
        return Giving;
      case 'Student loan':
        return Studentloan;
      case 'Electrical bill':
        return Electricalbill;
      case 'Travel':
        return Travel;
      case 'Car':
        return Car;
      default:
        return Commute;
    }
  };
  // state to handle deletebutton-hover
  const [DelbtnColor, setDelbtnColor] = useState(false);
  //on delete button hover
  const onHover = () => {
    setDelbtnColor(true);
  };
  //on delete button stop hover
  const stopHover = () => {
    setDelbtnColor(false);
  };
  const onDelete = () => {
    deletePreset(_id);
    cancelEdit();
    calcSum(_id, null);
  };
  // state to activate input mode
  const [InputMode, setInputMode] = useState('');
  // state to keep track of inputchange
  const [InputChange, setInputChange] = useState('');
  // on input change
  const onChange = (e) => {
    if (InputMode === '') {
      setInputChange(e.target.value);
    }
  };
  // input change is finished and sent
  const onBlur = () => {
    //console.log(localpreset);
    setInputMode('');
    sendEdit(localpreset);
    cancelEdit();
  };
  // init useRef
  const inputNumRef = useRef();
  const inputNameRef = useRef();
  const inputCategoryRef = useRef();

  const onClick = (e) => {
    setInputChange(e.target.value);
    //console.log(e.target.name);
    setInputMode(e.target.name);
    setEdit(preset);

    // inputRef.current.focus();
  };
  useEffect(() => {
    inputNumRef.current.focus();
    inputNameRef.current.focus();
    inputCategoryRef.current.focus();
  }, [InputMode]);

  return (
    <div className='monthitem'>
      {/* name */}
      <div className='namebutton'>
        <h4>
          <button
            onClick={onClick}
            className={
              number > 0
                ? ' text-primary btn-form no-wrap'
                : ' text-primary btn-form no-wrap'
            }
            style={
              InputMode === 'name' ? { display: 'none' } : { display: 'block' }
            }
            name='name'
          >
            {name}
          </button>
          <input
            className={
              number > 0
                ? 'text-success btn-form numinput'
                : 'text-danger btn-form numinput'
            }
            style={
              InputMode === 'name' ? { display: 'block' } : { display: 'none' }
            }
            type='text'
            value={localpreset.name}
            defaultValue={name}
            onChange={onLocalChange}
            onBlur={onBlur}
            ref={inputNameRef}
            name='name'
          />
        </h4>
      </div>
      {/* number */}
      <div>
        <button
          onClick={onClick}
          style={
            InputMode === 'number' ? { display: 'none' } : { display: 'block' }
          }
          className={
            number > 0 ? 'text-success btn-form' : 'text-danger btn-form'
          }
          name='number'
        >
          {number}
        </button>
        <input
          className={
            number > 0
              ? 'text-success btn-form numinput'
              : 'text-danger btn-form numinput'
          }
          style={
            InputMode === 'number' ? { display: 'block' } : { display: 'none' }
          }
          type='text'
          value={localpreset.number}
          defaultValue={number}
          onChange={onLocalChange}
          onBlur={onBlur}
          ref={inputNumRef}
          name='number'
        />
      </div>
      {/* category */}
      <div>
        <button
          className='btn-form'
          style={
            InputMode === 'category'
              ? { display: 'none' }
              : { display: 'block' }
          }
          name='category'
          onClick={onClick}
        >
          <img
            src={getCategoryIcon(category)}
            alt=''
            style={{ height: '20px', width: '20px' }}
            name='category'
            onClick={onClick}
          />
        </button>
        <span
          className='categorydropdown'
          style={
            InputMode === 'category'
              ? { display: 'block', width: '40px' }
              : { display: 'none' }
          }
        >
          <select
            onChange={onLocalChange}
            value={localpreset.category}
            name='category'
            onBlur={onBlur}
            ref={inputCategoryRef}
            className='categorydropdown__select'
          >
            <option
              className='categorydropdown__option'
              name='Select an category'
              value='Select an category'
            >
              Select an category
            </option>

            <option
              className='categorydropdown__option'
              name='Commute'
              value='Commute'
            >
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
      </div>
      {/* deletebutton */}
      <div>
        <button
          className='btn text-primary delete'
          value='delbtn'
          name={name}
          onMouseEnter={onHover}
          onMouseLeave={stopHover}
          onClick={onDelete}
        >
          {DelbtnColor === true ? (
            <DeleteSVG fill='var(--danger-color)' />
          ) : (
            <DeleteSVG fill='var(--light-color)' />
          )}
        </button>
      </div>
    </div>
  );
};

export default PresetItem;
