import React from 'react';
import PresetContext from '../../context/preset/presetContext';
import AlertContext from '../../context/alert/alertContext';
import CssContext from '../../context/css/cssContext';
import Alerts from '../layout/Alerts';
import SelectSupportedFileFormat from './SelectSupportedFileFormat';

const SelectFile = () => {
  //context
  const alertContext = React.useContext(AlertContext);
  const presetContext = React.useContext(PresetContext);
  const cssContext = React.useContext(CssContext);
  const { toggleModal } = cssContext;
  const { setAlert } = alertContext;
  const { uploadCSV, error, csvpresets, clearPresetErrors } = presetContext;

  //state
  const [selectedFile, setSelectedFile] = React.useState('');
  const [selectedFileName, setSelectedFileName] = React.useState('');
  const [format, setFormat] = React.useState('RFC4180');

  // Ref
  const inputRef = React.useRef();

  //logic
  const onFileChange = (e) => {
    setSelectedFileName(e.target.files[0].name);
    setSelectedFile(e.target.files[0]);
    e.target.value = null; // resets value so same file can trigger onchange again.
  };

  const selectChange = (e) => {
    setFormat(e.target.value);
  };

  //useeffect listen for alerts from csvtojson-backend-middleware
  React.useEffect(() => {
    if (error === 'No values recognised!') {
      setAlert(error, 'danger');
      clearPresetErrors();
    }
    if (error === 'CSV does not contain valid Nordea-values!') {
      setAlert(error, 'danger');
      clearPresetErrors();
    }
    if (error === 'Wrong filetype, only accepts csv!') {
      setAlert(error, 'danger');
      clearPresetErrors();
    }
    if (error === 'CSV does not contain valid RFC4180-values!') {
      setAlert(error, 'danger');
      clearPresetErrors();
    }
    if (error === 'Invalid OFX file!') {
      setAlert(error, 'danger');
      clearPresetErrors();
    }
    if (error === 'Wrong filetype, only accepts ofx!') {
      setAlert(error, 'danger');
      clearPresetErrors();
    }
    if (error === 'CSV does not contain valid Swedbank-values!') {
      setAlert(error, 'danger');
      clearPresetErrors();
    }
    if (error === 'File does not contain valid Handelsbanken-values!') {
      setAlert(error, 'danger');
      clearPresetErrors();
    }
    // eslint-disable-next-line
  }, [error]);

  //useeffect run uploadCSV when file is selected
  React.useEffect(() => {
    const sendFile = () => {
      const formData = new FormData();
      formData.append(format, selectedFile, selectedFileName);
      uploadCSV(formData);
      setSelectedFile('');
      setSelectedFileName('');
    };
    if (selectedFile !== '') {
      sendFile();
      setSelectedFile('');
      setSelectedFileName('');
    }
  }, [selectedFile, selectedFileName, uploadCSV, format]);

  // detect if the uploadCSV resulted in valid csvs and then close this modal to give room for csvpresetcreatemodal
  React.useEffect(() => {
    if (format !== 'RFC4180') {
      csvpresets && toggleModal('');
    } else {
      csvpresets && toggleModal('SelectCSVfields');
    }
  }, [csvpresets, format, toggleModal]);

  //jsx
  return (
    <div id='myModal' className='modal-csvprompt' style={{ display: 'block' }}>
      {/* card */}
      <div className='selectfile__card selectfile__card__flex'>
        <h2>Select one of the supported file formats</h2>
        <p className='py-1 px list li'>For a default csv-formatting, choose RFC4180</p>
        {/* alert */}
        <Alerts />
        {/* Input */}
        <input style={{ display: 'none' }} type='file' name='csvFile' onChange={onFileChange} ref={inputRef} />
        {/* Select File Format */}
        <SelectSupportedFileFormat selectChange={selectChange} format={format} />
        {/* Buttons */}
        <button
          type='button'
          className='btn selectfile__upload all-center'
          onClick={() => {
            inputRef.current.click();
          }}
        >
          Upload
        </button>
        <button
          type='button'
          className='btn selectfile__upload selectfile__cancel all-center'
          /* className='btn modal-csvpresets__btn__addtobudget modal-csvpresets__btn__addtobudget__cancel ' */
          onClick={() => {
            toggleModal('');
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SelectFile;
