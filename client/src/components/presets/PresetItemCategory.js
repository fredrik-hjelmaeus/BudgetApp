import React from 'react';

const PresetItemCategory = ({ localpreset, onClick, category }) => {
  return (
    <>
      <div
        className={localpreset.markdelete === false ? 'dropdown' : localpreset.markdelete ? 'dropdown disable__hover' : 'dropdown'}
      ></div>
      <button onClick={onClick} className='dropbtn'>
        <img
          src={`/icons/${category.replace(' ', '_')}.svg`}
          alt={`${category} icon`}
          style={{
            height: '20px',
            width: '20px',
          }}
          name='edit category'
          // className={localpreset.markdelete ? 'dropdown__categoryicon__grayedout' : 'dropdown__categoryicon'}
        />
      </button>
    </>
  );
};
export default PresetItemCategory;
