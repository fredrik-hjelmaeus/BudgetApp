import { render, screen, fireEvent } from "../../../test-utils/context-wrapper";
import userEvent from "@testing-library/user-event";
import ResetPassword from "../ResetPassword";
import { server } from "../../../mocks/server";
import { rest } from "msw";
import React from "react";

describe("Reset Password", () => {
  const props = {
    match: {
      params: {
        id: "ef2233f97efcb6b39e6bea0b22cd4b1c2ac50518",
      },
    },
    //props.match.params.id
  };
  beforeEach(() => {
    render(<ResetPassword />); // TODO: probably not working since react-router-dom update to v6.
  });
  test("happy path,valid password provided", async () => {
    const heading = screen.getByRole("heading", { name: "Reset Password" });
    expect(heading).toBeInTheDocument();
    userEvent.type(screen.getByPlaceholderText("New Password"), "password123");
    userEvent.type(screen.getByPlaceholderText("Confirm New Password"), "password123");
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    fireEvent.click(await screen.findByRole("button", { name: /continue/i })); // displays on success
    expect(heading).not.toBeInTheDocument();
  });

  test("displays alert on invalid token", async () => {
    expect(screen.getByRole("heading", { name: "Reset Password" })).toBeInTheDocument();
    userEvent.type(screen.getByPlaceholderText("New Password"), "password123");
    userEvent.type(screen.getByPlaceholderText("Confirm New Password"), "password123");
    // create invalid token response from server:
    server.use(
      rest.put("http://localhost/api/auth/resetpassword/:resettoken", (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            errors: [
              {
                msg: "Invalid Token",
              },
            ],
          })
        );
      })
    );
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(await screen.findByText(/invalid/i)).toBeInTheDocument();
  });

  test("displays alert on invalid password", async () => {
    const newPassword = screen.getByPlaceholderText("New Password");
    const confirmPassword = screen.getByPlaceholderText("Confirm New Password");
    const submitBtn = screen.getByRole("button", { name: /submit/i });

    userEvent.type(newPassword, "");
    userEvent.type(confirmPassword, "password123");
    fireEvent.click(submitBtn);
    expect(await screen.findByText(/please fill in all fields/i)).toBeInTheDocument();

    userEvent.type(newPassword, "password");
    fireEvent.click(submitBtn);
    userEvent.type(newPassword, "password");
    expect(await screen.findByText(/Passwords do not match/i)).toBeInTheDocument();

    userEvent.clear(newPassword);
    userEvent.clear(confirmPassword);
    userEvent.type(newPassword, "password");
    userEvent.type(confirmPassword, "password");
    server.use(
      rest.put("http://localhost/api/auth/resetpassword/:resettoken", (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            errors: [
              {
                msg: "The password must be 6+ chars long and contain a number",
              },
            ],
          })
        );
      })
    );
    fireEvent.click(submitBtn);
    expect(await screen.findByText(/the password must be/i)).toBeInTheDocument();
  });

  test("cancel button takes you landing page", () => {
    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelBtn);
    expect(screen.queryByRole("heading", { name: "Reset Password" })).not.toBeInTheDocument();
  });
});
