import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import PrivateRoute from './components/routing/PrivateRoute';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Landing from './components/pages/Landing';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ResetPassword from './components/auth/ResetPassword';
import PresetState from './context/preset/PresetState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import CssState from './context/css/CssState';
import GuideState from './context/guide/GuideState';
import DateState from './context/date/DateState';
import setAuthToken from './utils/setAuthToken';

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
                        <PrivateRoute exact path='/' component={Home} />
                        <Route exact path='/Landing' component={Landing} />
                        <Route exact path='/about' component={About} />
                        <Route path='/resetpassword/:id' component={ResetPassword} />
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
