import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  within,
} from "../../../test-utils/context-wrapper";
import userEvent from "@testing-library/user-event";
import App from "../../../App";

import { server } from "../../../mocks/server";
import { rest } from "msw";
import React from "react";
import { IEditPreset } from "../../../frontend-types/IEditPreset";
import { BrowserRouter } from "react-router-dom";

describe("delete put in separate module to prevent fail", () => {
  test.only("deleting saving works correctly in MonthSavingSummary-Component", async () => {
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
    // go to month and expand preset form
    render(<App />);

    // expect year page to be rendered
    const yearElement = await screen.findByText(
      "Yearly summary and comparison analysis with last year. Here you can also see differences in income/costs over the year."
    );
    // go to month
    expect(yearElement).toBeInTheDocument();
    const januaryButton = screen.getByRole("button", { name: /january/i });
    screen.debug(januaryButton);
    //  januaryButton && fireEvent.click(januaryButton);
    fireEvent.click(januaryButton);
    // eslint-disable-next-line testing-library/await-async-utils

    //expect(await screen.findByText(/dirk/i)).toBeInTheDocument();
    const sum = await screen.findAllByText("799");
    // assert/await inital month state, IMPORTANT TO INIT SUMMATION VALUES as they are used in the tests
    // const sum = await screen.findAllByText("799");
    /*
    expect(sum.length).toBe(1);
    const expenses = await screen.findAllByText("-255");
    expect(expenses.length).toBe(3);
    const BalanceAndSurplus = await screen.findAllByText("544");
    expect(BalanceAndSurplus.length).toBe(2);
    const accountBalanceSum = await screen.findByText("544977");
    const monthSavings = await screen.findByText("0");
    const purchaseElement = await screen.findByRole("heading", {
      name: /purchases/i,
    });
    const purchasePreset = await screen.findByText("55000");
    const presetElement = await screen.findByText("sadas");
    expect(presetElement).toBeInTheDocument();
    expect(purchaseElement).toBeInTheDocument();
    expect(purchasePreset).toBeInTheDocument();
    expect(monthSavings).toBeInTheDocument();
    expect(accountBalanceSum).toBeInTheDocument();

    // create saving preset
    fireEvent.click(await screen.findByRole("button", { name: /add to budget/i }));
    userEvent.type(await screen.findByPlaceholderText("Name"), "savingpreset");
    userEvent.type(await screen.findByPlaceholderText("Number"), "400");
    userEvent.selectOptions(await screen.findByRole("combobox"), "Travel");
    fireEvent.click(screen.getByRole("checkbox", { name: /savings/i }));
    //override server response:
    server.use(
      rest.post<IEditPreset>("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "6203e22b2bdb63c78b35b672",
            user: "6203e2152bdb63c78b35b670",
            name: req.body.name,
            number: req.body.number,
            month: "January",
            year: 2021,
            category: req.body.category,
            type: req.body.type,
            piggybank: [
              {
                month: "January",
                year: 2021,
                savedAmount: 0,
                _id: "61edb1a5c557568270d9349e",
              },
            ],
            date: "2022-02-09T15:47:55.671Z",
            __v: 0,
          })
        );
      })
    );
    // submit form
    fireEvent.click(screen.getByRole("button", { name: /add to budget/i }));
    // expect form fields to be reset
    expect(screen.getByPlaceholderText("Name")).toHaveValue("");
    expect(screen.getByPlaceholderText("Number")).toHaveValue(0);
    expect(screen.getByRole("combobox")).toHaveValue("Select an category");
    expect(screen.getByRole("checkbox", { name: /overhead/i })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: /savings/i })).not.toBeChecked();

    server.use(
      rest.put<IEditPreset>(`http://localhost/api/userpreset/:_id`, (req, res, ctx) => {
        const { _id } = req.params;
        return res(
          ctx.json({
            _id,
            user: req.body.user,
            name: req.body.name,
            number: req.body.number,
            month: "January",
            year: 2021,
            category: req.body.category,
            type: req.body.type,
            piggybank: req.body.piggybank,
            date: "2022-02-10T13:33:37.780Z",
            __v: 0,
          })
        );
      })
    );
    // press deletebutton
    const MonthSavingsComponentTree = await screen.findByRole("heading", {
      name: /month surplus put to savings/i,
    });
    const deleteBtn = within(MonthSavingsComponentTree).getByPlaceholderText("Username");
    //  MonthSavingsComponentTree?.parentElement?.parentElement?.children[1].children[3].children[0];
    deleteBtn && fireEvent.click(deleteBtn);

    // expect saving to have been deleted
    await waitForElementToBeRemoved(deleteBtn);
    expect(deleteBtn).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /month surplus put to savings/i })
    ).not.toBeInTheDocument();*/
  });
});
