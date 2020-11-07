import React, { Fragment, useContext, useState, useRef, useEffect } from 'react';
import PresetContext from '../../context/preset/presetContext';
import DeleteButton from '../presets/DeleteButton';
import DropdownMenu from '../presets/DropdownMenu';

const CsvPresetItem = ({ Item }) => {
  const presetContext = useContext(PresetContext);
  const { month, year, doSubmitCsv, updateCsvPresets, addPreset, removeCSV } = presetContext;
  const { id, number, name } = Item;

  //local preset used to update preset via function presetContext.sendEdit
  const [localpreset, setlocalPreset] = useState({
    id: id,
    name: name,
    number: number,
    month,
    year,
    category: 'Select Category',
    type: 'overhead',
    piggybank: [{ month, year, savedAmount: '' }],
    markdelete: false,
  });

  const onBlur = () => {
    setInputMode('');
  };

  // state to activate input mode
  const [InputMode, setInputMode] = useState('');

  useEffect(() => {
    InputMode === 'edit category' && setlocalPreset({ ...localpreset, category: 'Select Category' });
    InputMode === 'category' && inputCategoryRef.current.focus();
  }, [InputMode, localpreset]);

  // calls onBlur when category is selected
  useEffect(() => {
    onBlur();
  }, [localpreset.category]);

  const onClick = (e) => {
    setInputMode(e.target.name);
  };
  const onDropdownClick = (e) => {
    setlocalPreset({ ...localpreset, category: e.target.name });
    setInputMode('');
  };

  // Init refs
  const inputCategoryRef = useRef();

  // state to handle deletebutton-hover
  const [DelbtnColor, setDelbtnColor] = useState(false);

  //on delete button hover
  const onHover = () => {
    setDelbtnColor(true);
  };
  //on delete button stop hover
  const stopHover = () => {
    setDelbtnColor(false);
  };
  const onDelete = () => {
    setlocalPreset({ ...localpreset, markdelete: !localpreset.markdelete });
  };

  const addToDB = () => {
    addPreset({
      name: name,
      number: parseFloat(number),
      month: month,
      year: year,
      category: localpreset.category,
      type: localpreset.type,
      piggybank: [{ month, year, savedAmount: '' }],
    });
    removeCSV(localpreset);
  };

  useEffect(() => {
    doSubmitCsv === 'step1' && localpreset.category !== 'Select Category' && updateCsvPresets(localpreset);

    doSubmitCsv === 'submit' && localpreset.category !== 'Select Category' && localpreset.markdelete !== true && addToDB();
    //eslint-disable-next-line
  }, [doSubmitCsv]);

  return (
    <Fragment>
      {/* name */}
      <div className={localpreset.markdelete ? 'modal-csvpresets__grid markgraydelete' : 'modal-csvpresets__grid'}>
        <div
          className={
            localpreset.markdelete
              ? 'btn-form modal-csvpresets__item markgraydelete disable__hover'
              : 'text-primary btn-form modal-csvpresets__item'
          }
        >
          {name}
        </div>
        {/* number */}
        <div
          className={
            localpreset.markdelete
              ? 'btn-form modal-csvpresets__item markgraydelete disable__hover'
              : parseFloat(number) > 0
              ? 'text-success btn-form modal-csvpresets__item'
              : 'text-danger btn-form modal-csvpresets__item'
          }
          type='text'
        >
          {number}
        </div>
        {/* monthyear */}
        <div
          className={
            localpreset.markdelete
              ? 'btn-form modal-csvpresets__item csvpresets__item__monthyear disable__hover'
              : 'btn-form modal-csvpresets__item csvpresets__item__monthyear'
          }
        >
          {month}/{year}
        </div>

        {/* category */}

        <DropdownMenu onDropdownClick={onDropdownClick} localpreset={localpreset} onClick={onClick} category={localpreset.category} />

        {/* delete */}
        <div className='btn-form modal-csvpresets__item'>
          <DeleteButton
            name={name}
            onHover={onHover}
            stopHover={stopHover}
            localpreset={localpreset}
            onDelete={onDelete}
            DelbtnColor={DelbtnColor}
          />
        </div>
      </div>
    </Fragment>
  );
};
export default CsvPresetItem;
