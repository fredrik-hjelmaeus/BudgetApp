import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

import CssContext from '../../context/css/cssContext';
import personicon from '../layout/images/person.svg';

import ForgotMailInput from './ForgotMailInput';
import ForgotMailSent from './ForgotMailSent';
import Alerts from '../layout/Alerts';

export const ForgotPassword = (props) => {
  // Authentication
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { errors, clearErrors, forgotPassword, mailsentmsg } = authContext;

  const [user, setUser] = useState({
    email: '',
  });

  const { email } = user;

  const [mailSent, setMailSent] = useState(false);
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '') {
      setAlert('Please fill in your email', 'danger');
    } else {
      forgotPassword({
        email,
      });
    }
  };

  useEffect(() => {
    if (mailsentmsg === null && errors.length > 0) {
      // console.log('forgotpasswordmodal:', errors); // TODO: replace this with logging message to report wrong structured error message response
      errors.map((error) => error && setAlert(error?.msg, 'danger'));
      clearErrors();
    } else {
      mailsentmsg && setMailSent(true);
    }
  }, [mailsentmsg, setAlert, clearErrors, errors]);
  // Css: modal context
  const cssContext = useContext(CssContext);
  const { toggleModal } = cssContext;

  const onClick = (e) => {
    toggleModal(e.target.value);
  };
  // modal activates, onClick deactivates modal, valid loginsubmit redirects by backend
  return (
    <React.Fragment>
      <div id='myModal' className='modal-login' style={{ display: 'block' }}>
        <div className='modal-content'>
          <span>
            <button className='closebtn' value='' onClick={onClick}></button>
          </span>

          <div className='modalloginheader'>
            <img src={personicon} alt='img'></img>
            <h1>Forgot Password</h1>
          </div>
          <Alerts />
          {mailSent ? (
            <ForgotMailSent email={email} />
          ) : (
            <ForgotMailInput email={email} onChange={onChange} onClick={onClick} onSubmit={onSubmit} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ForgotPassword;
