import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import { Navigate, useParams } from "react-router-dom";
//import personicon from "../layout/images/person.svg";

import Alerts from "../layout/Alerts";
import PersonIcon from "../layout/images/PersonIcon";

export const ResetPassword = () => {
  const params = useParams(); // TODO : confirm this works, react router dom v6 new stuff.
  console.log(params);
  // Authentication
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { errors, clearErrors, resetPassword, alerts, clearAlerts } = authContext;

  const [user, setUser] = useState({
    token: params.id,
    password: "",
    password2: "",
  });

  const [redir, setRedir] = useState(false);
  const [passwordSent, setPasswordSent] = useState(false);

  useEffect(() => {
    if (errors.length > 0) {
      errors.map(
        (error) => error && error.msg !== "No token found" && setAlert(error.msg, "danger")
      );
      clearErrors();
    }
    if (alerts.length > 0) {
      alerts.map(
        (alert) => alert === "Password Changed" && setPasswordSent(true),
        setAlert("Password Changed", "success")
      );
      clearAlerts();
    }
    if (!params.id) {
      setRedir(true);
    }
  }, [errors, clearErrors, setAlert, alerts, clearAlerts, params]);

  const { token, password, password2 } = user;

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (password === "") {
      setAlert("Please fill in all fields", "danger");
    } else if (password === password2) {
      console.log("trying to reset password");
      token && resetPassword({ token, password });
    } else {
      setAlert("Passwords do not match", "danger");
    }
  };

  /*  // Css: modal context
  const cssContext = useContext(CssContext);
  const { toggleModal } = cssContext; */

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    //toggleModal(e.target.value);
    setRedir(true);
  };
  // modal activates, onClick deactivates modal, valid loginsubmit redirects by backend

  if (redir) {
    return <Navigate to="/Landing" />;
  } else {
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
              {/*  <img src={personicon} alt="img"></img> */}
              <h1>Reset Password</h1>
            </div>
            <Alerts />
            {passwordSent ? (
              <div className="form-container">
                <div className="all-center text-success bold py-3">Password Changed</div>
                <button className="btn btn-outline btn-block bold" value="" onClick={onClick}>
                  Continue
                </button>
              </div>
            ) : (
              <div className="form-container">
                <form onSubmit={onSubmit}>
                  <div className="form-text">
                    <input
                      placeholder="New Password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-text">
                    <input
                      placeholder="Confirm New Password"
                      type="password"
                      name="password2"
                      value={password2}
                      onChange={onChange}
                      required
                    />
                  </div>

                  <input
                    type="submit"
                    value="SUBMIT"
                    className="btn btn-dark btn-block btn-login"
                  />
                </form>

                <button className="btn btn-outline btn-block" value="" onClick={onClick}>
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

export default ResetPassword;
