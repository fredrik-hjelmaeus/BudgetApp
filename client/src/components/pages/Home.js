import React, { useContext, useEffect } from 'react';
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
    authContext.loadUser();
    navbar === false && toggleNavbar(navbar); // makes navbar persistent
    // eslint-disable-next-line
  }, []);

  return (
    <div className='container'>{month === null ? <Year /> : <Month />}</div>
  );
};

export default Home;
