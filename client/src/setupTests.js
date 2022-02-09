// add / install jest-dom so we get access to custom jest matchers to assert on DOM-nodes.
import '@testing-library/jest-dom';

// src/setupTests.js
import { server } from './mocks/server.js';
// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  localStorage.clear();
});

// Clean up after the tests are finished.
afterAll(() => server.close());

//jest.setTimeout(15000);
