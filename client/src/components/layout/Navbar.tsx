import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import PresetContext from "../../context/preset/presetContext";
import CssContext from "../../context/css/cssContext";
import PersonIcon from "./images/PersonIcon";
import LogoutIcon from "./images/LogoutIcon";
import { LogoIcon } from "./logo/LogoIcon";

const Navbar = ({ title }: { title?: string }) => {
  const authContext = useContext(AuthContext);
  const presetContext = useContext(PresetContext);
  const cssContext = useContext(CssContext);
  const { isAuthenticated, logout, user } = authContext;
  const { clearPresets } = presetContext;
  const { toggleModal, setNavbar } = cssContext;

  const onLogout: React.MouseEventHandler<HTMLButtonElement> = () => {
    clearPresets();
    setNavbar(false);
    logout();
  };
  const onUserClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    toggleModal("profile");
  };

  const authLinks = (
    <Fragment>
      <li className="navbar__mobile_icon">
        <LogoIcon />
      </li>
      <li className="navbar__username navbar__titlenudge">
        <div style={{ width: "16px" }} className="inverted">
          <PersonIcon />
        </div>

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
          <LogoutIcon />
          Logout
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
              <span className="navbar__logotexttitle">
                <LogoIcon width="66px" /> Budget App
              </span>
            </h1>
            <ul className="navbar__layout_mobile">{isAuthenticated ? authLinks : guestLinks}</ul>
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
