import App from "../../../App";
import React from "react";
//import { render, fireEvent, waitFor, screen } from "../../../test-utils/context-wrapper";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { server } from "../../../mocks/server";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";

describe("Logout", () => {
  beforeEach(() => {
    render(<App />);
  });

  test.only("logoutbutton is displayed correctly when logged in", async () => {
    // setup endpoints to respond with a 200 status,token and user
    /* server.use(
      rest.post("http://localhost/api/auth", (req, res, ctx) => {
        return res(
          ctx.json({
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlZDcyZDE2Zjg5NWIxMTAwZGJhYjY2In0sImlhdCI6MTY0MzgxMDg2OX0.QvfZLV0HBznOEIMFOMAQNIsEpWjmEKtz6EqUNh9D--s",
          })
        );
      }),
      // get current user using token
      rest.get("http://localhost/api/auth", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "61ed72d16f895b1100dbab66",
            name: "dirk",
            email: "nisse@manpower.se",
            date: "2022-01-23T15:22:57.772Z",
            __v: 0,
          })
        );
      })
    ); */

    // fill in the login form,submit
    /*  const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, "nisse@manpower.se");
    const passwordField = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, "Passw0rd!");
    const submitLoginButton = screen.getByDisplayValue(/login/i);
    fireEvent.click(submitLoginButton); */

    const logoutBtn = await screen.findByRole("button", { name: /logout/i });
    expect(logoutBtn).toHaveValue("logout");
  });

  test("clicking logout takes you to landing page", async () => {
    fireEvent.click(await screen.findByRole("button", { name: /logout/i }));
    // expect to find a login button on the landing page
    await waitFor(async () => {
      expect(await screen.findByRole("button", { name: /login/i })).toBeInTheDocument();
    });
  });
});
