import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent } from "../../../test-utils/context-wrapper";
import UserProfileModal from "../UserProfileModal";

describe("User Details integration", () => {
  beforeEach(() => {
    render(<UserProfileModal />);
  });
  test("updates name and email on submitted update", async () => {
    const emailField = screen.getByPlaceholderText(/email/i);
    const nameField = screen.getByPlaceholderText(/name/i);
    // console.log(emailField);
    userEvent.clear(nameField);
    userEvent.clear(emailField);
    userEvent.type(nameField, "test");
    userEvent.type(emailField, "test@test.com");
    fireEvent.click(screen.getByRole("button", { name: /update profile/i }));
    expect((await screen.findByPlaceholderText(/name/i)).textContent).toBe(
      "test"
    );
    expect(await screen.findByPlaceholderText(/email/i)).toBe("test@test.com");
  });
  test.skip("shows alert when trying to submit already in use email", () => {});
  test.skip("required field prevents from submitting empty email and name field", () => {});
});
