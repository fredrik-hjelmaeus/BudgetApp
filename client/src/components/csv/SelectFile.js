import React from 'react';
import PresetContext from '../../context/preset/presetContext';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import CssContext from '../../context/css/cssContext';
import Alerts from '../layout/Alerts';
const SelectFile = () => {
  //context
  const alertContext = React.useContext(AlertContext);
  const authContext = React.useContext(AuthContext);
  const presetContext = React.useContext(PresetContext);
  const cssContext = React.useContext(CssContext);
  const { toggleModal } = cssContext;
  const { setAlert } = alertContext;
  const { clearErrors } = authContext;
  const { uploadCSV, error, csvpresets } = presetContext;
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
  //useeffect listen for alerts from csvtojson-backend-middleware
  React.useEffect(() => {
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
  }, [selectedFile, selectedFileName, uploadCSV]);
  // detect if the uploadCSV resulted in valid csvs and then close this modal to give room for csvpresetcreatemodal
  React.useEffect(() => {
    csvpresets && toggleModal('');
  }, [csvpresets]);
  return (
    <div id='myModal' className='modal-csvprompt' style={{ display: 'block' }}>
      <div className='modal-csvpresets__card modal-csvpresets__card__flex'>
        Select File Type
        <Alerts />
        <input style={{ display: 'none' }} type='file' name='csvFile' onChange={onFileChange} ref={inputRef} />
        <button
          type='button'
          className='btn presetform__upload'
          onClick={() => {
            setFormat('RFC4180');
            inputRef.current.click();
          }}
        >
          RFC4180
        </button>
        <button
          type='button'
          className='btn presetform__upload'
          onClick={() => {
            setFormat('nordea');
            inputRef.current.click();
          }}
        >
          Nordea
        </button>
        <button
          type='button'
          className='btn presetform__upload'
          onClick={() => {
            setFormat('swedbank');
            inputRef.current.click();
          }}
        >
          Swedbank
        </button>
        <button
          type='button'
          className='btn presetform__upload'
          onClick={() => {
            setFormat('handelsbanken');
            inputRef.current.click();
          }}
        >
          Handelsbanken
        </button>
      </div>
    </div>
  );
};

export default SelectFile;
