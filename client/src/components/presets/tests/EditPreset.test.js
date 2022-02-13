import { render, screen, fireEvent, waitForElementToBeRemoved } from '../../../test-utils/context-wrapper';
import userEvent from '@testing-library/user-event';
import EditPreset from '../EditPreset';

test('initial state correct', async () => {
  render(<EditPreset />);
  expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Number')).toBeInTheDocument();
  expect(screen.getByRole('combobox')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  expect(screen.getByText(/edit/i)).toBeInTheDocument();
  expect(screen.getByRole('checkbox', { name: /overhead/i })).not.toBeChecked(); //).toHaveAttribute('checked');
  expect(screen.getByRole('checkbox', { name: /purchase/i })).not.toBeChecked();
  expect(screen.getByRole('checkbox', { name: /capital/i })).not.toBeChecked();
  expect(screen.getByRole('checkbox', { name: /savings/i })).not.toBeChecked();
  const closeBtn = (await screen.findAllByRole('button')).find((b) => b.value === 'close');
  expect(closeBtn).toBeInTheDocument();
});
test('changing name,number,category and type works', () => {
  render(<EditPreset />);

  userEvent.type(screen.getByPlaceholderText('Name'), 'test');
  userEvent.type(screen.getByPlaceholderText('Number'), '1000');
  userEvent.selectOptions(screen.getByRole('combobox'), 'Reminderfees');
  fireEvent.click(screen.getByRole('checkbox', { name: /purchase/i }));

  expect(screen.getByPlaceholderText('Name')).toHaveValue('test');
  expect(screen.getByPlaceholderText('Number')).toHaveValue(1000);
  expect(screen.getByRole('combobox')).toHaveValue('Reminderfees');
  expect(screen.getByRole('checkbox', { name: /overhead/i })).not.toBeChecked();
  expect(screen.getByRole('checkbox', { name: /purchase/i })).toBeChecked();

  const submitButton = screen.getByRole('button', { name: /update/i });
  fireEvent.click(submitButton);

  // can't test if modal is closed as _id is not defined,so the edited preset will fail to submit.
  // This will be tested in integration tests instead : Month.test.js
});
