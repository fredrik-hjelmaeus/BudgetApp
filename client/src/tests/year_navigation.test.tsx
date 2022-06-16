import {
  render,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from "../test-utils/context-wrapper";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { rest } from "msw";
import { server } from "../mocks/server";
import React from "react";

describe("navigation through all year pages", () => {
  test("initial state correct in year", async () => {
    // setup not logged in user
    server.use(
      // get current user via token endpoint
      //fail to get user and will only try if token is found.
      rest.get("http://localhost/api/auth", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ errors: [{ msg: "No token, authorization denied" }] })
        );
      }),
      // get users presets
      rest.get("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(ctx.status(401), ctx.json([]));
      }),
      //register new user response
      rest.post("http://localhost/api/users", (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            errors: [
              {
                value: "gretsa@icom",
                msg: "Please include a valid Email",
                param: "email",
                location: "body",
              },
            ],
          })
        );
      })
    );
    render(<App />);

    // go to year by logging in
    const loginButton = await screen.findByRole("button", { name: /login/i });
    fireEvent.click(loginButton);
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, "nisse@manpower.se");
    const passwordField = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, "Passw0rd!");
    const submitLoginButton = screen.getByDisplayValue(/login/i);
    // create the response from backend
    server.use(
      rest.get("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json([
            {
              _id: "61ffc16219c0a7a8173c7f2d",
              user: "61ed72d16f895b1100dbab66",
              name: "En inkomst",
              number: 666666,
              month: "September",
              year: 2021,
              category: "Housing",
              type: "overhead",
              piggybank: [
                {
                  month: "September",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61ffc16219c0a7a8173c7f2e",
                },
              ],
              date: "2022-02-06T12:38:58.720Z",
              __v: 0,
            },
            {
              _id: "61ffc14719c0a7a8173c7f16",
              user: "61ed72d16f895b1100dbab66",
              name: "saving",
              number: 456788,
              month: "April",
              year: 2021,
              category: "Salary",
              type: "savings",
              piggybank: [
                {
                  month: "April",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61ffc14719c0a7a8173c7f17",
                },
              ],
              date: "2022-02-06T12:38:31.061Z",
              __v: 0,
            },
            {
              _id: "61fc0bdffdfe6258d87f5359",
              user: "61ed72d16f895b1100dbab66",
              name: "232",
              number: 323232,
              month: "February",
              year: 2021,
              category: "Food",
              type: "overhead",
              piggybank: [
                {
                  month: "February",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61fc0bdffdfe6258d87f535a",
                },
              ],
              date: "2022-02-03T17:07:43.744Z",
              __v: 0,
            },
            {
              _id: "6203c32b8015507e05a926cd",
              user: "61ed72d16f895b1100dbab66",
              name: "Resa",
              number: 55000,
              month: "January",
              year: 2021,
              category: "Travel",
              type: "purchase",
              piggybank: [
                {
                  month: "January",
                  year: 2021,
                  savedAmount: 0,
                  _id: "6203c32b8015507e05a926ce",
                },
              ],
              date: "2022-02-09T13:35:39.173Z",
              __v: 0,
            },
            {
              _id: "61edb2af5e11343d1268fa24",
              user: "61ed72d16f895b1100dbab66",
              name: "6776",
              number: 6767,
              month: "February",
              year: 2022,
              category: "Travel",
              type: "overhead",
              piggybank: [
                {
                  month: "February",
                  year: 2022,
                  savedAmount: 0,
                  _id: "61edb2af5e11343d1268fa25",
                },
              ],
              date: "2022-01-23T19:55:27.501Z",
              __v: 0,
            },
            {
              _id: "61ffc13019c0a7a8173c7f01",
              user: "61ed72d16f895b1100dbab66",
              name: "En inkomst",
              number: 4455,
              month: "June",
              year: 2021,
              category: "Food",
              type: "capital",
              piggybank: [
                {
                  month: "June",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61ffc13019c0a7a8173c7f02",
                },
              ],
              date: "2022-02-06T12:38:08.883Z",
              __v: 0,
            },
            {
              _id: "61edb19ec557568270d9349a",
              user: "61ed72d16f895b1100dbab66",
              name: "sadas",
              number: 444,
              month: "January",
              year: 2021,
              category: "Car",
              type: "overhead",
              piggybank: [
                {
                  month: "January",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61edb19ec557568270d9349b",
                },
              ],
              date: "2022-01-23T19:50:54.267Z",
              __v: 0,
            },
            {
              _id: "62039bb18015507e05a926a3",
              user: "61ed72d16f895b1100dbab66",
              name: "dsfs",
              number: 355,
              month: "January",
              year: 2021,
              category: "Commute",
              type: "overhead",
              piggybank: [
                {
                  month: "January",
                  year: 2021,
                  savedAmount: 0,
                  _id: "62039bb18015507e05a926a4",
                },
              ],
              date: "2022-02-09T10:47:13.627Z",
              __v: 0,
            },
            {
              _id: "61edb2a15e11343d1268fa15",
              user: "61ed72d16f895b1100dbab66",
              name: "gty",
              number: 77,
              month: "April",
              year: 2021,
              category: "Car",
              type: "overhead",
              piggybank: [
                {
                  month: "April",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61edb2a15e11343d1268fa16",
                },
              ],
              date: "2022-01-23T19:55:13.813Z",
              __v: 0,
            },
            {
              _id: "61ed73196f895b1100dbab72",
              name: "wew",
              number: 44,
              month: "November",
              year: 2021,
              category: "Commute",
              type: "overhead",
              piggybank: [
                {
                  _id: "61ed73196f895b1100dbab73",
                  month: "November",
                  year: 2021,
                  savedAmount: 0,
                },
              ],
              user: "61ed72d16f895b1100dbab66",
              date: "2022-01-23T15:24:09.301Z",
              __v: 0,
            },
            {
              _id: "61ed73256f895b1100dbab75",
              name: "dsfds",
              number: -20,
              month: "November",
              year: 2021,
              category: "Commute",
              type: "overhead",
              piggybank: [
                {
                  _id: "61ed73256f895b1100dbab76",
                  month: "November",
                  year: 2021,
                  savedAmount: 0,
                },
              ],
              user: "61ed72d16f895b1100dbab66",
              date: "2022-01-23T15:24:21.152Z",
              __v: 0,
            },
            {
              _id: "61edb1a5c557568270d9349d",
              user: "61ed72d16f895b1100dbab66",
              name: "sfdc",
              number: -255,
              month: "January",
              year: 2021,
              category: "Travel",
              type: "overhead",
              piggybank: [
                {
                  month: "January",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61edb1a5c557568270d9349e",
                },
              ],
              date: "2022-01-23T19:51:01.383Z",
              __v: 0,
            },
          ])
        );
      }),
      // get current user using token
      rest.get("http://localhost/api/auth", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "61ed72d16f895b1100dbab66",
            name: "dirk",
            email: "nisse@manpower.se",
            date: "2022-01-23T15:22:57.772Z",
            __v: 0,
          })
        );
      })
    );

    fireEvent.click(submitLoginButton);
    await waitForElementToBeRemoved(submitLoginButton);

    const yearTitleText = screen.getByRole("heading", {
      name: /Yearly summary and comparison analysis with last year/i,
    });
    expect(yearTitleText).toBeInTheDocument();
    const yearTitle = await screen.findByRole("heading", { name: /2021/i });
    expect(yearTitle).toBeInTheDocument();
    const balanceSummary = screen.getByRole("button", { name: /Balance Summary/i });
    expect(balanceSummary).toBeInTheDocument();
    const expenseSummary = screen.getByRole("button", { name: /Expense Summary/i });
    expect(expenseSummary).toBeInTheDocument();
    const incomeSummary = screen.getByRole("button", { name: /Income Summary/i });
    expect(incomeSummary).toBeInTheDocument();
    const savingsSummary = screen.getByRole("button", { name: /Savings Summary/i });
    expect(savingsSummary).toBeInTheDocument();

    const yearBalanceChartSummary = screen.getByText(/Year Summary:/i);
    expect(yearBalanceChartSummary).toBeInTheDocument();

    await waitFor(() => {
      const yearSumNumber = screen
        .queryAllByRole("listitem")
        .find((listitem) => listitem.textContent === "990543");
      expect(yearSumNumber).toBeInTheDocument();
    });

    const montlyAverageSum = screen
      .queryAllByRole("listitem")
      .find((listitem) => listitem.textContent === "82545");
    expect(montlyAverageSum).toBeInTheDocument();
    const capitalSum = screen
      .queryAllByRole("listitem")
      .find((listitem) => listitem.textContent === "4455");
    expect(capitalSum).toBeInTheDocument();
    const savingsSum = screen
      .queryAllByRole("listitem")
      .find((listitem) => listitem.textContent === "456788");
    expect(savingsSum).toBeInTheDocument();
    const accountBalanceSum = screen
      .queryAllByRole("listitem")
      .find((listitem) => listitem.textContent === "544977");
    expect(accountBalanceSum).toBeInTheDocument();
  });

  test("navigate to expense summary works and state is correct", async () => {
    // setup not logged in user
    server.use(
      //fail to get user and will only try if token is found.
      rest.get("http://localhost/api/auth", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            errors: [
              {
                msg: "No token, authorization denied",
              },
            ],
          })
        );
      }),
      // get users presets
      rest.get("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(ctx.status(401), ctx.json([]));
      }),
      //register new user response
      rest.post("http://localhost/api/users", (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            errors: [
              {
                value: "gretsa@icom",
                msg: "Please include a valid Email",
                param: "email",
                location: "body",
              },
            ],
          })
        );
      })
    );
    render(<App />);

    // go to year by logging in
    const loginButton = await screen.findByRole("button", { name: /login/i });
    fireEvent.click(loginButton);
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, "nisse@manpower.se");
    const passwordField = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, "Passw0rd!");
    const submitLoginButton = screen.getByDisplayValue(/login/i);
    // create the response from backend
    server.use(
      rest.get("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json([
            {
              _id: "61ffc16219c0a7a8173c7f2d",
              user: "61ed72d16f895b1100dbab66",
              name: "En inkomst",
              number: 666666,
              month: "September",
              year: 2021,
              category: "Housing",
              type: "overhead",
              piggybank: [
                {
                  month: "September",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61ffc16219c0a7a8173c7f2e",
                },
              ],
              date: "2022-02-06T12:38:58.720Z",
              __v: 0,
            },
            {
              _id: "61ffc14719c0a7a8173c7f16",
              user: "61ed72d16f895b1100dbab66",
              name: "saving",
              number: 456788,
              month: "April",
              year: 2021,
              category: "Salary",
              type: "savings",
              piggybank: [
                {
                  month: "April",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61ffc14719c0a7a8173c7f17",
                },
              ],
              date: "2022-02-06T12:38:31.061Z",
              __v: 0,
            },
            {
              _id: "61fc0bdffdfe6258d87f5359",
              user: "61ed72d16f895b1100dbab66",
              name: "232",
              number: 323232,
              month: "February",
              year: 2021,
              category: "Food",
              type: "overhead",
              piggybank: [
                {
                  month: "February",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61fc0bdffdfe6258d87f535a",
                },
              ],
              date: "2022-02-03T17:07:43.744Z",
              __v: 0,
            },
            {
              _id: "6203c32b8015507e05a926cd",
              user: "61ed72d16f895b1100dbab66",
              name: "Resa",
              number: 55000,
              month: "January",
              year: 2021,
              category: "Travel",
              type: "purchase",
              piggybank: [
                {
                  month: "January",
                  year: 2021,
                  savedAmount: 0,
                  _id: "6203c32b8015507e05a926ce",
                },
              ],
              date: "2022-02-09T13:35:39.173Z",
              __v: 0,
            },
            {
              _id: "61edb2af5e11343d1268fa24",
              user: "61ed72d16f895b1100dbab66",
              name: "6776",
              number: 6767,
              month: "February",
              year: 2022,
              category: "Travel",
              type: "overhead",
              piggybank: [
                {
                  month: "February",
                  year: 2022,
                  savedAmount: 0,
                  _id: "61edb2af5e11343d1268fa25",
                },
              ],
              date: "2022-01-23T19:55:27.501Z",
              __v: 0,
            },
            {
              _id: "61ffc13019c0a7a8173c7f01",
              user: "61ed72d16f895b1100dbab66",
              name: "En inkomst",
              number: 4455,
              month: "June",
              year: 2021,
              category: "Food",
              type: "capital",
              piggybank: [
                {
                  month: "June",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61ffc13019c0a7a8173c7f02",
                },
              ],
              date: "2022-02-06T12:38:08.883Z",
              __v: 0,
            },
            {
              _id: "61edb19ec557568270d9349a",
              user: "61ed72d16f895b1100dbab66",
              name: "sadas",
              number: 444,
              month: "January",
              year: 2021,
              category: "Car",
              type: "overhead",
              piggybank: [
                {
                  month: "January",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61edb19ec557568270d9349b",
                },
              ],
              date: "2022-01-23T19:50:54.267Z",
              __v: 0,
            },
            {
              _id: "62039bb18015507e05a926a3",
              user: "61ed72d16f895b1100dbab66",
              name: "dsfs",
              number: 355,
              month: "January",
              year: 2021,
              category: "Commute",
              type: "overhead",
              piggybank: [
                {
                  month: "January",
                  year: 2021,
                  savedAmount: 0,
                  _id: "62039bb18015507e05a926a4",
                },
              ],
              date: "2022-02-09T10:47:13.627Z",
              __v: 0,
            },
            {
              _id: "61edb2a15e11343d1268fa15",
              user: "61ed72d16f895b1100dbab66",
              name: "gty",
              number: 77,
              month: "April",
              year: 2021,
              category: "Car",
              type: "overhead",
              piggybank: [
                {
                  month: "April",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61edb2a15e11343d1268fa16",
                },
              ],
              date: "2022-01-23T19:55:13.813Z",
              __v: 0,
            },
            {
              _id: "61ed73196f895b1100dbab72",
              name: "wew",
              number: 44,
              month: "November",
              year: 2021,
              category: "Commute",
              type: "overhead",
              piggybank: [
                {
                  _id: "61ed73196f895b1100dbab73",
                  month: "November",
                  year: 2021,
                  savedAmount: 0,
                },
              ],
              user: "61ed72d16f895b1100dbab66",
              date: "2022-01-23T15:24:09.301Z",
              __v: 0,
            },
            {
              _id: "61ed73256f895b1100dbab75",
              name: "dsfds",
              number: -20,
              month: "November",
              year: 2021,
              category: "Commute",
              type: "overhead",
              piggybank: [
                {
                  _id: "61ed73256f895b1100dbab76",
                  month: "November",
                  year: 2021,
                  savedAmount: 0,
                },
              ],
              user: "61ed72d16f895b1100dbab66",
              date: "2022-01-23T15:24:21.152Z",
              __v: 0,
            },
            {
              _id: "61edb1a5c557568270d9349d",
              user: "61ed72d16f895b1100dbab66",
              name: "sfdc",
              number: -255,
              month: "January",
              year: 2021,
              category: "Travel",
              type: "overhead",
              piggybank: [
                {
                  month: "January",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61edb1a5c557568270d9349e",
                },
              ],
              date: "2022-01-23T19:51:01.383Z",
              __v: 0,
            },
          ])
        );
      }),
      // get current user using token
      rest.get("http://localhost/api/auth", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "61ed72d16f895b1100dbab66",
            name: "dirk",
            email: "nisse@manpower.se",
            date: "2022-01-23T15:22:57.772Z",
            __v: 0,
          })
        );
      })
    );

    fireEvent.click(submitLoginButton);
    await waitForElementToBeRemoved(submitLoginButton);
    const expenseSummary = screen.getByRole("button", { name: /Expense Summary/i });
    await waitFor(() => {
      expect(expenseSummary).toBeInTheDocument();
    });
    expenseSummary && fireEvent.click(expenseSummary);

    await waitFor(() => {
      const yearExpenseSum = screen
        .queryAllByRole("listitem")
        .find((listitem) => listitem.textContent === "275");
      expect(yearExpenseSum).toBeInTheDocument();
    });

    await waitFor(() => {
      const expenseAverage = screen
        .queryAllByRole("listitem")
        .find((listitem) => listitem.textContent === "23");
      expect(expenseAverage).toBeInTheDocument();
    });
  });

  test("navigate to income summary works and state is correct", async () => {
    // setup not logged in user
    server.use(
      //fail to get user and will only try if token is found.
      rest.get("http://localhost/api/auth", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            errors: [
              {
                msg: "No token, authorization denied",
              },
            ],
          })
        );
      }),
      // get users presets
      rest.get("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(ctx.status(401), ctx.json([]));
      }),
      //register new user response
      rest.post("http://localhost/api/users", (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            errors: [
              {
                value: "gretsa@icom",
                msg: "Please include a valid Email",
                param: "email",
                location: "body",
              },
            ],
          })
        );
      })
    );
    render(<App />);

    // go to year by logging in
    const loginButton = await screen.findByRole("button", { name: /login/i });
    fireEvent.click(loginButton);
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, "nisse@manpower.se");
    const passwordField = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, "Passw0rd!");
    const submitLoginButton = screen.getByDisplayValue(/login/i);
    // create the response from backend
    server.use(
      rest.get("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json([
            {
              _id: "61ffc16219c0a7a8173c7f2d",
              user: "61ed72d16f895b1100dbab66",
              name: "En inkomst",
              number: 666666,
              month: "September",
              year: 2021,
              category: "Housing",
              type: "overhead",
              piggybank: [
                {
                  month: "September",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61ffc16219c0a7a8173c7f2e",
                },
              ],
              date: "2022-02-06T12:38:58.720Z",
              __v: 0,
            },
            {
              _id: "61ffc14719c0a7a8173c7f16",
              user: "61ed72d16f895b1100dbab66",
              name: "saving",
              number: 456788,
              month: "April",
              year: 2021,
              category: "Salary",
              type: "savings",
              piggybank: [
                {
                  month: "April",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61ffc14719c0a7a8173c7f17",
                },
              ],
              date: "2022-02-06T12:38:31.061Z",
              __v: 0,
            },
            {
              _id: "61fc0bdffdfe6258d87f5359",
              user: "61ed72d16f895b1100dbab66",
              name: "232",
              number: 323232,
              month: "February",
              year: 2021,
              category: "Food",
              type: "overhead",
              piggybank: [
                {
                  month: "February",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61fc0bdffdfe6258d87f535a",
                },
              ],
              date: "2022-02-03T17:07:43.744Z",
              __v: 0,
            },
            {
              _id: "6203c32b8015507e05a926cd",
              user: "61ed72d16f895b1100dbab66",
              name: "Resa",
              number: 55000,
              month: "January",
              year: 2021,
              category: "Travel",
              type: "purchase",
              piggybank: [
                {
                  month: "January",
                  year: 2021,
                  savedAmount: 0,
                  _id: "6203c32b8015507e05a926ce",
                },
              ],
              date: "2022-02-09T13:35:39.173Z",
              __v: 0,
            },
            {
              _id: "61edb2af5e11343d1268fa24",
              user: "61ed72d16f895b1100dbab66",
              name: "6776",
              number: 6767,
              month: "February",
              year: 2022,
              category: "Travel",
              type: "overhead",
              piggybank: [
                {
                  month: "February",
                  year: 2022,
                  savedAmount: 0,
                  _id: "61edb2af5e11343d1268fa25",
                },
              ],
              date: "2022-01-23T19:55:27.501Z",
              __v: 0,
            },
            {
              _id: "61ffc13019c0a7a8173c7f01",
              user: "61ed72d16f895b1100dbab66",
              name: "En inkomst",
              number: 4455,
              month: "June",
              year: 2021,
              category: "Food",
              type: "capital",
              piggybank: [
                {
                  month: "June",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61ffc13019c0a7a8173c7f02",
                },
              ],
              date: "2022-02-06T12:38:08.883Z",
              __v: 0,
            },
            {
              _id: "61edb19ec557568270d9349a",
              user: "61ed72d16f895b1100dbab66",
              name: "sadas",
              number: 444,
              month: "January",
              year: 2021,
              category: "Car",
              type: "overhead",
              piggybank: [
                {
                  month: "January",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61edb19ec557568270d9349b",
                },
              ],
              date: "2022-01-23T19:50:54.267Z",
              __v: 0,
            },
            {
              _id: "62039bb18015507e05a926a3",
              user: "61ed72d16f895b1100dbab66",
              name: "dsfs",
              number: 355,
              month: "January",
              year: 2021,
              category: "Commute",
              type: "overhead",
              piggybank: [
                {
                  month: "January",
                  year: 2021,
                  savedAmount: 0,
                  _id: "62039bb18015507e05a926a4",
                },
              ],
              date: "2022-02-09T10:47:13.627Z",
              __v: 0,
            },
            {
              _id: "61edb2a15e11343d1268fa15",
              user: "61ed72d16f895b1100dbab66",
              name: "gty",
              number: 77,
              month: "April",
              year: 2021,
              category: "Car",
              type: "overhead",
              piggybank: [
                {
                  month: "April",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61edb2a15e11343d1268fa16",
                },
              ],
              date: "2022-01-23T19:55:13.813Z",
              __v: 0,
            },
            {
              _id: "61ed73196f895b1100dbab72",
              name: "wew",
              number: 44,
              month: "November",
              year: 2021,
              category: "Commute",
              type: "overhead",
              piggybank: [
                {
                  _id: "61ed73196f895b1100dbab73",
                  month: "November",
                  year: 2021,
                  savedAmount: 0,
                },
              ],
              user: "61ed72d16f895b1100dbab66",
              date: "2022-01-23T15:24:09.301Z",
              __v: 0,
            },
            {
              _id: "61ed73256f895b1100dbab75",
              name: "dsfds",
              number: -20,
              month: "November",
              year: 2021,
              category: "Commute",
              type: "overhead",
              piggybank: [
                {
                  _id: "61ed73256f895b1100dbab76",
                  month: "November",
                  year: 2021,
                  savedAmount: 0,
                },
              ],
              user: "61ed72d16f895b1100dbab66",
              date: "2022-01-23T15:24:21.152Z",
              __v: 0,
            },
            {
              _id: "61edb1a5c557568270d9349d",
              user: "61ed72d16f895b1100dbab66",
              name: "sfdc",
              number: -255,
              month: "January",
              year: 2021,
              category: "Travel",
              type: "overhead",
              piggybank: [
                {
                  month: "January",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61edb1a5c557568270d9349e",
                },
              ],
              date: "2022-01-23T19:51:01.383Z",
              __v: 0,
            },
          ])
        );
      }),
      // get current user using token
      rest.get("http://localhost/api/auth", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "61ed72d16f895b1100dbab66",
            name: "dirk",
            email: "nisse@manpower.se",
            date: "2022-01-23T15:22:57.772Z",
            __v: 0,
          })
        );
      })
    );
    fireEvent.click(submitLoginButton);
    await waitForElementToBeRemoved(submitLoginButton);

    const incomeSummary = screen.queryByRole("button", { name: /Income Summary/i });
    expect(incomeSummary).toBeInTheDocument();
    incomeSummary && fireEvent.click(incomeSummary);
    await waitFor(() => {
      const incomeSum = screen
        .queryAllByRole("listitem")
        .find((listitem) => listitem.textContent === "990818");
      expect(incomeSum).toBeInTheDocument();
    });

    await waitFor(() => {
      const incomeAverage = screen
        .queryAllByRole("listitem")
        .find((listitem) => listitem.textContent === "82568");
      expect(incomeAverage).toBeInTheDocument();
    });
  });

  test("navigate to savings summary works and state is correct", async () => {
    // setup not logged in user
    server.use(
      //fail to get user and will only try if token is found.
      rest.get("http://localhost/api/auth", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ errors: [{ msg: "No token, authorization denied" }] })
        );
      }),
      // get users presets
      rest.get("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(ctx.status(401), ctx.json([]));
      }),
      //register new user response
      rest.post("http://localhost/api/users", (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            errors: [
              {
                value: "gretsa@icom",
                msg: "Please include a valid Email",
                param: "email",
                location: "body",
              },
            ],
          })
        );
      })
    );
    render(<App />);

    // go to year by logging in
    const loginButton = await screen.findByRole("button", { name: /login/i });
    fireEvent.click(loginButton);
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, "nisse@manpower.se");
    const passwordField = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, "Passw0rd!");
    const submitLoginButton = screen.getByDisplayValue(/login/i);
    // create the response from backend
    server.use(
      rest.get("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json([
            {
              _id: "61ffc16219c0a7a8173c7f2d",
              user: "61ed72d16f895b1100dbab66",
              name: "En inkomst",
              number: 666666,
              month: "September",
              year: 2021,
              category: "Housing",
              type: "overhead",
              piggybank: [
                {
                  month: "September",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61ffc16219c0a7a8173c7f2e",
                },
              ],
              date: "2022-02-06T12:38:58.720Z",
              __v: 0,
            },
            {
              _id: "61ffc14719c0a7a8173c7f16",
              user: "61ed72d16f895b1100dbab66",
              name: "saving",
              number: 456788,
              month: "April",
              year: 2021,
              category: "Salary",
              type: "savings",
              piggybank: [
                {
                  month: "April",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61ffc14719c0a7a8173c7f17",
                },
              ],
              date: "2022-02-06T12:38:31.061Z",
              __v: 0,
            },
            {
              _id: "61fc0bdffdfe6258d87f5359",
              user: "61ed72d16f895b1100dbab66",
              name: "232",
              number: 323232,
              month: "February",
              year: 2021,
              category: "Food",
              type: "overhead",
              piggybank: [
                {
                  month: "February",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61fc0bdffdfe6258d87f535a",
                },
              ],
              date: "2022-02-03T17:07:43.744Z",
              __v: 0,
            },
            {
              _id: "6203c32b8015507e05a926cd",
              user: "61ed72d16f895b1100dbab66",
              name: "Resa",
              number: 55000,
              month: "January",
              year: 2021,
              category: "Travel",
              type: "purchase",
              piggybank: [
                {
                  month: "January",
                  year: 2021,
                  savedAmount: 0,
                  _id: "6203c32b8015507e05a926ce",
                },
              ],
              date: "2022-02-09T13:35:39.173Z",
              __v: 0,
            },
            {
              _id: "61edb2af5e11343d1268fa24",
              user: "61ed72d16f895b1100dbab66",
              name: "6776",
              number: 6767,
              month: "February",
              year: 2022,
              category: "Travel",
              type: "overhead",
              piggybank: [
                {
                  month: "February",
                  year: 2022,
                  savedAmount: 0,
                  _id: "61edb2af5e11343d1268fa25",
                },
              ],
              date: "2022-01-23T19:55:27.501Z",
              __v: 0,
            },
            {
              _id: "61ffc13019c0a7a8173c7f01",
              user: "61ed72d16f895b1100dbab66",
              name: "En inkomst",
              number: 4455,
              month: "June",
              year: 2021,
              category: "Food",
              type: "capital",
              piggybank: [
                {
                  month: "June",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61ffc13019c0a7a8173c7f02",
                },
              ],
              date: "2022-02-06T12:38:08.883Z",
              __v: 0,
            },
            {
              _id: "61edb19ec557568270d9349a",
              user: "61ed72d16f895b1100dbab66",
              name: "sadas",
              number: 444,
              month: "January",
              year: 2021,
              category: "Car",
              type: "overhead",
              piggybank: [
                {
                  month: "January",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61edb19ec557568270d9349b",
                },
              ],
              date: "2022-01-23T19:50:54.267Z",
              __v: 0,
            },
            {
              _id: "62039bb18015507e05a926a3",
              user: "61ed72d16f895b1100dbab66",
              name: "dsfs",
              number: 355,
              month: "January",
              year: 2021,
              category: "Commute",
              type: "overhead",
              piggybank: [
                {
                  month: "January",
                  year: 2021,
                  savedAmount: 0,
                  _id: "62039bb18015507e05a926a4",
                },
              ],
              date: "2022-02-09T10:47:13.627Z",
              __v: 0,
            },
            {
              _id: "61edb2a15e11343d1268fa15",
              user: "61ed72d16f895b1100dbab66",
              name: "gty",
              number: 77,
              month: "April",
              year: 2021,
              category: "Car",
              type: "overhead",
              piggybank: [
                {
                  month: "April",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61edb2a15e11343d1268fa16",
                },
              ],
              date: "2022-01-23T19:55:13.813Z",
              __v: 0,
            },
            {
              _id: "61ed73196f895b1100dbab72",
              name: "wew",
              number: 44,
              month: "November",
              year: 2021,
              category: "Commute",
              type: "overhead",
              piggybank: [
                {
                  _id: "61ed73196f895b1100dbab73",
                  month: "November",
                  year: 2021,
                  savedAmount: 0,
                },
              ],
              user: "61ed72d16f895b1100dbab66",
              date: "2022-01-23T15:24:09.301Z",
              __v: 0,
            },
            {
              _id: "61ed73256f895b1100dbab75",
              name: "dsfds",
              number: -20,
              month: "November",
              year: 2021,
              category: "Commute",
              type: "overhead",
              piggybank: [
                {
                  _id: "61ed73256f895b1100dbab76",
                  month: "November",
                  year: 2021,
                  savedAmount: 0,
                },
              ],
              user: "61ed72d16f895b1100dbab66",
              date: "2022-01-23T15:24:21.152Z",
              __v: 0,
            },
            {
              _id: "61edb1a5c557568270d9349d",
              user: "61ed72d16f895b1100dbab66",
              name: "sfdc",
              number: -255,
              month: "January",
              year: 2021,
              category: "Travel",
              type: "overhead",
              piggybank: [
                {
                  month: "January",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61edb1a5c557568270d9349e",
                },
              ],
              date: "2022-01-23T19:51:01.383Z",
              __v: 0,
            },
          ])
        );
      }),
      // get current user using token
      rest.get("http://localhost/api/auth", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "61ed72d16f895b1100dbab66",
            name: "dirk",
            email: "nisse@manpower.se",
            date: "2022-01-23T15:22:57.772Z",
            __v: 0,
          })
        );
      })
    );
    fireEvent.click(submitLoginButton);
    await waitForElementToBeRemoved(submitLoginButton);

    const savingsSummary = screen.queryByRole("button", { name: /Savings Summary/i });
    expect(savingsSummary).toBeInTheDocument();
    savingsSummary && fireEvent.click(savingsSummary);

    expect(await screen.findByText("456788")).toBeInTheDocument();
    expect(screen.getByText("4455")).toBeInTheDocument();
  });

  test("navigate back to balance summary works", async () => {
    // setup not logged in user
    server.use(
      //fail to get user and will only try if token is found.
      rest.get("http://localhost/api/auth", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            errors: [
              {
                msg: "No token, authorization denied",
              },
            ],
          })
        );
      }),
      // get users presets
      rest.get("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(ctx.status(401), ctx.json([]));
      }),
      //register new user response
      rest.post("http://localhost/api/users", (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            errors: [
              {
                value: "gretsa@icom",
                msg: "Please include a valid Email",
                param: "email",
                location: "body",
              },
            ],
          })
        );
      })
    );
    render(<App />);

    // go to year by logging in
    const loginButton = await screen.findByRole("button", { name: /login/i });
    fireEvent.click(loginButton);
    const emailField = screen.getByPlaceholderText(/Email Address/i);
    userEvent.type(emailField, "nisse@manpower.se");
    const passwordField = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordField, "Passw0rd!");
    const submitLoginButton = screen.getByDisplayValue(/login/i);
    // create the response from backend
    server.use(
      rest.get("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json([
            {
              _id: "61ffc16219c0a7a8173c7f2d",
              user: "61ed72d16f895b1100dbab66",
              name: "En inkomst",
              number: 666666,
              month: "September",
              year: 2021,
              category: "Housing",
              type: "overhead",
              piggybank: [
                {
                  month: "September",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61ffc16219c0a7a8173c7f2e",
                },
              ],
              date: "2022-02-06T12:38:58.720Z",
              __v: 0,
            },
            {
              _id: "61ffc14719c0a7a8173c7f16",
              user: "61ed72d16f895b1100dbab66",
              name: "saving",
              number: 456788,
              month: "April",
              year: 2021,
              category: "Salary",
              type: "savings",
              piggybank: [
                {
                  month: "April",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61ffc14719c0a7a8173c7f17",
                },
              ],
              date: "2022-02-06T12:38:31.061Z",
              __v: 0,
            },
            {
              _id: "61fc0bdffdfe6258d87f5359",
              user: "61ed72d16f895b1100dbab66",
              name: "232",
              number: 323232,
              month: "February",
              year: 2021,
              category: "Food",
              type: "overhead",
              piggybank: [
                {
                  month: "February",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61fc0bdffdfe6258d87f535a",
                },
              ],
              date: "2022-02-03T17:07:43.744Z",
              __v: 0,
            },
            {
              _id: "6203c32b8015507e05a926cd",
              user: "61ed72d16f895b1100dbab66",
              name: "Resa",
              number: 55000,
              month: "January",
              year: 2021,
              category: "Travel",
              type: "purchase",
              piggybank: [
                {
                  month: "January",
                  year: 2021,
                  savedAmount: 0,
                  _id: "6203c32b8015507e05a926ce",
                },
              ],
              date: "2022-02-09T13:35:39.173Z",
              __v: 0,
            },
            {
              _id: "61edb2af5e11343d1268fa24",
              user: "61ed72d16f895b1100dbab66",
              name: "6776",
              number: 6767,
              month: "February",
              year: 2022,
              category: "Travel",
              type: "overhead",
              piggybank: [
                {
                  month: "February",
                  year: 2022,
                  savedAmount: 0,
                  _id: "61edb2af5e11343d1268fa25",
                },
              ],
              date: "2022-01-23T19:55:27.501Z",
              __v: 0,
            },
            {
              _id: "61ffc13019c0a7a8173c7f01",
              user: "61ed72d16f895b1100dbab66",
              name: "En inkomst",
              number: 4455,
              month: "June",
              year: 2021,
              category: "Food",
              type: "capital",
              piggybank: [
                {
                  month: "June",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61ffc13019c0a7a8173c7f02",
                },
              ],
              date: "2022-02-06T12:38:08.883Z",
              __v: 0,
            },
            {
              _id: "61edb19ec557568270d9349a",
              user: "61ed72d16f895b1100dbab66",
              name: "sadas",
              number: 444,
              month: "January",
              year: 2021,
              category: "Car",
              type: "overhead",
              piggybank: [
                {
                  month: "January",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61edb19ec557568270d9349b",
                },
              ],
              date: "2022-01-23T19:50:54.267Z",
              __v: 0,
            },
            {
              _id: "62039bb18015507e05a926a3",
              user: "61ed72d16f895b1100dbab66",
              name: "dsfs",
              number: 355,
              month: "January",
              year: 2021,
              category: "Commute",
              type: "overhead",
              piggybank: [
                {
                  month: "January",
                  year: 2021,
                  savedAmount: 0,
                  _id: "62039bb18015507e05a926a4",
                },
              ],
              date: "2022-02-09T10:47:13.627Z",
              __v: 0,
            },
            {
              _id: "61edb2a15e11343d1268fa15",
              user: "61ed72d16f895b1100dbab66",
              name: "gty",
              number: 77,
              month: "April",
              year: 2021,
              category: "Car",
              type: "overhead",
              piggybank: [
                {
                  month: "April",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61edb2a15e11343d1268fa16",
                },
              ],
              date: "2022-01-23T19:55:13.813Z",
              __v: 0,
            },
            {
              _id: "61ed73196f895b1100dbab72",
              name: "wew",
              number: 44,
              month: "November",
              year: 2021,
              category: "Commute",
              type: "overhead",
              piggybank: [
                {
                  _id: "61ed73196f895b1100dbab73",
                  month: "November",
                  year: 2021,
                  savedAmount: 0,
                },
              ],
              user: "61ed72d16f895b1100dbab66",
              date: "2022-01-23T15:24:09.301Z",
              __v: 0,
            },
            {
              _id: "61ed73256f895b1100dbab75",
              name: "dsfds",
              number: -20,
              month: "November",
              year: 2021,
              category: "Commute",
              type: "overhead",
              piggybank: [
                {
                  _id: "61ed73256f895b1100dbab76",
                  month: "November",
                  year: 2021,
                  savedAmount: 0,
                },
              ],
              user: "61ed72d16f895b1100dbab66",
              date: "2022-01-23T15:24:21.152Z",
              __v: 0,
            },
            {
              _id: "61edb1a5c557568270d9349d",
              user: "61ed72d16f895b1100dbab66",
              name: "sfdc",
              number: -255,
              month: "January",
              year: 2021,
              category: "Travel",
              type: "overhead",
              piggybank: [
                {
                  month: "January",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61edb1a5c557568270d9349e",
                },
              ],
              date: "2022-01-23T19:51:01.383Z",
              __v: 0,
            },
          ])
        );
      }),
      // get current user using token
      rest.get("http://localhost/api/auth", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "61ed72d16f895b1100dbab66",
            name: "dirk",
            email: "nisse@manpower.se",
            date: "2022-01-23T15:22:57.772Z",
            __v: 0,
          })
        );
      })
    );
    fireEvent.click(submitLoginButton);
    await waitForElementToBeRemoved(submitLoginButton);

    // click to expense view
    const expenseSummary = screen.queryByRole("button", { name: /Expense Summary/i });
    expect(expenseSummary).toBeInTheDocument();
    expenseSummary && fireEvent.click(expenseSummary);

    //click back to balance summary view
    const balanceSummary = screen.queryByRole("button", { name: /Balance Summary/i });
    balanceSummary && fireEvent.click(balanceSummary);

    //check a value that is only in balance summary view
    await waitFor(() => {
      const yearSumNumber = screen
        .queryAllByRole("listitem")
        .find((listitem) => listitem.textContent === "990543");
      expect(yearSumNumber).toBeInTheDocument();
    });
  });

  test("open user details modals works", async () => {
    render(<App />);

    // click user details
    const userDetailsButton = await screen.findByRole("button", { name: /dirk/i });
    fireEvent.click(userDetailsButton);

    const startGuideButton = screen.getByRole("button", { name: /app guide/i });
    expect(startGuideButton).toBeInTheDocument();
  });

  test("initial year state correct after declining guide for user with own presets created", async () => {
    render(<App />);

    await screen.findByText(/yearly/i);
    // click user details
    const userDetailsButton = await screen.findByRole("button", { name: /dirk/i });
    fireEvent.click(userDetailsButton);

    // click start guide button
    const startGuideButton = await screen.findByRole("button", { name: /app guide/i });
    fireEvent.click(startGuideButton);

    // setup response from backend
    server.use(
      rest.get("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json([
            {
              _id: "61ffc16219c0a7a8173c7f2d",
              user: "61ed72d16f895b1100dbab66",
              name: "En inkomst",
              number: 666666,
              month: "September",
              year: 2021,
              category: "Housing",
              type: "overhead",
              piggybank: [
                {
                  month: "September",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61ffc16219c0a7a8173c7f2e",
                },
              ],
              date: "2022-02-06T12:38:58.720Z",
              __v: 0,
            },
            {
              _id: "61ffc14719c0a7a8173c7f16",
              user: "61ed72d16f895b1100dbab66",
              name: "saving",
              number: 456788,
              month: "April",
              year: 2021,
              category: "Salary",
              type: "savings",
              piggybank: [
                {
                  month: "April",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61ffc14719c0a7a8173c7f17",
                },
              ],
              date: "2022-02-06T12:38:31.061Z",
              __v: 0,
            },
            {
              _id: "61fc0bdffdfe6258d87f5359",
              user: "61ed72d16f895b1100dbab66",
              name: "232",
              number: 323232,
              month: "February",
              year: 2021,
              category: "Food",
              type: "overhead",
              piggybank: [
                {
                  month: "February",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61fc0bdffdfe6258d87f535a",
                },
              ],
              date: "2022-02-03T17:07:43.744Z",
              __v: 0,
            },
            {
              _id: "6203c32b8015507e05a926cd",
              user: "61ed72d16f895b1100dbab66",
              name: "Resa",
              number: 55000,
              month: "January",
              year: 2021,
              category: "Travel",
              type: "purchase",
              piggybank: [
                {
                  month: "January",
                  year: 2021,
                  savedAmount: 0,
                  _id: "6203c32b8015507e05a926ce",
                },
              ],
              date: "2022-02-09T13:35:39.173Z",
              __v: 0,
            },
            {
              _id: "61edb2af5e11343d1268fa24",
              user: "61ed72d16f895b1100dbab66",
              name: "6776",
              number: 6767,
              month: "February",
              year: 2022,
              category: "Travel",
              type: "overhead",
              piggybank: [
                {
                  month: "February",
                  year: 2022,
                  savedAmount: 0,
                  _id: "61edb2af5e11343d1268fa25",
                },
              ],
              date: "2022-01-23T19:55:27.501Z",
              __v: 0,
            },
            {
              _id: "61ffc13019c0a7a8173c7f01",
              user: "61ed72d16f895b1100dbab66",
              name: "En inkomst",
              number: 4455,
              month: "June",
              year: 2021,
              category: "Food",
              type: "capital",
              piggybank: [
                {
                  month: "June",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61ffc13019c0a7a8173c7f02",
                },
              ],
              date: "2022-02-06T12:38:08.883Z",
              __v: 0,
            },
            {
              _id: "61edb19ec557568270d9349a",
              user: "61ed72d16f895b1100dbab66",
              name: "sadas",
              number: 444,
              month: "January",
              year: 2021,
              category: "Car",
              type: "overhead",
              piggybank: [
                {
                  month: "January",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61edb19ec557568270d9349b",
                },
              ],
              date: "2022-01-23T19:50:54.267Z",
              __v: 0,
            },
            {
              _id: "62039bb18015507e05a926a3",
              user: "61ed72d16f895b1100dbab66",
              name: "dsfs",
              number: 355,
              month: "January",
              year: 2021,
              category: "Commute",
              type: "overhead",
              piggybank: [
                {
                  month: "January",
                  year: 2021,
                  savedAmount: 0,
                  _id: "62039bb18015507e05a926a4",
                },
              ],
              date: "2022-02-09T10:47:13.627Z",
              __v: 0,
            },
            {
              _id: "61edb2a15e11343d1268fa15",
              user: "61ed72d16f895b1100dbab66",
              name: "gty",
              number: 77,
              month: "April",
              year: 2021,
              category: "Car",
              type: "overhead",
              piggybank: [
                {
                  month: "April",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61edb2a15e11343d1268fa16",
                },
              ],
              date: "2022-01-23T19:55:13.813Z",
              __v: 0,
            },
            {
              _id: "61ed73196f895b1100dbab72",
              name: "wew",
              number: 44,
              month: "November",
              year: 2021,
              category: "Commute",
              type: "overhead",
              piggybank: [
                {
                  _id: "61ed73196f895b1100dbab73",
                  month: "November",
                  year: 2021,
                  savedAmount: 0,
                },
              ],
              user: "61ed72d16f895b1100dbab66",
              date: "2022-01-23T15:24:09.301Z",
              __v: 0,
            },
            {
              _id: "61ed73256f895b1100dbab75",
              name: "dsfds",
              number: -20,
              month: "November",
              year: 2021,
              category: "Commute",
              type: "overhead",
              piggybank: [
                {
                  _id: "61ed73256f895b1100dbab76",
                  month: "November",
                  year: 2021,
                  savedAmount: 0,
                },
              ],
              user: "61ed72d16f895b1100dbab66",
              date: "2022-01-23T15:24:21.152Z",
              __v: 0,
            },
            {
              _id: "61edb1a5c557568270d9349d",
              user: "61ed72d16f895b1100dbab66",
              name: "sfdc",
              number: -255,
              month: "January",
              year: 2021,
              category: "Travel",
              type: "overhead",
              piggybank: [
                {
                  month: "January",
                  year: 2021,
                  savedAmount: 0,
                  _id: "61edb1a5c557568270d9349e",
                },
              ],
              date: "2022-01-23T19:51:01.383Z",
              __v: 0,
            },
          ])
        );
      })
    );

    // click stop guide button
    const declineGuideButton = screen.getByRole("button", { name: /decline/i });
    fireEvent.click(declineGuideButton);

    // expect guide-dialog to disappear,guide presets be cleared and users presets to be fetched and shown again.
    expect(declineGuideButton).not.toBeInTheDocument();
    await waitFor(async () => {
      const yearSumNumber = screen
        .queryAllByRole("listitem")
        .find((listitem) => listitem.textContent === "990543");
      expect(yearSumNumber).toHaveTextContent("990543");
    });
  });

  test("initial year state correct after stopping guide for user with own presets created", async () => {
    render(<App />);

    // click user details
    const userDetailsButton = await screen.findByRole("button", { name: /dirk/i });
    expect(userDetailsButton).toBeInTheDocument();
    fireEvent.click(userDetailsButton);

    // click start guide button
    const startGuideButton = await screen.findByRole("button", { name: /app guide/i });
    fireEvent.click(startGuideButton);

    // click run guide button
    const runGuideButton = await screen.findByRole("button", { name: "Start Guide" });
    fireEvent.click(runGuideButton);

    // click stop guide button
    const exitGuideButton = await screen.findByRole("button", { name: /exit/i });
    fireEvent.click(exitGuideButton);

    // expect guide dialog to disappear
    expect(exitGuideButton).not.toBeInTheDocument();

    // expect user presets to be shown again ,check yearsumnumber
    await waitFor(async () => {
      const yearSumNumber = screen
        .queryAllByRole("listitem")
        .find((listitem) => listitem.textContent === "990543");
      expect(yearSumNumber).toHaveTextContent("990543");
    });
  });

  test("guide is activated on new user", async () => {
    // override handlers.js presets to be zero ,indicating new logged in user
    await SetupNewUser();

    render(<App />);

    // guide dialog is loaded if welcome name text is displayed
    const loggedInUserWelcomeElement = await screen.findByRole("heading", {
      name: /welcome dirk!/i,
    });
    expect(loggedInUserWelcomeElement).toBeInTheDocument();
  });

  test("initial year state correct after exiting guide for new user", async () => {
    // override handlers.js presets to be zero ,indicating new user
    await SetupNewUser();

    render(<App />);

    // click run guide button
    const runGuideButton = await screen.findByRole("button", { name: "Start Guide" });
    fireEvent.click(runGuideButton);

    // click stop guide button
    const exitGuideButton = await screen.findByRole("button", { name: /exit/i });
    fireEvent.click(exitGuideButton);
    expect(exitGuideButton).not.toBeInTheDocument();

    // check yearsumnumber
    const yearSumNumber = screen
      .queryAllByRole("listitem")
      .find((listitem) => listitem.textContent === "0");
    expect(yearSumNumber).toHaveTextContent("0");
  });
});

async function SetupNewUser() {
  // override handlers.js presets to be zero ,indicating new user
  return server.resetHandlers(
    // success on getting token
    rest.post("http://localhost/api/auth", (req, res, ctx) => {
      return res(
        ctx.json({
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlZDcyZDE2Zjg5NWIxMTAwZGJhYjY2In0sImlhdCI6MTY0MzgxMDg2OX0.QvfZLV0HBznOEIMFOMAQNIsEpWjmEKtz6EqUNh9D--s",
        })
      );
    }),

    rest.get("http://localhost/api/auth", (req, res, ctx) => {
      return res(
        ctx.json({
          _id: "61ed72d16f895b1100dbab66",
          name: "dirk",
          email: "nisse@manpower.se",
          date: "2022-01-23T15:22:57.772Z",
          __v: 0,
        })
      );
    }),

    rest.post("http://localhost/api/users", (req, res, ctx) => {
      return res(
        ctx.json({
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlZDcyZDE2Zjg5NWIxMTAwZGJhYjY2In0sImlhdCI6MTY0MzgxMDg2OX0.QvfZLV0HBznOEIMFOMAQNIsEpWjmEKtz6EqUNh9D--s",
        })
      );
    }),
    rest.post("http://localhost/api/auth/forgotpassword", (req, res, ctx) => {
      return res(ctx.json({ success: true, data: "Email sent" }));
    }),
    rest.get("http://localhost/api/userpreset", (req, res, ctx) => {
      return res(ctx.json([]));
    }),
    rest.get("http://localhost/api/guide", (req, res, ctx) => {
      return res(ctx.json([]));
    })
  );
}
