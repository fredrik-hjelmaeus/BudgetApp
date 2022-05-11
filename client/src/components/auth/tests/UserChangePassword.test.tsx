import { render, screen, fireEvent } from "../../../test-utils/context-wrapper";
import UserChangePassword from "../UserChangePassword";
import userEvent from "@testing-library/user-event";
import React from "react";

describe("UserChangePassword unit tests", () => {
  const onSubmitPassword = jest.fn();
  const setExpandChangePassword = jest.fn();
  const DoExpandChangePassword: jest.Mock<any, any> = jest.fn();
  const isExpanded = DoExpandChangePassword.mockReturnValue(true) as unknown as boolean; // TODO: not sure about this cast
  const currentPassword = "test123";
  const onChange = jest.fn();
  const password = "12345678";
  const password2 = "434343";

  test("initial state correct", () => {
    render(
      <UserChangePassword
        onSubmitPassword={onSubmitPassword}
        ExpandChangePassword={isExpanded}
        setExpandChangePassword={setExpandChangePassword}
        currentPassword={currentPassword}
        onChange={onChange}
        password={password}
        password2={password2}
      />
    );

    expect(screen.getByPlaceholderText("Current Password")).toHaveValue("test123");
    expect(screen.getByPlaceholderText("New Password")).toHaveValue("12345678");
    expect(screen.getByPlaceholderText("Confirm New Password")).toHaveValue("434343");

    userEvent.clear(screen.getByPlaceholderText("Current Password"));
    expect(onChange).toHaveBeenCalledTimes(1);
    userEvent.clear(screen.getByPlaceholderText("New Password"));
    expect(onChange).toHaveBeenCalledTimes(2);
    userEvent.clear(screen.getByPlaceholderText("Confirm New Password"));
    expect(onChange).toHaveBeenCalledTimes(3);

    fireEvent.submit(screen.getByRole("button", { name: /update password/i }));
    expect(onSubmitPassword).toHaveBeenCalledTimes(1);
  });
});
