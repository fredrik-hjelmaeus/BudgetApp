import App from "../../../App";
import React from "react";
import { render, fireEvent, waitFor, screen } from "../../../test-utils/context-wrapper";

describe("Logout", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("logoutbutton is displayed correctly when logged in", async () => {
    const logoutBtn = await screen.findByRole("button", { name: /logout/i });
    expect(logoutBtn).toHaveValue("logout");
  });

  test("clicking logout takes you to landing page", async () => {
    fireEvent.click(await screen.findByRole("button", { name: /logout/i }));
    // expect to find a login button on the landing page
    await waitFor(async () => {
      expect(await screen.findByRole("button", { name: /login/i })).toBeInTheDocument();
    });
  });
});
