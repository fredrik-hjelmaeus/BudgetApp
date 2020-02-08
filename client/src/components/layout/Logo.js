import React from 'react';
import logoicon from './assessment-24px.svg';

const Logo = () => (
  <div className='Logo'>
    <h1 className='Logo__card text-light'>
      <img
        src={logoicon}
        alt='loading...'
        style={{ width: '66px', margin: 'auto ' }}
      />
      <div className='all-center px-1'>Budget App</div>
    </h1>
  </div>
);
export default Logo;
