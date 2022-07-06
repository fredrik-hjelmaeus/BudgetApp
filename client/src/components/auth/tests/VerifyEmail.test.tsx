import { render, screen } from "../../../test-utils/context-wrapper";
import { server } from "../../../mocks/server";
import { rest } from "msw";
import React from "react";
import VerifyEmail from "../VerifyEmail";
import { MemoryRouter, Route, Routes } from "react-router";
import Landing from "../../pages/Landing";

describe("verify email", () => {
  const Elements = () => (
    <MemoryRouter initialEntries={["/verifyemail/ef79617b9c23749cb04a2429eab1655bad19bbbb"]}>
      <Routes>
        <Route path="/Landing" element={<Landing />} />
        <Route path="/verifyemail/:verifytoken" element={<VerifyEmail />}></Route>
      </Routes>
    </MemoryRouter>
  );

  test("should render Email Verified if valid path&token", async () => {
    render(<Elements />);
    expect(await screen.findByText("Email Verified!")).toBeInTheDocument();
  });

  test("should render no token found if invalid path&token", async () => {
    // override server response to be non valid token provided
    server.use(
      rest.put("http://localhost/api/auth/verifyemail/:verifytoken", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            errors: [
              {
                msg: "Expired or Invalid token",
              },
            ],
          })
        );
      })
    );
    render(<Elements />);
    expect(await screen.findByText("Email Verified!")).toBeInTheDocument();
  });
});
