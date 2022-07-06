import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import { Navigate, useParams } from "react-router-dom";
import Alerts from "../layout/Alerts";
import VerifyMailSent from "./VerifyMailSent";

export const VerifyEmail = () => {
  const params = useParams(); // TODO : confirm this works, react router dom v6 new stuff.

  // Authentication
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { errors, clearErrors, sendEmailVerification, alerts, clearAlerts, verifyEmail } =
    authContext;

  const [user, setUser] = useState({
    token: params.verifyToken,
    email: "",
  });

  const [redir, setRedir] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState<string>("verifying");

  useEffect(() => {
    if (errors.length > 0) {
      errors.map(
        (error) => error && error.msg === "Expired or Invalid token" && setVerifyStatus("invalid")
      );
      clearErrors();
    }
    if (alerts.length > 0) {
      alerts.map((alert) => alert === "Email Verified" && setVerifyStatus("verified"));
      clearAlerts();
    }
  }, [errors, alerts]);

  const { token, email } = user;

  useEffect(() => {
    token && verifyEmail(token);
  }, []);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (email === "") {
      setAlert("Please fill in your email", "danger");
    } else {
      sendEmailVerification({
        email,
      });
      setVerifyStatus("mailsent");
    }
  };

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setRedir(true);
  };

  if (redir) {
    return <Navigate to="/Landing" />;
  } else {
    return (
      <React.Fragment>
        <div className="Landing__showcase">
          <div id="myModal" className="modal-login" style={{ display: "block" }}>
            <div className="modal-content">
              <span>
                <button className="closebtn" value="" onClick={onClick}></button>
              </span>

              <Alerts />
              {verifyStatus === "verified" ? (
                <div className="form-container">
                  <div className="all-center text-success bold py-3 large">Email Verified!</div>
                  <button className="btn btn-outline btn-block bold" value="" onClick={onClick}>
                    Continue to Login
                  </button>
                </div>
              ) : verifyStatus === "invalid" ? (
                <div className="form-container">
                  <form onSubmit={onSubmit}>
                    <div className="form-text">
                      Invalid or Expired Token. Please request a new link by providing your email
                      below.
                    </div>
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

                    <input
                      type="submit"
                      value="SEND MAIL"
                      className="btn btn-dark btn-block btn-login"
                    />
                  </form>

                  <button className="btn btn-outline btn-block" value="" onClick={onClick}>
                    Cancel
                  </button>
                </div>
              ) : verifyStatus === "verifying" ? (
                "verifying..."
              ) : (
                <VerifyMailSent email={email} setVerifyStatus={setVerifyStatus} />
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default VerifyEmail;
