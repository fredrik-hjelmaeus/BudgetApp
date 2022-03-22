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
  });

  test.only('editing name and number on piggybank saving works correctly', async () => {
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

    //create piggybank saving
    fireEvent.click(await screen.findByRole('button', { name: /5 months/i }));
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
    const submitBtn = await screen.findByRole('button', { name: /submit/i });
    fireEvent.click(submitBtn);
    await waitForElementToBeRemoved(submitBtn);
    expect(submitBtn).not.toBeInTheDocument();

    // press number on piggybank saving
    fireEvent.click(await screen.findByRole('button', { name: /10544/i }));

    // verify edit preset fields is loaded with preset values and then change them
    const numberField = await screen.findByLabelText('Number');
    const nameField = await screen.findByLabelText('Name');
    expect(numberField.value).toBe('10544');
    expect(nameField.value).toBe('Resa');
    userEvent.clear(numberField);
    userEvent.clear(nameField);
    userEvent.type(numberField, '999');
    userEvent.type(nameField, 'Trip');
    fireEvent.click(screen.getByRole('button', { name: /update/i }));

    // expect the saving preset to have been updated
    const editedSavingPresetNumber = await screen.findByRole('button', {
      name: /999/i,
    });
    const editedSavingPresetName = await screen.findByRole('button', {
      name: /trip/i,
    });
    expect(editedSavingPresetNumber).toBeInTheDocument();
    expect(editedSavingPresetName).toBeInTheDocument();
  });
  test.skip('should not be able to add more to piggybank in edit when month balance 0 or less', () => {});
  test.skip('should not be able to add more to saving in edit when month balance 0 or less', () => {});
  test.skip('editing category on piggybank saving should not work', async () => {});
  test.skip('deleting piggybank saving works correctly', async () => {});
  test.skip('editing name,number and category on saving works correctly', async () => {
    // go to april month
    const aprilButton = screen.queryByRole('button', { name: /april/i });
    fireEvent.click(aprilButton);
    // click number on saving
    fireEvent.click(await screen.findByRole('button', { name: /456788/i }));
    const numberField = await screen.findByLabelText('Number');
    expect(numberField.value).toBe('456788');
    userEvent.clear(numberField);
    userEvent.type(numberField, '999');
    fireEvent.click(screen.getByRole('button', { name: /update/i }));

    // screen.debug(await (await screen.findByRole('heading', { name: /month surplus put to savings/i })).parentElement.parentElement);
    //  await waitFor(async () => await screen.findByRole('button', { name: /999/i }));
    const editedSavingPreset = await screen.findByRole('button', {
      name: /999/i,
    });
    expect(editedSavingPreset).toBeInTheDocument();
  });
  test.skip('deleting saving works correctly', async () => {});
});
