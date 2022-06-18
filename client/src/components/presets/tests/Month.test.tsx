import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
} from "../../../test-utils/context-wrapper";
import userEvent from "@testing-library/user-event";
import App from "../../../App";
import { server } from "../../../mocks/server";
import { rest } from "msw";
import path from "path";
import React from "react";
import { IPreset } from "../../../frontend-types/IPreset";
import { IEditPreset } from "../../../frontend-types/IEditPreset";

// Integration tests of user interaction triggered from presetform,purchases,monthsummary or monthsavingssummary.
// The result of such interaction affects summations and display in multiple month components
// Setup: logged in user at month January with presetform expanded
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
  expect(yearElement).toBeInTheDocument();

  // go to month
  const januaryButton = screen.queryByRole("button", { name: /january/i });
  januaryButton && fireEvent.click(januaryButton);

  // click add to budget button
  const addToBudgetButton = await screen.findByRole("button", {
    name: /add to budget/i,
  });
  fireEvent.click(addToBudgetButton);

  // assert inital month state
  await waitFor(async () => {
    const test = await screen.findByText("Month Income:");
    expect(test).toHaveTextContent("Month Income: 799");
  });

  const incomeSum = await screen.findAllByText("799");
  expect(incomeSum.length).toBe(1);
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
describe("Summation functionality", () => {
  beforeEach(async () => {
    await setup();
  });

  test("Add preset to overhead income works & updates all summation-fields", async () => {
    // starting point is month January with expanded preset form setup in beforeEach
    server.use(
      rest.post<IPreset>("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "6203e22b2bdb63c78b35b672",
            user: "6203e2152bdb63c78b35b670",
            name: req.body.name,
            number: 1000,
            month: req.body.month,
            year: req.body.year,
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
    // fill in the form and submit
    const nameField = screen.getByPlaceholderText("Name");
    const numberField = screen.getByPlaceholderText("Number");
    const categoryField = screen.getByRole("combobox");
    userEvent.type(nameField, "incomepreset");
    userEvent.clear(numberField);
    userEvent.type(numberField, "1000");
    userEvent.selectOptions(categoryField, "Travel");
    fireEvent.click(screen.getByRole("button", { name: /add to budget/i }));

    // expect form fields to be reset
    expect(screen.getByPlaceholderText("Name")).toHaveValue("");
    expect(screen.getByPlaceholderText("Number")).toHaveValue(0);
    expect(screen.getByRole("combobox")).toHaveValue("Select an category");

    // expect preset to be added to monthsummary income
    const presetElement2 = await screen.findByRole("button", {
      name: "incomepreset",
    });
    expect(presetElement2).toBeInTheDocument();

    // expect sum fields to be updated with +1000 as preset
    const newMonthIncomeSum = await screen.findByText("Month Income:");
    // screen.debug(newMonthIncomeSum, 300000);
    expect(newMonthIncomeSum).toHaveTextContent("Month Income: 799");
    const AccBal = screen.getByText("545977");
    expect(AccBal).toBeInTheDocument();

    const monthBalance = screen.getByText("Month Balance:");
    await waitFor(() => {
      expect(monthBalance).toHaveTextContent("Month Balance:1544");
    });

    const BalanceByCategory_TravelField = screen.getByText("Travel:").children[0].textContent;
    expect(BalanceByCategory_TravelField).toBe("745");
  });

  test("Add preset to overhead expense works & updates all summation-fields", async () => {
    // starting point is month January with expanded preset form

    // override endpoint to respond with expense number
    server.use(
      rest.post("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "6203e22b2bdb63c78b35b672",
            user: "6203e2152bdb63c78b35b670",
            name: "expensepreset",
            number: -1000,
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
            date: "2022-02-09T15:47:55.671Z",
            __v: 0,
          })
        );
      })
    );
    // fill in the form and submit
    const nameField = screen.getByPlaceholderText("Name");
    const numberField = screen.getByPlaceholderText("Number");
    const categoryField = screen.getByRole("combobox");
    userEvent.type(nameField, "expense");
    userEvent.type(numberField, "100");
    userEvent.selectOptions(categoryField, "Reminderfees");
    fireEvent.click(screen.getByRole("button", { name: /add to budget/i }));

    // expect preset to be added to monthsummary expense
    const presetElement = await screen.findByRole("button", {
      name: "expensepreset",
    });
    expect(presetElement).toBeInTheDocument();

    //Month Income:
    const newMonthIncomeSum = screen.getByText("799");
    expect(newMonthIncomeSum).toBeInTheDocument();

    const AccountBalance = screen.getByText("543977");
    expect(AccountBalance).toBeInTheDocument();

    //Month Expenses: -1255
    const MonthExpenses = screen.getByText(/month expenses:/i);
    await waitFor(() => {
      expect(MonthExpenses).toHaveTextContent("-1255");
    });

    //Month Balance: -456
    const MonthBalance = screen.getByText(/month balance/i).parentElement?.children[1].textContent;
    expect(MonthBalance).toBe("Balance Month:-456");

    //Month Savings: 0
    const MonthSavings = screen.getByText(/month savings:/i).children[0].textContent;
    expect(MonthSavings).toBe(" 0");
  });

  test("Deleting presetvalues updates all summation-fields", async () => {
    // starting point is month January with expanded preset form

    // delete preset
    const presetElement_DeleteButton: HTMLElement | undefined = screen
      .queryAllByRole("button")
      .find(
        (btn) =>
          (btn as HTMLButtonElement).value === "delbtn" &&
          (btn as HTMLButtonElement).name === "sadas"
      );

    presetElement_DeleteButton && fireEvent.click(presetElement_DeleteButton);
    await waitForElementToBeRemoved(presetElement_DeleteButton);

    // expect to not find deleted preset
    const deletedPreset = screen
      .queryAllByRole("button")
      .find(
        (btn) =>
          (btn as HTMLButtonElement).value === "delbtn" &&
          (btn as HTMLButtonElement).name === "sadas"
      );
    expect(deletedPreset).toBeUndefined();

    // expect summation values to update:
    //Month Income:
    const newMonthIncomeSum = screen.getByDisplayValue("355");
    expect(newMonthIncomeSum).toBeInTheDocument();

    //Account Balance
    const AccountBalance = screen.getByText("544533");
    expect(AccountBalance).toBeInTheDocument();

    //Month Expenses:
    const MonthExpenses = screen.getByText(/month expenses:/i).children[0].textContent;
    expect(MonthExpenses).toBe("-255");

    //Month Balance:
    const MonthBalanceAndSurplus = screen.getAllByText("100");
    expect(MonthBalanceAndSurplus.length).toBe(2);

    //Month Savings:
    const MonthSavings = screen.getByText(/month savings:/i).children[0].textContent;
    expect(MonthSavings).toBe(" 0");
  });

  test("Adding overhead presetvalues through upload csv dialog updates all summation-fields correctly", async () => {
    // starting point is month January with expanded preset form

    // click upload csv button
    fireEvent.click(screen.getByRole("button", { name: /upload csv-file/i }));
    const input = screen.getByTestId("fileupload");
    expect(input).toBeInTheDocument();

    // not sure if this need to be specific as it mocked anyhow
    const filepath = path.resolve(__dirname, "../../_data/csv_testfiles/RFC4180.csv");
    const file = new File(["RFC4180"], filepath, {
      type: "multipart/form-data",
    });

    // click upload inside csv file format modal
    userEvent.upload(input, file);
    fireEvent.click(screen.getByRole("button", { name: "Upload" }));
    await waitForElementToBeRemoved(screen.queryByRole("button", { name: "Upload" }));

    // Assert on SelectCSVfields component and that it shows data values correct
    // screen.debug(screen.getByRole("heading", { name: /select csv fields/i }));
    expect(screen.getByRole("heading", { name: /select csv fields/i })).toBeInTheDocument();
    expect(screen.getByText("description")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /e350/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /slow/i })).toBeInTheDocument();
    // select make as description field
    fireEvent.click(screen.getByRole("button", { name: /make/i }));

    // verify we got to the value field selection dialog
    expect(screen.getByText(/value/i)).toBeInTheDocument();
    // select saldo as value field
    fireEvent.click(screen.getByRole("button", { name: /saldo/i })); // 556 + 777
    // verify we got to create transactions dialog
    expect(screen.getByRole("heading", { name: /create transactions/i })).toBeInTheDocument();

    // select categories for the fields and change to commute
    const categoryButtons = screen.getAllByTestId("dropdownselect");
    fireEvent.click(categoryButtons[0]);
    fireEvent.click(categoryButtons[1]);

    // delete the second field
    const presetDeleteBtn = screen
      .getAllByTestId("deleteCsvPresetBtn")
      .find((btn) => (btn as HTMLButtonElement).name === "Mercury");
    presetDeleteBtn && fireEvent.click(presetDeleteBtn);

    // overwrite the addPreset endpoint response
    server.use(
      rest.post("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "6203e22b2bdb63c78b35b672",
            user: "6203e2152bdb63c78b35b670",
            name: "Ford",
            number: 556,
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
            date: "2022-02-09T15:47:55.671Z",
            __v: 0,
          })
        );
      })
    );

    // submit the new csvpresets
    const submitBtn = screen
      .getAllByRole("button", { name: /add to budget/i })
      .find((b) => (b as HTMLButtonElement).value !== "ADD TO BUDGET");
    expect(submitBtn).toBeInTheDocument();
    submitBtn && fireEvent.click(submitBtn);

    // handle the prompt
    const promptMessage = screen.getByRole("heading", {
      name: "1 of 2 transactions does not have a category selected",
    });
    expect(promptMessage).toBeInTheDocument();
    const confirmButton = screen.getByRole("button", {
      name: /add the transactions that has a category specified/i,
    });
    fireEvent.click(confirmButton);
    expect(submitBtn).not.toBeInTheDocument();

    // expect new preset from csv in monthsummary
    expect(await screen.findByText("Ford")).toBeInTheDocument();
    expect(await screen.findByText("556")).toBeInTheDocument();
    const presets = await screen.findAllByTestId("presetitem");
    expect(presets.length).toBe(4);

    //expect all summation fields to be updated
    //Month Income:
    const monthIncomeSum = (await screen.findByText("Month Income:")).children[0];
    await waitFor(() => {
      expect(monthIncomeSum).toHaveTextContent("1355");
    });

    const AccountBalance = screen.getByText("545533"); //544977
    expect(AccountBalance).toBeInTheDocument();

    //Month Expenses:
    const MonthExpenses = screen.getByText(/month expenses:/i).children[0].textContent;
    expect(MonthExpenses).toBe("-255");

    //Month Balance:
    const MonthBalance = screen.getByText(/month balance/i).parentElement?.children[1].textContent;
    expect(MonthBalance).toBe("Month Surplus:1100");

    //Month Savings: 0
    const MonthSavings = screen.getByText(/month savings:/i).children[0].textContent;
    expect(MonthSavings).toBe(" 0");
  });

  test("Editing overhead income presetvalues updates all summation-fields", async () => {
    // press preset in monthsummary component
    fireEvent.click(screen.getByRole("button", { name: "444" }));

    //confirm edit mode is enabled in edit preset modal
    expect(screen.getByText(/edit/i)).toBeInTheDocument();
    expect(screen.getByText(/update/i)).toBeInTheDocument();
    const editNameField = await screen.findByLabelText("Name:");
    const editValueField = await screen.findByLabelText("Number");
    expect(editNameField).toHaveValue("sadas");
    expect(editValueField).toHaveValue(444);
    expect(screen.getAllByRole("combobox").length).toBe(2);

    //change name and number of preset
    userEvent.type(editNameField, "uniquetext");

    //userEvent.type(editValueField, "1000");
    // userEvent.clear(editValueField);
    //fireEvent.change(editValueField, { target: { value: "1000" } });
    // override handler as fireEvent.change or userEvent.type does not work with numbers atm.
    server.use(
      rest.put<IEditPreset>(`http://localhost/api/userpreset/:_id`, (req, res, ctx) => {
        const { _id } = req.params;

        return res(
          ctx.json({
            _id,
            user: req.body.user,
            name: req.body.name,
            number: 1000,
            month: "January",
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

    //submit change
    const submitChangesButton = await screen.findByRole("button", {
      name: /update/i,
    });
    fireEvent.click(submitChangesButton);
    expect(submitChangesButton).not.toBeInTheDocument();

    // expect preset to have been changed in monthsummary
    const preset = await screen.findByText("sadasuniquetext");
    expect(preset).toBeInTheDocument();

    // summation with new values is correct, 4441000 - 444 = 4440556
    //Month Income:
    const monthIncomeSum = (await screen.findByText("Month Income:")).children[0];

    await waitFor(() => {
      expect(monthIncomeSum).toHaveTextContent("1355");
    });
    const AccountBalance = screen.getByText("545533"); //544977
    expect(AccountBalance).toBeInTheDocument();
    //Month Expenses:
    const MonthExpenses = screen.getByText(/month expenses:/i).children[0].textContent;
    expect(MonthExpenses).toBe("-255");
    //Month Balance:
    const MonthBalance = screen.getByText(/month balance/i).parentElement?.children[1].textContent;
    expect(MonthBalance).toBe("Month Surplus:1100");
    //Month Savings: 0
    const MonthSavings = screen.getByText(/month savings:/i).children[0].textContent;
    expect(MonthSavings).toBe(" 0");
  });

  test("Editing overhead expense presetvalues updates all summation-fields", async () => {
    // press preset in monthsummary component
    fireEvent.click(screen.getByRole("button", { name: "-255" }));

    //confirm edit mode is enabled in edit preset modal
    expect(screen.getByText(/edit/i)).toBeInTheDocument();
    expect(screen.getByText(/update/i)).toBeInTheDocument();
    const editNameField = await screen.findByLabelText("Name:");
    const editValueField = await screen.findByLabelText("Number");
    expect(editNameField).toHaveValue("sfdc");
    expect(editValueField).toHaveValue(-255);

    //change name and number of preset
    userEvent.type(editNameField, "uniquetext");
    //userEvent.clear(editValueField);
    //userEvent.type(editValueField, "-200");
    // override handler as fireEvent.change or userEvent.type does not work with numbers atm.
    // See https://github.com/testing-library/user-event/issues/411
    server.use(
      rest.put<IEditPreset>(`http://localhost/api/userpreset/:_id`, (req, res, ctx) => {
        const { _id } = req.params;

        return res(
          ctx.json({
            _id,
            user: req.body.user,
            name: req.body.name,
            number: -200,
            month: "January",
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
    //submit change
    const submitChangesButton = await screen.findByRole("button", {
      name: /update/i,
    });
    fireEvent.click(submitChangesButton);
    expect(submitChangesButton).not.toBeInTheDocument();

    // expect preset to have been changed in monthsummary
    const preset = await screen.findByText("sfdcuniquetext");
    expect(preset).toBeInTheDocument();

    // summation with new values is correct, 4441000 - 444 = 4440556
    //Month Income:
    const monthIncomeSum = (await screen.findByText("Month Income:")).children[0];

    await waitFor(() => {
      expect(monthIncomeSum).toHaveTextContent("799");
    });
    // Account Balance
    const accBal = screen.getByText("545032");
    expect(accBal).toBeInTheDocument();
    // Month Balance
    const MonthBalance = screen.getByText("Month Balance:").children[0].textContent;
    expect(MonthBalance).toBe("544");
    //Month Expenses:
    const MonthExpenses = screen.getByText(/month expenses:/i).children[0].textContent;
    expect(MonthExpenses).toBe("-200");
    //Month Surplus:
    const MonthSurplus = screen.getByText(/month balance/i).parentElement?.children[1];
    expect(MonthSurplus).toHaveTextContent("Month Surplus:599");
    //Month Savings: 0
    const MonthSavings = screen.getByText(/month savings:/i).children[0].textContent;
    expect(MonthSavings).toBe(" 0");
  });

  test("Editing overhead INCOME TO EXPENSE presetvalues updates all summation-fields and moves preset", async () => {
    // press preset in monthsummary component
    fireEvent.click(screen.getByRole("button", { name: "444" }));

    //confirm edit mode is enabled in edit preset modal
    expect(screen.getByText(/edit/i)).toBeInTheDocument();
    expect(screen.getByText(/update/i)).toBeInTheDocument();
    const editNameField = await screen.findByLabelText("Name:");
    const editValueField = await screen.findByLabelText("Number");
    expect(editNameField).toHaveValue("sadas");
    expect(editValueField).toHaveValue(444);

    //change name and number of preset
    userEvent.clear(editNameField);
    userEvent.type(editNameField, "switcher");
    //userEvent.clear(editValueField);
    // userEvent.type(editValueField, "-200");
    // override handler as fireEvent.change or userEvent.type does not work with numbers atm.
    server.use(
      rest.put<IEditPreset>(`http://localhost/api/userpreset/:_id`, (req, res, ctx) => {
        const { _id } = req.params;

        return res(
          ctx.json({
            _id,
            user: req.body.user,
            name: req.body.name,
            number: -200,
            month: "January",
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
    //submit change
    const submitChangesButton = await screen.findByRole("button", {
      name: /update/i,
    });
    fireEvent.click(submitChangesButton);
    expect(submitChangesButton).not.toBeInTheDocument();

    // expect preset to have been moved in monthsummary
    const preset = await screen.findByText("switcher");
    expect(
      preset.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.children[0]
        .textContent
    ).toBe("Expenses");
    expect(preset).toBeInTheDocument();

    // summation with new values is correct
    //Month Income:
    const monthIncomeSum = (await screen.findByText("Month Income:")).children[0];
    await waitFor(() => {
      expect(monthIncomeSum).toHaveTextContent("355"); // 799 - 444
    });
    const AccountBalance = screen.getByText("Month Balance:").children[0].textContent;
    expect(AccountBalance).toBe("544"); //
    //Month Expenses:
    const MonthExpenses = screen.getByText(/month expenses:/i).children[0].textContent;
    expect(MonthExpenses).toBe("-455");
    //Month Balance:
    const MonthBalance = screen.getByText(/month balance/i).parentElement?.children[1].textContent;
    expect(MonthBalance).toBe("Balance Month:-100");
    //Month Savings: 0
    const MonthSavings = screen.getByText(/month savings:/i).children[0].textContent;
    expect(MonthSavings).toBe(" 0");
  });

  test("Editing overhead EXPENSE TO INCOME presetvalues updates all summation-fields and moves preset", async () => {
    // press preset in monthsummary component
    fireEvent.click(screen.getByRole("button", { name: "-255" }));

    //confirm edit mode is enabled in edit preset modal
    expect(screen.getByText(/edit/i)).toBeInTheDocument();
    expect(screen.getByText(/update/i)).toBeInTheDocument();
    const editNameField = await screen.findByLabelText("Name:");
    const editValueField = await screen.findByLabelText("Number");
    expect(editNameField).toHaveValue("sfdc");
    expect(editValueField).toHaveValue(-255);

    //change name and number of preset
    userEvent.clear(editNameField);
    userEvent.type(editNameField, "switcher");
    // userEvent.clear(editValueField);
    //userEvent.type(editValueField, "3000");
    // override handler as fireEvent.change or userEvent.type does not work with numbers atm.
    server.use(
      rest.put<IEditPreset>(`http://localhost/api/userpreset/:_id`, (req, res, ctx) => {
        const { _id } = req.params;

        return res(
          ctx.json({
            _id,
            user: req.body.user,
            name: req.body.name,
            number: 3000,
            month: req.body.month,
            year: req.body.year,
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
    //submit change
    const submitChangesButton = await screen.findByRole("button", {
      name: /update/i,
    });
    fireEvent.click(submitChangesButton);
    expect(submitChangesButton).not.toBeInTheDocument();

    // expect preset to have been moved in monthsummary from expense presets to income presets
    const preset = await screen.findByText("switcher");
    expect(
      preset.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.children[0]
        .textContent
    ).toBe("Income");
    expect(preset).toBeInTheDocument();

    // summation with new values is correct
    //Month Income:
    const monthIncomeSum = (await screen.findByText("Month Income:")).children[0];
    await waitFor(() => {
      expect(monthIncomeSum).toHaveTextContent("3799"); // 799 - 444
    });
    const monthBalance = screen.getByText("Month Balance:").children[0];
    await waitFor(() => {
      expect(monthBalance).toHaveTextContent("3799");
    });

    //Month Expenses:
    const MonthExpenses = screen.getByText(/month expenses:/i).children[0].textContent;
    expect(MonthExpenses).toBe("0");
    //Month Balance:
    const MonthSum = screen.getByText(/month balance/i).parentElement?.children[1];
    expect(MonthSum).toHaveTextContent("Month Surplus:3799");
    //Month Savings: 0
    const MonthSavings = screen.getByText(/month savings:/i).children[0].textContent;
    expect(MonthSavings).toBe(" 0");
  });

  test("Add purchase preset works and updates no summation-fields", async () => {
    // starting point is month January with expanded preset form setup in beforeEach
    // fill in the form and submit
    const nameField = screen.getByPlaceholderText("Name");
    const numberField = screen.getByPlaceholderText("Number");
    const categoryField = screen.getByRole("combobox");
    const purchaseCheckbox = screen.getByRole("checkbox", {
      name: /purchase/i,
    });
    userEvent.type(nameField, "purchase");
    userEvent.type(numberField, "10000");
    userEvent.selectOptions(categoryField, "Travel");
    fireEvent.click(purchaseCheckbox);

    //override server response:
    server.use(
      rest.post<IPreset>("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "6203e22b2bdb63c78b35b672",
            user: "6203e2152bdb63c78b35b670",
            name: req.body.name,
            number: req.body.number,
            month: "January",
            year: 2021,
            category: "Travel",
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

    // expect preset to be added to purchases component
    const purchaseElement = await screen.findByRole("button", {
      name: "purchase",
    });
    expect(purchaseElement).toBeInTheDocument();
    expect(screen.getByText("10000")).toBeInTheDocument();
    await waitFor(() => {
      screen.getByText("19 months");
    });

    // expect no sum fields to get changed
    const newMonthIncomeSum = screen.getByText("799");
    expect(newMonthIncomeSum).toBeInTheDocument();
    const AccBal = screen.getByText("544977");
    expect(AccBal).toBeInTheDocument();
    const monthSurplusValue =
      screen.getByText("Month Surplus:").parentElement?.children[1].textContent;
    expect(monthSurplusValue).toBe("544");
    const monthBalanceValue = screen.getByText("Month Balance:").textContent;
    expect(monthBalanceValue).toBe("Month Balance:544");
    const BalanceByCategory_TravelField = screen.getByText("Travel:").children[0].textContent;
    expect(BalanceByCategory_TravelField).toBe("-255");
  });

  test("Edit purchase preset works and updates no summation-fields", async () => {
    // starting point is month January with expanded preset form setup in beforeEach

    // click purchase preset name or number to activate edit preset
    fireEvent.click(screen.getByRole("button", { name: /Resa/i }));

    // confirm edit preset modal is activated and preset values is loaded
    expect(screen.getByText(/edit/i)).toBeInTheDocument();
    expect(screen.getByText(/update/i)).toBeInTheDocument();
    const editNameField = await screen.findByLabelText("Name:");
    const editValueField = await screen.findByLabelText("Number");
    expect(editNameField).toHaveValue("Resa");
    expect(editValueField).toHaveValue(55000);
    expect(screen.getAllByRole("combobox").length).toBe(2);

    //change name and number of preset
    userEvent.clear(editNameField);
    userEvent.type(editNameField, "SuperResa");
    //userEvent.clear(editValueField);
    //userEvent.type(editValueField, "65000");
    // override handler as fireEvent.change or userEvent.type does not work with numbers atm.
    server.use(
      rest.put<IEditPreset>(`http://localhost/api/userpreset/:_id`, (req, res, ctx) => {
        const { _id } = req.params;

        return res(
          ctx.json({
            _id,
            user: req.body.user,
            name: req.body.name,
            number: 65000,
            month: req.body.month,
            year: req.body.year,
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

    // submit form
    const updateBtn = screen.getByRole("button", { name: /update/i });
    fireEvent.click(updateBtn);

    // expect preset to be changed in purchases component
    const purchaseElement = await screen.findByText("SuperResa");
    expect(purchaseElement).toBeInTheDocument();
    expect(screen.getByText("65000")).toBeInTheDocument();
    await waitFor(() => {
      const monthsLeft = screen.getByTestId("MonthsLeftBeforePurchase");
      expect(monthsLeft).toHaveTextContent("50+ months");
    });

    // expect no sum fields to be changed
    const newMonthIncomeSum = screen.getByText("799");
    expect(newMonthIncomeSum).toBeInTheDocument();
    const AccBal = screen.getByText("544977");
    expect(AccBal).toBeInTheDocument();
    const monthSurplusValue =
      screen.getByText("Month Surplus:").parentElement?.children[1].textContent;
    expect(monthSurplusValue).toBe("544");
    const monthBalanceValue = screen.getByText("Month Balance:").textContent;
    expect(monthBalanceValue).toBe("Month Balance:544");
    const BalanceByCategory_TravelField = screen.getByText("Travel:").children[0].textContent;
    expect(BalanceByCategory_TravelField).toBe("-255");
  });

  test("Delete purchase presetvalues updates all summation-fields", async () => {
    // starting point is month January with expanded preset form setup in beforeEach
    const presetToDelete = await screen.findByRole("button", { name: /Resa/i });

    // click purchase preset deletebutton
    const deleteButton = screen
      .getAllByRole("button")
      .find((b) => (b as HTMLButtonElement).value === "trashicon");
    deleteButton && fireEvent.click(deleteButton);

    // expect DeletePurchaseModal to be activated
    const header = screen.getByRole("heading", { name: "Confirm delete" });
    expect(header).toBeInTheDocument();

    // press delete in DeletePurchaseModal
    const deleteBtn = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteBtn);

    // expect DeletePurchaseModal to be closed
    expect(header).not.toBeInTheDocument();

    // expect the purchase-preset to be deleted
    await waitForElementToBeRemoved(presetToDelete);
    expect(presetToDelete).not.toBeInTheDocument();
  });

  test("Buy purchase updates all summation-fields and converts preset-type to overhead expense", async () => {
    // add overhead preset income so buying button becomes visible
    server.use(
      rest.post("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "6203e22b2bdb63c78b35b672",
            user: "6203e2152bdb63c78b35b670",
            name: "income",
            number: 1000000,
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
            date: "2022-02-09T15:47:55.671Z",
            __v: 0,
          })
        );
      })
    );
    // fill in the form and submit
    const nameField = screen.getByPlaceholderText("Name");
    const numberField = screen.getByPlaceholderText("Number");
    const categoryField = screen.getByRole("combobox");
    const purchaseCheckbox = screen.getByRole("checkbox", {
      name: /purchase/i,
    });
    userEvent.type(nameField, "purchase");
    userEvent.clear(numberField);
    userEvent.type(numberField, "10000");
    // fireEvent.change(numberField, 10000);
    userEvent.selectOptions(categoryField, "Travel");
    fireEvent.click(purchaseCheckbox);
    fireEvent.click(screen.getByRole("button", { name: /add to budget/i }));

    // setup addPreset server response that is used when pressing buy button:
    server.use(
      rest.post<IPreset>("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "6203e22b2bdb63c78b35b672",
            user: "6203e2152bdb63c78b35b670",
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
                _id: "61edb1a5c557568270d9349e",
              },
            ],
            date: "2022-02-09T15:47:55.671Z",
            __v: 0,
          })
        );
      })
    );
    // press buy button
    const purchasePresetBuyButton = await screen.findByText("BUY");
    const presets_beforeClickingBUY = await screen.findAllByTestId("presetitem");
    fireEvent.click(purchasePresetBuyButton);

    // expect purchaseitem to disappear
    await waitForElementToBeRemoved(purchasePresetBuyButton);
    expect(purchasePresetBuyButton).not.toBeInTheDocument();

    // expect overhead expense to have been created
    const presets_afterClickingBUY = await screen.findAllByTestId("presetitem");
    expect(presets_afterClickingBUY.length - presets_beforeClickingBUY.length).toBe(1);
    const newPreset = presets_afterClickingBUY.find(
      (p) => p.textContent === "-55000" && p.hasAttribute("data-testid")
    );
    newPreset && expect(newPreset.getAttribute("data-testid")).toEqual("presetitem");
    expect(newPreset).toBeInTheDocument();

    // expect summation fields to be updated
    expect(screen.getByText("Month Income:").textContent).toBe("Month Income:    1000799");
    expect(screen.getByText("Month Surplus:").parentElement?.children[1].textContent).toBe(
      "945544"
    );
    expect(screen.getByText("Month Expenses:").textContent).toBe("Month Expenses:    -255");
    expect(screen.getByText("Account Balance:").textContent).toBe("Account Balance:1489977 ");
    expect(screen.getByText("Month Balance:").textContent).toBe("Month Balance:1000544");
    expect(screen.getByText("Month Savings:").textContent).toBe("Month Savings: 0");

    const BalanceByCategory_TravelField = screen.getByText("Travel:").children[0].textContent;
    expect(BalanceByCategory_TravelField).toBe("944745");
  });

  test("Add piggybank saving to a purchase updates all summation-fields", async () => {
    // add overhead preset income so buying button becomes visible
    server.use(
      rest.post("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "6203e22b2bdb63c78b35b672",
            user: "6203e2152bdb63c78b35b670",
            name: "income",
            number: 20000,
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
            date: "2022-02-09T15:47:55.671Z",
            __v: 0,
          })
        );
      })
    );

    // fill in the form and submit
    const nameField = screen.getByPlaceholderText("Name");
    const numberField = screen.getByPlaceholderText("Number");
    const categoryField = screen.getByRole("combobox");
    const purchaseCheckbox = screen.getByRole("checkbox", {
      name: /purchase/i,
    });
    userEvent.type(nameField, "notused");
    userEvent.type(numberField, "10000");
    userEvent.selectOptions(categoryField, "Travel");
    fireEvent.click(purchaseCheckbox);
    fireEvent.click(screen.getByRole("button", { name: /add to budget/i }));

    //expect form to be reset
    expect(screen.getByPlaceholderText("Name").textContent).toBe("");
    expect(screen.getByPlaceholderText("Number").textContent).toBe("");

    //expect purchaseitem to update its button to:

    /*    <button
      class="btn-moremonthsleft"
    >
      2 months
    </button> */

    // press piggy button
    const piggybankButton = await screen.findByRole("button", {
      name: /3 months/i,
    });
    fireEvent.click(piggybankButton);

    // expect AddtoPiggybankModal to be shown
    const header = screen.getByRole("heading", { name: "Amount to save" });
    expect(header).toBeInTheDocument();

    // change the amount to save value
    fireEvent.change(screen.getByTestId("inputamountrange"), {
      target: { value: "20000" },
    });

    // create the expected server response with a piggybank object added
    server.use(
      rest.put<IEditPreset>(`http://localhost/api/userpreset/:_id`, (req, res, ctx) => {
        const { _id } = req.params;

        return res(
          ctx.json({
            _id, // preset id
            user: req.body.user, // user id
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

    // expect AddtoPiggybankModal to be closed
    await waitForElementToBeRemoved(header);
    expect(header).not.toBeInTheDocument();

    // expect MonthSavingsSummary-component to show up and correct number displayed
    expect(
      await screen.findByRole("heading", {
        name: /month surplus put to savings/i,
      })
    ).toBeInTheDocument();

    // expect to find buttons with the number 20000
    const presets = await screen.findAllByRole("button", { name: "20000" });
    // find by class attribute
    const preset = presets.find((b) => b.getAttribute("class") === "text-orange btn-form");
    expect(preset).toBeInTheDocument();

    // expect purchase-preset monthsleft-button to be updated
    expect(await screen.findByText("50+ months")).toBeInTheDocument();

    // expect sum values to have been updated
    const newMonthIncomeSum = screen.getByText("20799");
    expect(newMonthIncomeSum).toBeInTheDocument();
    const AccBal = screen.getByText("564977");
    expect(AccBal).toBeInTheDocument();
    const monthSurplusValue =
      screen.getByText("Month Surplus:").parentElement?.children[1].textContent;
    expect(monthSurplusValue).toBe("20544");
    const monthBalanceValue = screen.getByText("Month Balance:").textContent;
    expect(monthBalanceValue).toBe("Month Balance:544");
    const BalanceByCategory_TravelField = screen.getByText("Travel:").children[0].textContent;
    expect(BalanceByCategory_TravelField).toBe("19745");
    const monthSavings = screen.getByText("Month Savings:").children[0].textContent;
    expect(monthSavings).toBe(" 20000");
  });

  test("Add & Edit saving presetvalues updates all summation-fields", async () => {
    // add overhead preset income so buying button becomes visible
    server.use(
      rest.post("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "6203e22b2bdb63c78b35b672",
            user: "6203e2152bdb63c78b35b670",
            name: "saving",
            number: 200,
            month: "January",
            year: 2021,
            category: "Travel",
            type: "savings",
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

    // fill in the form and submit
    const nameField = screen.getByPlaceholderText("Name");
    const numberField = screen.getByPlaceholderText("Number");
    const categoryField = screen.getByRole("combobox");
    const savingCheckbox = screen.getByRole("checkbox", { name: /savings/i });
    userEvent.type(nameField, "notused");
    userEvent.type(numberField, "200");
    //fireEvent.change(numberField, 200);
    userEvent.selectOptions(categoryField, "Travel");
    fireEvent.click(savingCheckbox);
    fireEvent.click(screen.getByRole("button", { name: /add to budget/i }));

    //expect form to be reset
    expect(screen.getByPlaceholderText("Name").textContent).toBe("");
    expect(screen.getByPlaceholderText("Number").textContent).toBe("");

    // expect to find a saving preset
    expect(
      await screen.findByRole("heading", {
        name: /Month Surplus put to Savings/i,
      })
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "saving" })).toBeInTheDocument();
    });
    expect(await screen.findByRole("button", { name: /200/i })).toBeInTheDocument();
    expect(await screen.findByAltText("Travel icon for month saving")).toBeInTheDocument();
    /*   expect(
      await (
        await screen.findAllByAltText("Travel icon for month saving")
      ).find((i) => (i as HTMLButtonElement).name === "edit category")
    ).toBeInTheDocument(); */

    // expect sum values to have been updated
    const newMonthIncomeSum = screen.getByText("799");
    expect(newMonthIncomeSum).toBeInTheDocument();
    const monthSurplusValue =
      screen.getByText("Month Surplus:").parentElement?.children[1].textContent;
    expect(monthSurplusValue).toBe("544");
    const AccBal = screen.getByText("544777"); // 544977 - 200
    expect(AccBal).toBeInTheDocument();
    const monthBalanceValue = screen.getByText("Month Balance:");
    await waitFor(() => {
      expect(monthBalanceValue).toHaveTextContent("Month Balance:344"); // 544 - 200
    });
    const BalanceByCategory_TravelField = screen.getByText("Travel:").children[0].textContent;
    expect(BalanceByCategory_TravelField).toBe("-255");
    const monthSavings = screen.getByText("Month Savings:").children[0].textContent;
    expect(monthSavings).toBe(" 200"); // 0 + 200

    // edit saving value by pressing savingpreset in monthsavingssummary
    fireEvent.click(await screen.findByRole("button", { name: /200/i }));

    // expect edit preset to open and the values from preset to have been loaded there
    expect(await screen.findByRole("heading", { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByText(/update/i)).toBeInTheDocument();
    const editNameField = await screen.findByLabelText("Name:");
    const editValueField = await screen.findByLabelText("Number");
    expect(editNameField).toHaveValue("saving");
    expect(editValueField).toHaveValue(200);
    expect(screen.getAllByRole("combobox").length).toBe(2);

    //change name and number of preset
    userEvent.clear(editNameField);
    // userEvent.clear(editValueField);
    userEvent.type(editNameField, "uniquetext");
    // userEvent.type(editValueField, "400");

    server.use(
      rest.put<IEditPreset>(`http://localhost/api/userpreset/:_id`, (req, res, ctx) => {
        const { _id } = req.params;

        return res(
          ctx.json({
            _id,
            user: req.body.user,
            name: req.body.name,
            number: 400,
            month: "January",
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
    //submit change
    const submitChangesButton = await screen.findByRole("button", {
      name: /update/i,
    });
    fireEvent.click(submitChangesButton);
    expect(submitChangesButton).not.toBeInTheDocument();

    // expect preset to have been changed in monthsummary
    const preset = await screen.findByText("uniquetext");
    expect(preset).toBeInTheDocument();

    // expect summations to have changed from 200 savings to 400 savings
    const newMonthIncomeSumEdit = screen.getByText("799");
    expect(newMonthIncomeSumEdit).toBeInTheDocument();
    const monthSurplusValueEdit =
      screen.getByText("Month Surplus:").parentElement?.children[1].textContent;
    expect(monthSurplusValueEdit).toBe("544");
    const AccBalEdit = screen.getByText("544577"); // 544977 - 400
    expect(AccBalEdit).toBeInTheDocument();
    const monthBalanceValueEdit = screen.getByText("Month Balance:");
    await waitFor(() => {
      expect(monthBalanceValueEdit).toHaveTextContent("Month Balance:144"); // 544 - 400
    });
    const BalanceByCategory_TravelFieldEdit = screen.getByText("Travel:").children[0].textContent;
    expect(BalanceByCategory_TravelFieldEdit).toBe("-255");
    const monthSavingsEdit = screen.getByText("Month Savings:").children[0].textContent;
    expect(monthSavingsEdit).toBe(" 400"); // 0 + 1000
  });

  test("Add capital presetvalues updates only account balance field", async () => {
    // create server response where a capital preset is created
    server.use(
      rest.post("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "6203e22b2bdb63c78b35b672",
            user: "6203e2152bdb63c78b35b670",
            name: "new_added_capital_preset",
            number: 20000,
            month: "January",
            year: 2021,
            category: "Travel",
            type: "capital",
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

    // fill in the form and submit
    const nameField = screen.getByPlaceholderText("Name");
    const numberField = screen.getByPlaceholderText("Number");
    const categoryField = screen.getByRole("combobox");
    const capitalCheckbox = screen.getByRole("checkbox", { name: /capital/i });
    userEvent.type(nameField, "notused");
    userEvent.type(numberField, "20000");
    userEvent.selectOptions(categoryField, "Travel");
    fireEvent.click(capitalCheckbox);
    fireEvent.click(screen.getByRole("button", { name: /add to budget/i }));

    //expect form to be reset
    expect(screen.getByPlaceholderText("Name").textContent).toBe("");
    expect(screen.getByPlaceholderText("Number").textContent).toBe("");

    // expect account balance to have been updated
    const AccBal = await screen.findByText("564977"); // 544977 + 20000
    expect(AccBal).toBeInTheDocument();

    // expect nothing else to have been changed in the summations
    const newMonthIncomeSum = screen.getByText("799");
    expect(newMonthIncomeSum).toBeInTheDocument();
    const monthSurplusValue =
      screen.getByText("Month Surplus:").parentElement?.children[1].textContent;
    expect(monthSurplusValue).toBe("544");
    const monthBalanceValue = screen.getByText("Month Balance:").textContent;
    expect(monthBalanceValue).toBe("Month Balance:544");
    const BalanceByCategory_TravelField = screen.getByText("Travel:").children[0].textContent;
    expect(BalanceByCategory_TravelField).toBe("-255");
    const monthSavings = screen.getByText("Month Savings:").children[0].textContent;
    expect(monthSavings).toBe(" 0");
  });

  test("Delete saving presetvalues updates all summation-fields", async () => {
    // starting point is month January with expanded preset form setup in beforeEach
    // go to month may
    fireEvent.click(await screen.findByRole("button", { name: /april/i }));

    // find the preset
    const presetToDelete = await screen.findByRole("button", {
      name: "saving",
    });

    // find the deletebutton in the html-tree and click it
    const presetToDeleteBtn =
      presetToDelete.parentElement?.parentElement?.parentElement?.children[3].children[0];
    presetToDeleteBtn && fireEvent.click(presetToDeleteBtn);

    // expect preset to have been deleted
    await waitForElementToBeRemoved(presetToDelete);
    expect(presetToDelete).not.toBeInTheDocument();

    // expect month balance, month savings & account balance to be
    // Account Balance: 544977 + 456788 = 1001765
    expect(await screen.findByText("1001765")).toBeInTheDocument();
    //Month Income:
    const monthIncomeSum = (await screen.findByText("Month Income:")).children[0].textContent;
    expect(monthIncomeSum).toBe("77");
    //Month Expenses:
    const MonthExpenses = screen.getByText(/month expenses:/i).children[0].textContent;
    expect(MonthExpenses).toBe("0");
    // Month Balance: -456711 + 456788 = 77
    const MonthBalance = screen.getByText(/month balance/i).parentElement?.children[1].textContent;
    expect(MonthBalance).toBe("Month Surplus:77");
    // Month Savings: 456788 - 456788 = 0
    const MonthSavings = screen.getByText(/month savings:/i).children[0].textContent;
    expect(MonthSavings).toBe(" 0");
  });

  test("Delete piggybank-saving presetvalues updates all summation-fields", async () => {
    // add overhead preset income
    server.use(
      rest.post("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "6203e22b2bdb63c78b35b672",
            user: "6203e2152bdb63c78b35b670",
            name: "income",
            number: 20000,
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
            date: "2022-02-09T15:47:55.671Z",
            __v: 0,
          })
        );
      })
    );

    // fill in the form and submit
    const nameField = screen.getByPlaceholderText("Name");
    const numberField = screen.getByPlaceholderText("Number");
    const categoryField = screen.getByRole("combobox");
    const purchaseCheckbox = screen.getByRole("checkbox", {
      name: /purchase/i,
    });
    userEvent.type(nameField, "notused");
    userEvent.type(numberField, "10000");
    userEvent.selectOptions(categoryField, "Travel");
    fireEvent.click(purchaseCheckbox);
    fireEvent.click(screen.getByRole("button", { name: /add to budget/i }));

    //expect form to be reset
    expect(screen.getByPlaceholderText("Name").textContent).toBe("");
    expect(screen.getByPlaceholderText("Number").textContent).toBe("");

    //expect purchaseitem to update its button to:

    /*    <button
    class="btn-moremonthsleft"
  >
    2 months
  </button> */

    // press piggy button
    const piggybankButton = await screen.findByRole("button", {
      name: /3 months/i,
    });
    fireEvent.click(piggybankButton);

    // expect AddtoPiggybankModal to be shown
    const header = screen.getByRole("heading", { name: "Amount to save" });
    expect(header).toBeInTheDocument();

    // change the amount to save value
    fireEvent.change(screen.getByTestId("inputamountrange"), {
      target: { value: "20000" },
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

    // expect AddtoPiggybankModal to be closed
    await waitForElementToBeRemoved(header);
    expect(header).not.toBeInTheDocument();

    // expect MonthSavingsSummary-component to show up and correct number displayed
    expect(
      await screen.findByRole("heading", {
        name: /month surplus put to savings/i,
      })
    ).toBeInTheDocument();

    // expect to find buttons with the number 20000
    const presets = await screen.findAllByRole("button", { name: "20000" });
    // find by class attribute
    const preset = presets.find((b) => b.getAttribute("class") === "text-orange btn-form");
    expect(preset).toBeInTheDocument();

    // expect purchase-preset monthsleft-button to be updated
    expect(await screen.findByText("50+ months")).toBeInTheDocument();

    // expect sum values to have been updated
    const newMonthIncomeSum = screen.getByText("20799");
    expect(newMonthIncomeSum).toBeInTheDocument();
    const AccBal = screen.getByText("564977");
    expect(AccBal).toBeInTheDocument();
    const monthSurplusValue =
      screen.getByText("Month Surplus:").parentElement?.children[1].textContent;
    expect(monthSurplusValue).toBe("20544");
    const monthBalanceValue = screen.getByText("Month Balance:").textContent;
    expect(monthBalanceValue).toBe("Month Balance:544");
    const BalanceByCategory_TravelField = screen.getByText("Travel:").children[0].textContent;
    expect(BalanceByCategory_TravelField).toBe("19745");
    const monthSavings = screen.getByText("Month Savings:").children[0].textContent;
    expect(monthSavings).toBe(" 20000");

    // delete piggybank saving
    // find the deletebutton in the html-tree and click it
    const presetToDeleteBtn = preset?.parentElement?.parentElement?.children[4].children[0];
    presetToDeleteBtn && fireEvent.click(presetToDeleteBtn);

    // expect preset to have been deleted
    await waitForElementToBeRemoved(preset);
    expect(preset).not.toBeInTheDocument();

    // expect month balance, month savings & account balance to be
    // Account Balance: 544977 + 20000 = 564977
    expect(await screen.findByText("564977")).toBeInTheDocument();
    //Month Income:unchanged
    const monthIncomeSum = (await screen.findByText("Month Income:")).children[0].textContent;
    expect(monthIncomeSum).toBe("20799");
    //Month Expenses:unchanged
    const MonthExpenses = screen.getByText(/month expenses:/i).children[0].textContent;
    expect(MonthExpenses).toBe("-255");
    // Month surplus: unchanged
    const MonthSurplus = screen.getByText(/month balance/i).parentElement?.children[1].textContent;
    expect(MonthSurplus).toBe("Month Surplus:20544");
    // Month Balance 544 + 20000 = 20544
    const monthBalanceField = screen.getByText("Month Balance:");
    await waitFor(() => {
      expect(monthBalanceField).toHaveTextContent("Month Balance:20544");
    });
    // Month Savings: 20000 - 20000 =  0
    const MonthSavings = screen.getByText(/month savings:/i).children[0].textContent;
    expect(MonthSavings).toBe(" 0");
  });

  test("Change inside addtopiggybankmodal updates correctly sums everywhere when submitted", async () => {
    // locate and click add to piggybank button
    fireEvent.click(screen.getByRole("button", { name: "50+ months" }));
    // expect addtopiggybankmodal to have been opened
    const modalHeader = await screen.findByRole("heading", {
      name: /amount to save/i,
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
    // set amount to save and submit : NOTE that we only press submit and not change the value in slider, just use the default which is max. This is tested in other test above.
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    // expect addtopiggybankmodal to have been closed
    await waitForElementToBeRemoved(modalHeader);
    // expect month surplus put to savings to appear and display the savings amount
    await screen.findByRole("heading", {
      name: /month surplus put to savings/i,
    });
    expect(await screen.findByRole("button", { name: /544/i })).toBeInTheDocument();
    // expect summation changes:
    // changes month balance from 544 to 0
    const monthBalanceField = screen.getByText("Month Balance:");
    await waitFor(() => {
      expect(monthBalanceField).toHaveTextContent("Month Balance:0");
    });
    // changes month savings from 0 to 544
    const MonthSavings = screen.getByText(/month savings:/i).children[0].textContent;
    expect(MonthSavings).toBe(" 544");
    // no changes to account balance
    const accountBalance = await screen.findByText(/account balance:/i);
    expect(accountBalance.children[0].textContent).toBe("544977 ");
    // month income,surplus and expenses is unchanged
    const monthIncomeSum = (await screen.findByText("Month Income:")).children[0].textContent;
    expect(monthIncomeSum).toBe("799");
    const MonthSurplus = screen.getByText(/month balance/i).parentElement?.children[1].textContent;
    expect(MonthSurplus).toBe("Month Surplus:544");
    const MonthExpenses = screen.getByText(/month expenses:/i).children[0].textContent;
    expect(MonthExpenses).toBe("-255");
  });
});

describe("PresetForm interaction", () => {
  // Setup: logged in user at month January with presetform expanded
  beforeEach(async () => {
    await setup();
  });

  test("Add preset to purchase works with positive number", async () => {
    // starting point is month January with expanded preset form setup in beforeEach
    // fill in the form and submit
    const nameField = screen.getByPlaceholderText("Name");
    const numberField = screen.getByPlaceholderText("Number");
    const categoryField = screen.getByRole("combobox");
    const purchaseCheckbox = screen.getByRole("checkbox", {
      name: /purchase/i,
    });
    userEvent.type(nameField, "purchase");
    userEvent.type(numberField, "10000");
    userEvent.selectOptions(categoryField, "Travel");
    fireEvent.click(purchaseCheckbox);

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
            category: "Travel",
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

    // expect preset to be added to purchases component
    const purchaseElement = await screen.findByRole("button", {
      name: "purchase",
    });
    expect(purchaseElement).toBeInTheDocument();
    expect(screen.getByText("10000")).toBeInTheDocument();
    expect(await screen.findByText("19 months")).toBeInTheDocument();

    // expect no sum fields to get changed
    const newMonthIncomeSum = screen.getByText("799");
    expect(newMonthIncomeSum).toBeInTheDocument();
    const AccBal = screen.getByText("544977");
    expect(AccBal).toBeInTheDocument();
    const monthSurplusValue =
      screen.getByText("Month Surplus:").parentElement?.children[1].textContent;
    expect(monthSurplusValue).toBe("544");
    const monthBalanceValue = screen.getByText("Month Balance:").textContent;
    expect(monthBalanceValue).toBe("Month Balance:544");
    const BalanceByCategory_TravelField = screen.getByText("Travel:").children[0].textContent;
    expect(BalanceByCategory_TravelField).toBe("-255");
  });

  test("Add preset to purchase works and converts negative number input", async () => {
    // starting point is month January with expanded preset form setup in beforeEach
    // fill in the form and submit
    const nameField = screen.getByPlaceholderText("Name");
    const numberField = screen.getByPlaceholderText("Number");
    const categoryField = screen.getByRole("combobox");
    const purchaseCheckbox = screen.getByRole("checkbox", {
      name: /purchase/i,
    });
    userEvent.type(nameField, "purchase");
    userEvent.type(numberField, "-10000");
    userEvent.selectOptions(categoryField, "Travel");
    fireEvent.click(purchaseCheckbox);

    //override server response:
    server.use(
      rest.post<IEditPreset>("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "6203e22b2bdb63c78b35b672",
            user: "6203e2152bdb63c78b35b670",
            name: req.body.name,
            number: 10000,
            month: "January",
            year: 2021,
            category: "Travel",
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

    // expect preset to be added to purchases component
    const purchaseElement = await screen.findByRole("button", {
      name: "purchase",
    });
    expect(purchaseElement).toBeInTheDocument();
    expect(purchaseElement.parentElement?.children[1].textContent).toBe("10000");
    expect(await screen.findByText("19 months")).toBeInTheDocument();

    // expect no sum fields to get changed
    const newMonthIncomeSum = screen.getByText("799");
    expect(newMonthIncomeSum).toBeInTheDocument();
    const AccBal = screen.getByText("544977");
    expect(AccBal).toBeInTheDocument();
    const monthSurplusValue =
      screen.getByText("Month Surplus:").parentElement?.children[1].textContent;
    expect(monthSurplusValue).toBe("544");
    const monthBalanceValue = screen.getByText("Month Balance:").textContent;
    expect(monthBalanceValue).toBe("Month Balance:544");
    const BalanceByCategory_TravelField = screen.getByText("Travel:").children[0].textContent;
    expect(BalanceByCategory_TravelField).toBe("-255");
  });

  test("Creating a saving-preset only works if there is a surplus in month", async () => {
    // The user we are using has a month surplus of 544
    // Add saving that is 544
    userEvent.type(screen.getByPlaceholderText("Name"), "SavingOne");
    userEvent.type(screen.getByPlaceholderText("Number"), "544");
    userEvent.selectOptions(screen.getByRole("combobox"), "Travel");
    fireEvent.click(screen.getByRole("checkbox", { name: /savings/i }));
    fireEvent.click(screen.getByRole("button", { name: /add to budget/i }));

    // expect the saving to be added
    expect(await screen.findByRole("button", { name: /savingone/i })).toBeInTheDocument();

    // Try to add another saving
    userEvent.type(screen.getByPlaceholderText("Name"), "SavingTwo");
    userEvent.type(screen.getByPlaceholderText("Number"), "1544");
    userEvent.selectOptions(screen.getByRole("combobox"), "Travel");
    fireEvent.click(screen.getByRole("checkbox", { name: /savings/i }));
    fireEvent.click(screen.getByRole("button", { name: /add to budget/i }));
    expect(await screen.findByPlaceholderText("Name")).toHaveValue("SavingTwo");

    // Expect add to fail and expect PresetForm to respond with an Alert
    expect(await screen.findByText(/savingone/i)).toBeTruthy();
    expect(
      (await screen.findByText(/savingone/i)).parentElement?.parentElement?.parentElement
        ?.parentElement?.childElementCount
    ).toBe(2);
    expect(screen.getByText("Insufficient month surplus for this saving")).toBeInTheDocument();
  });
});

describe("Purchases interaction", () => {
  // Setup: logged in user at month January with presetform expanded
  beforeEach(async () => {
    await setup();
  });

  test("Buy purchase removes purchasefield and converts piggybank savings to expense downpayment presets", async () => {
    //Purchase preset Resa 55000 will get 2 piggybank savings added:
    // add income preset
    userEvent.type(screen.getByPlaceholderText("Name"), "piggyone");
    userEvent.type(screen.getByPlaceholderText("Number"), "10000");
    userEvent.selectOptions(screen.getByRole("combobox"), "Travel");
    //override server response:
    server.use(
      rest.post<IEditPreset>("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "6203e22b2bdb63c78b35b672",
            user: "6203e2152bdb63c78b35b670",
            name: req.body.name,
            number: 10000,
            month: "January",
            year: 2021,
            category: "Travel",
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
    // make piggybank 10544

    const piggybankButton = await screen.findByRole("button", {
      name: /6 month/i,
    });
    fireEvent.click(piggybankButton);
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
            month: req.body.month,
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
    fireEvent.click(await screen.findByRole("button", { name: /submit/i }));
    // switch to march
    fireEvent.click(screen.getByRole("button", { name: /march/i }));
    // add income preset
    userEvent.type(screen.getByPlaceholderText("Name"), "piggytwo");
    userEvent.type(screen.getByPlaceholderText("Number"), "5000");
    userEvent.selectOptions(screen.getByRole("combobox"), "Travel");
    //override server response:
    server.use(
      rest.post<IEditPreset>("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "6203e22b2bdb63c78b35b672",
            user: "6203e2152bdb63c78b35b670",
            name: req.body.name,
            number: 5000,
            month: req.body.month,
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
    // make piggybank 5000
    fireEvent.click(await screen.findByRole("button", { name: /9 months/i }));
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
            month: req.body.month,
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
    fireEvent.click(await screen.findByRole("button", { name: /submit/i }));
    // switch to may
    fireEvent.click(screen.getByRole("button", { name: /may/i }));
    // add income preset
    userEvent.type(screen.getByPlaceholderText("Name"), "final_deposit");
    userEvent.type(screen.getByPlaceholderText("Number"), "50000");
    userEvent.selectOptions(screen.getByRole("combobox"), "Travel");
    // server response
    server.use(
      rest.post<IEditPreset>("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "6203e22b2bdb63c78b35b672",
            user: "6203e2152bdb63c78b35b670",
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

    // press buy purchase
    fireEvent.click(await screen.findByRole("button", { name: /buy/i }));
    // expect one expense preset created in may: -39456
    expect(await screen.findByRole("button", { name: /-39456/i })).toBeInTheDocument();
    // switch to march
    fireEvent.click(screen.getByRole("button", { name: /march/i }));
    // expect one expense preset created in march: 5000
    expect(await screen.findByRole("button", { name: /-5000/i })).toBeInTheDocument();
    // switch to january
    fireEvent.click(screen.getByRole("button", { name: /january/i }));
    // expect one expense preset created in january: 10000

    expect(await screen.findByRole("button", { name: /-10544/i })).toBeInTheDocument();
  });

  test("Delete purchase and its piggybank savings", async () => {
    //Purchase preset Resa 55000 will get 2 piggybank savings added:
    // add income preset
    userEvent.type(screen.getByPlaceholderText("Name"), "piggyone");
    userEvent.type(screen.getByPlaceholderText("Number"), "10000");
    userEvent.selectOptions(screen.getByRole("combobox"), "Travel");
    //override server response:
    server.use(
      rest.post<IEditPreset>("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "6203e22b2bdb63c78b35b672",
            user: "6203e2152bdb63c78b35b670",
            name: req.body.name,
            number: 10000,
            month: "January",
            year: 2021,
            category: "Travel",
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
    // add piggybank 10544
    expect(screen.getByPlaceholderText("Name")).toHaveValue("");

    await waitFor(() => {
      screen.getByText("6 months");
    });

    const piggybankButton = await screen.findByRole("button", {
      name: "6 months",
    });

    fireEvent.click(piggybankButton);
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
            month: req.body.month,
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
    fireEvent.click(await screen.findByRole("button", { name: /submit/i }));
    // switch to march
    fireEvent.click(screen.getByRole("button", { name: /march/i }));
    // add income preset
    userEvent.type(screen.getByPlaceholderText("Name"), "piggytwo");
    userEvent.type(screen.getByPlaceholderText("Number"), "5000");
    userEvent.selectOptions(screen.getByRole("combobox"), "Travel");
    //override server response:
    server.use(
      rest.post<IEditPreset>("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "6203e22b2bdb63c78b35b672",
            user: "6203e2152bdb63c78b35b670",
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
    // add piggybank 5000
    fireEvent.click(await screen.findByRole("button", { name: /9 month/i }));
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
            month: req.body.month,
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
    fireEvent.click(await screen.findByRole("button", { name: /submit/i }));
    // switch to may
    fireEvent.click(screen.getByRole("button", { name: /may/i }));
    // add income preset
    userEvent.type(screen.getByPlaceholderText("Name"), "final_deposit");
    userEvent.type(screen.getByPlaceholderText("Number"), "50000");
    userEvent.selectOptions(screen.getByRole("combobox"), "Travel");
    // server response
    server.use(
      rest.post<IEditPreset>("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "6203e22b2bdb63c78b35b672",
            user: "6203e2152bdb63c78b35b670",
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
    //screen.debug(await (await screen.findByText('Purchases')).parentElement);
    const purchaseItems = await screen.findAllByTestId("purchaseitem");
    expect(purchaseItems.length).toBe(1);

    // delete purchase
    const purchaseDeleteButton = await screen.findByTestId("purchase_item_delete_button");
    fireEvent.click(purchaseDeleteButton);

    // expect confirm delete modal to have been opened and then click deletebutton
    const delBtn = screen.queryByText("Delete");
    delBtn && fireEvent.click(delBtn);

    // expect deletemodal to been closed
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();

    // expect purchasepreset to have been deleted
    await waitForElementToBeRemoved(purchaseDeleteButton);
    // expect zero purchaseitems
    expect(screen.queryAllByTestId("purchaseitem").length).toBe(0);

    // expect piggybank saving to have been deleted
    expect(
      screen.queryByRole("heading", { name: /month surplus put to savings/i })
    ).not.toBeInTheDocument();

    // go to earlier month
    // switch to march
    fireEvent.click(screen.getByRole("button", { name: /march/i }));
    // expect piggybank saving to have been deleted there aswell
    expect(
      screen.queryByRole("heading", { name: /month surplus put to savings/i })
    ).not.toBeInTheDocument();

    // switch to january
    fireEvent.click(screen.getByRole("button", { name: /january/i }));
    //expect piggybank saving to have been deleted here aswell
    expect(
      screen.queryByRole("heading", { name: /month surplus put to savings/i })
    ).not.toBeInTheDocument();
  });

  test("Delete piggybank saving updates purchase-month-estimation", async () => {
    //Purchase preset Resa 55000 will get 2 piggybank savings added:
    // add income preset
    userEvent.type(screen.getByPlaceholderText("Name"), "piggyone");
    userEvent.type(screen.getByPlaceholderText("Number"), "10000");
    userEvent.selectOptions(screen.getByRole("combobox"), "Travel");
    //override server response:
    server.use(
      rest.post<IEditPreset>("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "6203e22b2bdb63c78b35b672",
            user: "6203e2152bdb63c78b35b670",
            name: req.body.name,
            number: 10000,
            month: "January",
            year: 2021,
            category: "Travel",
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
    // add piggybank 10544
    const piggybankButton = await screen.findByRole("button", {
      name: /6 month/i,
    });
    fireEvent.click(piggybankButton);
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
            month: req.body.month,
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
    fireEvent.click(await screen.findByRole("button", { name: /submit/i }));

    // expect a saving to have been created
    const monthSavingSumPreset = (
      await screen.findByRole("heading", {
        name: /month surplus put to savings/i,
      })
    ).parentElement?.parentElement?.children[1].children[1].children[0].textContent;
    expect(monthSavingSumPreset).toBe("10544");

    const monthSavingSumDeleteButton = (
      await screen.findByRole("heading", {
        name: /month surplus put to savings/i,
      })
    ).parentElement?.parentElement?.children[1].children[4].children[0];

    // delete this saving
    monthSavingSumDeleteButton && fireEvent.click(monthSavingSumDeleteButton);

    // expect saving to disappear
    await waitForElementToBeRemoved(
      await screen.findByRole("heading", {
        name: /month surplus put to savings/i,
      })
    );
    expect(
      screen.queryByRole("heading", { name: /month surplus put to savings/i })
    ).not.toBeInTheDocument();
  });

  test("Purchases displays/updates correct when edited", async () => {
    const purchaseNameField = screen.getByTestId("purchaseitem").children[0].children[0];
    fireEvent.click(purchaseNameField);

    const editNameField = await screen.findByLabelText("Name:");
    const editValueField = await screen.findByLabelText("Number");
    expect(editNameField).toHaveValue("Resa");
    expect(editValueField).toHaveValue(55000);
    expect(screen.getAllByRole("combobox").length).toBe(2);

    //change name and number of preset
    userEvent.clear(editNameField);
    // userEvent.clear(editValueField);
    userEvent.type(editNameField, "Trip");
    // userEvent.type(editValueField, "25000");

    //submit change
    const submitChangesButton = await screen.findByRole("button", {
      name: /update/i,
    });

    server.use(
      rest.put<IEditPreset>(`http://localhost/api/userpreset/:_id`, (req, res, ctx) => {
        const { _id } = req.params;

        return res(
          ctx.json({
            _id,
            user: req.body.user,
            name: req.body.name,
            number: 25000,
            month: "January",
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
    fireEvent.click(submitChangesButton);
    expect(submitChangesButton).not.toBeInTheDocument();

    // expect preset to have been changed in monthsummary
    const preset = await screen.findByText("Trip");
    expect(preset).toBeInTheDocument();

    // summation with new values is correct,
    //Month Income:
    const monthIncomeSum = (await screen.findByText("Month Income:")).children[0].textContent;
    expect(monthIncomeSum).toBe("799");
    // Account Balance
    const AccountBalance = (await screen.findByText("Month Income:")).parentElement?.children[3]
      .children[0].textContent;
    expect(AccountBalance).toBe("544977 ");
    //Month Expenses:
    const MonthExpenses = screen.getByText(/month expenses:/i).children[0].textContent;
    expect(MonthExpenses).toBe("-255");
    //Month Balance:
    const MonthBalance = screen.getByText(/month balance/i).parentElement?.children[1].textContent;
    expect(MonthBalance).toBe("Month Surplus:544");
    //Month Savings: 0
    const MonthSavings = screen.getByText(/month savings:/i).children[0].textContent;
    expect(MonthSavings).toBe(" 0");
    //Purchases is changed/updated correct
    const purchaseItem = await (
      await screen.findByText("Trip")
    ).parentElement?.children[1].textContent;
    expect(purchaseItem).toBe("25000");
  });

  test("Purchase displays/updates correct when summation of presets change", async () => {
    // Purchase item Resa has number 55000 and 101 months

    // months left is calculated: purchase number - piggybank savings / Month Balance
    // add income preset
    userEvent.type(screen.getByPlaceholderText("Name"), "income_preset");
    userEvent.type(screen.getByPlaceholderText("Number"), "10000");
    userEvent.selectOptions(screen.getByRole("combobox"), "Travel");
    server.use(
      rest.post<IEditPreset>("http://localhost/api/userpreset", (req, res, ctx) => {
        return res(
          ctx.json({
            _id: "6203e22b2bdb63c78b35b672",
            user: "6203e2152bdb63c78b35b670",
            name: req.body.name,
            number: 10000,
            month: "January",
            year: 2021,
            category: "Travel",
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
    fireEvent.click(screen.getByRole("button", { name: /add to budget/i }));

    // expect form fields to be reset
    expect(screen.getByPlaceholderText("Name")).toHaveValue("");
    expect(screen.getByPlaceholderText("Number")).toHaveValue(0);

    // wait for the preset to be created
    expect(await screen.findByRole("button", { name: /income_preset/i })).toBeInTheDocument();

    // expect new months left calculation to have occured and be 5 months
    const piggybankButton = await screen.findByRole("button", {
      name: /6 month/i,
    });
    expect(piggybankButton).toBeInTheDocument();
  });

  test("Click on purchase activates edit preset", async () => {
    fireEvent.click(screen.getByRole("button", { name: /resa/i }));
    expect(await screen.findByRole("heading", { name: /edit/i })).toBeInTheDocument();
    const editNameField = await screen.findByLabelText("Name:");
    const editValueField = await screen.findByLabelText("Number");
    expect(editNameField).toHaveValue("Resa");
    expect(editValueField).toHaveValue(55000);
  });

  test("Click on piggybank or monthsleft button activates AddtoPiggybankModal ", async () => {
    // unit test of PurchaseItem-component that needs to be asserted outside of component
    // press piggybank
    fireEvent.click(screen.getByTestId(/piggybank_icon/i));
    // expect addtopiggybankmodal to have been opened
    expect(await screen.findByRole("heading", { name: /amount to save/i })).toBeInTheDocument();
    // close the modal
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    // press monthsleft

    fireEvent.click(await screen.findByRole("button", { name: "50+ months" }));
    // expect addtopiggybankmodal to have been opened
    expect(await screen.findByRole("heading", { name: /amount to save/i })).toBeInTheDocument();
  });
});
