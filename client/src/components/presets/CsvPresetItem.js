import React, {
  Fragment,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import PresetContext from '../../context/preset/presetContext';
import DeleteSVG from '../layout/images/DeleteSVG';
import AddSVG from '../layout/images/AddSVG';
import {
  Bankfee,
  Commute,
  Salary,
  Insurance,
  ChildBenefit,
  Childcare,
  Food,
  Housing,
  Sport,
  Clothing,
  EntertainmentElectronics,
  EntertainmentSubscriptions,
  EntertainmentHobby,
  Phone,
  Internet,
  Computer,
  Giving,
  Studentloan,
  Electricalbill,
  Travel,
  Car,
} from '../layout/images/index';

const CsvPresetItem = ({ Item }) => {
  const presetContext = useContext(PresetContext);
  const {
    month,
    year,
    doSubmitCsv,
    updateCsvPresets,
    addPreset,
    removeCSV,
  } = presetContext;
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
    //console.log(localpreset);
    setInputMode('');
    //sendEdit(localpreset);
    // cancelEdit();
  };

  // state to activate input mode
  const [InputMode, setInputMode] = useState('');

  useEffect(() => {
    // inputNumRef.current.focus();
    // inputNameRef.current.focus();
    InputMode === 'edit category' &&
      setlocalPreset({ ...localpreset, ['category']: 'Select Category' });
    InputMode === 'category' && inputCategoryRef.current.focus();
  }, [InputMode]);
  useEffect(() => {});

  // calls onBlur when category is selected
  useEffect(() => {
    onBlur();
  }, [localpreset.category]);

  const onClick = (e) => {
    //setInputChange(e.target.value);
    //  console.log(e.target.name);
    setInputMode(e.target.name);
    //setEdit(preset);
  };
  const onDropdownClick = (e) => {
    // console.log(e.target.name);
    setlocalPreset({ ...localpreset, ['category']: e.target.name });
    setInputMode('');
  };

  //get categoryicon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Commute':
        return Commute;
      case 'Bank fee':
        return Bankfee;
      case 'Salary':
        return Salary;
      case 'Insurance':
        return Insurance;
      case 'Child benefit':
        return ChildBenefit;
      case 'Childcare':
        return Childcare;
      case 'Food':
        return Food;
      case 'Housing':
        return Housing;
      case 'Sport Activities':
        return Sport;
      case 'Clothing':
        return Clothing;
      case 'Entertainment Electronics':
        return EntertainmentElectronics;
      case 'Entertainment Subscriptions':
        return EntertainmentSubscriptions;
      case 'Entertainment Hobby':
        return EntertainmentHobby;
      case 'Phone':
        return Phone;
      case 'Internet':
        return Internet;
      case 'Computer':
        return Computer;
      case 'Giving':
        return Giving;
      case 'Student loan':
        return Studentloan;
      case 'Electrical bill':
        return Electricalbill;
      case 'Travel':
        return Travel;
      case 'Car':
        return Car;
      case 'Reminder Fee':
        return Car;
      default:
        return 'Select Category';
    }
  };
  // Init refs
  const inputNumRef = useRef();
  const inputNameRef = useRef();
  const inputCategoryRef = useRef();

  // state to handle deletebutton-hover
  const [DelbtnColor, setDelbtnColor] = useState(false);

  //on delete button hover
  const onHover = () => {
    //console.log('hover');
    setDelbtnColor(true);
  };
  //on delete button stop hover
  const stopHover = () => {
    // console.log('stophover');
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
    console.log(doSubmitCsv);
    doSubmitCsv === 'step1' &&
      (localpreset.category !== 'Select Category'
        ? updateCsvPresets(localpreset)
        : console.log(`Not valid `));
    doSubmitCsv === 'submit' &&
      (localpreset.category !== 'Select Category' &&
      localpreset.markdelete !== true
        ? addToDB()
        : console.log(`No add `));
  }, [doSubmitCsv]);

  return (
    <Fragment>
      {/* name */}
      <div
        className={
          localpreset.markdelete
            ? 'modal-csvpresets__grid markgraydelete'
            : 'modal-csvpresets__grid'
        }
      >
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
              ? 'btn-form modal-csvpresets__item disable__hover'
              : 'btn-form modal-csvpresets__item'
          }
        >
          {month}/{year}
        </div>

        {/* category */}
        <div
          className={
            localpreset.markdelete ? 'dropdown disable__hover' : 'dropdown'
          }
        >
          <button
            className={
              localpreset.category === 'Select Category'
                ? localpreset.markdelete
                  ? 'dropbtn markgraydelete disable__hover'
                  : 'dropbtn'
                : localpreset.markdelete
                ? 'dropbtn__afterchosencategory markgraydelete disable__hover'
                : 'dropbtn__afterchosencategory'
            }
          >
            {localpreset.category === 'Select Category' ? (
              'Select Category'
            ) : (
              <img
                src={getCategoryIcon(localpreset.category)}
                alt=''
                style={{
                  height: '20px',
                  width: '20px',
                }}
                name='edit category'
                onClick={onClick}
                className={
                  localpreset.markdelete
                    ? 'dropdown__categoryicon__grayedout'
                    : 'dropdown__categoryicon'
                }
              />
            )}
          </button>
          <div
            className={
              localpreset.markdelete
                ? 'dropdown-content markgraydelete disable__hover'
                : 'dropdown-content'
            }
          >
            <button name='Commute' onClick={onDropdownClick}>
              Commute
            </button>
            <button name='Car' onClick={onDropdownClick}>
              Car
            </button>
            <button name='Travel' onClick={onDropdownClick}>
              Travel
            </button>
            <button name='Food' onClick={onDropdownClick}>
              Food
            </button>
            <button name='Housing' onClick={onDropdownClick}>
              Housing
            </button>
            <button name='Insurance' onClick={onDropdownClick}>
              Insurance
            </button>
            <button name='Child benefit' onClick={onDropdownClick}>
              Child Benefit
            </button>
            <button name='Childcare' onClick={onDropdownClick}>
              Childcare
            </button>
            <button name='Salary' onClick={onDropdownClick}>
              Salary
            </button>
            <button name='Sport Activities' onClick={onDropdownClick}>
              Sport Activities
            </button>
            <button name='Clothing' onClick={onDropdownClick}>
              Clothing
            </button>
            <button name='Entertainment Electronics' onClick={onDropdownClick}>
              Entertainment Electronics
            </button>
            <button
              name='Entertainment Subscriptions'
              onClick={onDropdownClick}
            >
              Entertainment Subscriptions
            </button>
            <button name='Entertainment Hobby' onClick={onDropdownClick}>
              Entertainment Hobby
            </button>
            <button name='Phone' onClick={onDropdownClick}>
              Phone
            </button>
            <button name='Internet' onClick={onDropdownClick}>
              Internet
            </button>
            <button name='Computer' onClick={onDropdownClick}>
              Computer
            </button>
            <button name='Giving' onClick={onDropdownClick}>
              Giving
            </button>
            <button name='Student loan' onClick={onDropdownClick}>
              Student loan
            </button>
            <button name='Electrical bill' onClick={onDropdownClick}>
              Electrical bill
            </button>
            <button name='Bank fee' onClick={onDropdownClick}>
              Bank fee
            </button>
            <button name='Reminder Fee' onClick={onDropdownClick}>
              Reminder Fee
            </button>
          </div>
        </div>

        {/* delete */}
        <div className='btn-form modal-csvpresets__item'>
          <button
            className='btn text-primary modal-csvpresets__deletebtnadjust'
            value='delbtn'
            name={name}
            onMouseEnter={onHover}
            onMouseLeave={stopHover}
            onClick={onDelete}
          >
            {localpreset.markdelete === true ? (
              DelbtnColor === true ? (
                <AddSVG color='var(--success-color)' />
              ) : (
                <AddSVG color='var(--primary-color)' />
              )
            ) : DelbtnColor === true ? (
              <DeleteSVG fill='var(--danger-color)' />
            ) : (
              <DeleteSVG fill='var(--primary-color)' />
            )}
          </button>
        </div>
      </div>
    </Fragment>
  );
};
export default CsvPresetItem;
