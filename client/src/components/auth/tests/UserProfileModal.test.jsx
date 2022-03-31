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

  test.only("shows alert when trying to submit already in use email", async () => {
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
  test.skip("required field prevents from submitting empty email and name field", () => {});
});
