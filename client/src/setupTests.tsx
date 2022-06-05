// add / install jest-dom so we get access to custom jest matchers to assert on DOM-nodes.
import "@testing-library/jest-dom";

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
  server.listen();
});
beforeEach(() => {
  // setup user authentication
  localStorage.setItem(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlZDcyZDE2Zjg5NWIxMTAwZGJhYjY2In0sImlhdCI6MTY0MzgxMDg2OX0.QvfZLV0HBznOEIMFOMAQNIsEpWjmEKtz6EqUNh9D--s"
  );
  const token = localStorage.getItem("token");
  if (token) {
    //   console.log("token is in localStorage!");
  } else {
    //  console.log("No token in localStorage, setting token");
  }
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  localStorage.clear();
});

// Clean up after the tests are finished.
afterAll(() => {
  server.close();
});

jest.setTimeout(25000);
