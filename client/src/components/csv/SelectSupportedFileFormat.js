import React from 'react';

const SelectSupportedFileFormat = ({ selectChange, format }) => {
  return (
    <span className='selectsupportedfileformat'>
      <select onChange={selectChange} className='text-dark selectsupportedfileformat__select' value={format}>
        <option name='RFC4180' value='RFC4180' className='selectsupportedfileformat__option'>
          RFC4180
        </option>
        <option name='nordea' value='nordea' className='selectsupportedfileformat__option'>
          Nordea
        </option>
        <option name='swedbank' value='swedbank' className='selectsupportedfileformat__option'>
          Swedbank
        </option>
        <option name='handelsbanken' value='handelsbanken' className='selectsupportedfileformat__option'>
          Handelsbanken
        </option>
      </select>
    </span>
  );
};
export default SelectSupportedFileFormat;
