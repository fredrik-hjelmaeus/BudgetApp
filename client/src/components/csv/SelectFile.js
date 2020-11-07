import React from 'react';

const SelectFile = () => {
  return (
    <div id='myModal' className='modal-csvprompt' style={{ display: 'block' }}>
      <div className='modal-csvpresets__card modal-csvpresets__card__flex'>
        Select File Type
        <button>RFC4180</button>
        <button>Nordea</button>
        <button>Swedbank</button>
        <button>Handelsbanken</button>
        <div>test</div>
      </div>
    </div>
  );
};

export default SelectFile;
