import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react';
import PresetContext from '../../context/preset/presetContext';
import AlertContext from '../../context/alert/alertContext';

const PresetForm = () => {
  const alertContext = useContext(AlertContext);
  const presetContext = useContext(PresetContext);

  const {
    presets,
    addPreset,
    edit,
    cancelEdit,
    sendEdit,
    calcSum,
    month,
    year,
    uploadCSV,
  } = presetContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (edit !== null) {
      setPreset(edit);
    } else {
      setPreset({
        name: '',
        number: '',
        month,
        year,
        category,
        type: 'overhead',
        piggybank: [{ month, year, savedAmount: 0 }],
      });
    }
    // eslint-disable-next-line
  }, [edit, month, presets]);

  const [expand, setExpand] = useState(false);

  const [preset, setPreset] = useState(
    {
      name: '',
      number: '',
      month,
      year,
      category: 'Select an category',
      type: 'overhead',
      piggybank: [{ month, year, savedAmount: '' }],
    },
    [presetContext, edit]
  );

  const onChange = (e) => {
    setPreset({ ...preset, [e.target.name]: e.target.value });
  };

  const [selectedFile, setSelectedFile] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');

  const selectChange = (e) => {
    setPreset({ ...preset, category: e.target.value });
  };

  useEffect(() => {
    selectedFile !== '' && sendFile();
    setSelectedFile('');
    setSelectedFileName('');
  }, [selectedFile]);

  // Ref
  const inputRef = useRef();

  const sendFile = () => {
    const formData = new FormData();
    formData.append('file', selectedFile, selectedFileName);
    uploadCSV(formData);
    setSelectedFile('');
    setSelectedFileName('');
  };

  const onFileChange = (e) => {
    setSelectedFileName(e.target.files[0].name);
    setSelectedFile(e.target.files[0]);
    e.target.value = null; // resets value so same file can trigger onchange again.
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (preset.category !== 'Select an category') {
      if (edit === null) {
        addPreset(preset);
        if (preset.name !== '' || preset.number !== '') {
          calcSum(preset.id, preset.number, 'add');
        }
      } else {
        if (
          preset.name !== '' ||
          preset.number !== '' ||
          preset.category !== 'Select an category'
        ) {
          sendEdit(preset);
        }
        cancelEdit();
      }
      if (preset.name === '' || preset.number === '') {
        setAlert('Please fill in both fields', 'danger');
      }

      setPreset({
        name: '',
        number: '',
        month,
        year,
        category,
        type: 'overhead',
      });
    } else {
      setAlert('Please select an category', 'danger');
    }
  };

  const clearAll = () => {
    cancelEdit();
  };

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const { name, number, category } = preset;

  return (
    <Fragment>
      {expand === true && (
        <button
          className='btn closebtn mt-1'
          value='close'
          onClick={toggleExpand}
        ></button>
      )}
      {expand === true && (
        <form onSubmit={onSubmit} className='presetform'>
          <h2 className='text-primary all-center presetformtitle'>
            {edit === null ? 'ADD TO BUDGET' : 'EDIT VALUE'}
          </h2>
          <span className='presetformspan'>
            <input
              className='presetformname'
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={onChange}
            />
            <input
              className='presetformnumber'
              type='text'
              placeholder='Number'
              name='number'
              value={number}
              onChange={onChange}
            />
          </span>
          <span className='presetformselectcategory'>
            <select
              onChange={selectChange}
              className='text-dark'
              value={category}
            >
              <option name='Select an category' value='Select an category'>
                Select an category
              </option>
              <option name='Commute' value='Commute'>
                Commute
              </option>
              <option name='Car' value='Car'>
                Car
              </option>
              <option name='Travel' value='Travel'>
                Travel
              </option>
              <option name='Food' value='Food'>
                Food
              </option>
              <option name='Housing' value='Housing'>
                Housing
              </option>
              <option name='Insurance' value='Insurance'>
                Insurance
              </option>
              <option name='Child benefit' value='Child benefit'>
                Child benefit
              </option>
              <option name='Childcare' value='Childcare'>
                Childcare
              </option>
              <option name='Salary' value='Salary'>
                Salary
              </option>
              <option name='Sport Activities' value='Sport Activities'>
                Sport Activities
              </option>
              <option name='Clothing' value='Clothing'>
                Clothing
              </option>
              <option
                name='Entertainment Electronics'
                value='Entertainment Electronics'
              >
                Entertainment Electronics
              </option>
              <option
                name='Entertainment Subscriptions'
                value='Entertainment Subscriptions'
              >
                Entertainment Subscriptions
              </option>
              <option name='Entertainment Hobby' value='Entertainment Hobby'>
                Entertainment Hobby
              </option>
              <option name='Phone' value='Phone'>
                Phone
              </option>
              <option name='Internet' value='Internet'>
                Internet
              </option>
              <option name='Computer' value='Computer'>
                Computer
              </option>
              <option name='Giving' value='Giving'>
                Giving
              </option>
              <option name='Student loan' value='Student loan'>
                Student loan
              </option>
              <option name='Electrical bill' value='Electrical bill'>
                Electrical bill
              </option>
              <option name='Reminderfees' value='Reminderfees'>
                Reminderfees
              </option>
              <option name='Bank fee' value='Bank fee'>
                Bank fee
              </option>
            </select>
          </span>
          <div className='presetform__optionsfield'>
            <div className='presetform__addTofields'>
              <h5 className='text-gray'>Add to</h5>
              <span className='grid-2 my-1'>
                <label className='presetformtypecheckboxcontainer'>
                  Overhead
                  <input
                    type='checkbox'
                    name='type'
                    value='overhead'
                    checked={preset.type === 'overhead'}
                    onChange={onChange}
                  />
                  <span className='presetformcheckbox'></span>
                </label>
                <label className='presetformtypecheckboxcontainer'>
                  Purchase
                  <input
                    type='checkbox'
                    name='type'
                    value='purchase'
                    checked={preset.type === 'purchase'}
                    onChange={onChange}
                  />
                  <span className='presetformcheckbox'></span>
                </label>
                <label className='presetformtypecheckboxcontainer'>
                  Savings
                  <input
                    type='checkbox'
                    name='type'
                    value='savings'
                    checked={preset.type === 'savings'}
                    onChange={onChange}
                  />
                  <span className='presetformcheckbox'></span>
                </label>
                <label className='presetformtypecheckboxcontainer'>
                  Capital
                  <input
                    type='checkbox'
                    name='type'
                    value='capital'
                    checked={preset.type === 'capital'}
                    onChange={onChange}
                  />{' '}
                  <span className='presetformcheckbox'></span>
                </label>
              </span>
            </div>
            <div>
              <input
                style={{ display: 'none' }}
                type='file'
                name='csvFile'
                onChange={onFileChange}
                ref={inputRef}
              />
              <button
                className='btn presetform__upload'
                onClick={() => {
                  inputRef.current.click();
                }}
              >
                {' '}
                Upload CSV-file
              </button>
            </div>
          </div>

          <div>
            <input
              type='submit'
              value={edit === null ? 'ADD TO BUDGET' : 'UPDATE'}
              className='btn btn-presetformadd'
            />
          </div>
          {edit && (
            <div>
              <button className='btn btn-light btn-block' onClick={clearAll}>
                Cancel Edit
              </button>
            </div>
          )}
        </form>
      )}
      {expand === false && (
        <div className='presetformclosed'>
          <button className='btn btn-presetformadd' onClick={toggleExpand}>
            ADD TO BUDGET
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default PresetForm;
