import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import PrivateRoute from './components/routing/PrivateRoute';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Landing from './components/pages/Landing';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Alerts from './components/layout/Alerts';

import PresetState from './context/preset/PresetState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import CssState from './context/css/CssState';
import GuideState from './context/guide/GuideState';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <PresetState>
        <AlertState>
          <CssState>
            <GuideState>
              <Router>
                <Fragment>
                  <Navbar />
                  <div>
                    <Alerts />
                    <Switch>
                      <PrivateRoute exact path='/' component={Home} />
                      <Route exact path='/about' component={About} />
                      <Route exact path='/Landing' component={Landing} />
                    </Switch>
                  </div>
                  <Footer />
                </Fragment>
              </Router>
            </GuideState>
          </CssState>
        </AlertState>
      </PresetState>
    </AuthState>
  );
};

export default App;
