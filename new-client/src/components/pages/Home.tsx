import React, { useContext, useEffect, Fragment } from "react";
import PresetContext from "../../context/preset/presetContext";
import AuthContext from "../../context/auth/authContext";
import Month from "../presets/Month";
import Year from "../presets/Year";
import CssContext from "../../context/css/cssContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  const presetContext = useContext(PresetContext);

  const cssContext = useContext(CssContext);

  //const { toggleNavbar, navbar } = cssContext;

  const { month } = presetContext;
  console.log("home component here");
  useEffect(() => {
    console.log("Home useEffect here");
    //localStorage.token && authContext.loadUser();
    authContext?.loadUser(); // it always have to run because even if no user found we need to set loading to false
    cssContext?.navbar === false && cssContext?.toggleNavbar(cssContext?.navbar); // makes navbar persistent

    // eslint-disable-next-line
  }, []);

  return <Fragment>{month === null ? <Year /> : <Month />}</Fragment>;
};

export default Home;
