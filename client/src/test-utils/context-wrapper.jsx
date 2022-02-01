import React from 'react';
import { render } from '@testing-library/react';
//import { OrderDetailsProvider } from "../contexts/OrderDetails";
//import { OrderPhaseProvider } from "../contexts/OrderPhase";
import PresetState from '../context/preset/PresetState';
import AuthState from '../context/auth/AuthState';
import AlertState from '../context/alert/AlertState';
import CssState from '../context/css/CssState';
import { CssContextProvider } from '../context/css/CssContext';
import GuideState from '../context/guide/GuideState';
import DateState from '../context/date/DateState';
//import {AlertContextProvider } from "../context/alert/AlertState"

const AllTheProviders = ({ children }) => {
  return (
    <AuthState>
      <PresetState>
        <DateState>
          <AlertState>
            <CssState>
              <GuideState>{children}</GuideState>
            </CssState>
          </AlertState>
        </DateState>
      </PresetState>
    </AuthState>
  );
};

const renderWithContext = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithContext as render };
