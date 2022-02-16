import { render, screen, fireEvent, waitForElementToBeRemoved } from '../../../test-utils/context-wrapper';
import App from '../../../App';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { server } from '../../../mocks/server';

describe('register flow', () => {
  test('Register happy path', async () => {
    // setup startingstate: local storage has no token so we are directed to landing page
    server.use(
      rest.get('http://localhost/api/auth', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            msg: 'No token, authorization denied',
          })
        );
      })
    );
    render(<App />);

    // make sure we are at the landing page
    const welcomeText = await screen.findByText(/An app that helps you organize your economy./i);
    expect(welcomeText).toBeInTheDocument();

    // go to the register modal
    const registerButton = screen.queryByText(/register/i);
    expect(registerButton).toBeInTheDocument();
    fireEvent.click(registerButton);
    const registerModalH1element = screen.queryByRole('heading', { name: /account register/i });
    expect(registerModalH1element).toBeInTheDocument();

    // fill in the register form
    const nameField = screen.getByPlaceholderText(/name/i);
    userEvent.type(nameField, 'nisse');
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, 'nisse@manpower.se');
    const passwordField = screen.getByPlaceholderText('Password');
    userEvent.type(passwordField, 'Passw0rd!');
    const passwordConfirmField = screen.getByPlaceholderText(/Confirm Password/i);
    userEvent.type(passwordConfirmField, 'Passw0rd!');

    // setup positive server response on submit
    server.use(
      // get current user using token
      rest.get('http://localhost/api/auth', (req, res, ctx) => {
        return res(
          ctx.json({
            _id: '61ed72d16f895b1100dbab66',
            name: 'dirk',
            email: 'nisse@manpower.se',
            date: '2022-01-23T15:22:57.772Z',
            __v: 0,
          })
        );
      })
    );

    // submit register form
    const submitRegisterButton = screen.getByRole('button', { name: /register/i });
    fireEvent.click(submitRegisterButton);

    // make sure we left register form
    await waitForElementToBeRemoved(submitRegisterButton);
    expect(submitRegisterButton).not.toBeInTheDocument();

    // make sure we arrived to user home
    const loggedInUserNameAndButton = await screen.findByRole('button', { name: /dirk/i });
    expect(loggedInUserNameAndButton).toBeInTheDocument();

    // logout user
    const logoutButton = await screen.findByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);

    // check that we were logged out to landing page
    const welcomeTextAgain = await screen.findByText(/An app that helps you organize your economy./i);
    expect(welcomeTextAgain).toBeInTheDocument();
  });

  test('Register fail when passwords do not match', async () => {
    // setup startingstate: local storage has no token so we are directed to landing page
    server.use(
      rest.get('http://localhost/api/auth', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            msg: 'No token, authorization denied',
          })
        );
      })
    );
    render(<App />);

    // make sure we are at the landing page
    const welcomeText = await screen.findByText(/An app that helps you organize your economy./i);
    expect(welcomeText).toBeInTheDocument();

    // go to the register modal
    const registerButton = await screen.findByRole('button', { name: /register/i });
    expect(registerButton).toBeInTheDocument();
    fireEvent.click(registerButton);
    const registerModalH1element = screen.queryByRole('heading', { name: /account register/i });
    expect(registerModalH1element).toBeInTheDocument();

    // fill in the register form,submit
    const nameField = screen.getByPlaceholderText(/name/i);
    userEvent.type(nameField, 'nisse');
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, 'nisse@manpower.se');
    const passwordField = screen.getByPlaceholderText('Password');
    userEvent.type(passwordField, 'Passw0rd!');
    const passwordConfirmField = screen.getByPlaceholderText(/Confirm Password/i);
    userEvent.type(passwordConfirmField, 'assw0rd!');
    const submitRegisterButton = screen.getByRole('button', { name: /register/i });
    fireEvent.click(submitRegisterButton);

    // verify we see an error message
    const alertMessage = await screen.findByText(/Passwords do not match/i);
    expect(alertMessage).toBeInTheDocument();
  });
});

describe('register negative backend response', () => {
  test('register shows error message when invalid EMAIL is submitted', async () => {
    // override normal 200 response from handlers and make it report error like backend:
    server.use(
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
      })
    );
    render(<App />);
    // startingstate: local storage has no token so we are directed to landing page

    // go to the register modal
    const registerButton = await screen.findByRole('button', { name: /register/i });
    expect(registerButton).toBeInTheDocument();
    fireEvent.click(registerButton);
    const registerModalH1element = screen.queryByRole('heading', { name: /account register/i });
    expect(registerModalH1element).toBeInTheDocument();

    // fill in the register form,submit
    const nameField = screen.getByPlaceholderText(/name/i);
    userEvent.type(nameField, 'nisse');
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, 'nisse@ower');
    const passwordField = screen.getByPlaceholderText('Password');
    userEvent.type(passwordField, 'Passsw0rd!');
    const passwordConfirmField = screen.getByPlaceholderText(/Confirm Password/i);
    userEvent.type(passwordConfirmField, 'Passsw0rd!');
    const submitRegisterButton = screen.getByRole('button', { name: /register/i });
    fireEvent.click(submitRegisterButton);

    //Expect AlertMessage: Please include a valid Email to be shown
    const alertMessage = await screen.findByText(/Please include a valid Email/i);
    expect(alertMessage).toBeInTheDocument();
  });

  test('register shows error message when invalid PASSWORD is submitted', async () => {
    // override normal 200 response from handlers and make it report error like backend:
    server.use(
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
                msg: 'The password must be 6+ chars long and contain a number',
                param: 'email',
                location: 'body',
              },
            ],
          })
        );
      })
    );
    render(<App />);
    // startingstate: local storage has no token so we are directed to landing page

    // go to the register modal
    const registerButton = await screen.findByRole('button', { name: /register/i });
    expect(registerButton).toBeInTheDocument();
    fireEvent.click(registerButton);
    const registerModalH1element = screen.queryByRole('heading', { name: /account register/i });
    expect(registerModalH1element).toBeInTheDocument();

    // fill in the register form,submit
    const nameField = screen.getByPlaceholderText(/name/i);
    userEvent.type(nameField, 'nisse');
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, 'nisse@ower.com');
    const passwordField = screen.getByPlaceholderText('Password');
    userEvent.type(passwordField, 'pswarb');
    const passwordConfirmField = screen.getByPlaceholderText(/Confirm Password/i);
    userEvent.type(passwordConfirmField, 'pswarb');
    const submitRegisterButton = screen.getByRole('button', { name: /register/i });
    fireEvent.click(submitRegisterButton);

    //Expect AlertMessage: The password must be 6+ chars long and contain a number
    const alertMessage = await screen.findByText('The password must be 6+ chars long and contain a number');
    expect(alertMessage).toBeInTheDocument();
  });

  test('register shows error message when user email is already in database', async () => {
    // override normal 200 response from handlers and make it report error like backend:
    server.use(
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
                msg: 'User already exists',
                param: 'email',
                location: 'body',
              },
            ],
          })
        );
      })
    );
    render(<App />);
    // startingstate: local storage has no token so we are directed to landing page

    // go to the register modal
    const registerButton = await screen.findByRole('button', { name: /register/i });
    expect(registerButton).toBeInTheDocument();
    fireEvent.click(registerButton);
    const registerModalH1element = screen.queryByRole('heading', { name: /account register/i });
    expect(registerModalH1element).toBeInTheDocument();

    // fill in the register form,submit
    const nameField = screen.getByPlaceholderText(/name/i);
    userEvent.type(nameField, 'nisse');
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, 'nisse@ower.com');
    const passwordField = screen.getByPlaceholderText('Password');
    userEvent.type(passwordField, 'pswarb');
    const passwordConfirmField = screen.getByPlaceholderText(/Confirm Password/i);
    userEvent.type(passwordConfirmField, 'pswarb');
    const submitRegisterButton = screen.getByRole('button', { name: /register/i });
    fireEvent.click(submitRegisterButton);

    //Expect AlertMessage: The password must be 6+ chars long and contain a number
    const alertMessage = await screen.findByText(/User already exists/i);
    expect(alertMessage).toBeInTheDocument();
  });
});
