import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import PrivateRoute from "./components/routing/PrivateRoute";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Landing from "./components/pages/Landing";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ResetPassword from "./components/auth/ResetPassword";
import PresetState from "./context/preset/PresetState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import CssState from "./context/css/CssState";
import GuideState from "./context/guide/GuideState";
import DateState from "./context/date/DateState";
import setAuthToken from "./utils/setAuthToken";
import LoginModal from "./components/auth/LoginModal";
import VerifyEmail from "./components/auth/VerifyEmail";
import NotFound from "./components/pages/NotFound";
import CloudinaryTest from "./components/pages/CloudinaryTest";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <PresetState>
        <DateState>
          <AlertState>
            <CssState>
              <GuideState>
                <BrowserRouter>
                  <Fragment>
                    <Navbar />
                    <div>
                      <Routes>
                        <Route path="/" element={<PrivateRoute component={Home} />} />
                        <Route path="/login" element={<LoginModal />} />
                        {/*TODO: /login route created becuase logout.tests failed ,needed? and viable?*/}
                        <Route path="/about" element={<About />} />
                        <Route path="/Landing" element={<Landing />} />
                        <Route path="/resetpassword/:id" element={<ResetPassword />} />
                        <Route path="/verifyemail/:verifyToken" element={<VerifyEmail />} />
                        <Route path="*" element={<CloudinaryTest />} />
                      </Routes>
                    </div>
                    <Footer />
                  </Fragment>
                </BrowserRouter>
              </GuideState>
            </CssState>
          </AlertState>
        </DateState>
      </PresetState>
    </AuthState>
  );
};

export default App;
