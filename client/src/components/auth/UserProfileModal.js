import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import CssContext from "../../context/css/cssContext";
import GuideContext from "../../context/guide/guideContext";
import personicon from "../layout/images/person.svg";
import AppGuideIcon from "../layout/images/AppGuideIcon.svg";
import Alerts from "../layout/Alerts";
import UserDetails from "./UserDetails";
import UserChangePassword from "./UserChangePassword";

const UserProfileModal = () => {
  // Context
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setUserExited, setGuide } = useContext(GuideContext);

  const { setAlert } = alertContext;
  const { user, errors, clearErrors, updateDetails, updatePassword, alerts, clearAlerts } =
    authContext;

  const cssContext = useContext(CssContext);
  const { toggleModal } = cssContext;

  // UseEffect
  useEffect(() => {
    if (alerts.length > 0) {
      alerts.map((alert) => setAlert(alert.msg, "success"));
      clearAlerts();
    }
    if (errors.length > 0) {
      //console.log("userprofilemodalerrors:", errors); // TODO: replace this with logging message to report wrong structured error message response
      errors.map((error) => error && error?.msg && setAlert(error?.msg, "danger"));
      clearErrors();
    }
  }, [errors, clearErrors, setAlert, alerts, clearAlerts]);

  // State
  const [localUser, setLocalUser] = useState({
    name: user ? user?.name : "",
    email: user ? user?.email : "",
    currentPassword: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2, currentPassword } = localUser;

  const [ExpandChangePassword, setExpandChangePassword] = useState(false);

  // Logic
  const onChange = (e) => setLocalUser({ ...localUser, [e.target.name]: e.target.value });

  const onSubmitProfile = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      setAlert("Please enter all fields", "danger");
      return;
    }
    if (name === user?.name && email === user?.email) {
      setAlert("No changes were made", "danger");
      return;
    }

    updateDetails({ name, email });
  };

  const onSubmitPassword = (e) => {
    e.preventDefault();
    if (currentPassword === "" || password === "" || password2 === "") {
      setAlert("Please enter all fields", "danger");
    }
    if (currentPassword === password) {
      setAlert("No changes were made as current password is the same as new password", "danger");
    }
    updatePassword({ currentPassword, password });
  };

  const onClick = (e) => {
    e.preventDefault();
    toggleModal("");
  };

  const onClickChangePassword = () => {
    setExpandChangePassword(true);
  };

  const startGuide = () => {
    setUserExited(false);

    toggleModal("");
    setGuide("1");
  };

  return (
    <div id="myModal" className="modal-register" style={{ display: "block" }}>
      <div className="modal-content-register" style={{ height: "auto" }}>
        <span>
          <button className="closebtn" value="close" onClick={onClick}></button>
        </span>

        <div className="modalloginheader">
          <img src={personicon} alt="img"></img>
          <h1>User Profile</h1>
        </div>

        <div className="form-container">
          <Alerts />
          {!ExpandChangePassword && (
            <UserDetails
              onSubmitProfile={onSubmitProfile}
              name={name}
              email={email}
              onChange={onChange}
            />
          )}

          {/*Change password button */}

          <button
            type="button"
            className={ExpandChangePassword ? "form__inputOFF" : "btn btn-light btn-block my-1"}
            value="changepassword"
            onClick={onClickChangePassword}
          >
            Change Password
          </button>

          <UserChangePassword
            ExpandChangePassword={ExpandChangePassword}
            setExpandChangePassword={setExpandChangePassword}
            password2={password2}
            currentPassword={currentPassword}
            password={password}
            onChange={onChange}
            onSubmitPassword={onSubmitPassword}
          />
          <button
            className={ExpandChangePassword ? "form__inputOFF" : "btn btn-light btn-block my-1"}
            type="button"
            onClick={startGuide}
          >
            App Guide <img src={AppGuideIcon} alt="start the app guide icon"></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
