import React from 'react';
import logoicon from './assessment-24px.svg';
import logoicon2 from './logo/logo_color.svg';

const Logo = () => (
  <div className='Logo'>
    <h1 className='Logo__card text-light'>
      <img src={logoicon2} alt='loading...' style={{ width: '66px', margin: 'auto ' }} />
      <div className='all-center Logo__text'>Budget App</div>
    </h1>
  </div>
);
export default Logo;
