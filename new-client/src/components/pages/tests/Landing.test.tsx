import { render, screen, fireEvent } from "../../../test-utils/context-wrapper";
import Landing from "../Landing";
import App from "../../../App";
import { server } from "../../../mocks/server";
import { rest } from "msw";
import React from "react";

test("Landing page register button click activates register modal", () => {
  render(<Landing />);
  const regButton = screen.getByRole("button", { name: /Register/i }); //<- use screen to grab
  fireEvent.click(regButton);

  const registerModalH1element = screen.getByRole("heading", { name: /account register/i });
  expect(registerModalH1element).toBeInTheDocument();
});

test("forgot button click activates forgot modal", () => {
  render(<Landing />);
  //go inside login modal
  const loginButton = screen.getByRole("button", { name: /Login/i }); //<- use screen to grab
  fireEvent.click(loginButton);
  //click forgotbutton
  const forgotButton = screen.getByRole("button", { name: /forgot password/i }); //<- use screen to grab
  fireEvent.click(forgotButton);

  const forgotModalH1element = screen.getByRole("heading", { name: /forgot password/i });
  expect(forgotModalH1element).toBeInTheDocument();
});

// Issue here with apex-charts and react-apexcharts, remove BarChart from YearBalance-component when testing.
// ReziseObserver is not working. This problem has since a global fix in setupTests.js
test("Landing is loaded when not authenticated", async () => {
  // override endpoints so they do _not_ authenticate.
  server.use(
    // get current user via token endpoint
    //fail to get user and will only try if token is found.
    rest.get("http://localhost/api/auth", (req, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json({
          msg: "No token, authorization denied",
        })
      );
    }),
    // get users presets
    rest.get("http://localhost/api/userpreset", (req, res, ctx) => {
      return res(ctx.status(401), ctx.json([]));
    })
  );
  render(<App />); //<- Create Virtual DOM
  const loginButton = await screen.findByRole("button", { name: /Login/i });
  const welcomeText = await screen.findByText(/An app that helps you organize your economy./i);
  expect(welcomeText).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
  const registerButton = screen.getByRole("button", { name: /register/i });
  expect(registerButton).toBeInTheDocument();
});
