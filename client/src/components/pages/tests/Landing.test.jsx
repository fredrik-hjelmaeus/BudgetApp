import { render, screen, fireEvent, waitFor } from '../../../test-utils/context-wrapper';
import Landing from '../Landing';
import App from '../../../App';
import Home from '../Home';
import userEvent from '@testing-library/user-event';
import YearTitle from '../../presets/YearTitle';
import { rest } from 'msw';
import { server } from '../../../mocks/server';

test.only('Landing initial state', async () => {
  // override normal 200 response from handlers and make it report error like backend:
  server.resetHandlers(
    rest.post('http://localhost/api/auth', (req, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json({
          errors: [
            {
              msg: 'No token, authorization denied',
            },
          ],
        })
      );
    }),
    //fail to get user
    rest.get('http://localhost/api/auth', (req, res, ctx) => {
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
    rest.get('http://localhost/api/userpreset', (req, res, ctx) => {
      return res(ctx.json([]));
    })
  );
  render(<App />); //<- Create Virtual DOM
  const loginButton = await screen.findByRole('button', { name: /Login/i });
  const welcomeText = await screen.findByText(/An app that helps you organize your economy./i);
  expect(welcomeText).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument(); //jest assert
  const registerButton = screen.getByRole('button', { name: /register/i });
  expect(registerButton).toBeInTheDocument();
});

describe('login flow', () => {
  test('login button click activates login modal', () => {
    render(<Landing />); //<- Create Virtual DOM
    const loginButton = screen.getByRole('button', { name: /Login/i }); //<- use screen to grab
    fireEvent.click(loginButton);

    const loginModalH1element = screen.getByRole('heading', { name: /account login/i });
    expect(loginModalH1element).toBeInTheDocument();
  });

  test('login happy path', async () => {
    render(<App />);
    const loginButton = await screen.queryByText(/login/i); //<- use screen to grab
    expect(loginButton).toBeInTheDocument();
    fireEvent.click(loginButton);

    const loginModalH1element = await screen.queryByRole('heading', { name: /account login/i });
    expect(loginModalH1element).toBeInTheDocument();
    const emailField = await screen.getByPlaceholderText(/Email Address/i);
    await userEvent.type(emailField, 'nisse@manpower.se');
    const passwordField = await screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, 'Passw0rd!');
    const submitLoginButton = await screen.getByDisplayValue(/login/i);
    fireEvent.click(submitLoginButton);
    await waitFor(async () => {
      //  const tempElement = screen.queryByPlaceholderText(/temp/i);
      //  expect(tempElement).toHaveTextContent(true);
      const yearTitleElement = await screen.findByRole('div', { name: /yearly summary and comparison/i }, { exact: false });
      expect(yearTitleElement).toBeInTheDocument();
    });
    // render(<YearTitle />);
  });

  test('login error path', async () => {
    // override normal 200 response from handlers and make it report error like backend:
    server.resetHandlers(
      rest.post('http://localhost/api/auth', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            errors: [
              {
                msg: 'No token, authorization denied',
              },
            ],
          })
        );
      }),
      //fail to get user
      rest.get('http://localhost/api/auth', (req, res, ctx) => {
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
      })
    );
    render(<App />);
    const loginButton = screen.queryByRole('button', { name: /login/i }); //<- use screen to grab
    expect(loginButton).toBeInTheDocument();
    fireEvent.click(loginButton);

    const loginModalH1element = screen.getByRole('heading', { name: /account login/i });
    expect(loginModalH1element).toBeInTheDocument();
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, 'nisse@manpower.se');
    const passwordField = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, 'Passw0rd!');
    const submitLoginButton = screen.getByDisplayValue(/login/i);
    fireEvent.click(submitLoginButton);
    await waitFor(() => {
      const submitLogButtonAgain = screen.queryByDisplayValue(/login/i);
      expect(submitLogButtonAgain).toBeInTheDocument();
    });
    /*     await waitFor(async () => {
      //  const tempElement = screen.queryByPlaceholderText(/temp/i);
      //  expect(tempElement).toHaveTextContent(true);
      const yearTitleElement = await screen.findByRole('heading', { name: /yearly summary and comparison/i }, { exact: false });
      expect(yearTitleElement).toBeInTheDocument();
    }); */
    // render(<YearTitle />);
  });
});

test('register button click activates register modal', () => {
  render(<Landing />); //<- Create Virtual DOM
  const regButton = screen.getByRole('button', { name: /Register/i }); //<- use screen to grab
  fireEvent.click(regButton);

  const registerModalH1element = screen.getByRole('heading', { name: /account register/i });
  expect(registerModalH1element).toBeInTheDocument();
});
test('forgot button click activates forgot modal', () => {
  render(<Landing />); //<- Create Virtual DOM
  //go inside login modal
  const loginButton = screen.getByRole('button', { name: /Login/i }); //<- use screen to grab
  fireEvent.click(loginButton);
  //click forgotbutton
  const forgotButton = screen.getByRole('button', { name: /forgot password/i }); //<- use screen to grab
  fireEvent.click(forgotButton);

  const forgotModalH1element = screen.getByRole('heading', { name: /forgot password/i });
  expect(forgotModalH1element).toBeInTheDocument();
});
