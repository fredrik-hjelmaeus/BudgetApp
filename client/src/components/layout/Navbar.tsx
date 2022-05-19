import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import PresetContext from "../../context/preset/presetContext";
import CssContext from "../../context/css/cssContext";
//import logoicon2 from "./logo/logo_color.svg";
//import personicon from "../layout/images/person.svg";
//import logouticon from "../layout/images/logout.svg";
import PersonIcon from "./images/PersonIcon";
import Logo from "./Logo";
import LogoutIcon from "./images/LogoutIcon";

const Navbar = ({ title }: { title?: string }) => {
  const authContext = useContext(AuthContext);
  const presetContext = useContext(PresetContext);
  const cssContext = useContext(CssContext);
  const { isAuthenticated, logout, user } = authContext;
  const { clearPresets } = presetContext;
  const { toggleModal } = cssContext;

  const onLogout: React.MouseEventHandler<HTMLButtonElement> = () => {
    clearPresets();
    logout();
  };
  const onUserClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    toggleModal("profile");
  };

  const authLinks = (
    <Fragment>
      <li className="navbar__username navbar__titlenudge">
        <div style={{ width: "16px" }} className="inverted">
          {/* TODO: styling might be missing on PersonIcon, look in that component */}
          <PersonIcon />
        </div>
        {/*  <img src={personicon} alt="img" style={{ width: "16px" }} className="inverted"></img> */}
        <button className="btn-user" onClick={onUserClick}>
          {user && user.name.toUpperCase()}
        </button>
      </li>
      <li>
        <button
          onClick={onLogout}
          // href="/Landing" TODO: was this used for tooltip on hover?
          name="logout"
          value="logout"
          className=" btn navbar__logout "
        >
          {/* <img
            src={logouticon}
            alt="logout_button_image"
            style={{
              width: "24px",
              position: "relative",
              bottom: "0.1rem",
              backgroundColor: "none",
            }}
          ></img> */}
          <LogoutIcon />
          Logout
          {/* TODO: LogoutIcon probably missing some styling  */}
        </button>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <>
      {cssContext.navbar && (
        <div className="navbar bg-dark">
          <div className="navbar__inside">
            <h1 className="x-large navbar__titlenudge">
              {/* <img 
              className="navbar__icon"
              src={logoicon2}
              alt="logo"
              style={{
                width: "66px",
                padding: "0",
                position: "relative",
                top: "0.75rem",
              }}
            /> */}
              <Logo /> <span className="navbar__title"> {title}</span>
            </h1>
            <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
          </div>
        </div>
      )}
    </>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Budget App",
  icon: "fas fa-money-bill-wave-alt",
};

export default Navbar;
