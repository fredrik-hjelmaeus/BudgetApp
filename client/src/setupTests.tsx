// add / install jest-dom so we get access to custom jest matchers to assert on DOM-nodes.
import "@testing-library/jest-dom";
import { rest } from "msw";
import React from "react";

// src/setupTests.js
import { server } from "./mocks/server";
// Establish API mocking before all tests.

// Tests will fail together with apex-charts. Below we mock all components using apex-charts.
// Many issues with apex-charts regarding this, for example this: https://github.com/apexcharts/react-apexcharts/issues/4
export default function mockComponent() {
  return <div>empty</div>;
}
// BarChart used in YearBalance-component.
jest.mock("./components/layout/BarChart", () => {
  return mockComponent;
});
// DonutChart used in Expense and Income-components
jest.mock("./components/layout/DonutChart", () => {
  return mockComponent;
});

beforeAll(() => {
  //console.log("beforeAll: starts a fake-backend-server");

  const token = localStorage.getItem("token");
  if (token) {
    //  console.log("token is in localStorage!");
  } else {
    //console.log("No token in localStorage, setting token");
  }
  server.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  // console.log("afterEach: resetting the handlers");
  server.resetHandlers();
  localStorage.clear();
});

// Clean up after the tests are finished.
afterAll(() => {
  // console.log("closing the fake-backend-server");
  server.close();
});

jest.setTimeout(25000);
