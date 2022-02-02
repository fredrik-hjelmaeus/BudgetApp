import { render, screen, fireEvent, waitFor } from '../../../test-utils/context-wrapper';
import Landing from '../Landing';
import App from '../../../App';
import Home from '../Home';
import userEvent from '@testing-library/user-event';
import YearTitle from '../../presets/YearTitle';

test('Landing initial state', () => {
  render(<Landing />); //<- Create Virtual DOM
  const loginButton = screen.getByRole('button', { name: /Login/i }); //<- use screen to grab
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

  test.only('login happy path', async () => {
    render(<App />);
    const loginButton = screen.queryByText(/login/i); //<- use screen to grab
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
    await waitFor(async () => {
      //  const tempElement = screen.queryByPlaceholderText(/temp/i);
      //  expect(tempElement).toHaveTextContent(true);
      const yearTitleElement = await screen.findByRole('heading', { name: /yearly summary and comparison/i }, { exact: false });
      expect(yearTitleElement).toBeInTheDocument();
    });
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
