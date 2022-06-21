import sendEmail from "../sendEmail";
import config from "config";
const sendMailMock = jest.fn(); // this will return undefined if .sendMail() is called

// In order to return a specific value you can use this instead
// const sendMailMock = jest.fn().mockReturnValue(/* Whatever you would expect as return value */);

jest.mock("nodemailer");

const nodemailer = require("nodemailer");
nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });
describe("sendEmail", () => {
  afterEach(() => jest.clearAllMocks());
  it("sends email with options", async () => {
    await sendEmail({
      email: "test@test.com",
      subject: "Password reset token",
      message: "testing little",
    });

    expect(sendMailMock).toBeCalledTimes(1);
    const sent = {
      from: `${process.env.FROM_NAME!} <${process.env.FROM_EMAIL!}>`,
      subject: "Password reset token",
      text: "testing little",
      to: "test@test.com",
    };
    expect(sendMailMock).toHaveBeenCalledWith(sent);
  });
});
