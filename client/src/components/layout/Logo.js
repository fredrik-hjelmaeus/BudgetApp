import React from 'react';
import logoicon2 from './logo/logo_color.svg';

const Logo = () => (
  <div className='Logo'>
    <h1 className='Logo__card text-light'>
      <img src={logoicon2} alt='logo' style={{ width: '66px', margin: 'auto', marginBottom: '10px' }} />
      <div className='all-center Logo__text'>Budget App</div>
    </h1>
  </div>
);
export default Logo;
