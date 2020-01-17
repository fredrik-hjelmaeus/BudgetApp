import React, { useContext, useState } from 'react';
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
  Car
} from '../layout/images/index';

const PresetItem = ({ preset }) => {
  const presetContext = useContext(PresetContext);

  const { deletePreset, setEdit, cancelEdit, calcSum } = presetContext;

  const { _id, name, number, category } = preset;

  const getCategoryIcon = category => {
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

  return (
    <div className='monthitem'>
      <div className='namebutton'>
        <h4>
          <button
            onClick={() => setEdit(preset)}
            className={
              number > 0
                ? ' text-primary btn-form no-wrap'
                : ' text-primary btn-form no-wrap'
            }
          >
            {name}
          </button>
        </h4>
      </div>
      <div>
        <button
          onClick={() => setEdit(preset)}
          className={
            number > 0 ? 'text-success btn-form' : 'text-danger btn-form'
          }
        >
          {number}
        </button>
      </div>
      <div>
        <button onClick={() => setEdit(preset)} className='btn-form'>
          <img
            src={getCategoryIcon(category)}
            alt=''
            style={{ height: '20px', width: '20px' }}
          />
        </button>
      </div>
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
