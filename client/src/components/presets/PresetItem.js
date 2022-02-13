import React, { useContext, useState, useRef, useEffect } from 'react';
import PresetContext from '../../context/preset/presetContext';
import CssContext from '../../context/css/cssContext';
import DeleteSVG from '../layout/images/DeleteSVG';
import PresetItemCategoryDropdownMenu from './PresetItemCategoryDropdownMenu';

const PresetItem = ({ preset }) => {
  const presetContext = useContext(PresetContext);
  const cssContext = useContext(CssContext);
  const { toggleModal } = cssContext;

  const { deletePreset, setEdit, cancelEdit, calcSum, edit, sendEdit } = presetContext;

  const { _id, name, number, category, month, year, savedAmount } = preset;

  //local preset used to update preset via function presetContext.sendEdit
  const [localpreset, setlocalPreset] = useState(
    {
      _id,
      name,
      number,
      month,
      year,
      category,
      type: 'overhead',
      piggybank: [{ month, year, savedAmount }],
    },
    [edit]
  );

  // state to activate input mode
  const [InputMode, setInputMode] = useState('');

  // setting the local preset
  const onLocalChange = (e) => {
    setlocalPreset({ ...localpreset, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (edit !== null) {
      InputMode === 'edit category' && setlocalPreset(edit);
    }
  }, [edit, InputMode]);

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
    deletePreset(_id);
    cancelEdit();
    calcSum();
  };

  // input change is finished and sent
  const onBlur = () => {
    setInputMode('');
  };
  // init useRef
  const inputNumRef = useRef();
  const inputNameRef = useRef();
  const inputCategoryRef = useRef();

  const onClick = (e) => {
    // setInputMode(e.target.name);
    setEdit(preset);
    toggleModal('editpreset');
  };
  const onTestClick = (e) => {
    setEdit(preset);
    toggleModal('editpreset');
    // setInputMode(e.target.name);
  };

  // implementation of dropdownmenu for categoryselection

  useEffect(() => {
    InputMode === 'number' && inputNumRef.current.focus();
    InputMode === 'name' && inputNameRef.current.focus();

    InputMode === 'categorychanged' && setEdit(localpreset);
    InputMode === 'categorychanged' && setInputMode('');
    if (InputMode === '' && edit !== null) {
      console.log('this crap ran');
      sendEdit(localpreset);
      cancelEdit();
    }
    InputMode === 'category' && inputCategoryRef.current.focus();
    // eslint-disable-next-line
  }, [InputMode]);

  const onDropdownClick = (e) => {
    setlocalPreset({ ...localpreset, category: e.target.name });
    setInputMode('categorychanged');
  };

  // END of implementation of dropdownmenu for categoryselection

  return (
    <div className='monthitem'>
      {/* name */}
      <div className='namebutton'>
        <h4>
          <button
            onClick={onClick}
            className={number > 0 ? ' text-primary btn-form ' : ' text-primary btn-form '}
            style={InputMode === 'name' ? { display: 'none' } : { display: 'block' }}
            name='name'
          >
            {name}
          </button>
          <input
            className={number > 0 ? 'text-success btn-form numinput' : 'text-danger btn-form numinput'}
            style={InputMode === 'name' ? { display: 'block' } : { display: 'none' }}
            type='text'
            value={localpreset.name}
            onChange={onLocalChange}
            onBlur={onBlur}
            ref={inputNameRef}
            name='name'
          />
        </h4>
      </div>
      {/* number */}
      <div>
        <button
          onClick={onClick}
          style={InputMode === 'number' ? { display: 'none' } : { display: 'block' }}
          className={number > 0 ? 'text-success btn-form' : 'text-danger btn-form'}
          name='number'
          data-testid='presetitem'
        >
          {number}
        </button>
        <input
          className={number > 0 ? 'text-success btn-form numinput' : 'text-danger btn-form numinput'}
          style={InputMode === 'number' ? { display: 'block' } : { display: 'none' }}
          type='text'
          value={localpreset.number}
          onChange={onLocalChange}
          onBlur={onBlur}
          ref={inputNumRef}
          name='number'
        />
      </div>
      {/* category */}

      <PresetItemCategoryDropdownMenu
        onDropdownClick={onDropdownClick}
        localpreset={localpreset}
        onClick={onTestClick}
        category={category}
      />

      {/* deletebutton */}

      <button
        className='btn text-primary deleteItemBtn'
        value='delbtn'
        name={name}
        onMouseEnter={onHover}
        onMouseLeave={stopHover}
        onClick={onDelete}
      >
        {DelbtnColor === true ? <DeleteSVG fill='var(--danger-color)' /> : <DeleteSVG fill='var(--light-color)' />}
      </button>
    </div>
  );
};

export default PresetItem;
