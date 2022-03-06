import { render, screen, fireEvent, waitForElementToBeRemoved, waitFor, act } from '../../../test-utils/context-wrapper';
import userEvent from '@testing-library/user-event';
import App from '../../../App';
import MonthSummary from '../MonthSummary';
import { server } from '../../../mocks/server';
import { rest } from 'msw';
import path from 'path';

describe('MonthSummary unit tests', () => {
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

  test('Field gets deleted when delete button is pressed', async () => {
    // get presets
    const presets = screen.getAllByTestId('presetitem');
    // get deletebutton on the first preset and click it
    const presetDeleteButton = presets[0].parentElement.parentElement.children[5];
    fireEvent.click(presetDeleteButton);
    // expect deletebutton to be gone
    await waitForElementToBeRemoved(presetDeleteButton);
    expect(presetDeleteButton).not.toBeInTheDocument();
  });

  test.only('Category is updated when changed', () => {
    const presets = screen.getAllByTestId('presetitem');
    // get categoryselect on the first preset and change category
    const presetCategorySelector = presets[0].parentElement.parentElement.children[4];
    userEvent.selectOptions(presetCategorySelector, 'Reminderfees');

    screen.debug(presetCategorySelector);
  });
  test.skip('Income preset is moved to expense when value is edited', () => {});
  test.skip('Expense preset is moved to income when value is edited', () => {});
  test.skip('Buy purchase removes purchasefield and updates monthsummary correctly', () => {});
  test.skip('Delete purchase removes purchasefield and updates monthsummary correctly', () => {});
});
