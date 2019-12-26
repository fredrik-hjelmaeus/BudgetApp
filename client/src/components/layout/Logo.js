import React from 'react';
import logoicon from './assessment-24px.svg';

const Logo = () => (
  <div className='container'>
    <h1 className='logocard text-light'>
      <img
        src={logoicon}
        alt='loading...'
        style={{ width: '66px', margin: 'auto ' }}
      />
      <div className='all-center x-large mx'>Budget App</div>
    </h1>
  </div>
);
export default Logo;
