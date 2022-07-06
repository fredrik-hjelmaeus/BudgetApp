import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import CssContext from "../../context/css/cssContext";
import PersonIcon from "../layout/images/PersonIcon";
import Alerts from "../layout/Alerts";
import VerifyMailSent from "./VerifyMailSent";
import VerifyMailInput from "./VerifyMailInput";

export const NotVerifiedEmailModal = () => {
  // Authentication
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { errors, clearErrors, sendEmailVerification, mailsentmsg } = authContext;

  const [user, setUser] = useState({
    email: "",
  });

  const [verifyStatus, setVerifyStatus] = useState<string>("verifying");

  const { email } = user;

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
    }
  };

  useEffect(() => {
    if (mailsentmsg === null && errors.length > 0) {
      // console.log('forgotpasswordmodal:', errors); // TODO: replace this with logging message to report wrong structured error message response
      errors.map((error) => error && setAlert(error?.msg, "danger"));
      clearErrors();
    } else {
      mailsentmsg && setVerifyStatus("mail sent");
    }
  }, [mailsentmsg, setAlert, clearErrors, errors]);
  // Css: modal context
  const cssContext = useContext(CssContext);
  const { toggleModal } = cssContext;

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    toggleModal(e.currentTarget.value);
  };
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
              <PersonIcon />
            </div>

            {verifyStatus !== "verified" && <h1>Email Not Verified</h1>}
          </div>
          <Alerts />
          {verifyStatus === "mail sent" ? (
            <VerifyMailSent email={email} setVerifyStatus={setVerifyStatus} />
          ) : (
            <VerifyMailInput
              email={email}
              onChange={onChange}
              onClick={onClick}
              onSubmit={onSubmit}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotVerifiedEmailModal;
