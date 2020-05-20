import React, { useContext, useState, useEffect } from 'react';
import PresetContext from '../../context/preset/presetContext';
import DeleteSVG from '../layout/images/DeleteSVG';
import piggyicon from '../layout/images/piggybank.svg';

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

const MonthSavingsItem = ({ Item, SumOfPreset }) => {
  const presetContext = useContext(PresetContext);
  const { presets, deletePreset, month, sendEdit } = presetContext;
  const { name, number, category } = Item;
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
  const [preset, setPreset] = useState({
    _id: Item._id,
    name: Item.name,
    number: Item.number,
    month: Item.month,
    year: Item.year,
    category: Item.category,
    type: Item.type,
    piggybank: Item.piggybank,
  });
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
    //if type piggy delete this presets piggydeposits for this month, else its type normal and you should delete whole preset
    Item.type === 'savings' ? deletePreset(Item._id) : testPiggybank(Item);
  };

  // console.log(preset.piggybank.length);
  const testPiggybank = (Item) => {
    let newPiggybankArray = [];
    presets &&
      presets.map((preset) =>
        preset._id === Item._id
          ? Item.piggybank.filter((piggybank) =>
              piggybank.month !== month || piggybank.savedAmount === 0
                ? newPiggybankArray.push({
                    _id: piggybank._id,
                    month: piggybank.month,
                    year: piggybank.year,
                    savedAmount: piggybank.savedAmount,
                  })
                : null
            )
          : null
      );
    //console.log(newPiggybankArray);

    setPreset({
      ...preset,
      _id: Item._id,
      name: Item.name,
      number: Item.number,
      month: Item.month,
      year: Item.year,
      category: Item.category,
      type: Item.type,
      piggybank: newPiggybankArray,
    });
  };
  useEffect(() => {
    preset.piggybank.length !== Item.piggybank.length && sendEdit(preset);
    // console.log(Item.piggybank.length);
    //console.log(preset.piggybank.length);
  }, [preset]);

  return (
    <div className='monthitem'>
      <div className='namebutton'>
        <h4>
          <button
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
        <button className='text-orange btn-form'>{SumOfPreset}</button>
      </div>
      <div>
        <button className='btn-form'>
          <img
            src={getCategoryIcon(category)}
            alt=''
            style={{ height: '20px', width: '20px' }}
          />
        </button>
      </div>
      {Item.type !== 'savings' && (
        <div>
          <img src={piggyicon} alt='' style={{ width: '26px' }} />
        </div>
      )}
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
export default MonthSavingsItem;
