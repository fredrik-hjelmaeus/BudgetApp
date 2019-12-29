import React, { useContext, useState, useEffect } from 'react';
import PresetContext from '../../context/preset/presetContext';

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
        console.log('commute');

      case 'Bank fee':
        return Bankfee;
        console.log('bankfee');

      case 'Salary':
        return Salary;
        console.log('salary');

      case 'Insurance':
        return Insurance;
        console.log('Insurance');

      case 'Child benefit':
        return ChildBenefit;
        console.log('ChildBenefit');

      case 'Childcare':
        return Childcare;
        console.log('Childcare');

      case 'Food':
        return Food;
        console.log('Food');

      case 'Housing':
        return Housing;
        console.log('Housing');

      case 'Sport Activities':
        return Sport;
        console.log('Sport Activities');

      case 'Clothing':
        return Clothing;
        console.log('Clothing');

      case 'Entertainment Electronics':
        return EntertainmentElectronics;
        console.log('EntertainmentElectronics');

      case 'Entertainment Subscriptions':
        return EntertainmentSubscriptions;
        console.log('Entertainment Subscriptions');

      case 'Entertainment Hobby':
        return EntertainmentHobby;
        console.log('Entertainment Hobby');

      case 'Phone':
        return Phone;
        console.log('Phone');

      case 'Internet':
        return Internet;
        console.log('Internet');

      case 'Computer':
        return Computer;
        console.log('Computer');

      case 'Giving':
        return Giving;
        console.log('Giving');

      case 'Student loan':
        return Studentloan;
        console.log('Student loan');

      case 'Electrical bill':
        return Electricalbill;
        console.log('Electrical bill');

      case 'Travel':
        return Travel;
        console.log('Travel');

      case 'Car':
        return Car;
        console.log('Car');

      default:
        return Commute;
    }
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
              number > 0 ? ' text-primary btn-form' : ' text-primary btn-form'
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
        <button className='btn text-primary' onClick={onDelete}>
          x
        </button>
      </div>
    </div>
  );
};

export default PresetItem;
