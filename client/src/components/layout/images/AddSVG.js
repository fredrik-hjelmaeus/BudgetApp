import React from 'react';

//const AddSVG = ({fill='none'}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 19.1H3V5h18v14.1zM21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/><path fill={fill} d="M21 19.1H3V5h18v14.1zM21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/><path fill={fill} d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41z"/><path fill='none' d="M0 0h24v24H0z"/></svg>
const AddSVG = ({ fill = 'none', color = 'none' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    height='24'
    viewBox='0 0 24 24'
    width='24'
  >
    <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' fill={color} />
    <path d='M0 0h24v24H0z' fill={fill} />
  </svg>
);

export default AddSVG;
