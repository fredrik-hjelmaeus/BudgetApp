import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  within,
  waitFor,
} from "../../../test-utils/context-wrapper";
import userEvent from "@testing-library/user-event";
import App from "../../../App";

import { server } from "../../../mocks/server";
import { rest } from "msw";
import React from "react";
import { IEditPreset } from "../../../frontend-types/IEditPreset";
import { IPreset } from "../../../frontend-types/IPreset";

describe("MonthSavingsSummary unit tests", () => {
  const setup = async () => {
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
    fireEvent.click(januaryButton);

    // assert/await inital month state, IMPORTANT TO INIT SUMMATION VALUES as they are used in the tests
    const sum = await screen.findAllByText("799");
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
  };

  test("editing number on piggybank saving works correctly", async () => {
    await setup();
    // see bottom helper functions
    await addIncomePreset();
    await createPiggybankSaving();

    // press number on piggybank saving
    const purchasePresetNumberButton = await screen.findByRole("button", {
      name: /10544/i,
    });
    fireEvent.click(purchasePresetNumberButton);

    // expect AddtoPiggybankModal to be shown
    const header = screen.getByRole("heading", { name: "Amount to save" });
    expect(header).toBeInTheDocument();

    // change the amount to save value
    fireEvent.change(screen.getByTestId("inputamountrange"), {
      target: { value: 2000 },
    });
    // create the expected server response with a piggybank object added
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
    // press submit piggybank save amount
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // expect edit piggybankmodal to be closed and the number of piggysaving in monthsavingssummary to have the updated number
    await waitForElementToBeRemoved(header);
    const piggybankSavingNumber = await screen.findByRole("button", {
      name: /2000/i,
    });
    expect(piggybankSavingNumber).toBeInTheDocument();

    // expect summation fields to be updated
    expect(screen.getByText("Month Income:").textContent).toBe("Month Income:    10799");
    const monthSurplus = screen.getByText("Month Surplus:");
    expect(monthSurplus.parentElement?.children[1]).toHaveTextContent("10544");
    expect(screen.getByText("Month Expenses:").textContent).toBe("Month Expenses:    -255");
    expect(screen.getByText("Account Balance:").textContent).toBe("Account Balance:554977 ");
    const monthBalance = await screen.findByText("Month Balance:");
    const monthSavings = await screen.findByText("Month Savings:");
    await waitFor(() => {
      expect(monthBalance.textContent).toBe("Month Balance:8544");
    });

    await waitFor(() => {
      expect(monthSavings.textContent).toBe("Month Savings: 2000");
    });
    const categoryBalanceHeader = await screen.findByRole("heading", {
      name: /Balance By Category/i,
    });
    expect(categoryBalanceHeader).toBeInTheDocument();
    const BalanceByCategory_TravelField = await screen.findByText(/travel:/i);
    expect(BalanceByCategory_TravelField).toHaveTextContent("9745");
  });

  test("should not be able to add more to saving in edit when month balance is 0 or less", async () => {
    await setup();
    // The user we are using has a month surplus of 544
    // Add saving that is 544
    fireEvent.click(await screen.findByRole("button", { name: /add to budget/i }));

    // fill in the form
    const nameField = screen.getByPlaceholderText("Name");
    const numberField = screen.getByPlaceholderText("Number");
    const categoryField = screen.getByRole("combobox");
    userEvent.type(nameField, "valid_saving_sum");
    userEvent.type(numberField, "500");
    userEvent.selectOptions(categoryField, "Reminderfees");
    const savingsCheckbox = screen.getByRole("checkbox", { name: /savings/i });
    fireEvent.click(savingsCheckbox);
    expect(savingsCheckbox).toBeChecked();

    server.use(
      rest.post<IEditPreset>("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "6203e22b2bdb63c78b35b672",
            user: "6203e2152bdb63c78b35b670",
            name: req.body.name,
            number: 500,
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

    //click submit
    fireEvent.click(screen.getByRole("button", { name: /add to budget/i }));

    // expect fields to be reset after
    expect(screen.getByPlaceholderText("Name")).toHaveValue("");
    expect(screen.getByPlaceholderText("Number")).toHaveValue(0);
    expect(screen.getByRole("combobox")).toHaveValue("Select an category");
    expect(screen.getByRole("checkbox", { name: /overhead/i })).toBeChecked();

    // close presetform to prevent two alert-messages to be shown later in test
    fireEvent.click(screen.getByTestId("presetform_closebtn"));

    // click saving item to get to edit preset modal
    fireEvent.click(await screen.findByRole("button", { name: /valid_saving_sum/i }));

    // expect edit preset modal to have been opened
    const updateBtn = await screen.findByRole("button", { name: /update/i });
    expect(updateBtn).toBeInTheDocument();

    // change number to something more than 544 and submit
    const editPresetNameField = screen
      .getAllByPlaceholderText("Name")
      .find((field) => (field as HTMLInputElement).value === "valid_saving_sum");
    const editPresetNumField = screen
      .getAllByPlaceholderText("Number")
      .find((field) => (field as HTMLInputElement).value === "500");
    if (editPresetNumField && editPresetNameField) {
      userEvent.clear(editPresetNumField);
      userEvent.clear(editPresetNameField);
      userEvent.type(editPresetNumField, "1000");
      userEvent.type(editPresetNameField, "invalid_saving_sum");
    } else throw console.error("Could not find edit preset fields");

    fireEvent.click(updateBtn);

    // expect alert message to appear in edit preset
    expect(
      await screen.findByText("Insufficient Month Surplus for this saving number")
    ).toBeInTheDocument();
    expect(editPresetNumField).toBeInTheDocument();
  });

  test.only("editing category on piggybank saving should not work", async () => {
    setup();
    // See bottom helper functions
    await addIncomePreset();
    await createPiggybankSaving();

    // press number on piggybank saving
    const MonthSavingsComponentTree = screen.getByRole("heading", {
      name: /month surplus put to savings/i,
    }).parentElement?.parentElement;
    const categoryBtn =
      MonthSavingsComponentTree &&
      (await within(MonthSavingsComponentTree).findByAltText(/travel/i));
    categoryBtn && fireEvent.click(categoryBtn);
    const header = screen.queryByRole("heading", { name: "Amount to save" }); // using query allows heading not to be found but also NOT throw error
    expect(header).not.toBeInTheDocument();
  });

  test("deleting piggybank saving works correctly", async () => {
    // See bottom helper functions
    await addIncomePreset();
    await createPiggybankSaving();

    // press deletebutton
    const MonthSavingsComponentTree = screen.getByRole("heading", {
      name: /month surplus put to savings/i,
    }).parentElement?.parentElement;
    const deleteBtn = MonthSavingsComponentTree?.children[1].children[4].children[0];
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
    deleteBtn && fireEvent.click(deleteBtn);

    // expect piggybank to have been deleted
    await waitForElementToBeRemoved(deleteBtn);
    expect(deleteBtn).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /month surplus put to savings/i })
    ).not.toBeInTheDocument();
  });

  test("editing name,number and category on saving works correctly", async () => {
    // go to april month
    const aprilButton = screen.queryByRole("button", { name: /april/i });
    aprilButton && fireEvent.click(aprilButton);

    // click number on saving
    fireEvent.click(await screen.findByRole("button", { name: /456788/i }));

    // edit number
    const numberField = await screen.findByLabelText("Number");
    expect((numberField as HTMLInputElement).value).toBe("456788");
    userEvent.clear(numberField);
    userEvent.type(numberField, "66");
    const updateBtn = screen.getByRole("button", { name: /update/i });
    server.use(
      rest.put<IEditPreset>(`http://localhost/api/userpreset/:_id`, (req, res, ctx) => {
        const { _id } = req.params;

        return res(
          ctx.json({
            _id,
            user: req.body.user,
            name: req.body.name,
            number: req.body.number,
            month: req.body.month,
            year: 2021,
            category: req.body.category,
            type: req.body.type,
            piggybank: [
              {
                month: "January",
                year: 2021,
                savedAmount: 0,
                _id: "6205143125ad67554798451b",
              },
            ],
            date: "2022-02-10T13:33:37.780Z",
            __v: 0,
          })
        );
      })
    );

    // submit edited number
    fireEvent.click(updateBtn);
    waitForElementToBeRemoved(updateBtn);
    expect(updateBtn).not.toBeInTheDocument();

    // expect the number to have been changed
    expect(await screen.findByRole("button", { name: /66/i })).toBeInTheDocument();

    // click name on saving
    fireEvent.click(await screen.findByRole("button", { name: /saving/i }));

    // close edit preset
    const cancelBtn = await screen.findByRole("button", { name: /cancel/i });
    fireEvent.click(cancelBtn);
    waitForElementToBeRemoved(cancelBtn);
    expect(cancelBtn).not.toBeInTheDocument();

    // click category on saving
    fireEvent.click(screen.getByAltText(/salary icon/i));
    // expect edit preset to appear
    expect(await screen.findByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });
});

// Helper functions, DRY refactor
const addIncomePreset = async () => {
  // add income preset
  fireEvent.click(await screen.findByRole("button", { name: /add to budget/i }));
  userEvent.type(await screen.findByPlaceholderText("Name"), "incomepreset");
  //userEvent.type(await screen.findByPlaceholderText("Number"), "10000");
  fireEvent.change(await screen.findByPlaceholderText("Number"), { target: { value: 10000 } }); // works perfect
  userEvent.selectOptions(await screen.findByRole("combobox"), "Travel");
  //override server response:
  server.use(
    rest.post<IPreset>("http://localhost/api/userpreset", (req, res, ctx) => {
      return res(
        ctx.json({
          _id: "6203e22b2bdb63c78b35b672",
          user: "6203e2152bdb63c78b35b670",
          name: req.body.name,
          number: 10000, //req.body.number,
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
  expect(screen.getByRole("checkbox", { name: /purchase/i })).not.toBeChecked();
  const newPreset = await screen.findByRole("button", { name: /incomepreset/i });

  expect(newPreset).toBeInTheDocument();
  const monthBal = await screen.findByText("10544");
  expect(monthBal).toBeInTheDocument();
};

const createPiggybankSaving = async () => {
  //create piggybank saving
  fireEvent.click(await screen.findByRole("button", { name: /5 months/i }));

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
  const submitBtn = await screen.findByRole("button", { name: /submit/i });
  fireEvent.click(submitBtn);
  await waitForElementToBeRemoved(submitBtn);
  expect(submitBtn).not.toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /month surplus put to savings/i })
  ).toBeInTheDocument();
};
