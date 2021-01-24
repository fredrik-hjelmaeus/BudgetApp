import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import CssContext from '../../context/css/cssContext';
import GuideContext from '../../context/guide/guideContext';
import personicon from '../layout/person.svg';
import AppGuideIcon from '../layout/AppGuideIcon.svg';
import Alerts from '../layout/Alerts';
import UserDetails from './UserDetails';
import UserChangePassword from './UserChangePassword';

const UserProfileModal = () => {
  // Context
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setUserExited, setGuide } = useContext(GuideContext);

  const { setAlert } = alertContext;
  const { user, error, clearErrors, updateDetails, updatePassword } = authContext;

  const cssContext = useContext(CssContext);
  const { toggleModal } = cssContext;

  // UseEffect
  useEffect(() => {
    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    if (error === 'Password is incorrect') {
      setAlert(error, 'danger');
      clearErrors();
    }
    if (error === 'This email is already in use') {
      setAlert(error, 'danger');
      clearErrors();
    } // eslint-disable-next-line
  }, [error]);

  // State
  const [localUser, setLocalUser] = useState({
    name: user.name,
    email: user.email,
    currentPassword: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2, currentPassword } = localUser;

  const [ExpandChangePassword, setExpandChangePassword] = useState(false);

  // Logic
  const onChange = (e) => setLocalUser({ ...localUser, [e.target.name]: e.target.value });

  const onSubmitProfile = (e) => {
    e.preventDefault();
    if (name === '' || email === '') {
      setAlert('Please enter all fields', 'danger');
      return;
    }
    if (name === user.name && email === email.name) {
      setAlert('No changes were made', 'danger');
      return;
    }
    updateDetails({ name, email });
    console.log('submitProfile');
  };

  const onSubmitPassword = (e) => {
    e.preventDefault();
    if (currentPassword === '' || password === '' || password2 === '') {
      setAlert('Please enter all fields', 'danger');
    }
    if (currentPassword === password) {
      setAlert('No changes were made as current password is the same as new password', 'danger');
    }
    updatePassword({ currentPassword, password });
    console.log('submitpass');
  };

  const onClick = (e) => {
    console.log('togglemodalran');
    toggleModal('');
  };

  const onClickChangePassword = () => {
    setExpandChangePassword(true);
  };

  const startGuide = () => {
    setUserExited(false);

    toggleModal('');
    setGuide('1');
  };

  return (
    <div id='myModal' className='modal-register' style={{ display: 'block' }}>
      <div className='modal-content-register' style={{ height: 'auto' }}>
        <span>
          <button className='closebtn' value='close' onClick={onClick}></button>
        </span>

        <div className='modalloginheader'>
          <img src={personicon} alt='img'></img>
          <h1>User Profile</h1>
        </div>

        <div className='form-container'>
          <Alerts />
          <UserDetails onSubmitProfile={onSubmitProfile} name={name} email={email} onChange={onChange} />

          {/*Change password button */}
          <button
            type='button'
            className={ExpandChangePassword ? 'form__inputOFF' : 'btn btn-light btn-block my-1'}
            value='changepassword'
            onClick={onClickChangePassword}
          >
            Change Password
          </button>

          <UserChangePassword
            ExpandChangePassword={ExpandChangePassword}
            password2={password2}
            currentPassword={currentPassword}
            password={password}
            onChange={onChange}
            onSubmitPassword={onSubmitPassword}
          />
          <button className={'btn btn-light btn-block my-1'} type='button' onClick={startGuide}>
            App Guide <img src={AppGuideIcon} alt='start the app guide icon'></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
