import React, { useEffect, useContext } from 'react';
import CssContext from '../../context/css/cssContext';
import Logo from '../layout/Logo';

import LoginModal from '../auth/LoginModal';
import RegisterModal from '../auth/RegisterModal';

const Landing = () => {
  const cssContext = useContext(CssContext);
  const { navbar, toggleNavbar, toggleModal, modal } = cssContext;

  useEffect(() => {
    toggleNavbar(navbar);
    // eslint-disable-next-line
  }, []);

  const onClick = e => {
    toggleModal(e.target.value);
  };

  return (
    <div className='showcase'>
      {modal === 'login' && <LoginModal />}
      {modal === 'register' && <RegisterModal />}
      {modal === '' && (
        <div className='flexcolumn'>
          <Logo />

          <div>
            <textarea
              className='landingpagetextarea text-left lead text-light '
              name='description'
              defaultValue='An app that helps you organize your economy.'
            ></textarea>
          </div>
          <div>
            {' '}
            <button
              className='btn-white all-center'
              value='login'
              onClick={onClick}
            >
              LOGIN
            </button>
          </div>
          <div>
            <button
              className='btn-black all-center'
              value='register'
              onClick={onClick}
            >
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
