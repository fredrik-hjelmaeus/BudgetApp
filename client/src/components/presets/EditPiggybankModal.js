import React, { useContext, useState, useEffect } from 'react';
import uuid from 'uuid';
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

  let AmountToSave; //init startvalue

  // store only savedAmounts in an array
  const savedAmounts = Item.piggybank.map((item) => item.savedAmount);

  const monthPiggyPresets = Item.piggybank.filter((item) => item.month === presetContext.month);
  const savedMonthsAmounts = monthPiggyPresets.map((p) => p.savedAmount);
  const piggySum = savedMonthsAmounts.reduce((a, b) => a + b, 0);
  // console.log(MonthSum);
  //  console.log(piggySum);

  // sift through savedAmounts and count totalsum
  const SumOfPiggybanks = savedAmounts.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
  const SumLeftToSave = parseFloat(Item.number) - parseFloat(SumOfPiggybanks);

  // Calc Amount to save
  /*   if (parseInt(MonthBalance) > parseInt(SumLeftToSave)) {
    AmountToSave = SumLeftToSave;
  } else {
    AmountToSave = MonthBalance;
  } */

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
      //  _id: uuid.v4(),
    });
    // console.log(presetContext.piggybanks);
    // console.log(monthPiggyPresets);
    await setActivePiggybank(monthPiggyPresets);
    //console.log("piggybanks before sendmyedit", piggybanks);
    /*     sendMyEdit({
      _id: Item._id,
      name: Item.name,
      number: Item.number,
      month: Item.month,
      year: Item.year,
      category: Item.category,
      type: "purchase",
      piggybank: piggybanks,
    }); */
    // setPreset({ ...preset, piggybank: piggybanks });
    //await sendEdit(preset);
    //  setActivePiggybank(monthPiggyPresets);
    // add new piggybank with value(piggybank.number)
    /*    addtoPiggybanks({
      month: presetContext.month,
      year: presetContext.year,
      savedAmount: parseInt(piggybank.number),
    }); */

    //console.log('piggybank.number', piggybank.number);
    // console.log('piggybanks', piggybanks);
    //   console.log('addtopiggybanks ran');

    //  console.log('onsubmit preset:', preset);
  };
  useEffect(() => {
    /*     console.log(
      "objs:",
      piggybanks,
      modalprops.piggybank,
      piggybanks === modalprops.piggybank
    ); */
    if (piggybanks.length !== 0 && piggybanks !== modalprops.piggybank) {
      //  console.log("piggybanks change detected");
      // console.log(piggybanks);
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

  // on presetContext.piggybanks change,set local preset with new presetContext.piggybanks-value.
  /* useEffect(() => {
    console.log("piggybanks check:");
    console.log(piggybanks.length, modalprops.piggybank.length);
    if (
      presetContext.piggybanks.length !== undefined &&
      presetContext.piggybanks.length !== 0
      //    presetContext.piggybanks.length !== modalprops.piggybank.length
    ) {
      console.log("useEffect setPreset");
      console.log("piggybanks:", presetContext.piggybanks);
      setPreset({
        ...preset,
        _id: Item._id,
        name: Item.name,
        number: Item.number,
        month: Item.month,
        year: Item.year,
        category: Item.category,
        type: "purchase",
        piggybank: presetContext.piggybanks,
      });
    } // eslint-disable-next-line
  }, [presetContext.piggybanks, modalprops.piggybank.length]); */

  // on sending preset to database,wait and then close modal first then reset/unload presetContext.piggybanks
  const sendMyEdit = async (preset) => {
    await sendEdit(preset);
    toggleModal('');
    setActivePiggybank([]);
  };

  // on local preset change, push new preset to database
  /* useEffect(() => {
    if (
      presetContext.piggybanks.length !== undefined &&
      presetContext.piggybanks.length !== 0
      // presetContext.piggybanks.length !== modalprops.piggybank.length
    ) {
      console.log("useEffect sendMyEdit");
      sendMyEdit(preset);
    } // eslint-disable-next-line
  }, [preset]); */

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
