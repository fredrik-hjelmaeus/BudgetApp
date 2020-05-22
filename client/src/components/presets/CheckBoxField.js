import React from 'react';

const CheckBoxField = ({ preset, onChange }) => {
  return (
    <div className='presetform__addTofields'>
      <h5 className='text-gray'>Add to</h5>
      <span className='grid-2 my-1'>
        <label className='presetformtypecheckboxcontainer'>
          Overhead
          <input
            type='checkbox'
            name='type'
            value='overhead'
            checked={preset.type === 'overhead'}
            onChange={onChange}
          />
          <span className='presetformcheckbox'></span>
        </label>
        <label className='presetformtypecheckboxcontainer'>
          Purchase
          <input
            type='checkbox'
            name='type'
            value='purchase'
            checked={preset.type === 'purchase'}
            onChange={onChange}
          />
          <span className='presetformcheckbox'></span>
        </label>
        <label className='presetformtypecheckboxcontainer'>
          Savings
          <input
            type='checkbox'
            name='type'
            value='savings'
            checked={preset.type === 'savings'}
            onChange={onChange}
          />
          <span className='presetformcheckbox'></span>
        </label>
        <label className='presetformtypecheckboxcontainer'>
          Capital
          <input
            type='checkbox'
            name='type'
            value='capital'
            checked={preset.type === 'capital'}
            onChange={onChange}
          />{' '}
          <span className='presetformcheckbox'></span>
        </label>
      </span>
    </div>
  );
};
export default CheckBoxField;
