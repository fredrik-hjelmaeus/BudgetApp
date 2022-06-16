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
import React from "react";
import { IEditPreset } from "../../../frontend-types/IEditPreset";
import { IPreset } from "../../../frontend-types/IPreset";

describe("MonthSummary unit tests", () => {
  const setup = async () => {
    // go to month and expand preset form
    render(<App />);

    await screen.findByText(/yearly/i);
    // go to month
    const januaryButton = screen.queryByRole("button", { name: /january/i });
    januaryButton && fireEvent.click(januaryButton);

    // click add to budget button
    const addToBudgetButton = await screen.findByRole("button", {
      name: /add to budget/i,
    });
    fireEvent.click(addToBudgetButton);

    // assert inital month state
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
  beforeEach(async () => {
    await setup();
  });

  test("Field gets deleted when delete button is pressed", async () => {
    // get presets
    const presets = screen.getAllByTestId("presetitem");
    // get deletebutton on the first preset and click it
    const presetHtmlElement = presets && presets[0];
    const presetDeleteButton = presetHtmlElement?.parentElement?.parentElement?.children[4];
    presetDeleteButton && fireEvent.click(presetDeleteButton);
    // expect deletebutton to be gone
    await waitForElementToBeRemoved(presetDeleteButton);
    expect(presetDeleteButton).not.toBeInTheDocument();
  });

  test("Category is updated when changed", async () => {
    const presets = screen.getAllByTestId("presetitem");

    // get categoryselect on the first preset and change category
    const category = presets[0]?.parentElement?.parentElement?.children[3];

    //close presetform for easier query selection
    fireEvent.click(screen.getByTestId("presetform_closebtn"));
    category && fireEvent.click(category);

    // expect edit preset modal to be opened
    // change category and submit
    const editpresetheader = await screen.findByRole("heading", {
      name: /edit/i,
    });
    userEvent.selectOptions(screen.getByRole("combobox"), "Travel");
    const submitButton = screen.getByRole("button", { name: /update/i });
    fireEvent.click(submitButton);

    // check that edit preset modal is closed and the preset is updated with new icon/category
    expect(editpresetheader).not.toBeInTheDocument();
    const presetsAgain = await screen.findAllByTestId("presetitem");
    expect(presetsAgain.length).toBe(3);
    expect(await screen.findByAltText("Travel icon")).toBeInTheDocument(); // avoids unmounts somehow
    const typeIcon =
      presetsAgain[0]?.parentElement?.parentElement?.children[3].children[0].getAttribute("alt");
    expect(typeIcon).toBe("Car icon");
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
    // screen.debug(piggybankButton, 300000);
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
  test("Delete purchase works correct", () => {
    // removes purchasepreset and it's piggybank savings.
  });
});
