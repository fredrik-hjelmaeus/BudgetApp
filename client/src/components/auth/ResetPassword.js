import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { withRouter } from 'react-router-dom';
import personicon from '../layout/images/person.svg';
import { Redirect } from 'react-router-dom';
import Alerts from '../layout/Alerts';

export const ResetPassword = (props) => {
  // Authentication
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { error, clearErrors, resetPassword } = authContext;

  const [user, setUser] = useState({
    token: props.match.params.id,
    password: '',
    password2: '',
  });

  const [redir, setRedir] = useState(false);
  const [passwordSent, setPasswordSent] = useState(false);

  useEffect(() => {
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    } // eslint-disable-next-line
  }, [error]);

  const { token, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else if (password === password2) {
      resetPassword({ token, password });
      setPasswordSent(true);
    } else {
      setAlert('Passwords do not match', 'danger');
    }
  };

  /*  // Css: modal context
  const cssContext = useContext(CssContext);
  const { toggleModal } = cssContext; */

  const onClick = (e) => {
    //toggleModal(e.target.value);
    setRedir(true);
  };
  // modal activates, onClick deactivates modal, valid loginsubmit redirects by backend

  if (redir) {
    return <Redirect to='/Landing' />;
  } else {
    return (
      <React.Fragment>
        <div id='myModal' className='modal-login' style={{ display: 'block' }}>
          <div className='modal-content'>
            <span>
              <button className='closebtn' value='' onClick={onClick}></button>
            </span>
            <div className='modalloginheader'>
              <img src={personicon} alt='img'></img>
              <h1>Reset Password</h1>
            </div>
            <Alerts />
            {passwordSent ? (
              <div className='form-container'>
                <div className='all-center text-success bold py-3'>Password Changed</div>
                <button className='btn btn-outline btn-block bold' value='' onClick={onClick}>
                  Continue
                </button>
              </div>
            ) : (
              <div className='form-container'>
                <form onSubmit={onSubmit}>
                  <div className='form-text'>
                    <input placeholder='New Password' type='password' name='password' value={password} onChange={onChange} required />
                  </div>
                  <div className='form-text'>
                    <input
                      placeholder='Confirm New Password'
                      type='password'
                      name='password2'
                      value={password2}
                      onChange={onChange}
                      required
                    />
                  </div>

                  <input type='submit' value='SUBMIT' className='btn btn-dark btn-block btn-login' />
                </form>

                <button className='btn btn-outline btn-block' value='' onClick={onClick}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
};
//withRouter because loginmodal is child of landing and not directly connected to App.js
//so it is not inheriting props.history as Landing.js does because it is direct child to App.js
export default withRouter(ResetPassword);
