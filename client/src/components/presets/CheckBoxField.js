import React from 'react';

const CheckBoxField = ({ guide, preset, onChange }) => {
  return (
    <div className={guide === '8' && 'guide__checkboxfield_zindex'}>
      <h5 className='text-gray'>Add to</h5>
      <span className='grid-2 my-1'>
        <label className={guide === '6' ? 'presetformtypecheckboxcontainer guide__overheadtextcolor' : 'presetformtypecheckboxcontainer'}>
          Overhead
          <input type='checkbox' name='type' value='overhead' checked={preset.type === 'overhead'} onChange={onChange} />
          <span className='presetformcheckbox'></span>
        </label>
        <label className={guide === '10' ? 'presetformtypecheckboxcontainer guide__checkbox__text' : 'presetformtypecheckboxcontainer'}>
          Purchase
          <input type='checkbox' name='type' value='purchase' checked={preset.type === 'purchase'} onChange={onChange} />
          <span className='presetformcheckbox'></span>
        </label>
        <label className={guide === '9' ? 'presetformtypecheckboxcontainer guide__checkbox__text' : 'presetformtypecheckboxcontainer'}>
          Savings
          <input type='checkbox' name='type' value='savings' checked={preset.type === 'savings'} onChange={onChange} />
          <span className='presetformcheckbox'></span>
        </label>
        <label className={guide === '8' ? 'presetformtypecheckboxcontainer guide__checkbox__text' : 'presetformtypecheckboxcontainer'}>
          Capital
          <input type='checkbox' name='type' value='capital' checked={preset.type === 'capital'} onChange={onChange} />{' '}
          <span className='presetformcheckbox'></span>
        </label>
      </span>
    </div>
  );
};
export default CheckBoxField;
