import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import PresetContext from '../../context/preset/presetContext';
import CssContext from '../../context/css/cssContext';
import logoicon2 from './logo/logo_color.svg';
import personicon from '../layout/images/person.svg';
import logouticon from '../layout/images/logout.svg';

const Navbar = ({ title }) => {
  const authContext = useContext(AuthContext);
  const presetContext = useContext(PresetContext);
  const cssContext = useContext(CssContext);
  const { isAuthenticated, logout, user } = authContext;
  const { clearPresets } = presetContext;
  const { toggleModal } = cssContext;

  const onLogout = () => {
    logout();
    clearPresets();
  };
  const onUserClick = (e) => {
    toggleModal('profile');
  };
  const authLinks = (
    <Fragment>
      <li className='navbar__username navbar__titlenudge'>
        <img src={personicon} alt='img' style={{ width: '16px' }} className='inverted'></img>
        <button className='btn-user' onClick={onUserClick}>
          {user && user.name.toUpperCase()}
        </button>
      </li>
      <li>
        <a onClick={onLogout} href='#!'>
          <img src={logouticon} alt='img' style={{ width: '24px', position: 'relative', bottom: '0.1rem' }}></img>
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
        <div className='navbar__inside'>
          <h1 className='x-large navbar__titlenudge'>
            <img
              className='navbar__icon'
              src={logoicon2}
              alt='logo'
              style={{
                width: '66px',
                padding: '0',
                position: 'relative',
                top: '0.75rem',
              }}
            />{' '}
            <span className='navbar__title'> {title}</span>
          </h1>
          <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
        </div>
      </div>
    )
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Budget App',
  icon: 'fas fa-money-bill-wave-alt',
};

export default Navbar;
