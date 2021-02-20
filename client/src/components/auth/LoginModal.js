import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { withRouter } from 'react-router-dom';
import CssContext from '../../context/css/cssContext';
import personicon from '../layout/images/person.svg';
import Alerts from '../layout/Alerts';

export const LoginModal = (props) => {
  // Authentication
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Please include a valid email') {
      setAlert(error, 'danger');
      clearErrors();
    } // eslint-disable-next-line
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    } // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login({
        email,
        password,
      });
    }
  };

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
            <img src={personicon} alt='img' className='modalloginicon'></img>
            <h1> Account Login</h1>
          </div>

          <div className='form-container'>
            <Alerts />
            <form onSubmit={onSubmit}>
              <div className='form-text'>
                <input type='email' placeholder='Email Address' name='email' value={email} onChange={onChange} required />
              </div>
              <div className='form-text'>
                <input placeholder='Password' type='password' name='password' value={password} onChange={onChange} required />
              </div>

              <input type='submit' value='LOGIN' className='btn btn-dark btn-block btn-login' />
            </form>
            <button className='btn btn-outline btn-block' value='register' onClick={onClick}>
              Register
            </button>
            <button value='forgot' className='btn btn-block modallogin__forgotpassword' onClick={onClick}>
              Forgot Password
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
//withRouter because loginmodal is child of landing and not directly connected to App.js
//so it is not inheriting props.history as Landing.js does because it is direct child to App.js
export default withRouter(LoginModal);
