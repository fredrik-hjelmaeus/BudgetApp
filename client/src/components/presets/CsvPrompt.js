import React, { useContext, useEffect } from 'react';
import PresetContext from '../../context/preset/presetContext';
const CsvPrompt = ({ setPrompt, validCsv }) => {
  const presetContext = useContext(PresetContext);
  const { submitCsvItems, csvpresets } = presetContext;
  const onClick = (e) => {
    e.target.name === 'cancel' && setPrompt(false);
    if (e.target.name === 'add') {
      submitCsvItems('submit');
    }
    e.target.name === 'add' && console.log('yes');
  };

  /* useEffect(() => {
  
    setPrompt(false);
    clearCsv();
  }, [submitCsvItems]); */
  return (
    <div id='myModal' className='modal-csvprompt' style={{ display: 'block' }}>
      <div className='modal-csvpresets__card'>
        <h1 className='all-center m-1'>
          {csvpresets.length - validCsv.length} of {csvpresets.length}{' '}
          transactions does not have a category selected
        </h1>
        <div>
          <button
            className='btn modal-csvpresets__btn__addtobudget all-center'
            name='add'
            onClick={onClick}
          >
            Add the {validCsv.length} transactions that has a category specified
          </button>
          <button
            className='btn btn-light btn-block'
            name='cancel'
            onClick={onClick}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};
export default CsvPrompt;
