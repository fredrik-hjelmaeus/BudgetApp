import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "../../../test-utils/context-wrapper";
import userEvent from "@testing-library/user-event";
import App from "../../../App";
import { server } from "../../../mocks/server";
import { rest } from "msw";
import React from "react";

describe("not verified email modal", () => {
  test("NotVerifiedEmailModal renders when user tries to login with unverified email", async () => {
    render(<App />);
    // logout and go to login modal
    fireEvent.click(await screen.findByRole("button", { name: /logout/i }));
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // override normal 200 response from handlers and make it report error like backend:
    server.resetHandlers(
      // login endpoint
      rest.post("http://localhost/api/auth", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            errors: [
              {
                msg: "Email is not verified",
              },
            ],
          })
        );
      }),
      // get current user via token endpoint
      //fail to get user and will only try if token is found.
      rest.get("http://localhost/api/auth", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ errors: [{ msg: "No token, authorization denied" }] })
        );
      }),
      rest.get("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(ctx.json([]));
      })
    );

    render(<App />);
    // click login button
    const loginButton = await screen.findByRole("button", { name: /login/i }); //<- use screen to grab
    expect(loginButton).toBeInTheDocument();
    fireEvent.click(loginButton);

    // fill in login fields and press submit
    const loginModalH1element = screen.getByRole("heading", { name: /account login/i });

    expect(loginModalH1element).toBeInTheDocument();
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, "dsf@dsfds.se"); // does not matter
    const passwordField = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, "PPPPassw0rd!"); // does not matter
    const submitLoginButton = screen.getByDisplayValue(/login/i);
    fireEvent.click(submitLoginButton);

    expect(await screen.findByText("Email Not Verified")).toBeInTheDocument();
  });

  test("email is successfully sent to valid user", async () => {
    render(<App />);
    // logout and go to login modal
    fireEvent.click(await screen.findByRole("button", { name: /logout/i }));
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // override normal 200 response from handlers and make it report error like backend:
    server.resetHandlers(
      // login endpoint
      rest.post("http://localhost/api/auth", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            errors: [
              {
                msg: "Email is not verified",
              },
            ],
          })
        );
      }),
      // get current user via token endpoint
      //fail to get user and will only try if token is found.
      rest.get("http://localhost/api/auth", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ errors: [{ msg: "No token, authorization denied" }] })
        );
      }),
      rest.get("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(ctx.json([]));
      }),
      rest.post("http://localhost/api/auth/sendemailverification", (req, res, ctx) => {
        return res(
          ctx.json({
            msg: "Email Verification Sent",
          })
        );
      })
    );

    render(<App />);
    // click login button

    // fill in login fields and press submit
    const loginModalH1element = screen.getByRole("heading", { name: /account login/i });

    expect(loginModalH1element).toBeInTheDocument();
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, "dsf@dsfds.se"); // does not matter
    const passwordField = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, "PPPPassw0rd!"); // does not matter
    const submitLoginButton = screen.getByDisplayValue(/login/i);
    fireEvent.click(submitLoginButton);

    expect(await screen.findByText("Email Not Verified")).toBeInTheDocument();

    // fill in valid email and press submit
    const emailInput = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailInput, "nisse@manpower.se");

    fireEvent.click(screen.getByRole("button", { name: /send mail/i }));

    expect(await screen.findByText("Check your email to verify your account")).toBeInTheDocument();
  });

  test("email not sent when there is no user with that email", async () => {
    // alert: There is not user with that email
    render(<App />);
    // logout and go to login modal
    fireEvent.click(await screen.findByRole("button", { name: /logout/i }));
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // override normal 200 response from handlers and make it report error like backend:
    server.resetHandlers(
      // login endpoint
      rest.post("http://localhost/api/auth", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            errors: [
              {
                msg: "Email is not verified",
              },
            ],
          })
        );
      }),
      // get current user via token endpoint
      //fail to get user and will only try if token is found.
      rest.get("http://localhost/api/auth", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ errors: [{ msg: "No token, authorization denied" }] })
        );
      }),
      rest.get("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(ctx.json([]));
      }),
      rest.post("http://localhost/api/auth/sendemailverification", (req, res, ctx) => {
        return res(
          ctx.status(404),
          ctx.json({
            errors: [
              {
                msg: "There is no user with that email",
              },
            ],
          })
        );
      })
    );

    render(<App />);
    // fill in login fields and press submit
    const loginModalH1element = screen.getByRole("heading", { name: /account login/i });

    expect(loginModalH1element).toBeInTheDocument();
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, "dsf@dsfds.se"); // does not matter
    const passwordField = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, "PPPPassw0rd!"); // does not matter
    const submitLoginButton = screen.getByDisplayValue(/login/i);
    fireEvent.click(submitLoginButton);

    expect(await screen.findByText("Email Not Verified")).toBeInTheDocument();

    // fill in valid email and press submit
    const emailInput = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailInput, "notvalid@vvvv.se");

    fireEvent.click(screen.getByRole("button", { name: /send mail/i }));

    expect(await screen.findByText("There is no user with that email")).toBeInTheDocument();
  });
});
