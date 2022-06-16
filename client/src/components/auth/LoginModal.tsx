import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import { Navigate } from "react-router-dom";

import CssContext from "../../context/css/cssContext";
//import personicon from "../layout/images/person.svg";
import Alerts from "../layout/Alerts";
import PersonIcon from "../layout/images/PersonIcon";

export const LoginModal = () => {
  // Authentication
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;

  const { login, errors, clearErrors, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    let isMounted = true;
    if (authContext?.isAuthenticated && isMounted) {
      toggleModal("");
    }

    if (errors.length > 0 && isMounted) {
      //     console.log("loginmodalerrors:", errors); // TODO: replace this with logging message to report wrong structured error message response
      errors.map((error) => error && console.log(error.msg));
      errors.map((error) => error && setAlert(error?.msg, "danger"));
      clearErrors();
    }

    return () => {
      // cancel the subscription
      isMounted = false;
    };

    // eslint-disable-next-line
  }, [errors, isAuthenticated]);

  const { email, password } = user;

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
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

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    toggleModal(e.currentTarget.value);
  };

  if (isAuthenticated) return <Navigate to="/" />;

  // modal activates, onClick deactivates modal, valid loginsubmit redirects by backend
  return (
    <React.Fragment>
      <div id="myModal" className="modal-login" style={{ display: "block" }}>
        <div className="modal-content">
          <span>
            <button className="closebtn" value="" onClick={onClick}></button>
          </span>

          <div className="modalloginheader">
            <div className="modalloginicon">
              {/* TODO: styling might be missing on PersonIcon, look in that component */}
              <PersonIcon />
            </div>
            {/*  <img src={personicon} alt="img" className="modalloginicon"></img> */}
            <h1> Account Login</h1>
          </div>

          <div className="form-container">
            <Alerts />

            <form onSubmit={onSubmit}>
              <div className="form-text">
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="form-text">
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />
              </div>

              <input type="submit" value="LOGIN" className="btn btn-dark btn-block btn-login" />
            </form>
            <button className="btn btn-outline btn-block" value="register" onClick={onClick}>
              Register
            </button>
            <button
              value="forgot"
              className="btn btn-block modallogin__forgotpassword"
              onClick={onClick}
            >
              Forgot Password
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginModal;
