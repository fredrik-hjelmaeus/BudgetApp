import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent, waitFor } from "../../../test-utils/context-wrapper";
import App from "../../../App";
import { server } from "../../../mocks/server";
import { rest } from "msw";

describe("User Details integration", () => {
  beforeEach(async () => {
    render(<App />);
    fireEvent.click(await screen.findByRole("button", { name: /dirk/i }));
  });

  test("updates name and email on submitted update", async () => {
    const emailField = screen.getByPlaceholderText(/email/i);
    const nameField = screen.getByPlaceholderText(/name/i);
    userEvent.clear(nameField);
    userEvent.clear(emailField);
    userEvent.type(nameField, "test");
    userEvent.type(emailField, "test@test.com");
    fireEvent.click(screen.getByRole("button", { name: /update profile/i }));
    await waitFor(async () => {
      const updatedUserName = await screen.findByLabelText("Name:");
      const updatedEmail = await screen.findByLabelText("Email:");
      screen.debug(updatedEmail);
      expect(updatedUserName).toHaveValue("test");
      expect(updatedEmail).toHaveValue("test@test.com");
    });
    // if toasts were to be implemented we could test and make sure the new user was loaded in AuthState and the toast was displayed
  });

  test("shows alert when trying to submit already in use email", async () => {
    const emailField = screen.getByPlaceholderText(/email/i);
    userEvent.clear(emailField);
    userEvent.type(emailField, "newuser@whatever.com");
    // error response from server
    server.use(
      rest.put(`http://localhost/api/auth/updatedetails`, (req, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({ errors: [{ msg: "This email is already in use" }] })
        );
      })
    );
    fireEvent.click(screen.getByRole("button", { name: /update profile/i }));
    await waitFor(() => {
      expect(screen.getByText(/this email is already in use/i)).toBeInTheDocument();
    });
  });
});

describe("User password integration", () => {
  beforeEach(async () => {
    render(<App />);
    fireEvent.click(await screen.findByRole("button", { name: /dirk/i }));
    fireEvent.click(await screen.findByRole("button", { name: /change password/i }));
  });

  test("user password change happy path", async () => {
    const passwordField = screen.getByPlaceholderText(/current password/i);
    const newPasswordField = screen.getByPlaceholderText("New Password");
    const confirmPasswordField = screen.getByPlaceholderText(/confirm new password/i);
    userEvent.clear(passwordField);
    userEvent.clear(newPasswordField);
    userEvent.clear(confirmPasswordField);
    userEvent.type(passwordField, "password");
    userEvent.type(newPasswordField, "newpassword");
    userEvent.type(confirmPasswordField, "newpassword");
    fireEvent.click(screen.getByRole("button", { name: /update password/i }));
    await waitFor(async () => {
      expect(await screen.findByText(/password updated/i)).toBeInTheDocument();
    });
  });

  test("invalid current password", async () => {
    const currentPasswordField = screen.getByPlaceholderText(/current password/i);
    const newPasswordField = screen.getByPlaceholderText("New Password");
    const confirmPasswordField = screen.getByPlaceholderText(/confirm new password/i);
    userEvent.type(currentPasswordField, "wrongpassword");
    userEvent.type(newPasswordField, "newpassword1");
    userEvent.type(confirmPasswordField, "newpassword1");
    server.use(
      rest.put(`http://localhost/api/auth/updatepassword`, (req, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({
            errors: [
              {
                msg: "Current Password is incorrect",
              },
            ],
          })
        );
      })
    );

    fireEvent.click(screen.getByRole("button", { name: /update password/i }));
    await waitFor(async () => {
      expect(await screen.findByText(/Current Password is incorrect/i)).toBeInTheDocument();
    });
  });

  test("invalid new password , less than 6 chars", async () => {
    const currentPasswordField = screen.getByPlaceholderText(/current password/i);
    const newPasswordField = screen.getByPlaceholderText("New Password");
    const confirmPasswordField = screen.getByPlaceholderText(/confirm new password/i);
    userEvent.type(currentPasswordField, "wrongpassword");
    userEvent.type(newPasswordField, "new");
    userEvent.type(confirmPasswordField, "new");
    server.use(
      rest.put(`http://localhost/api/auth/updatepassword`, (req, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({
            errors: [
              {
                value: "test",
                msg: "must be at least 6 chars long",
                param: "password",
                location: "body",
              },
              {
                value: "test",
                msg: "The password must be 6+ chars long and contain a number",
                param: "password",
                location: "body",
              },
            ],
          })
        );
      })
    );

    fireEvent.click(screen.getByRole("button", { name: /update password/i }));
    await waitFor(async () => {
      expect(await screen.findByText(/must be at least 6 chars long/i)).toBeInTheDocument();
    });
  });

  test("invalid new password , missing number", async () => {
    const currentPasswordField = screen.getByPlaceholderText(/current password/i);
    const newPasswordField = screen.getByPlaceholderText("New Password");
    const confirmPasswordField = screen.getByPlaceholderText(/confirm new password/i);
    userEvent.type(currentPasswordField, "wrongpassword");
    userEvent.type(newPasswordField, "newpassword");
    userEvent.type(confirmPasswordField, "newpassword");
    server.use(
      rest.put(`http://localhost/api/auth/updatepassword`, (req, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({
            errors: [
              {
                value: "test",
                msg: "The password must be 6+ chars long and contain a number",
                param: "password",
                location: "body",
              },
            ],
          })
        );
      })
    );

    fireEvent.click(screen.getByRole("button", { name: /update password/i }));
    await waitFor(async () => {
      expect(
        await screen.findByText("The password must be 6+ chars long and contain a number")
      ).toBeInTheDocument();
    });
  });
});

describe("App Guide start", () => {
  beforeEach(async () => {
    render(<App />);
    fireEvent.click(await screen.findByRole("button", { name: /dirk/i }));
  });

  test("App guide launch", () => {
    fireEvent.click(screen.getByRole("button", { name: /app guide/i }));
    expect(screen.getByRole("heading", { name: /app guide/i })).toBeInTheDocument();
  });
});
