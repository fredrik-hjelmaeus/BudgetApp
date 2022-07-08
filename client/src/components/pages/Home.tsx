import { useContext, useEffect, Fragment } from "react";
import PresetContext from "../../context/preset/presetContext";
import AuthContext from "../../context/auth/authContext";
import Month from "../presets/Month";
import Year from "../presets/Year";
import CssContext from "../../context/css/cssContext";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const authContext = useContext(AuthContext);
  const presetContext = useContext(PresetContext);

  const cssContext = useContext(CssContext);
  const { setNavbar, navbar, modal } = cssContext;

  const { month } = presetContext;

  let location = useLocation();

  useEffect(() => {
    // Handle when user clicks browser back button on modal
    if (modal !== "") {
      // prevents browser back button from going back to landing page if user tries to get back from modal
      window.history.pushState({ id: 1 }, "Home", "/");
    }
    // Use onpopstate to detect back button and then close the modal
    window.onpopstate = (e) => {
      if (location.pathname === "/" && modal !== "") {
        // should only try to close modal if you are logged in user.
        cssContext.toggleModal("");
      }
      // unsubscribe to onpopstate
      return () => {
        window.onpopstate = () => {};
      };
    };

    authContext?.loadUser(); // it always have to run because even if no user found we need to set loading to false
    navbar === false && setNavbar(true); // makes navbar persistent

    // eslint-disable-next-line
  }, [location, modal]);

  return <Fragment>{month === null ? <Year /> : <Month />}</Fragment>;
};

export default Home;
