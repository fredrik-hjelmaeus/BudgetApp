import { render, screen, fireEvent, waitForElementToBeRemoved, waitFor } from '../../../test-utils/context-wrapper';
import userEvent from '@testing-library/user-event';
import App from '../../../App';
import MonthSummary from '../MonthSummary';
import { server } from '../../../mocks/server';
import { rest } from 'msw';
import path from 'path';

describe('MonthSummary unit & integration tests', () => {
  beforeEach(async () => {
    // go to month and expand preset form
    render(<App />);

    // go to month
    const januaryButton = screen.queryByRole('button', { name: /january/i });
    fireEvent.click(januaryButton);

    // click add to budget button
    const addToBudgetButton = await screen.findByRole('button', {
      name: /add to budget/i,
    });
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

  test('Field gets deleted when delete button is pressed', async () => {
    // get presets
    const presets = screen.getAllByTestId('presetitem');
    // get deletebutton on the first preset and click it
    const presetDeleteButton = presets[0].parentElement.parentElement.children[4];
    fireEvent.click(presetDeleteButton);
    // expect deletebutton to be gone
    await waitForElementToBeRemoved(presetDeleteButton);
    expect(presetDeleteButton).not.toBeInTheDocument();
  });

  test('Category is updated when changed', async () => {
    const presets = screen.getAllByTestId('presetitem');

    // get categoryselect on the first preset and change category
    const category = presets[0].parentElement.parentElement.children[3];

    //close presetform for easier query selection
    fireEvent.click(screen.getByTestId('presetform_closebtn'));
    fireEvent.click(category);

    // expect edit preset modal to be opened
    // change category and submit
    const editpresetheader = await screen.findByRole('heading', {
      name: /edit/i,
    });
    userEvent.selectOptions(screen.getByRole('combobox'), 'Travel');
    const submitButton = screen.getByRole('button', { name: /update/i });
    fireEvent.click(submitButton);

    // check that edit preset modal is closed and the preset is updated with new icon/category
    expect(editpresetheader).not.toBeInTheDocument();
    const presetsAgain = await screen.findAllByTestId('presetitem');
    expect(presetsAgain.length).toBe(3);
    expect(await screen.findByAltText('Travel icon')).toBeInTheDocument(); // avoids unmounts somehow
    const typeIcon = presetsAgain[0].parentElement.parentElement.children[3].children[0].getAttribute('alt');
    expect(typeIcon).toBe('Travel icon');
  });
});
