import React, { FC, ReactNode, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";

import PresetState from "../context/preset/PresetState";
import AuthState from "../context/auth/AuthState";
import AlertState from "../context/alert/AlertState";
import CssState from "../context/css/CssState";
import GuideState from "../context/guide/GuideState";
import DateState from "../context/date/DateState";

import { BrowserRouter as Router } from "react-router-dom";

type AllTheProvidersProps = {
  children: ReactNode;
};

const AllTheProviders: FC<AllTheProvidersProps> = ({ children }) => {
  return (
    <AuthState>
      <PresetState>
        <DateState>
          <AlertState>
            <CssState>
              <GuideState>
                <Router>{children}</Router>
              </GuideState>
            </CssState>
          </AlertState>
        </DateState>
      </PresetState>
    </AuthState>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
