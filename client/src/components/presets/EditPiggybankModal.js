import React, { useContext, useState, useEffect } from 'react';
import PresetContext from '../../context/preset/presetContext';
import CssContext from '../../context/css/cssContext';
import PiggybankSVG from '../layout/images/PiggybankSVG';

const EditPiggybankModal = ({ Item }) => {
  // preset context
  const presetContext = useContext(PresetContext);
  const { sendEdit, setActivePiggybank, addtoPiggybanks, MonthBalance, MonthSum, piggybanks } = presetContext;

  // Css: modal context
  const cssContext = useContext(CssContext);
  const { toggleModal, modalprops } = cssContext;

  //preset/item local state
  const [preset, setPreset] = useState({
    _id: Item._id,
    name: Item.name,
    number: Item.number,
    month: Item.month,
    year: Item.year,
    category: Item.category,
    type: 'purchase',
    piggybank: Item.piggybank,
  });

  const monthPiggyPresets = Item.piggybank.filter((item) => item.month === presetContext.month);
  const savedMonthsAmounts = monthPiggyPresets.map((p) => p.savedAmount);
  const piggySum = savedMonthsAmounts.reduce((a, b) => a + b, 0);

  //piggybankstate, local state used for onChange-slider
  const [piggybank, setPiggybank] = useState({ number: piggySum });

  //when Item changes,set Item to default value of presetContext.piggybanks
  useEffect(() => {
    setActivePiggybank(modalprops.piggybank);
    // eslint-disable-next-line
  }, []);

  // sets value from amount to save slider
  const onChange = (e) => {
    setPiggybank({
      ...piggybank,
      [e.target.name]: e.target.value,
    });
  };

  // on submit, add month and amount to save in presetContext.piggybanks
  const onSubmit = async () => {
    // remove piggybanks in this month
    const monthPiggyPresets = Item.piggybank.filter((item) => item.month !== presetContext.month || item.savedAmount === 0);
    monthPiggyPresets.push({
      month: presetContext.month,
      year: parseInt(presetContext.year),
      savedAmount: parseInt(piggybank.number),
    });

    await setActivePiggybank(monthPiggyPresets);
  };
  useEffect(() => {
    if (piggybanks.length !== 0 && piggybanks !== modalprops.piggybank) {
      sendMyEdit({
        _id: Item._id,
        name: Item.name,
        number: Item.number,
        month: Item.month,
        year: Item.year,
        category: Item.category,
        type: 'purchase',
        piggybank: piggybanks,
      });
    }
  }, [piggybanks, modalprops.piggybank]);

  // on sending preset to database,wait and then close modal first then reset/unload presetContext.piggybanks
  const sendMyEdit = async (preset) => {
    await sendEdit(preset);
    toggleModal('');
    setActivePiggybank([]);
  };

  // Close modal
  const onClick = (e) => {
    toggleModal('');
  };

  return (
    <div id='myModal' className='modal-register' style={{ display: 'block' }}>
      <div className='modal-content-deletepurchase'>
        <span className='piggybankmodal-objname'>
          {Item.name}
          <button className='closebtn' value='close' onClick={onClick}></button>
        </span>

        <div className='modalpiggybankheader text-gray'>
          <h1 className='regular'>Amount to save</h1>
        </div>
        <div className='piggybankmodalnumbername'>{piggybank.number}</div>
        <input
          type='range'
          min='1'
          max={MonthSum}
          name='number'
          value={piggybank.number}
          onChange={onChange}
          data-testid='inputamountrange'
        />
        <button className='text-primary piggybankmodalsubmitbutton' value='submit' onClick={onSubmit}>
          Submit{'  '}
          <PiggybankSVG fill='var(--primary-color)' />
        </button>
        <button className='btn btn-outline btn-block  p-3' value='delete' onClick={() => toggleModal('')}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditPiggybankModal;
