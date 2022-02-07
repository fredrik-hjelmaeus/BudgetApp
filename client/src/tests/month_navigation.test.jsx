import { render, screen, fireEvent, waitForElementToBeRemoved } from '../test-utils/context-wrapper';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('navigation through all month pages', () => {
  test('initial state correct in month', async () => {
    render(<App />);
    //login
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, 'nisse@manpower.se');
    const passwordField = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, 'Passw0rd!');
    const submitLoginButton = screen.getByDisplayValue(/login/i);
    fireEvent.click(submitLoginButton);
    await waitForElementToBeRemoved(submitLoginButton);

    // go to month
    const januaryButton = screen.queryByRole('button', { name: /january/i });
    fireEvent.click(januaryButton);

    // check all elements is there
    const addToBudgetButton = await screen.findByRole('button', { name: /add to budget/i });
    const sum = await screen.findAllByText('444');
    expect(sum.length).toBe(3);
    const expenses = await screen.findAllByText('-255');
    expect(expenses.length).toBe(3);
    const BalanceAndSurplus = await screen.findAllByText('189');
    expect(BalanceAndSurplus.length).toBe(2);
    const accountBalanceSum = await screen.findByText('544622');
    const monthSavings = await screen.findByText('0');
    const purchaseElement = await screen.findByRole('heading', { name: /purchases/i });

    expect(purchaseElement).toBeInTheDocument();
    expect(monthSavings).toBeInTheDocument();
    expect(accountBalanceSum).toBeInTheDocument();
    expect(addToBudgetButton).toBeInTheDocument();
  });
  test('guide is activated correct from user profile modal from month', async () => {
    render(<App />);
    //login
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, 'nisse@manpower.se');
    const passwordField = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, 'Passw0rd!');
    const submitLoginButton = screen.getByDisplayValue(/login/i);
    fireEvent.click(submitLoginButton);
    await waitForElementToBeRemoved(submitLoginButton);

    // go to month
    const januaryButton = screen.queryByRole('button', { name: /january/i });
    fireEvent.click(januaryButton);

    // go to user details
    const userDetailButton = await screen.findByRole('button', { name: /dirk/i });
    fireEvent.click(userDetailButton);

    // activate guide
    const appGuideButton = await screen.findByRole('button', { name: /app guide/i });
    fireEvent.click(appGuideButton);

    // start guide
    const runGuideButton = await screen.findByRole('button', { name: /start guide/i });
    fireEvent.click(runGuideButton);

    // assert on a preset-value that is loaded when getting presets via the get guide-presets endpoint
    const guidePresetValue = await screen.findAllByText('123456789');
    expect(guidePresetValue.length).toBe(2);
  });
  test('navigate to other month works and updates all state', async () => {
    render(<App />);
    //login
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, 'nisse@manpower.se');
    const passwordField = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, 'Passw0rd!');
    const submitLoginButton = screen.getByDisplayValue(/login/i);
    fireEvent.click(submitLoginButton);
    await waitForElementToBeRemoved(submitLoginButton);

    // go to month
    const januaryButton = screen.queryByRole('button', { name: /january/i });
    fireEvent.click(januaryButton);
    // go to other month
    const februaryButton = screen.queryByRole('button', { name: /february/i });
    fireEvent.click(februaryButton);

    // check all elements is there
    const addToBudgetButton = await screen.findByRole('button', { name: /add to budget/i });
    const sum = await screen.findAllByText('323232');
    expect(sum.length).toBe(5);
    const expenses = await screen.findAllByText('Please add a Value');
    expect(expenses.length).toBe(1);
    const accountBalanceSum = await screen.findByText('544622');
    const SavingsAndExpenses = await screen.findAllByText('0');
    expect(SavingsAndExpenses.length).toBe(2);
    const purchaseElement = await screen.findByRole('heading', { name: /purchases/i });
    const balanceByCategory = await screen.findByRole('heading', { name: /balance by category/i });

    expect(purchaseElement).toBeInTheDocument();
    expect(balanceByCategory).toBeInTheDocument();
    expect(accountBalanceSum).toBeInTheDocument();
    expect(addToBudgetButton).toBeInTheDocument();
  });
  test('click to year and back to month works', async () => {
    render(<App />);
    //login
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, 'nisse@manpower.se');
    const passwordField = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, 'Passw0rd!');
    const submitLoginButton = screen.getByDisplayValue(/login/i);
    fireEvent.click(submitLoginButton);
    await waitForElementToBeRemoved(submitLoginButton);

    // go to month
    const januaryButton = screen.queryByRole('button', { name: /january/i });
    fireEvent.click(januaryButton);

    // go to year
    const yearBtn = screen.queryByRole('button', { name: /2021/i });
    fireEvent.click(yearBtn);

    // assert initial state in year
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
  test('add to budget expands and contracts correct', async () => {
    render(<App />);
    //login
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, 'nisse@manpower.se');
    const passwordField = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, 'Passw0rd!');
    const submitLoginButton = screen.getByDisplayValue(/login/i);
    fireEvent.click(submitLoginButton);
    await waitForElementToBeRemoved(submitLoginButton);

    // go to month
    const januaryButton = screen.queryByRole('button', { name: /january/i });
    fireEvent.click(januaryButton);

    // click add to budget button
    const addToBudgetButton = await screen.findByRole('button', { name: /add to budget/i });
    fireEvent.click(addToBudgetButton);

    // check a value
    const selectCategoryElement = await screen.findByText(/select an category/i);
    expect(selectCategoryElement).toBeInTheDocument();
    // click close add to budget form
    const closeBtn = (await screen.findAllByRole('button')).find((b) => b.value === 'close');

    fireEvent.click(closeBtn);

    const addToBudgetButtonAgain = await screen.findByRole('button', { name: /add to budget/i });
    expect(addToBudgetButtonAgain).toBeInTheDocument();
  });
  test('open user details modals works', async () => {
    render(<App />);
    //login
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, 'nisse@manpower.se');
    const passwordField = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, 'Passw0rd!');
    const submitLoginButton = screen.getByDisplayValue(/login/i);
    fireEvent.click(submitLoginButton);
    await waitForElementToBeRemoved(submitLoginButton);

    // go to month
    const januaryButton = screen.queryByRole('button', { name: /january/i });
    fireEvent.click(januaryButton);

    // go to user details
    const userDetailButton = await screen.findByRole('button', { name: /dirk/i });
    fireEvent.click(userDetailButton);

    // activate guide
    const appGuideButton = await screen.findByRole('button', { name: /app guide/i });
    expect(appGuideButton).toBeInTheDocument();
  });
});
