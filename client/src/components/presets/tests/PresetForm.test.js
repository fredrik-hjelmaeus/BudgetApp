import { render, screen, fireEvent, waitForElementToBeRemoved } from '../../../test-utils/context-wrapper';
import userEvent from '@testing-library/user-event';
import PresetForm from '../PresetForm';

test('initial load state correct', () => {
  render(<PresetForm />);
});
test('create preset works', () => {
  render(<PresetForm />);
});
test('shows error if not all fields are filled in', () => {
  render(<PresetForm />);
});
test('number field only accepts negative or positive numbers', () => {
  render(<PresetForm />);
});
test('select category field works', () => {
  render(<PresetForm />);
});
test('checkboxfield works', () => {
  render(<PresetForm />);
});
