import React from 'react';

const TrashiconSVG = ({ fill = 'gray' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
  >
    <path fill={'none'} d='M0,0H24V24H0Z' />
    <path
      fill={fill}
      d='M6,19a2.006,2.006,0,0,0,2,2h8a2.006,2.006,0,0,0,2-2V7H6Zm2.46-7.12,1.41-1.41L12,12.59l2.12-2.12,1.41,1.41L13.41,14l2.12,2.12-1.41,1.41L12,15.41,9.88,17.53,8.47,16.12,10.59,14ZM15.5,4l-1-1h-5l-1,1H5V6H19V4Z'
    />
    <path fill={'none'} d='M0,0H24V24H0Z' />
  </svg>
);

export default TrashiconSVG;
