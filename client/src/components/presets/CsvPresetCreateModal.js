import React, { useContext, useEffect, useState, Fragment } from 'react';
import PresetContext from '../../context/preset/presetContext';
import CsvPresetItem from './CsvPresetItem';
import CsvPrompt from './CsvPrompt';

const CsvPresetCreateModal = () => {
  const presetContext = useContext(PresetContext);
  const { csvpresets, submitCsvItems, clearCsv } = presetContext;

  const [Prompt, setPrompt] = useState(false);
  const [validCsv, setValidCsv] = useState(null);

  const onClick = () => {
    // Run ContextApi fn that run fn in csvpresetitems that check for valid categories
    submitCsvItems('step1');
  };
  useEffect(() => {
    //check for valid csv to add
    const checkcsv = csvpresets.filter(
      (item) => item.category && item.markdelete === false
    );
    setValidCsv(checkcsv);

    if (checkcsv.length !== 0 && checkcsv.length !== csvpresets.length) {
      setPrompt(true);
    } else {
      submitCsvItems('submit');
    }

    if (csvpresets.length <= 1) {
      clearCsv();
      setPrompt(false);
    }
  }, [csvpresets]);

  return (
    <Fragment>
      {Prompt && <CsvPrompt setPrompt={setPrompt} validCsv={validCsv} />}
      <div
        id='myModal'
        className='modal-csvpresets'
        style={{ display: 'block' }}
      >
        <div className='modal-csvpresets__card'>
          <h1 className='all-center m-1'>Create Transactions</h1>

          {csvpresets.map((item) => (
            <CsvPresetItem Item={item} key={item.id} />
          ))}

          <button
            className='btn modal-csvpresets__btn__addtobudget all-center'
            onClick={onClick}
          >
            ADD TO BUDGET
          </button>
          <button
            className='btn modal-csvpresets__btn__addtobudget all-center'
            onClick={() => clearCsv()}
          >
            Cancel
          </button>
        </div>
      </div>
    </Fragment>
  );
};
export default CsvPresetCreateModal;
