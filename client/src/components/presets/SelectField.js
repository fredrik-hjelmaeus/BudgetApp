import React from 'react';

const SelectField = ({ guide, selectChange, category }) => {
  return (
    <span className='presetformselectcategory'>
      <select
        onChange={selectChange}
        className={guide && guide === '6' ? 'text-dark guide__presetformselectcategory' : 'text-dark'}
        value={category}
      >
        <option name='Select an category' value='Select an category'>
          Select an category
        </option>
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
        <option name='Entertainment Electronics' value='Entertainment Electronics'>
          Entertainment Electronics
        </option>
        <option name='Entertainment Subscriptions' value='Entertainment Subscriptions'>
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
  );
};
export default SelectField;
