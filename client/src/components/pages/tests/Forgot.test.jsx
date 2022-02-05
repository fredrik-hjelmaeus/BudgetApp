import { render, screen, fireEvent } from '../../../test-utils/context-wrapper';
import userEvent from '@testing-library/user-event';
import App from '../../../App';
import { server } from '../../../mocks/server';
import { rest } from 'msw';

describe('forgot password modal', () => {
  test('email is successfully sent', async () => {
    render(<App />);
    // go to forgot password modal
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    const forgotButton = screen.getByRole('button', { name: /forgot/i });
    fireEvent.click(forgotButton);

    // fill in email field
    const emailField = screen.getByPlaceholderText(/email address/i);
    userEvent.type(emailField, 'validemail@valid.com');

    // click send mail button
    const sendMailButton = screen.getByRole('button', { name: /send mail/i });
    fireEvent.click(sendMailButton);

    const emailSentResponseText = await screen.findByText(/check your email to reset your password/i);
    expect(emailSentResponseText).toBeInTheDocument();
  });
  test('email field is required', async () => {
    render(<App />);
    // go to forgot password modal
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    const forgotButton = screen.getByRole('button', { name: /forgot/i });
    fireEvent.click(forgotButton);

    const emailField = screen.getByPlaceholderText(/email address/i);
    expect(emailField.hasAttribute('required')).toBeTruthy();
  });
  test.only('email sent show error when failing to connect with server', async () => {
    // override normal 200 response from handlers and make it report error like backend:
    server.resetHandlers(
      // login endpoint
      rest.post('http://localhost/api/auth', (req, res, ctx) => {
        return res(
          ctx.status(401),
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
      }),
      rest.post('http://localhost/api/users', (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            errors: [
              {
                value: 'gretsa@icom',
                msg: 'Please include a valid Email',
                param: 'email',
                location: 'body',
              },
            ],
          })
        );
      }),
      rest.post('http://localhost/api/auth/forgotpassword', (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            errors: [
              {
                value: 'newusergmail.com',
                msg: 'Please include a valid email',
                param: 'email',
                location: 'body',
              },
            ],
          })
        );
      })
    );
    render(<App />);
    // go to forgot password modal
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    const forgotButton = screen.getByRole('button', { name: /forgot/i });
    fireEvent.click(forgotButton);

    // fill in email field
    const emailField = screen.getByPlaceholderText(/email address/i);
    userEvent.type(emailField, 'validemail@valid.com');

    // click send mail button
    const sendMailButton = screen.getByRole('button', { name: /send mail/i });
    fireEvent.click(sendMailButton);

    // check for alert message
    const alertMessage = await screen.findByText(/Please include a valid email/i);
    expect(alertMessage).toBeInTheDocument();

    // check we are still in the form and not mail sent dialog
    const emailFieldAgain = await screen.findByPlaceholderText(/email address/i);
    expect(emailFieldAgain).toBeInTheDocument();
  });
});
