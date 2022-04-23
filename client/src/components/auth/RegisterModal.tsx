import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import CssContext from "../../context/css/cssContext";
import { RouteComponentProps, withRouter } from "react-router-dom";
//import personicon from '../layout/images/person.svg';
import PersonIcon from "../layout/images/PersonIcon";
import Alerts from "../layout/Alerts";

const RegisterModal = (props: RouteComponentProps) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, errors, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    let isMounted = true;
    if (isAuthenticated) {
      isMounted && toggleModal("");
      props.history.push("/");
    }
    if (errors.length > 0 && isMounted) {
      //console.log('registermodalerrors:', errors); // TODO: replace this with logging message to report wrong structured error message response
      errors.map((error) => error && setAlert(error?.msg, "danger"));
      clearErrors();
    }
    return () => {
      // cancel the subscription
      isMounted = false;
    };
  }, [errors, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  // Css: modal context
  const cssContext = useContext(CssContext);
  const { toggleModal } = cssContext;

  const onClick = () => {
    toggleModal("");
  };

  return (
    <div id="myModal" className="modal-register" style={{ display: "block" }}>
      <div className="modal-content-register">
        <span>
          <button className="closebtn" value="close" onClick={onClick}></button>
        </span>

        <div className="modalloginheader">
          <div className="modalloginicon">
            {/* TODO: styling might be missing on PersonIcon, look in that component */}
            <PersonIcon />
          </div>
          {/*  <img src={personicon} alt='img' className='modalloginicon'></img> */}
          <h1>Account Register</h1>
        </div>

        <div className="form-container">
          <Alerts />
          <form onSubmit={onSubmit}>
            <div className="form-text">
              <input
                type="name"
                placeholder="Name"
                name="name"
                value={name}
                onChange={onChange}
                required
              />
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
            <div className="form-text">
              <input
                placeholder="Confirm Password"
                type="password"
                name="password2"
                value={password2}
                onChange={onChange}
                required
                minLength={6}
              />
            </div>

            <button type="submit" className="btn btn-dark btn-block my-1" value="register">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
//withRouter because registermodal is child of landing and not directly connected to App.js
//so it is not inheriting props.history as Landing.js does because it is direct child to App.js
export default withRouter(RegisterModal);
