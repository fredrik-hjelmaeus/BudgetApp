import React, { useContext } from 'react';
import PresetContext from '../../context/preset/presetContext';
import CsvPresetItem from './CsvPresetItem';

const CsvPresetCreateModal = () => {
  const presetContext = useContext(PresetContext);
  const { csvpresets } = presetContext;
  return (
    <div id='myModal' className='modal-csvpresets' style={{ display: 'block' }}>
      <div className='modal-csvpresets__card'>
        <h1 className='all-center m-1'>Create Transactions</h1>

        {csvpresets.map((item) => (
          <CsvPresetItem Item={item} />
        ))}

        <button className='btn modal-csvpresets__btn__addtobudget all-center'>
          ADD TO BUDGET
        </button>
      </div>
    </div>
  );
};
export default CsvPresetCreateModal;
