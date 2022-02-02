import { render, screen, fireEvent } from '../../../test-utils/context-wrapper';
//import App from '../../../App';
import { BrowserRouter } from 'react-router-dom';
import Landing from '../Landing';

test('Landing initial state', () => {
  render(<Landing />); //<- Create Virtual DOM
  const loginButton = screen.getByRole('button', { name: /Login/i }); //<- use screen to grab
  expect(loginButton).toBeInTheDocument(); //jest assert
  const registerButton = screen.getByRole('button', { name: /register/i });
  expect(registerButton).toBeInTheDocument();
});

test('login button click activates login modal', () => {
  render(<Landing />); //<- Create Virtual DOM
  const loginButton = screen.getByRole('button', { name: /Login/i }); //<- use screen to grab
  fireEvent.click(loginButton);

  const loginModalH1element = screen.getByRole('heading', { name: /account login/i });
  expect(loginModalH1element).toBeInTheDocument();
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
