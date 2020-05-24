import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react';
import PresetContext from '../../context/preset/presetContext';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import CheckBoxField from './CheckBoxField';
import SelectField from './SelectField';

const PresetForm = () => {
  const alertContext = useContext(AlertContext);
  const presetContext = useContext(PresetContext);
  const authContext = useContext(AuthContext);

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
    error,
  } = presetContext;
  const { setAlert } = alertContext;
  const { clearErrors } = authContext;
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
    if (error === 'No values recognised!') {
      setAlert(error, 'danger');
      clearErrors();
    }
    if (error === 'CSV does not contain valid Nordea-values!') {
      setAlert(error, 'danger');
      clearErrors();
    }
    if (error === 'Wrong filetype, only accepts csv!') {
      setAlert(error, 'danger');
      clearErrors();
    } // eslint-disable-next-line
  }, [error]);

  // Ref
  const inputRef = useRef();

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

  useEffect(() => {
    const sendFile = () => {
      const formData = new FormData();
      formData.append('file', selectedFile, selectedFileName);
      uploadCSV(formData);
      setSelectedFile('');
      setSelectedFileName('');
    };
    if (selectedFile !== '') {
      sendFile();
      setSelectedFile('');
      setSelectedFileName('');
    }
  }, [selectedFile, selectedFileName, uploadCSV]);

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
          <SelectField selectChange={selectChange} category={category} />
          <div className='presetform__optionsfield'>
            <CheckBoxField preset={preset} onChange={onChange} />
            <div>
              <input
                style={{ display: 'none' }}
                type='file'
                name='csvFile'
                onChange={onFileChange}
                ref={inputRef}
              />
              <button
                type='button'
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
