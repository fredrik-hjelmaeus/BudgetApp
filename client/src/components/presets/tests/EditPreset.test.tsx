import { render, screen, fireEvent } from "../../../test-utils/context-wrapper";
import userEvent from "@testing-library/user-event";
import EditPreset from "../EditPreset";
import React from "react";
import { server } from "../../../mocks/server";
import { rest } from "msw";
import PresetContext from "../../../context/preset/presetContext";
import PresetState from "../../../context/preset/PresetState";
import { IEditPreset } from "../../../frontend-types/IEditPreset";

test("initial state correct", async () => {
  render(<EditPreset />);
  expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Number")).toBeInTheDocument();
  expect(screen.getByRole("combobox")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /update/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  expect(screen.getByText(/edit/i)).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: /overhead/i })).not.toBeChecked(); //).toHaveAttribute('checked');
  expect(screen.getByRole("checkbox", { name: /purchase/i })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: /capital/i })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: /savings/i })).not.toBeChecked();
  const closeBtn = (await screen.findAllByRole("button")).find(
    (b) => (b as HTMLButtonElement).value === "close"
  );
  expect(closeBtn).toBeInTheDocument();
});

test("changing name,number,category and type works", () => {
  render(<EditPreset />);

  userEvent.type(screen.getByPlaceholderText("Name"), "test");
  userEvent.type(screen.getByPlaceholderText("Number"), "1000");
  userEvent.selectOptions(screen.getByRole("combobox"), "Reminderfees");
  fireEvent.click(screen.getByRole("checkbox", { name: /purchase/i }));

  expect(screen.getByPlaceholderText("Name")).toHaveValue("test");
  expect(screen.getByPlaceholderText("Number")).toHaveValue(1000);
  expect(screen.getByRole("combobox")).toHaveValue("Reminderfees");
  expect(screen.getByRole("checkbox", { name: /overhead/i })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: /purchase/i })).toBeChecked();

  server.use(
    rest.post<IEditPreset>("http://localhost/api/userpreset:_id", (req, res, ctx) => {
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
    }),
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

  const submitButton = screen.getByRole("button", { name: /update/i });
  fireEvent.click(submitButton);

  // can't test if modal is closed as _id is not defined,so the edited preset will fail to submit.
  // This will be tested in integration tests instead : Month.test.js
});
