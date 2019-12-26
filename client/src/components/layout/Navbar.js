import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import PresetContext from '../../context/preset/presetContext';
import CssContext from '../../context/css/cssContext';
import logoicon from './assessment-24px.svg';
import personicon from '../layout/person.svg';
import logouticon from '../layout/logout.svg';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const presetContext = useContext(PresetContext);
  const cssContext = useContext(CssContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearPresets } = presetContext;

  const onLogout = () => {
    logout();
    clearPresets();
  };
  const authLinks = (
    <Fragment>
      <li className='username titlenudge'>
        <img
          src={personicon}
          alt='img'
          style={{ width: '16px' }}
          className='inverted'
        ></img>
        {'  '}
        {user && user.name.toUpperCase()}
      </li>
      <li>
        <a onClick={onLogout} href='#!'>
          <img
            src={logouticon}
            alt='img'
            style={{ width: '24px', position: 'relative', bottom: '0.1rem' }}
          ></img>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    cssContext.navbar && (
      <div className='navbar bg-dark'>
        <div className='inside'>
          <h1 className='x-large titlenudge'>
            <img
              src={logoicon}
              alt='loading...'
              style={{
                width: '66px',
                padding: '0',
                position: 'relative',
                top: '0.75rem'
              }}
            />{' '}
            {title}
          </h1>
          <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
        </div>
      </div>
    )
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'Budget App',
  icon: 'fas fa-money-bill-wave-alt'
};

export default Navbar;
