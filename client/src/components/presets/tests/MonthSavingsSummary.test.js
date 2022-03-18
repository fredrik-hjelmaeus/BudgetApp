import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
} from "../../../test-utils/context-wrapper";
import userEvent from "@testing-library/user-event";
import App from "../../../App";
import MonthSummary from "../MonthSummary";
import { server } from "../../../mocks/server";
import { rest } from "msw";
import path from "path";
import MonthSavingsSummary from "../MonthSavingsSummary";
describe("MonthSavingsSummary unit tests", () => {
  beforeEach(async () => {
    // go to month and expand preset form
    render(<App />);

    // go to month
    const januaryButton = screen.queryByRole("button", { name: /january/i });
    fireEvent.click(januaryButton);
  });

  test.only("editing name and number on piggybank saving works correctly", async () => {
    //create piggybank saving
    fireEvent.click(await screen.findByRole("button", { name: /5 months/i }));
    fireEvent.click(await screen.findByRole("button", { name: /submit/i }));

    // press number on piggybank saving
    fireEvent.click(await screen.findByRole("button", { name: /10544/i }));

    // verify edit preset fields is loaded with preset values and then change them
    const numberField = await screen.findByLabelText("Number");
    const nameField = await screen.findByLabelText("Name");
    expect(numberField.value).toBe("10544");
    expect(nameField.value).toBe("Resa");
    userEvent.clear(numberField);
    userEvent.clear(nameField);
    userEvent.type(numberField, "999");
    userEvent.type(nameField, "Trip");
    fireEvent.click(screen.getByRole("button", { name: /update/i }));

    // expect the saving preset to have been updated
    const editedSavingPresetNumber = await screen.findByRole("button", {
      name: /999/i,
    });
    const editedSavingPresetName = await screen.findByRole("button", {
      name: /trip/i,
    });
    expect(editedSavingPresetNumber).toBeInTheDocument();
    expect(editedSavingPresetName).toBeInTheDocument();
  });
  test.skip("should not be able to add more to piggybank in edit when month balance 0 or less", () => {});
  test.skip("should not be able to add more to saving in edit when month balance 0 or less", () => {});
  test.skip("editing category on piggybank saving should not work", async () => {});
  test.skip("deleting piggybank saving works correctly", async () => {});
  test.skip("editing name,number and category on saving works correctly", async () => {
    // go to april month
    const aprilButton = screen.queryByRole("button", { name: /april/i });
    fireEvent.click(aprilButton);
    // click number on saving
    fireEvent.click(await screen.findByRole("button", { name: /456788/i }));
    const numberField = await screen.findByLabelText("Number");
    expect(numberField.value).toBe("456788");
    userEvent.clear(numberField);
    userEvent.type(numberField, "999");
    fireEvent.click(screen.getByRole("button", { name: /update/i }));

    // screen.debug(await (await screen.findByRole('heading', { name: /month surplus put to savings/i })).parentElement.parentElement);
    //  await waitFor(async () => await screen.findByRole('button', { name: /999/i }));
    const editedSavingPreset = await screen.findByRole("button", {
      name: /999/i,
    });
    expect(editedSavingPreset).toBeInTheDocument();
  });
  test.skip("deleting saving works correctly", async () => {});
});
