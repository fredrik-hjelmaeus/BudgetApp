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

  test.only("displays piggybank savings when expanding", async () => {
    fireEvent.click(screen.getByRole("button", { name: /january/i }));
    fireEvent.click(await screen.findByRole("button", { name: /add to budget/i }));
    fireEvent.click(await screen.findByRole("button", { name: /101 months/i }));
    const submitBtn = await screen.findByRole("button", { name: /submit/i });

    server.use(
      rest.put(`http://localhost/api/userpreset/:_id`, (req, res, ctx) => {
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
    fireEvent.click(submitBtn);
    await waitForElementToBeRemoved(submitBtn);
    expect(submitBtn).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /month surplus put to savings/i })
    ).toBeInTheDocument();
    fireEvent.click(await screen.findByRole("button", { name: /2021/i }));
    fireEvent.click(await screen.findByRole("button", { name: /savings summary/i }));
    const piggbankSavingBtn = await screen.findByRole("button", { name: /resa/i });
    fireEvent.click(piggbankSavingBtn);
    screen.debug(piggbankSavingBtn);
    // expect(await screen.findByText("544")).toBeInTheDocument();
  });

  test.skip("updates when deleting saving", async () => {
    fireEvent.click(await screen.findByRole("button", { name: /resa/i }));
    screen.debug(screen.getByText("544"));
  });
});
