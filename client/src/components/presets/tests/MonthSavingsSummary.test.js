import { render, screen, fireEvent, waitForElementToBeRemoved, waitFor } from '../../../test-utils/context-wrapper';
import userEvent from '@testing-library/user-event';
import App from '../../../App';
import MonthSummary from '../MonthSummary';
import { server } from '../../../mocks/server';
import { rest } from 'msw';
import path from 'path';

test('editing name and number on piggybank saving works correctly', async () => {});
test('editing category on piggybank saving should not work', async () => {});
test('deleting piggybank saving works correctly', async () => {});
test('editing name,number and category on saving works correctly', async () => {});
test('deleting saving works correctly', async () => {});
