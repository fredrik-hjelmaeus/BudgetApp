import { render, fireEvent, screen, waitForElementToBeRemoved } from '../test-utils/context-wrapper';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { rest } from 'msw';
import { server } from '../mocks/server';

describe('navigation through all year pages', () => {
  test('initial state correct in year', async () => {
    render(<App />);

    // go to year by logging in
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, 'nisse@manpower.se');
    const passwordField = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, 'Passw0rd!');
    const submitLoginButton = screen.getByDisplayValue(/login/i);
    fireEvent.click(submitLoginButton);
    await waitForElementToBeRemoved(submitLoginButton);

    const yearTitleText = screen.getByRole('heading', { name: /Yearly summary and comparison analysis with last year/i });
    expect(yearTitleText).toBeInTheDocument();
    const yearTitle = screen.getByRole('heading', { name: /2021/i });
    expect(yearTitle).toBeInTheDocument();
    const balanceSummary = screen.getByRole('button', { name: /Balance Summary/i });
    expect(balanceSummary).toBeInTheDocument();
    const expenseSummary = screen.getByRole('button', { name: /Expense Summary/i });
    expect(expenseSummary).toBeInTheDocument();
    const incomeSummary = screen.getByRole('button', { name: /Income Summary/i });
    expect(incomeSummary).toBeInTheDocument();
    const savingsSummary = screen.getByRole('button', { name: /Savings Summary/i });
    expect(savingsSummary).toBeInTheDocument();

    const yearBalanceChartSummary = screen.getByText(/Year Summary:/i);
    expect(yearBalanceChartSummary).toBeInTheDocument();

    const yearSumNumber = screen.queryAllByRole('listitem').find((listitem) => listitem.textContent === '990188');
    expect(yearSumNumber).toBeInTheDocument();
    const montlyAverageSum = screen.queryAllByRole('listitem').find((listitem) => listitem.textContent === '82515');
    expect(montlyAverageSum).toBeInTheDocument();
    const capitalSum = screen.queryAllByRole('listitem').find((listitem) => listitem.textContent === '4455');
    expect(capitalSum).toBeInTheDocument();
    const savingsSum = screen.queryAllByRole('listitem').find((listitem) => listitem.textContent === '456788');
    expect(savingsSum).toBeInTheDocument();
    const accountBalanceSum = screen.queryAllByRole('listitem').find((listitem) => listitem.textContent === '544622');
    expect(accountBalanceSum).toBeInTheDocument();
  });

  test('navigate to expense summary works and state is correct', () => {});
  test('navigate to income summary works and state is correct', () => {});
  test('navigate to savings summary works and state is correct', () => {});
  test('navigate back to balance summary works', () => {});
  test('open user details modals works', async () => {
    render(<App />);

    // go to year by logging in
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, 'nisse@manpower.se');
    const passwordField = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, 'Passw0rd!');
    const submitLoginButton = screen.getByDisplayValue(/login/i);
    fireEvent.click(submitLoginButton);
    await waitForElementToBeRemoved(submitLoginButton);

    // click user details
    const userDetailsButton = screen.getByRole('button', { name: /dirk/i });
    fireEvent.click(userDetailsButton);

    const startGuideButton = screen.getByRole('button', { name: /start the app guide/i });
    expect(startGuideButton).toBeInTheDocument();
  });
  test('initial year state correct after declining guide for user with own presets created', async () => {
    render(<App />);

    // go to year by logging in
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, 'nisse@manpower.se');
    const passwordField = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, 'Passw0rd!');
    const submitLoginButton = screen.getByDisplayValue(/login/i);
    fireEvent.click(submitLoginButton);
    await waitForElementToBeRemoved(submitLoginButton);

    // click user details
    const userDetailsButton = screen.getByRole('button', { name: /dirk/i });
    fireEvent.click(userDetailsButton);

    // click start guide button
    const startGuideButton = screen.getByRole('button', { name: /start the app guide/i });
    fireEvent.click(startGuideButton);

    // click stop guide button
    const declineGuideButton = screen.getByRole('button', { name: /decline/i });
    fireEvent.click(declineGuideButton);

    // check yearsumnumber
    const yearSumNumber = screen.queryAllByRole('listitem').find((listitem) => listitem.textContent === '990188');
    expect(yearSumNumber).toBeInTheDocument();
  });
  test.skip('initial year state correct after stopping guide for user with own presets created', async () => {
    render(<App />);

    // go to year by logging in
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, 'nisse@manpower.se');
    const passwordField = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, 'Passw0rd!');
    const submitLoginButton = screen.getByDisplayValue(/login/i);
    fireEvent.click(submitLoginButton);
    await waitForElementToBeRemoved(submitLoginButton);

    // click user details
    const userDetailsButton = screen.getByRole('button', { name: /dirk/i });
    fireEvent.click(userDetailsButton);

    // click start guide button
    const startGuideButton = screen.getByRole('button', { name: /start the app guide/i });
    fireEvent.click(startGuideButton);

    // click run guide button
    const runGuideButton = screen.getByRole('button', { name: 'Start Guide' });
    fireEvent.click(runGuideButton);

    // click stop guide button
    const exitGuideButton = screen.getByRole('button', { name: /exit/i });
    fireEvent.click(exitGuideButton);

    // check yearsumnumber
    const yearSumNumber = screen.queryAllByRole('listitem').find((listitem) => listitem.textContent === '990188');
    expect(yearSumNumber).toBeInTheDocument();
  });
  test.skip('guide is activated on new user', async () => {
    // override handlers.js presets to be zero ,indicating new user
    await SetupNewUser();

    render(<App />);

    // go to year by logging in
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, 'nisse@manpower.se');
    const passwordField = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, 'Passw0rd!');
    const submitLoginButton = screen.getByDisplayValue(/login/i);
    fireEvent.click(submitLoginButton);
    await waitForElementToBeRemoved(submitLoginButton);

    //test by looking for welcome dirk in home screen
    const loggedInUserWelcomeElement = await screen.findByRole('heading', { name: /welcome dirk!/i });
    expect(loggedInUserWelcomeElement).toBeInTheDocument();
  });
  test('initial year state correct after exiting guide for new user', async () => {
    // override handlers.js presets to be zero ,indicating new user
    await SetupNewUser();

    render(<App />);

    // go to year by logging in
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, 'nisse@manpower.se');
    const passwordField = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, 'Passw0rd!');
    const submitLoginButton = screen.getByDisplayValue(/login/i);
    fireEvent.click(submitLoginButton);
    await waitForElementToBeRemoved(submitLoginButton);

    //test by looking for welcome dirk in home screen
    const loggedInUserWelcomeElement = await screen.findByRole('heading', { name: /welcome dirk!/i });
    expect(loggedInUserWelcomeElement).toBeInTheDocument();
  });
});

async function SetupNewUser() {
  // override handlers.js presets to be zero ,indicating new user
  return server.resetHandlers(
    // success on getting token
    rest.post('http://localhost/api/auth', (req, res, ctx) => {
      return res(
        ctx.json({
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlZDcyZDE2Zjg5NWIxMTAwZGJhYjY2In0sImlhdCI6MTY0MzgxMDg2OX0.QvfZLV0HBznOEIMFOMAQNIsEpWjmEKtz6EqUNh9D--s',
        })
      );
    }),

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
    }),

    rest.post('http://localhost/api/users', (req, res, ctx) => {
      return res(
        ctx.json({
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlZDcyZDE2Zjg5NWIxMTAwZGJhYjY2In0sImlhdCI6MTY0MzgxMDg2OX0.QvfZLV0HBznOEIMFOMAQNIsEpWjmEKtz6EqUNh9D--s',
        })
      );
    }),
    rest.post('http://localhost/api/auth/forgotpassword', (req, res, ctx) => {
      return res(ctx.json({ success: true, data: 'Email sent' }));
    }),
    rest.get('http://localhost/api/userpreset', (req, res, ctx) => {
      return res(ctx.json([]));
    })
  );
}
