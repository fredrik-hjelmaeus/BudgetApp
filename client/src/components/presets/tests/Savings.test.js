import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "../../../test-utils/context-wrapper";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import App from "../../../App";

describe("Savings functionality", () => {
  beforeEach(async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /savings/i }));
    expect(await screen.findByText("Piggybank Purchase Savings")).toBeInTheDocument();
  });

  test("display saving items when expanding", async () => {
    fireEvent.click(await screen.findByRole("button", { name: /general/i }));
    expect(await screen.findByText("saving")).toBeInTheDocument();
  });

  test("displays capital items when expanding", async () => {
    fireEvent.click(await screen.findByRole("button", { name: /capital/i }));
    expect(screen.getByText("En inkomst")).toBeInTheDocument();
  });

  test("updates when deleting saving", async () => {
    fireEvent.click(await screen.findByRole("button", { name: /general/i }));
    const delBtn = await (await screen.findByText("saving")).parentElement.children[1].children[3];
    fireEvent.click(delBtn);
    await waitForElementToBeRemoved(delBtn);
    expect(delBtn).not.toBeInTheDocument();
  });

  test("updates when deleting capital", async () => {
    fireEvent.click(await screen.findByRole("button", { name: /capital/i }));
    const delBtn = await (
      await screen.findByText("En inkomst")
    ).parentElement.children[1].children[4];
    fireEvent.click(delBtn);
    await waitForElementToBeRemoved(delBtn);
    expect(delBtn).not.toBeInTheDocument();
  });
});

describe("Piggybank savings", () => {
  // requires modified rest.get handler
  beforeEach(() => {
    // Create a user with piggybank saving and override get user presets
    server.use(
      // get one users presets
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
                { month: "January", year: "2021", savedAmount: 544 },
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

    render(<App />);
  });

  test("updates when deleting piggybank saving", async () => {
    // go to year savings view
    fireEvent.click(await screen.findByRole("button", { name: /savings summary/i }));
    const piggbankSavingBtn = await screen.findByRole("button", { name: /resa/i });
    fireEvent.click(piggbankSavingBtn);

    // delete piggybank saving
    const delBtn = screen.getAllByRole("button").find((btn) => btn.value === "delbtn");
    fireEvent.click(delBtn);
    await waitForElementToBeRemoved(delBtn);
    expect(delBtn).not.toBeInTheDocument();
  });

  test("displays piggybank savings when expanding", async () => {
    // go to year savings view
    fireEvent.click(await screen.findByRole("button", { name: /savings summary/i }));
    const piggbankSavingBtn = await screen.findByRole("button", { name: /resa/i });
    fireEvent.click(piggbankSavingBtn);

    // delete piggybank saving
    const delBtn = screen.getAllByRole("button").find((btn) => btn.value === "delbtn");
    expect(delBtn).toBeInTheDocument();
  });
});
