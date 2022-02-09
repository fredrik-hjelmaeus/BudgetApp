//import { render, screen, fireEvent, waitForElementToBeRemoved } from '../test-utils/context-wrapper';
import userEvent from '@testing-library/user-event';
import PresetForm from '../PresetForm';

describe('Summation functionality', () => {
  test.skip('Deleting presetvalues updates all summation-fields', () => {});
  test.skip('Adding overhead income presetvalue updates all summation-fields', () => {});
  test.skip('Adding overhead expense presetvalue updates all summation-fields', () => {});
  test.skip('Adding multiple overhead presetvalues through upload csv dialog updates all summation-fields correctly', () => {});
  test.skip('Editing overhead income presetvalues updates all summation-fields', () => {});
  test.skip('Editing overhead expense presetvalues updates all summation-fields', () => {});
  test.skip('Editing overhead income to expense presetvalues updates all summation-fields', () => {});
  test.skip('Editing overhead expense to income presetvalues updates all summation-fields', () => {});
  test.skip('Add purchase presetvalues updates all summation-fields', () => {});
  test.skip('Edit purchase presetvalues updates all summation-fields', () => {});
  test.skip('Delete purchase presetvalues updates all summation-fields', () => {});
  test.skip('Buy purchase updates all summation-fields', () => {});
  test.skip('Add piggybank saving to a purchase updates all summation-fields', () => {});
  test.skip('Add saving presetvalues updates all summation-fields', () => {});
  test.skip('Edit saving presetvalues updates all summation-fields', () => {});
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
