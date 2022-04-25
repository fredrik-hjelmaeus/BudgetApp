import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
                <Router>
                  <Fragment>
                    <Navbar />
                    <div>
                      <Switch>
                        {/* removed exact from all routes, see:
                        https://stackoverflow.com/questions/69866581/property-exact-does-not-exist-on-type */}
                        {/*  <Route path="/" element={<PrivateRoute component={Home} />} />
                        <Route path="about" element={<About />} />
                        <Route path="Landing" element={<Landing />} />
                        <Route path="resetpassword/:id" element={<ResetPassword />} /> */}
                        <PrivateRoute exact path="/" component={Home} />
                        {/*  <PrivateRoute path="/" component={Home} /> */}
                        <Route path="/Landing" component={Landing} />
                        <Route path="/about" component={About} />
                        <Route path="/resetpassword/:id" component={ResetPassword} />
                      </Switch>
                    </div>
                    <Footer />
                  </Fragment>
                </Router>
              </GuideState>
            </CssState>
          </AlertState>
        </DateState>
      </PresetState>
    </AuthState>
  );
};

export default App;
