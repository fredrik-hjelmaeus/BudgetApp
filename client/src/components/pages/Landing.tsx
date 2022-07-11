import { useEffect, useContext, MouseEvent } from "react";
import CssContext from "../../context/css/cssContext";
import Logo from "../layout/Logo";
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";
import ForgotPassword from "../auth/ForgotPassword";
import AuthContext from "../../context/auth/authContext";
import React from "react";
import { useNavigate } from "react-router-dom";
import NotVerifiedEmailModal from "../auth/NotVerifiedEmailModal";

const Landing = () => {
  const cssContext = useContext(CssContext);
  const authContext = useContext(AuthContext);
  const { setNavbar, toggleModal, modal } = cssContext;
  const { isAuthenticated, token, user } = authContext;
  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = React.useState<null | string>(null);

  const createUrl = () => {
    const width = (window.innerHeight * 2.5).toFixed(0);
    const height = (window.innerWidth * 2.5).toFixed(0);

    setImgUrl(
      `https://res.cloudinary.com/kirderfovane/image/upload/c_fit,h_${height},w_${width}/antelope-canyon-1868413_1920_2x_kx7qcy.png`
    );
  };

  useEffect(() => {
    createUrl();

    if (user && isAuthenticated) {
      setNavbar(true);
      navigate("/");
    }

    return () => {
      toggleModal("");
    };
    // eslint-disable-next-line
  }, [token, isAuthenticated, user]);

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLInputElement;
    toggleModal(target.value);
  };
  const imageStyle = imgUrl
    ? {
        backgroundImage: `url(${imgUrl})`,
      }
    : {};
  return (
    <div className={`Landing__showcase`} style={imageStyle}>
      {modal === "login" && <LoginModal />}
      {modal === "register" && <RegisterModal />}
      {modal === "forgot" && <ForgotPassword />}
      {modal === "notVerifiedEmailModal" && <NotVerifiedEmailModal />}
      {modal === "" && (
        <div className="Landing">
          <Logo title={"Budget App"} />

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
