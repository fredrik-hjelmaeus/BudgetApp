import React, { useEffect, useContext, MouseEvent } from "react";
import CssContext from "../../context/css/cssContext";
import Logo from "../layout/Logo";
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";
import ForgotPassword from "../auth/ForgotPassword";
import AuthContext from "../../context/auth/authContext";
import { Navigate } from "react-router-dom";

const Landing = () => {
  const cssContext = useContext(CssContext);
  const authContext = useContext(AuthContext);
  const { toggleNavbar, toggleModal, modal } = cssContext;
  const { isAuthenticated, token, loadUser, user } = authContext;

  const tryToAuthenticate = async () => {
    await loadUser();
  };

  useEffect(() => {
    if (token && !isAuthenticated && !user) {
      console.log("trying to authenticate");
      tryToAuthenticate();
    }

    if (user && isAuthenticated) {
      <Navigate to="/" />;
    }

    toggleNavbar(true);

    return () => {
      toggleModal("");
    };
    // eslint-disable-next-line
  }, [token, isAuthenticated, user]);

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLInputElement;
    toggleModal(target.value);
  };

  return (
    <div className="Landing__showcase">
      {modal === "login" && <LoginModal />}
      {modal === "register" && <RegisterModal />}
      {modal === "forgot" && <ForgotPassword />}
      {modal === "" && (
        <div className="Landing">
          <Logo />

          <div>
            <textarea
              className="Landing__textarea text-left text-light "
              name="description"
              defaultValue="An app that helps you organize your economy."
            ></textarea>
          </div>
          <div>
            {" "}
            <button className="Landing__btn__white all-center" value="login" onClick={onClick}>
              LOGIN
            </button>
          </div>
          <div>
            <button className="Landing__btn__black all-center" value="register" onClick={onClick}>
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
