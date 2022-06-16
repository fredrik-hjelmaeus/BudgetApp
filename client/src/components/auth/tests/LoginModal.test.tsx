import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
} from "../../../test-utils/context-wrapper";
import Landing from "../../pages/Landing";
import App from "../../../App";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { server } from "../../../mocks/server";

describe("login flow", () => {
  test("login button click activates login modal", () => {
    render(<Landing />);
    const loginButton = screen.getByRole("button", { name: /Login/i }); //<- use screen to grab
    fireEvent.click(loginButton);

    const loginModalH1element = screen.getByRole("heading", { name: /account login/i });
    expect(loginModalH1element).toBeInTheDocument();
  });

  test("login happy path", async () => {
    // startingstate: local storage has no token so we are directed to landing page
    server.use(
      // login endpoint
      rest.post("http://localhost/api/auth", (req, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({
            errors: [
              {
                msg: "Invalid Credentials",
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
          ctx.json({
            errors: [
              {
                msg: "No token, authorization denied",
              },
            ],
          })
        );
      })
    );

    render(<App />);

    // make sure we are at the landing page
    const welcomeText = await screen.findByText(/An app that helps you organize your economy./i);
    expect(welcomeText).toBeInTheDocument();

    // go to the login modal
    const loginButton = screen.queryByText(/login/i);
    expect(loginButton).toBeInTheDocument();
    loginButton && fireEvent.click(loginButton);
    const loginModalH1element = screen.queryByRole("heading", { name: /account login/i });
    expect(loginModalH1element).toBeInTheDocument();

    // setup endpoints to respond with a 200 status,token and user
    server.use(
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
    );

    // fill in the login form,submit
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, "nisse@manpower.se");
    const passwordField = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, "Passw0rd!");
    const submitLoginButton = screen.getByDisplayValue(/login/i);
    fireEvent.click(submitLoginButton);

    // make sure we left login form
    await waitForElementToBeRemoved(submitLoginButton);
    expect(submitLoginButton).not.toBeInTheDocument();

    // make sure we arrived to user home
    const loggedInUserNameAndButton = await screen.findByRole("button", { name: /dirk/i });
    expect(loggedInUserNameAndButton).toBeInTheDocument();

    // logout user
    const logoutButton = await screen.findByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);

    // check that we were logged out to landing page
    const welcomeTextAgain = await screen.findByText(
      /An app that helps you organize your economy./i
    );
    expect(welcomeTextAgain).toBeInTheDocument();
  });

  test("login email and password field is required", async () => {
    // startingstate: local storage has no token so we are directed to landing page
    server.use(
      // login endpoint
      rest.post("http://localhost/api/auth", (req, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({
            errors: [
              {
                msg: "Invalid Credentials",
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
      })
    );

    render(<App />);

    //go to login form
    const loginButton = await screen.findByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
    fireEvent.click(loginButton);

    // check the fields and make sure they have attribute required
    expect(await screen.findByRole("heading", { name: /account login/i })).toBeInTheDocument();
    const emailField = await screen.findByPlaceholderText(/Email Address/i);
    const passwordField = await screen.findByPlaceholderText(/password/i);
    expect(emailField.hasAttribute("required")).toBeTruthy();
    expect(passwordField.hasAttribute("required")).toBeTruthy();
  });
});

// Keep in bottom as it overwrites handlers.js success response
describe("login negative backend response", () => {
  // TODO: skipping this as it only succeeds when run in isolation, otherwise fails
  test.skip("login error invalid credentials path", async () => {
    // override normal 200 response from handlers and make it report error like backend:
    server.resetHandlers(
      // login endpoint
      rest.post("http://localhost/api/auth", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            errors: [
              {
                msg: "Invalid Credentials",
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
    userEvent.type(emailField, "dsf@dsfds.se");
    const passwordField = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, "AssfPassw0rd!");
    const submitLoginButton = screen.getByDisplayValue(/login/i);
    fireEvent.click(submitLoginButton);

    // expect error message to be shown
    const alertMessage = await screen.findByText(/Invalid credentials/i);
    expect(alertMessage).toBeInTheDocument();

    // try to login multiple times
    await new Promise((r) => setTimeout(r, 500));

    fireEvent.click(submitLoginButton);
    expect(alertMessage).toBeInTheDocument();

    await new Promise((r) => setTimeout(r, 500));

    fireEvent.click(submitLoginButton);
    expect(alertMessage).toBeInTheDocument();
  });
});
