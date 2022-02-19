import { render, screen, fireEvent, waitForElementToBeRemoved, waitFor, act } from '../../../test-utils/context-wrapper';
import userEvent from '@testing-library/user-event';
import App from '../../../App';
import { server } from '../../../mocks/server';
import { rest } from 'msw';
import path from 'path';

describe('Summation functionality', () => {
  beforeEach(async () => {
    // go to month and expand preset form
    render(<App />);

    // go to month
    const januaryButton = screen.queryByRole('button', { name: /january/i });
    fireEvent.click(januaryButton);

    // click add to budget button
    const addToBudgetButton = await screen.findByRole('button', { name: /add to budget/i });
    fireEvent.click(addToBudgetButton);

    // assert inital month state
    const sum = await screen.findAllByText('799');
    expect(sum.length).toBe(1);
    const expenses = await screen.findAllByText('-255');
    expect(expenses.length).toBe(3);
    const BalanceAndSurplus = await screen.findAllByText('544');
    expect(BalanceAndSurplus.length).toBe(2);
    const accountBalanceSum = await screen.findByText('544977');
    const monthSavings = await screen.findByText('0');
    const purchaseElement = await screen.findByRole('heading', { name: /purchases/i });
    const purchasePreset = await screen.findByText('55000');
    const presetElement = await screen.findByText('sadas');
    expect(presetElement).toBeInTheDocument();
    expect(purchaseElement).toBeInTheDocument();
    expect(purchasePreset).toBeInTheDocument();
    expect(monthSavings).toBeInTheDocument();
    expect(accountBalanceSum).toBeInTheDocument();
  });

  test('Adding overhead income presetvalue updates all summation-fields', async () => {
    // starting point is month January with expanded preset form setup in beforeEach
    // fill in the form and submit
    const nameField = screen.getByPlaceholderText('Name');
    const numberField = screen.getByPlaceholderText('Number');
    const categoryField = screen.getByRole('combobox');
    userEvent.type(nameField, 'incomepreset');
    userEvent.type(numberField, '100');
    userEvent.selectOptions(categoryField, 'Reminderfees');
    fireEvent.click(screen.getByRole('button', { name: /add to budget/i }));

    // expect form fields to be reset
    expect(screen.getByPlaceholderText('Name')).toHaveValue('');
    expect(screen.getByPlaceholderText('Number')).toHaveValue(null);
    expect(screen.getByRole('combobox')).toHaveValue('Select an category');

    // expect preset to be added to monthsummary income
    const presetElement2 = await screen.findByRole('button', { name: 'testtest' });
    expect(presetElement2).toBeInTheDocument();

    // expect sum fields to be updated with +1000 as per endpoint:rest.post('http://localhost/api/userpreset') response in handlers
    const newMonthIncomeSum = screen.getByText('1799');
    expect(newMonthIncomeSum).toBeInTheDocument();
    const AccBal = screen.getByText('545977');
    expect(AccBal).toBeInTheDocument();
    const monthSurplusValue = screen.getByText('Month Surplus:').parentElement.children[1].textContent;
    expect(monthSurplusValue).toBe('1544');
    const monthBalanceValue = screen.getByText('Month Balance:').textContent;
    expect(monthBalanceValue).toBe('Month Balance:1544');
    const BalanceByCategory_TravelField = screen.getByText('Travel:').children[0].textContent;
    expect(BalanceByCategory_TravelField).toBe('745');
  });

  test('Adding overhead expense presetvalue updates all summation-fields', async () => {
    // starting point is month January with expanded preset form

    // override endpoint to respond with expense number
    server.use(
      rest.post('http://localhost/api/userpreset', (req, res, ctx) => {
        return res(
          ctx.json({
            _id: '6203e22b2bdb63c78b35b672',
            user: '6203e2152bdb63c78b35b670',
            name: 'expensepreset',
            number: -1000,
            month: 'January',
            year: 2021,
            category: 'Travel',
            type: 'overhead',
            piggybank: [
              {
                month: 'January',
                year: 2021,
                savedAmount: 0,
                _id: '61edb1a5c557568270d9349e',
              },
            ],
            date: '2022-02-09T15:47:55.671Z',
            __v: 0,
          })
        );
      })
    );
    // fill in the form and submit
    const nameField = screen.getByPlaceholderText('Name');
    const numberField = screen.getByPlaceholderText('Number');
    const categoryField = screen.getByRole('combobox');
    userEvent.type(nameField, 'expense');
    userEvent.type(numberField, '100');
    userEvent.selectOptions(categoryField, 'Reminderfees');
    fireEvent.click(screen.getByRole('button', { name: /add to budget/i }));

    // expect preset to be added to monthsummary expense
    const presetElement = await screen.findByRole('button', { name: 'expensepreset' });
    expect(presetElement).toBeInTheDocument();

    //Month Income:
    const newMonthIncomeSum = screen.getByText('799');
    expect(newMonthIncomeSum).toBeInTheDocument();

    const AccountBalance = screen.getByText('543977');
    expect(AccountBalance).toBeInTheDocument();

    //Month Expenses: -1255
    const MonthExpenses = screen.getByText(/month expenses:/i).children[0].textContent;
    expect(MonthExpenses).toBe('-1255');

    //Month Balance: -456
    const MonthBalance = screen.getByText(/month balance/i).parentElement.children[1].textContent;
    expect(MonthBalance).toBe('Balance Month:-456');

    //Month Savings: 0
    const MonthSavings = screen.getByText(/month savings:/i).children[0].textContent;
    expect(MonthSavings).toBe(' 0');
  });
  test('Deleting presetvalues updates all summation-fields', async () => {
    // starting point is month January with expanded preset form

    // delete preset
    const presetElement_DeleteButton = screen.queryAllByRole('button').find((btn) => btn.value === 'delbtn' && btn.name === 'sadas');
    fireEvent.click(presetElement_DeleteButton);
    await waitForElementToBeRemoved(presetElement_DeleteButton);

    // expect to not find deleted preset
    const deletedPreset = screen.queryAllByRole('button').find((btn) => btn.value === 'delbtn' && btn.name === 'sadas');
    expect(deletedPreset).toBeUndefined();

    // expect summation values to update:
    //Month Income:
    const newMonthIncomeSum = screen.getByDisplayValue('355');
    expect(newMonthIncomeSum).toBeInTheDocument();

    //Account Balance
    const AccountBalance = screen.getByText('544533');
    expect(AccountBalance).toBeInTheDocument();

    //Month Expenses:
    const MonthExpenses = screen.getByText(/month expenses:/i).children[0].textContent;
    expect(MonthExpenses).toBe('-255');

    //Month Balance:
    const MonthBalanceAndSurplus = screen.getAllByText('100');
    expect(MonthBalanceAndSurplus.length).toBe(2);

    //Month Savings:
    const MonthSavings = screen.getByText(/month savings:/i).children[0].textContent;
    expect(MonthSavings).toBe(' 0');
  });

  test('Adding overhead presetvalues through upload csv dialog updates all summation-fields correctly', async () => {
    // starting point is month January with expanded preset form

    // click upload csv button
    fireEvent.click(screen.getByRole('button', { name: /upload csv-file/i }));
    const input = screen.getByTestId('fileupload');
    expect(input).toBeInTheDocument();

    // not sure if this need to be specific as it mocked anyhow
    const filepath = path.resolve(__dirname, '../../_data/csv_testfiles/RFC4180.csv');
    const file = new File(['RFC4180'], filepath, { type: 'multipart/form-data' });

    // click upload inside csv file format modal
    userEvent.upload(input, file);
    fireEvent.click(screen.getByRole('button', { name: 'Upload' }));
    await waitForElementToBeRemoved(screen.getByRole('button', { name: 'Upload' }));

    // Assert on SelectCSVfields component and that it shows data values correct
    expect(screen.getByRole('heading', { name: /select csv fields/i })).toBeInTheDocument();
    expect(screen.getByText('description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /e350/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /slow/i })).toBeInTheDocument();
    // select make as description field
    fireEvent.click(screen.getByRole('button', { name: /make/i }));

    // verify we got to the value field selection dialog
    expect(screen.getByText(/value/i)).toBeInTheDocument();
    // select saldo as value field
    fireEvent.click(screen.getByRole('button', { name: /saldo/i })); // 556 + 777
    // verify we got to create transactions dialog
    expect(screen.getByRole('heading', { name: /create transactions/i }));

    // select categories for the fields and change to commute
    const categoryButtons = screen.getAllByTestId('dropdownselect');
    fireEvent.click(categoryButtons[0]);
    fireEvent.click(categoryButtons[1]);

    // delete the second field
    const presetDeleteBtn = screen.getAllByTestId('deleteCsvPresetBtn').find((btn) => btn.name === 'Mercury');
    fireEvent.click(presetDeleteBtn);

    // overwrite the addPreset endpoint response
    server.use(
      rest.post('http://localhost/api/userpreset', (req, res, ctx) => {
        return res(
          ctx.json({
            _id: '6203e22b2bdb63c78b35b672',
            user: '6203e2152bdb63c78b35b670',
            name: 'Ford',
            number: 556,
            month: 'January',
            year: 2021,
            category: 'Travel',
            type: 'overhead',
            piggybank: [
              {
                month: 'January',
                year: 2021,
                savedAmount: 0,
                _id: '61edb1a5c557568270d9349e',
              },
            ],
            date: '2022-02-09T15:47:55.671Z',
            __v: 0,
          })
        );
      })
    );

    // submit the new csvpresets
    const submitBtn = screen.getAllByRole('button', { name: /add to budget/i }).find((b) => b.value !== 'ADD TO BUDGET');
    expect(submitBtn).toBeInTheDocument();
    fireEvent.click(submitBtn);

    // handle the prompt
    const confirmButton = screen.getByRole('button', { name: /add the 1 transactions that has a category specified/i });
    fireEvent.click(confirmButton);
    expect(submitBtn).not.toBeInTheDocument();

    // expect new preset from csv in monthsummary
    expect(await screen.findByText('Ford'));
    expect(await screen.findByText('556'));
    const presets = await screen.findAllByTestId('presetitem');
    expect(presets.length).toBe(4);

    //expect all summation fields to be updated
    //Month Income:
    const monthIncomeSum = (await screen.findByText('Month Income:')).children[0].textContent;
    expect(monthIncomeSum).toBe('1355');

    const AccountBalance = screen.getByText('545533'); //544977
    expect(AccountBalance).toBeInTheDocument();

    //Month Expenses:
    const MonthExpenses = screen.getByText(/month expenses:/i).children[0].textContent;
    expect(MonthExpenses).toBe('-255');

    //Month Balance:
    const MonthBalance = screen.getByText(/month balance/i).parentElement.children[1].textContent;
    expect(MonthBalance).toBe('Month Surplus:1100');

    //Month Savings: 0
    const MonthSavings = screen.getByText(/month savings:/i).children[0].textContent;
    expect(MonthSavings).toBe(' 0');
  });

  test('Editing overhead income presetvalues updates all summation-fields', async () => {
    // press preset in monthsummary component
    fireEvent.click(screen.getByRole('button', { name: '444' }));

    //confirm edit mode is enabled in edit preset modal
    expect(screen.getByText(/edit/i)).toBeInTheDocument();
    expect(screen.getByText(/update/i)).toBeInTheDocument();
    const editNameField = await screen.findByLabelText('Name:');
    const editValueField = await screen.findByLabelText('Number');
    expect(editNameField).toHaveValue('sadas');
    expect(editValueField).toHaveValue(444);
    expect(screen.getAllByRole('combobox').length).toBe(2);

    //change name and number of preset
    userEvent.type(editNameField, 'uniquetext');
    userEvent.type(editValueField, '1000');

    //submit change
    const submitChangesButton = await screen.findByRole('button', { name: /update/i });
    fireEvent.click(submitChangesButton);
    expect(submitChangesButton).not.toBeInTheDocument();

    // expect preset to have been changed in monthsummary
    const preset = await screen.findByText('sadasuniquetext');
    expect(preset).toBeInTheDocument();

    // summation with new values is correct, 4441000 - 444 = 4440556
    //Month Income:
    const monthIncomeSum = (await screen.findByText('Month Income:')).children[0].textContent;
    expect(monthIncomeSum).toBe('4441355');
    const AccountBalance = screen.getByText('4985533'); //544977
    expect(AccountBalance).toBeInTheDocument();
    //Month Expenses:
    const MonthExpenses = screen.getByText(/month expenses:/i).children[0].textContent;
    expect(MonthExpenses).toBe('-255');
    //Month Balance:
    const MonthBalance = screen.getByText(/month balance/i).parentElement.children[1].textContent;
    expect(MonthBalance).toBe('Month Surplus:4441100');
    //Month Savings: 0
    const MonthSavings = screen.getByText(/month savings:/i).children[0].textContent;
    expect(MonthSavings).toBe(' 0');
  });

  test('Editing overhead expense presetvalues updates all summation-fields', async () => {
    // press preset in monthsummary component
    fireEvent.click(screen.getByRole('button', { name: '-255' }));

    //confirm edit mode is enabled in edit preset modal
    expect(screen.getByText(/edit/i)).toBeInTheDocument();
    expect(screen.getByText(/update/i)).toBeInTheDocument();
    const editNameField = await screen.findByLabelText('Name:');
    const editValueField = await screen.findByLabelText('Number');
    expect(editNameField).toHaveValue('sfdc');
    expect(editValueField).toHaveValue(-255);

    //change name and number of preset
    userEvent.type(editNameField, 'uniquetext');
    userEvent.clear(editValueField);
    userEvent.type(editValueField, '-200');
    //submit change
    const submitChangesButton = await screen.findByRole('button', { name: /update/i });
    fireEvent.click(submitChangesButton);
    expect(submitChangesButton).not.toBeInTheDocument();

    // expect preset to have been changed in monthsummary
    const preset = await screen.findByText('sfdcuniquetext');
    expect(preset).toBeInTheDocument();

    // summation with new values is correct, 4441000 - 444 = 4440556
    //Month Income:
    const monthIncomeSum = (await screen.findByText('Month Income:')).children[0].textContent;
    expect(monthIncomeSum).toBe('799');
    const AccountBalance = screen.getByText('Month Balance:').children[0].textContent;
    expect(AccountBalance).toBe('599');
    //Month Expenses:
    const MonthExpenses = screen.getByText(/month expenses:/i).children[0].textContent;
    expect(MonthExpenses).toBe('-200');
    //Month Balance:
    const MonthBalance = screen.getByText(/month balance/i).parentElement.children[1].textContent;
    expect(MonthBalance).toBe('Month Surplus:599');
    //Month Savings: 0
    const MonthSavings = screen.getByText(/month savings:/i).children[0].textContent;
    expect(MonthSavings).toBe(' 0');
  });
  test('Editing overhead INCOME TO EXPENSE presetvalues updates all summation-fields', async () => {
    // press preset in monthsummary component
    fireEvent.click(screen.getByRole('button', { name: '444' }));

    //confirm edit mode is enabled in edit preset modal
    expect(screen.getByText(/edit/i)).toBeInTheDocument();
    expect(screen.getByText(/update/i)).toBeInTheDocument();
    const editNameField = await screen.findByLabelText('Name:');
    const editValueField = await screen.findByLabelText('Number');
    expect(editNameField).toHaveValue('sadas');
    expect(editValueField).toHaveValue(444);

    //change name and number of preset
    userEvent.clear(editNameField);
    userEvent.type(editNameField, 'switcher');
    userEvent.clear(editValueField);
    userEvent.type(editValueField, '-200');
    //submit change
    const submitChangesButton = await screen.findByRole('button', { name: /update/i });
    fireEvent.click(submitChangesButton);
    expect(submitChangesButton).not.toBeInTheDocument();

    // expect preset to have been changed in monthsummary
    const preset = await screen.findByText('switcher');
    expect(preset.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].textContent).toBe('Expenses');
    expect(preset).toBeInTheDocument();

    // summation with new values is correct
    //Month Income:
    const monthIncomeSum = (await screen.findByText('Month Income:')).children[0].textContent;
    expect(monthIncomeSum).toBe('355'); // 799 - 444
    const AccountBalance = screen.getByText('Month Balance:').children[0].textContent;
    expect(AccountBalance).toBe('-100'); //
    //Month Expenses:
    const MonthExpenses = screen.getByText(/month expenses:/i).children[0].textContent;
    expect(MonthExpenses).toBe('-455');
    //Month Balance:
    const MonthBalance = screen.getByText(/month balance/i).parentElement.children[1].textContent;
    expect(MonthBalance).toBe('Balance Month:-100');
    //Month Savings: 0
    const MonthSavings = screen.getByText(/month savings:/i).children[0].textContent;
    expect(MonthSavings).toBe(' 0');
  });
  test('Editing overhead EXPENSE TO INCOME presetvalues updates all summation-fields', async () => {
    // press preset in monthsummary component
    fireEvent.click(screen.getByRole('button', { name: '-255' }));

    //confirm edit mode is enabled in edit preset modal
    expect(screen.getByText(/edit/i)).toBeInTheDocument();
    expect(screen.getByText(/update/i)).toBeInTheDocument();
    const editNameField = await screen.findByLabelText('Name:');
    const editValueField = await screen.findByLabelText('Number');
    expect(editNameField).toHaveValue('sfdc');
    expect(editValueField).toHaveValue(-255);

    //change name and number of preset
    userEvent.clear(editNameField);
    userEvent.type(editNameField, 'switcher');
    userEvent.clear(editValueField);
    userEvent.type(editValueField, '3000');
    //submit change
    const submitChangesButton = await screen.findByRole('button', { name: /update/i });
    fireEvent.click(submitChangesButton);
    expect(submitChangesButton).not.toBeInTheDocument();

    // expect preset to have been changed in monthsummary from expense presets to income presets
    const preset = await screen.findByText('switcher');
    expect(preset.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].textContent).toBe('Income');
    expect(preset).toBeInTheDocument();

    // summation with new values is correct
    //Month Income:
    const monthIncomeSum = (await screen.findByText('Month Income:')).children[0].textContent;
    expect(monthIncomeSum).toBe('3799'); // 799 - 444
    const AccountBalance = screen.getByText('Month Balance:').children[0].textContent;
    expect(AccountBalance).toBe('3799'); //
    //Month Expenses:
    const MonthExpenses = screen.getByText(/month expenses:/i).children[0].textContent;
    expect(MonthExpenses).toBe('0');
    //Month Balance:
    const MonthBalance = screen.getByText(/month balance/i).parentElement.children[1].textContent;
    expect(MonthBalance).toBe('Month Surplus:3799');
    //Month Savings: 0
    const MonthSavings = screen.getByText(/month savings:/i).children[0].textContent;
    expect(MonthSavings).toBe(' 0');
  });

  test('Add purchase preset works and updates no summation-fields', async () => {
    // starting point is month January with expanded preset form setup in beforeEach
    // fill in the form and submit
    const nameField = screen.getByPlaceholderText('Name');
    const numberField = screen.getByPlaceholderText('Number');
    const categoryField = screen.getByRole('combobox');
    const purchaseCheckbox = screen.getByRole('checkbox', { name: /purchase/i });
    userEvent.type(nameField, 'purchase');
    userEvent.type(numberField, '10000');
    userEvent.selectOptions(categoryField, 'Travel');
    fireEvent.click(purchaseCheckbox);

    //override server response:
    server.use(
      rest.post('http://localhost/api/userpreset', (req, res, ctx) => {
        return res(
          ctx.json({
            _id: '6203e22b2bdb63c78b35b672',
            user: '6203e2152bdb63c78b35b670',
            name: req.body.name,
            number: req.body.number,
            month: 'January',
            year: 2021,
            category: 'Travel',
            type: req.body.type,
            piggybank: [
              {
                month: 'January',
                year: 2021,
                savedAmount: 0,
                _id: '61edb1a5c557568270d9349e',
              },
            ],
            date: '2022-02-09T15:47:55.671Z',
            __v: 0,
          })
        );
      })
    );
    // submit form
    fireEvent.click(screen.getByRole('button', { name: /add to budget/i }));

    // expect form fields to be reset
    expect(screen.getByPlaceholderText('Name')).toHaveValue('');
    expect(screen.getByPlaceholderText('Number')).toHaveValue(null);
    expect(screen.getByRole('combobox')).toHaveValue('Select an category');
    expect(screen.getByRole('checkbox', { name: /overhead/i })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: /purchase/i })).not.toBeChecked();

    // expect preset to be added to purchases component
    const purchaseElement = await screen.findByRole('button', { name: 'purchase' });
    expect(purchaseElement).toBeInTheDocument();
    expect(screen.getByText('10000')).toBeInTheDocument();
    expect(screen.getByText('18 months')).toBeInTheDocument();

    // expect no sum fields to get changed
    const newMonthIncomeSum = screen.getByText('799');
    expect(newMonthIncomeSum).toBeInTheDocument();
    const AccBal = screen.getByText('544977');
    expect(AccBal).toBeInTheDocument();
    const monthSurplusValue = screen.getByText('Month Surplus:').parentElement.children[1].textContent;
    expect(monthSurplusValue).toBe('544');
    const monthBalanceValue = screen.getByText('Month Balance:').textContent;
    expect(monthBalanceValue).toBe('Month Balance:544');
    const BalanceByCategory_TravelField = screen.getByText('Travel:').children[0].textContent;
    expect(BalanceByCategory_TravelField).toBe('-255');
  });
  test('Edit purchase preset works and updates no summation-fields', async () => {
    // starting point is month January with expanded preset form setup in beforeEach

    // click purchase preset name or number to activate edit preset
    fireEvent.click(screen.getByRole('button', { name: /Resa/i }));

    // confirm edit preset modal is activated and preset values is loaded
    expect(screen.getByText(/edit/i)).toBeInTheDocument();
    expect(screen.getByText(/update/i)).toBeInTheDocument();
    const editNameField = await screen.findByLabelText('Name:');
    const editValueField = await screen.findByLabelText('Number');
    expect(editNameField).toHaveValue('Resa');
    expect(editValueField).toHaveValue(55000);
    expect(screen.getAllByRole('combobox').length).toBe(2);

    //change name and number of preset
    userEvent.clear(editNameField);
    userEvent.type(editNameField, 'SuperResa');
    userEvent.clear(editValueField);
    userEvent.type(editValueField, '65000');

    // submit form
    fireEvent.click(screen.getByRole('button', { name: /update/i }));

    // expect preset to be changed in purchases component
    const purchaseElement = await screen.findByText('SuperResa');
    expect(purchaseElement).toBeInTheDocument();
    expect(screen.getByText('65000')).toBeInTheDocument();
    expect(screen.getByText('119 months')).toBeInTheDocument();

    // expect no sum fields to be changed
    const newMonthIncomeSum = screen.getByText('799');
    expect(newMonthIncomeSum).toBeInTheDocument();
    const AccBal = screen.getByText('544977');
    expect(AccBal).toBeInTheDocument();
    const monthSurplusValue = screen.getByText('Month Surplus:').parentElement.children[1].textContent;
    expect(monthSurplusValue).toBe('544');
    const monthBalanceValue = screen.getByText('Month Balance:').textContent;
    expect(monthBalanceValue).toBe('Month Balance:544');
    const BalanceByCategory_TravelField = screen.getByText('Travel:').children[0].textContent;
    expect(BalanceByCategory_TravelField).toBe('-255');
  });
  test('Delete purchase presetvalues updates all summation-fields', async () => {
    // starting point is month January with expanded preset form setup in beforeEach
    const presetToDelete = await screen.findByRole('button', { name: /Resa/i });

    // click purchase preset deletebutton
    const deleteButton = screen.getAllByRole('button').find((b) => b.value === 'trashicon');
    fireEvent.click(deleteButton);

    // expect DeletePurchaseModal to be activated
    const header = screen.getByRole('heading', { name: 'Confirm delete' });
    expect(header).toBeInTheDocument();

    // press delete in DeletePurchaseModal
    const deleteBtn = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteBtn);

    // expect DeletePurchaseModal to be closed
    expect(header).not.toBeInTheDocument();

    // expect the purchase-preset to be deleted
    await waitForElementToBeRemoved(presetToDelete);
    expect(presetToDelete).not.toBeInTheDocument();
  });
  test('Buy purchase updates all summation-fields and converts preset-type to overhead expense', async () => {
    // add overhead preset income so buying button becomes visible
    server.use(
      rest.post('http://localhost/api/userpreset', (req, res, ctx) => {
        return res(
          ctx.json({
            _id: '6203e22b2bdb63c78b35b672',
            user: '6203e2152bdb63c78b35b670',
            name: 'income',
            number: 100000,
            month: 'January',
            year: 2021,
            category: 'Travel',
            type: 'overhead',
            piggybank: [
              {
                month: 'January',
                year: 2021,
                savedAmount: 0,
                _id: '61edb1a5c557568270d9349e',
              },
            ],
            date: '2022-02-09T15:47:55.671Z',
            __v: 0,
          })
        );
      })
    );
    // fill in the form and submit
    const nameField = screen.getByPlaceholderText('Name');
    const numberField = screen.getByPlaceholderText('Number');
    const categoryField = screen.getByRole('combobox');
    const purchaseCheckbox = screen.getByRole('checkbox', { name: /purchase/i });
    userEvent.type(nameField, 'purchase');
    userEvent.type(numberField, '10000');
    userEvent.selectOptions(categoryField, 'Travel');
    fireEvent.click(purchaseCheckbox);
    fireEvent.click(screen.getByRole('button', { name: /add to budget/i }));

    // press buy button
    const purchasePresetBuyButton = await screen.findByText('BUY');
    const presets_beforeClickingBUY = await screen.findAllByTestId('presetitem');
    fireEvent.click(purchasePresetBuyButton);

    // expect purchaseitem to disappear
    await waitForElementToBeRemoved(purchasePresetBuyButton);
    expect(purchasePresetBuyButton).not.toBeInTheDocument();

    // expect overhead expense to have been created
    const presets_afterClickingBUY = await screen.findAllByTestId('presetitem');
    expect(presets_afterClickingBUY.length - presets_beforeClickingBUY.length).toBe(1);
    const newPreset = presets_afterClickingBUY.find((p) => p.textContent === '-55000' && p.hasAttribute('data-testid'));
    expect(newPreset.getAttribute('data-testid')).toEqual('presetitem');
    expect(newPreset).toBeInTheDocument();

    // expect summation fields to be updated
    expect(screen.getByText('Month Income:').textContent).toBe('Month Income:    100799');
    expect(screen.getByText('Month Surplus:').parentElement.children[1].textContent).toBe('45544');
    expect(screen.getByText('Month Expenses:').textContent).toBe('Month Expenses:    -55255');
    expect(screen.getByText('Account Balance:').textContent).toBe('Account Balance:589977 ');
    expect(screen.getByText('Month Balance:').textContent).toBe('Month Balance:45544');
    expect(screen.getByText('Month Savings:').textContent).toBe('Month Savings: 0');

    const BalanceByCategory_TravelField = screen.getByText('Travel:').children[0].textContent;
    expect(BalanceByCategory_TravelField).toBe('44745');
  });
  test('Add piggybank saving to a purchase updates all summation-fields', async () => {
    // add overhead preset income so buying button becomes visible
    server.use(
      rest.post('http://localhost/api/userpreset', (req, res, ctx) => {
        return res(
          ctx.json({
            _id: '6203e22b2bdb63c78b35b672',
            user: '6203e2152bdb63c78b35b670',
            name: 'income',
            number: 20000,
            month: 'January',
            year: 2021,
            category: 'Travel',
            type: 'overhead',
            piggybank: [
              {
                month: 'January',
                year: 2021,
                savedAmount: 0,
                _id: '61edb1a5c557568270d9349e',
              },
            ],
            date: '2022-02-09T15:47:55.671Z',
            __v: 0,
          })
        );
      })
    );

    // fill in the form and submit
    const nameField = screen.getByPlaceholderText('Name');
    const numberField = screen.getByPlaceholderText('Number');
    const categoryField = screen.getByRole('combobox');
    const purchaseCheckbox = screen.getByRole('checkbox', { name: /purchase/i });
    userEvent.type(nameField, 'notused');
    userEvent.type(numberField, '10000');
    userEvent.selectOptions(categoryField, 'Travel');
    fireEvent.click(purchaseCheckbox);
    fireEvent.click(screen.getByRole('button', { name: /add to budget/i }));

    //expect form to be reset
    expect(screen.getByPlaceholderText('Name').textContent).toBe('');
    expect(screen.getByPlaceholderText('Number').textContent).toBe('');

    //expect purchaseitem to update its button to:

    /*    <button
      class="btn-moremonthsleft"
    >
      2 months
    </button> */

    // press piggy button
    const piggybankButton = await screen.findByRole('button', { name: /2 months/i });
    fireEvent.click(piggybankButton);

    // expect AddtoPiggybankModal to be shown
    const header = screen.getByRole('heading', { name: 'Amount to save' });
    expect(header).toBeInTheDocument();

    // change the amount to save value
    fireEvent.change(screen.getByTestId('inputamountrange'), { target: { value: '20000' } });

    // create the expected server response with a piggybank object added
    server.use(
      rest.put(`http://localhost/api/userpreset/:_id`, (req, res, ctx) => {
        const { _id } = req.params;

        return res(
          ctx.json({
            _id,
            user: req.body.user,
            name: req.body.name,
            number: req.body.number,
            month: 'January',
            year: 2021,
            category: req.body.category,
            type: req.body.type,
            piggybank: req.body.piggybank,
            date: '2022-02-10T13:33:37.780Z',
            __v: 0,
          })
        );
      })
    );

    // press submit piggybank save amount
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // expect AddtoPiggybankModal to be closed
    await waitForElementToBeRemoved(header);
    expect(header).not.toBeInTheDocument();

    // expect MonthSavingsSummary-component to show up and correct number displayed
    expect(await screen.findByRole('heading', { name: /month surplus put to savings/i })).toBeInTheDocument();

    // expect to find buttons with the number 20000
    const presets = await screen.findAllByRole('button', { name: '20000' });
    // find by class attribute
    const preset = presets.find((b) => b.getAttribute('class') === 'text-orange btn-form');
    expect(preset).toBeInTheDocument();

    // expect purchase-preset monthsleft-button to be updated
    expect(await screen.findByText('64 months')).toBeInTheDocument();

    // expect sum values to have been updated
    const newMonthIncomeSum = screen.getByText('20799');
    expect(newMonthIncomeSum).toBeInTheDocument();
    const AccBal = screen.getByText('564977');
    expect(AccBal).toBeInTheDocument();
    const monthSurplusValue = screen.getByText('Month Surplus:').parentElement.children[1].textContent;
    expect(monthSurplusValue).toBe('20544');
    const monthBalanceValue = screen.getByText('Month Balance:').textContent;
    expect(monthBalanceValue).toBe('Month Balance:544');
    const BalanceByCategory_TravelField = screen.getByText('Travel:').children[0].textContent;
    expect(BalanceByCategory_TravelField).toBe('19745');
    const monthSavings = screen.getByText('Month Savings:').children[0].textContent;
    expect(monthSavings).toBe(' 20000');
  });

  test.only('Add & Edit saving presetvalues updates all summation-fields', async () => {
    // add overhead preset income so buying button becomes visible
    server.use(
      rest.post('http://localhost/api/userpreset', (req, res, ctx) => {
        return res(
          ctx.json({
            _id: '6203e22b2bdb63c78b35b672',
            user: '6203e2152bdb63c78b35b670',
            name: 'saving',
            number: 20000,
            month: 'January',
            year: 2021,
            category: 'Travel',
            type: 'savings',
            piggybank: [
              {
                month: 'January',
                year: 2021,
                savedAmount: 0,
                _id: '61edb1a5c557568270d9349e',
              },
            ],
            date: '2022-02-09T15:47:55.671Z',
            __v: 0,
          })
        );
      })
    );

    // fill in the form and submit
    const nameField = screen.getByPlaceholderText('Name');
    const numberField = screen.getByPlaceholderText('Number');
    const categoryField = screen.getByRole('combobox');
    const savingCheckbox = screen.getByRole('checkbox', { name: /savings/i });
    userEvent.type(nameField, 'notused');
    userEvent.type(numberField, '20000');
    userEvent.selectOptions(categoryField, 'Travel');
    fireEvent.click(savingCheckbox);
    fireEvent.click(screen.getByRole('button', { name: /add to budget/i }));

    //expect form to be reset
    expect(screen.getByPlaceholderText('Name').textContent).toBe('');
    expect(screen.getByPlaceholderText('Number').textContent).toBe('');

    // expect to find a saving preset
    expect(await screen.findByRole('heading', { name: /Month Surplus put to Savings/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /saving/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /20000/i })).toBeInTheDocument();
    expect(await screen.findByAltText('Travel_icon')).toBeInTheDocument();

    // expect sum values to have been updated
    const newMonthIncomeSum = screen.getByText('799');
    expect(newMonthIncomeSum).toBeInTheDocument();
    const monthSurplusValue = screen.getByText('Month Surplus:').parentElement.children[1].textContent;
    expect(monthSurplusValue).toBe('544');
    const AccBal = screen.getByText('524977'); // 544977 - 20000
    expect(AccBal).toBeInTheDocument();
    const monthBalanceValue = screen.getByText('Month Balance:').textContent;
    expect(monthBalanceValue).toBe('Month Balance:-19456'); // 544 - 20000
    const BalanceByCategory_TravelField = screen.getByText('Travel:').children[0].textContent;
    expect(BalanceByCategory_TravelField).toBe('-255');
    const monthSavings = screen.getByText('Month Savings:').children[0].textContent;
    expect(monthSavings).toBe(' 20000'); // 0 + 20000

    // edit saving value by pressing savingpreset in monthsavingssummary
    fireEvent.click(await screen.findByRole('button', { name: /20000/i }));

    // expect edit preset to open and the values from preset to have been loaded there
    expect(await screen.findByRole('heading', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByText(/update/i)).toBeInTheDocument();
    const editNameField = await screen.findByLabelText('Name:');
    const editValueField = await screen.findByLabelText('Number');
    expect(editNameField).toHaveValue('saving');
    expect(editValueField).toHaveValue(20000);
    //  expect(screen.getByRole('combobox')).toHaveValue('Select an category');
    //expect(screen.getByRole('checkbox', { name: /overhead/i })).not.toBeChecked();
    //expect(screen.getByRole('checkbox', { name: /savings/i })).toBeChecked();
    expect(screen.getAllByRole('combobox').length).toBe(2);

    //change name and number of preset
    userEvent.clear(editNameField);
    userEvent.clear(editValueField);
    userEvent.type(editNameField, 'uniquetext');
    userEvent.type(editValueField, '1000');

    //submit change
    const submitChangesButton = await screen.findByRole('button', { name: /update/i });
    fireEvent.click(submitChangesButton);
    expect(submitChangesButton).not.toBeInTheDocument();

    // expect preset to have been changed in monthsummary
    const preset = await screen.findByText('uniquetext');
    expect(preset).toBeInTheDocument();

    // expect summations to have changed from 20000 savings to 1000 savings
    const newMonthIncomeSumEdit = screen.getByText('799');
    expect(newMonthIncomeSumEdit).toBeInTheDocument();
    const monthSurplusValueEdit = screen.getByText('Month Surplus:').parentElement.children[1].textContent;
    expect(monthSurplusValueEdit).toBe('544');
    const AccBalEdit = screen.getByText('543977'); // 544977 - 1000
    expect(AccBalEdit).toBeInTheDocument();
    const monthBalanceValueEdit = screen.getByText('Month Balance:').textContent;
    expect(monthBalanceValueEdit).toBe('Month Balance:-456'); // 544 - 1000
    const BalanceByCategory_TravelFieldEdit = screen.getByText('Travel:').children[0].textContent;
    expect(BalanceByCategory_TravelFieldEdit).toBe('-255');
    const monthSavingsEdit = screen.getByText('Month Savings:').children[0].textContent;
    expect(monthSavingsEdit).toBe(' 1000'); // 0 + 1000
  });

  test.skip('Add capital presetvalues updates all summation-fields', () => {});
  test.skip('Delete saving presetvalues updates all summation-fields', () => {});
  test.skip('Change inside addtopiggybankmodal updates correctly sums everywhere when submitted', () => {});
});

describe('PresetForm functionality', () => {
  test.skip('Add preset to overhead income works', () => {});
  test.skip('Add preset to overhead expenses works', () => {});
  test.skip('Add preset to purchase works with positive number', () => {});
  test.skip('Add preset to purchase works and convert with negative number input', () => {});
  test.skip('Add preset to savings works', () => {});
  test.skip('Add preset to capital works', () => {});
  test.skip('Edit preset loads into form and fields gets reset after submitting edit', () => {});
  test.skip('upload csv-file button activates upload modal', () => {});
});

describe('MonthSummary functionality', () => {
  test.skip('Field gets deleted when delete button is pressed', () => {});
  test.skip('Category is updated when changed', () => {});
  test.skip('Income preset is moved to expense when value is edited', () => {});
  test.skip('Expense preset is moved to income when value is edited', () => {});
  test.skip('Buy purchase removes purchasefield and updates monthsummary correctly', () => {});
  test.skip('Delete purchase removes purchasefield and updates monthsummary correctly', () => {});
});

describe('Purchases functionality', () => {
  test.skip('Purchase displays correct when added', () => {});
  test.skip('Purchase displays/updates correct when summation of presets change', () => {});
  test.skip('Click on purchase activates edit preset in presetform', () => {});
  test.skip('Click on piggybank or monthsleft button activates AddtoPiggybankModal ', () => {});
  test.skip('Delete purchase button works and removes purchasefield', () => {});
  test.skip('Buy purchase button works and removes purchasefield', () => {});
});
