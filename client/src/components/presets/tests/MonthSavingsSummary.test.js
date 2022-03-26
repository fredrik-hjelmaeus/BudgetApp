import { render, screen, fireEvent, waitForElementToBeRemoved, waitFor } from '../../../test-utils/context-wrapper';
import userEvent from '@testing-library/user-event';
import App from '../../../App';
import MonthSummary from '../MonthSummary';
import { server } from '../../../mocks/server';
import { rest } from 'msw';
import path from 'path';
import MonthSavingsSummary from '../MonthSavingsSummary';

describe('MonthSavingsSummary unit tests', () => {
  beforeEach(async () => {
    // go to month and expand preset form
    render(<App />);

    // go to month
    const januaryButton = screen.queryByRole('button', { name: /january/i });
    fireEvent.click(januaryButton);

    // assert/await inital month state, IMPORTANT TO INIT SUMMATION VALUES as they are used in the tests
    const sum = await screen.findAllByText('799');
    expect(sum.length).toBe(1);
    const expenses = await screen.findAllByText('-255');
    expect(expenses.length).toBe(3);
    const BalanceAndSurplus = await screen.findAllByText('544');
    expect(BalanceAndSurplus.length).toBe(2);
    const accountBalanceSum = await screen.findByText('544977');
    const monthSavings = await screen.findByText('0');
    const purchaseElement = await screen.findByRole('heading', {
      name: /purchases/i,
    });
    const purchasePreset = await screen.findByText('55000');
    const presetElement = await screen.findByText('sadas');
    expect(presetElement).toBeInTheDocument();
    expect(purchaseElement).toBeInTheDocument();
    expect(purchasePreset).toBeInTheDocument();
    expect(monthSavings).toBeInTheDocument();
    expect(accountBalanceSum).toBeInTheDocument();
  });

  test('editing number on piggybank saving works correctly', async () => {
    // add income preset
    fireEvent.click(await screen.findByRole('button', { name: /add to budget/i }));
    userEvent.type(await screen.findByPlaceholderText('Name'), 'incomepreset');
    userEvent.type(await screen.findByPlaceholderText('Number'), '10000');
    userEvent.selectOptions(await screen.findByRole('combobox'), 'Travel');
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
            category: req.body.category,
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

    //create piggybank saving
    fireEvent.click(await screen.findByRole('button', { name: /5 months/i }));
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
    const submitBtn = await screen.findByRole('button', { name: /submit/i });
    fireEvent.click(submitBtn);
    await waitForElementToBeRemoved(submitBtn);
    expect(submitBtn).not.toBeInTheDocument();

    // press number on piggybank saving
    const purchasePresetNumberButton = await screen.findByRole('button', {
      name: /10544/i,
    });
    fireEvent.click(purchasePresetNumberButton);

    // expect AddtoPiggybankModal to be shown
    const header = screen.getByRole('heading', { name: 'Amount to save' });
    expect(header).toBeInTheDocument();

    // change the amount to save value
    fireEvent.change(screen.getByTestId('inputamountrange'), {
      target: { value: '2000' },
    });
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

    // expect edit piggybankmodal to be closed and the number of piggysaving in monthsavingssummary to have the updated number
    await waitForElementToBeRemoved(header);
    const piggybankSavingNumber = await screen.findByRole('button', {
      name: /2000/i,
    });
    expect(piggybankSavingNumber).toBeInTheDocument();

    // expect summation fields to be updated
    expect(screen.getByText('Month Income:').textContent).toBe('Month Income:    10799');
    expect(screen.getByText('Month Surplus:').parentElement.children[1].textContent).toBe('10544');
    expect(screen.getByText('Month Expenses:').textContent).toBe('Month Expenses:    -255');
    expect(screen.getByText('Account Balance:').textContent).toBe('Account Balance:554977 ');
    expect(screen.getByText('Month Balance:').textContent).toBe('Month Balance:8544');
    expect(screen.getByText('Month Savings:').textContent).toBe('Month Savings: 2000');

    const BalanceByCategory_TravelField = screen.getByText('Travel:').children[0].textContent;
    expect(BalanceByCategory_TravelField).toBe('9745');
  });

  test('should not be able to add more to saving in edit when month balance is 0 or less', async () => {
    // The user we are using has a month surplus of 544
    // Add saving that is 544
    fireEvent.click(await screen.findByRole('button', { name: /add to budget/i }));

    // fill in the form
    const nameField = screen.getByPlaceholderText('Name');
    const numberField = screen.getByPlaceholderText('Number');
    const categoryField = screen.getByRole('combobox');
    userEvent.type(nameField, 'valid_saving_sum');
    userEvent.type(numberField, '500');
    userEvent.selectOptions(categoryField, 'Reminderfees');
    const savingsCheckbox = screen.getByRole('checkbox', { name: /savings/i });
    fireEvent.click(savingsCheckbox);
    expect(savingsCheckbox).toBeChecked();

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
            category: req.body.category,
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

    //click submit
    fireEvent.click(screen.getByRole('button', { name: /add to budget/i }));

    // expect fields to be reset after submit
    expect(screen.getByPlaceholderText('Name')).toHaveValue('');
    expect(screen.getByPlaceholderText('Number')).toHaveValue(null);
    expect(screen.getByRole('combobox')).toHaveValue('Select an category');
    expect(screen.getByRole('checkbox', { name: /overhead/i })).toBeChecked();

    // close presetform to prevent two alert-messages to be shown later in test
    fireEvent.click(screen.getByTestId('presetform_closebtn'));

    // click saving item to get to edit preset modal
    fireEvent.click(await screen.findByRole('button', { name: /valid_saving_sum/i }));

    // expect edit preset modal to have been opened
    const updateBtn = await screen.findByRole('button', { name: /update/i });
    expect(updateBtn).toBeInTheDocument();

    // change number to something more than 544 and submit
    const editPresetNameField = screen.getAllByPlaceholderText('Name').find((field) => field.value === 'valid_saving_sum');
    const editPresetNumField = screen.getAllByPlaceholderText('Number').find((field) => field.value === '500');
    userEvent.clear(editPresetNumField);
    userEvent.clear(editPresetNameField);
    userEvent.type(editPresetNumField, '1000');
    userEvent.type(editPresetNameField, 'invalid_saving_sum');
    fireEvent.click(updateBtn);

    // expect alert message to appear in edit preset
    expect(await screen.findByText('Insufficient Month Surplus for this saving number')).toBeInTheDocument();
    expect(editPresetNumField).toBeInTheDocument();
  });

  test.skip('editing category on piggybank saving should not work', async () => {});
  test.skip('deleting piggybank saving works correctly', async () => {});
  test.only('editing name,number and category on saving works correctly', async () => {
    // go to april month
    const aprilButton = screen.queryByRole('button', { name: /april/i });
    fireEvent.click(aprilButton);

    // click number on saving
    fireEvent.click(await screen.findByRole('button', { name: /456788/i }));

    // edit number
    const numberField = await screen.findByLabelText('Number');
    expect(numberField.value).toBe('456788');
    userEvent.clear(numberField);
    userEvent.type(numberField, '66');
    const updateBtn = screen.getByRole('button', { name: /update/i });
    server.use(
      rest.put(`http://localhost/api/userpreset/:_id`, (req, res, ctx) => {
        const { _id } = req.params;

        return res(
          ctx.json({
            _id,
            user: req.body.user,
            name: req.body.name,
            number: req.body.number,
            month: req.body.month,
            year: 2021,
            category: req.body.category,
            type: req.body.type,
            piggybank: [
              {
                month: 'January',
                year: 2021,
                savedAmount: 0,
                _id: '6205143125ad67554798451b',
              },
            ],
            date: '2022-02-10T13:33:37.780Z',
            __v: 0,
          })
        );
      })
    );

    // submit edited number
    fireEvent.click(updateBtn);
    waitForElementToBeRemoved(updateBtn);
    expect(updateBtn).not.toBeInTheDocument();

    // expect the number to have been changed
    expect(await screen.findByRole('button', { name: /66/i })).toBeInTheDocument();

    // click name on saving
    fireEvent.click(await screen.findByRole('button', { name: /saving/i }));

    // close edit preset
    const cancelBtn = await screen.findByRole('button', { name: /cancel/i });
    fireEvent.click(cancelBtn);
    waitForElementToBeRemoved(cancelBtn);
    expect(cancelBtn).not.toBeInTheDocument();

    // click category on saving
    fireEvent.click(screen.getByAltText(/salary icon/i));
    // expect edit preset to appear
    expect(await screen.findByRole('button', { name: /cancel/i })).toBeInTheDocument(); // <--- correct test but need implementation in app
  });
  test.skip('deleting saving works correctly', async () => {});
});
