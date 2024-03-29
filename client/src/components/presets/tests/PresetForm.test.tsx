import { render, screen, fireEvent } from "../../../test-utils/context-wrapper";
import userEvent from "@testing-library/user-event";
import PresetForm from "../PresetForm";
import React from "react";

test("initial load state correct", async () => {
  render(<PresetForm />);
  //expand the form
  const expandBtn = screen.getByRole("button", { name: /add to budget/i });
  fireEvent.click(expandBtn);
  // check all elements is there
  expect(screen.getByText("Select an category")).toBeInTheDocument();
  expect(screen.getByRole("combobox")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Number")).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: /overhead/i })).toHaveAttribute("checked");
  expect(screen.getByRole("checkbox", { name: /purchase/i })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: /capital/i })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: /savings/i })).not.toBeChecked();
  expect(screen.getByRole("button", { name: /upload csv-file/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /upload csv-file/i })).toBeInTheDocument();
  const closeBtn = (await screen.findAllByRole("button")).find(
    (b) => (b as HTMLButtonElement).value === "close"
  );
  expect(closeBtn).toBeInTheDocument();
  const btnAndTitle = await screen.findAllByText(/add to budget/i);
  expect(btnAndTitle.length).toBe(2);
});

test("create preset works and resets after submit", () => {
  render(<PresetForm />);
  //expand the form
  const expandBtn = screen.getByRole("button", { name: /add to budget/i });
  fireEvent.click(expandBtn);

  // fill in the form
  const nameField = screen.getByPlaceholderText("Name");
  const numberField = screen.getByPlaceholderText("Number");
  const categoryField = screen.getByRole("combobox");
  userEvent.type(nameField, "test");
  userEvent.type(numberField, "100");
  userEvent.selectOptions(categoryField, "Reminderfees");
  fireEvent.click(screen.getByRole("button", { name: /add to budget/i }));

  expect(screen.getByPlaceholderText("Name")).toHaveValue("");
  expect(screen.getByPlaceholderText("Number")).toHaveValue(0);
  expect(screen.getByRole("combobox")).toHaveValue("Select an category");
});

test("shows error if category select but not all fields are filled in", () => {
  render(<PresetForm />);
  //expand the form
  const expandBtn = screen.getByRole("button", { name: /add to budget/i });
  fireEvent.click(expandBtn);
  //select category
  const categoryField = screen.getByRole("combobox");
  userEvent.selectOptions(categoryField, "Reminderfees");
  //click submit
  fireEvent.click(screen.getByRole("button", { name: /add to budget/i }));
  // check for alert msg
  expect(screen.getByText("Please fill in both fields")).toBeInTheDocument();
});

test("shows error if no category is selected", () => {
  render(<PresetForm />);
  //expand the form
  const expandBtn = screen.getByRole("button", { name: /add to budget/i });
  fireEvent.click(expandBtn);
  // fill in fields but not category
  const nameField = screen.getByPlaceholderText("Name");
  const numberField = screen.getByPlaceholderText("Number");
  userEvent.type(nameField, "test");
  userEvent.type(numberField, "100");
  //click submit
  fireEvent.click(screen.getByRole("button", { name: /add to budget/i }));
  // check for alert msg
  const alertMsg = screen.getByText("Please select an category");
  expect(alertMsg).toBeInTheDocument();
});

test("number field only accepts negative or positive numbers", () => {
  render(<PresetForm />);
  //expand the form
  const expandBtn = screen.getByRole("button", { name: /add to budget/i });
  fireEvent.click(expandBtn);

  // fill in the form
  const nameField = screen.getByPlaceholderText("Name");
  const numberField = screen.getByPlaceholderText("Number");
  const categoryField = screen.getByRole("combobox");
  userEvent.type(nameField, "test");
  userEvent.type(numberField, "abc");
  userEvent.selectOptions(categoryField, "Reminderfees");
  //click submit
  fireEvent.click(screen.getByRole("button", { name: /add to budget/i }));

  expect(screen.getByPlaceholderText("Name")).toHaveValue("test");
  expect(screen.getByPlaceholderText("Number")).toHaveValue(0);
  expect(screen.getByRole("combobox")).toHaveValue("Reminderfees");
  expect(screen.getByText("Please fill in both fields")).toBeInTheDocument();
});

test("checkboxfield works", () => {
  render(<PresetForm />);

  //expand the form
  const expandBtn = screen.getByRole("button", { name: /add to budget/i });
  fireEvent.click(expandBtn);

  // click around on checkboxes
  const overheadCheckbox = screen.getByRole("checkbox", { name: /overhead/i });
  expect(overheadCheckbox).toBeChecked();
  const purchaseCheckbox = screen.getByRole("checkbox", { name: /purchase/i });
  fireEvent.click(purchaseCheckbox);
  expect(purchaseCheckbox).toBeChecked();
  const savingsCheckbox = screen.getByRole("checkbox", { name: /savings/i });
  fireEvent.click(savingsCheckbox);
  expect(savingsCheckbox).toBeChecked();
  const capitalCheckbox = screen.getByRole("checkbox", { name: /capital/i });
  fireEvent.click(capitalCheckbox);
  expect(capitalCheckbox).toBeChecked();

  // fill in the form
  const nameField = screen.getByPlaceholderText("Name");
  const numberField = screen.getByPlaceholderText("Number");
  const categoryField = screen.getByRole("combobox");
  userEvent.type(nameField, "test");
  userEvent.type(numberField, "100");
  userEvent.selectOptions(categoryField, "Reminderfees");
  //click submit
  fireEvent.click(screen.getByRole("button", { name: /add to budget/i }));

  // expect fields to be reset after submit
  expect(screen.getByPlaceholderText("Name")).toHaveValue("");
  expect(screen.getByPlaceholderText("Number")).toHaveValue(0);
  expect(screen.getByRole("combobox")).toHaveValue("Select an category");
  expect(screen.getByRole("checkbox", { name: /overhead/i })).toBeChecked();
  // correct checkbox value sent to backend is tested in month integration test.
});
