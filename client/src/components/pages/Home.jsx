import React, { useContext, useEffect, Fragment } from 'react';
import PresetContext from '../../context/preset/presetContext';
import AuthContext from '../../context/auth/authContext';
import Month from '../presets/Month';
import Year from '../presets/Year';
import CssContext from '../../context/css/cssContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  const presetContext = useContext(PresetContext);

  const cssContext = useContext(CssContext);

  const { navbar, toggleNavbar } = cssContext;

  const { month } = presetContext;

  useEffect(() => {
    //localStorage.token && authContext.loadUser();
    authContext.loadUser(); // it always have to run because even if no user found we need to set loading to false
    navbar === false && toggleNavbar(navbar); // makes navbar persistent

    // eslint-disable-next-line
  }, []);

  return <Fragment>{month === null ? <Year /> : <Month />}</Fragment>;
};

export default Home;
