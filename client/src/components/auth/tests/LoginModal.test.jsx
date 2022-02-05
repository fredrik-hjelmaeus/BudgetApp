import { render, screen, fireEvent, waitForElementToBeRemoved } from '../../../test-utils/context-wrapper';
import Landing from '../../pages/Landing';
import App from '../../../App';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { server } from '../../../mocks/server';

describe('login flow', () => {
  test('login button click activates login modal', () => {
    render(<Landing />);
    const loginButton = screen.getByRole('button', { name: /Login/i }); //<- use screen to grab
    fireEvent.click(loginButton);

    const loginModalH1element = screen.getByRole('heading', { name: /account login/i });
    expect(loginModalH1element).toBeInTheDocument();
  });

  test.only('login happy path', async () => {
    render(<App />);
    // startingstate: local storage has no token so we are directed to landing page

    // make sure we are at the landing page
    const welcomeText = await screen.findByText(/An app that helps you organize your economy./i);
    expect(welcomeText).toBeInTheDocument();

    // go to the login modal
    const loginButton = screen.queryByText(/login/i);
    expect(loginButton).toBeInTheDocument();
    fireEvent.click(loginButton);
    const loginModalH1element = screen.queryByRole('heading', { name: /account login/i });
    expect(loginModalH1element).toBeInTheDocument();

    // fill in the login form,submit
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, 'nisse@manpower.se');
    const passwordField = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, 'Passw0rd!');
    const submitLoginButton = screen.getByDisplayValue(/login/i);
    fireEvent.click(submitLoginButton);

    // make sure we left login form
    await waitForElementToBeRemoved(submitLoginButton);
    expect(submitLoginButton).not.toBeInTheDocument();

    // make sure we arrived to user home
    const loggedInUserWelcomeElement = await screen.findByRole('heading', { name: /welcome dirk!/i });
    expect(loggedInUserWelcomeElement).toBeInTheDocument();

    // logout user
    const logoutButton = await screen.findByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);

    // check that we were logged out to landing page
    const welcomeTextAgain = await screen.findByText(/An app that helps you organize your economy./i);
    expect(welcomeTextAgain).toBeInTheDocument();
  });

  test('login email and password field is required', async () => {
    render(<App />);
    // startingstate: local storage has no token so we are directed to landing page

    //go to login form
    const loginButton = screen.queryByText(/login/i);
    expect(loginButton).toBeInTheDocument();
    fireEvent.click(loginButton);

    // check the fields and make sure they have attribute required
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    const passwordField = screen.getByPlaceholderText(/password/i);
    expect(emailField.hasAttribute('required')).toBeTruthy();
    expect(passwordField.hasAttribute('required')).toBeTruthy();
  });
});

// Keep in bottom as it overwrites handlers.js success response
describe('login negative backend response', () => {
  test('login error invalid credentials path', async () => {
    // override normal 200 response from handlers and make it report error like backend:
    server.resetHandlers(
      // login endpoint
      rest.post('http://localhost/api/auth', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            errors: [
              {
                msg: 'Invalid Credentials',
              },
            ],
          })
        );
      }),
      // get current user via token endpoint
      //fail to get user and will only try if token is found.
      rest.get('http://localhost/api/auth', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            msg: 'No token, authorization denied',
          })
        );
      }),
      rest.get('http://localhost/api/userpreset', (req, res, ctx) => {
        return res(ctx.json([]));
      })
    );

    render(<App />);
    // click login button
    const loginButton = await screen.findByRole('button', { name: /login/i }); //<- use screen to grab
    expect(loginButton).toBeInTheDocument();
    fireEvent.click(loginButton);

    // fill in login fields and press submit
    const loginModalH1element = screen.getByRole('heading', { name: /account login/i });
    expect(loginModalH1element).toBeInTheDocument();
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, 'dsf@dsfds.se');
    const passwordField = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, 'AssfPassw0rd!');
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
