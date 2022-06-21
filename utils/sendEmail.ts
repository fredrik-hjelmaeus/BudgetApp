import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
const config = require("config");
import isObjectEmpty from "./isObjectEmpty";

export interface ISendEmailOptions {
  email: string;
  subject: string;
  message: string;
}

// This should be wrapped in outer function and instead Inject whatever mailserviceprovider we choose as an arg input.
// If the the await fails,error is catched in the controller atm.
// validation of email is also done in the controller
const sendEmail = async (options: ISendEmailOptions) => {
  //validate options argument recieved
  if (isObjectEmpty(options)) {
    return "No options provided to sendEmail";
  }

  const transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> =
    nodemailer.createTransport({
      host: process.env.SMTP_HOST! || smtp.mailtrap.io,
      port: process.env.SMTP_PORT!,
      auth: {
        user: process.env.SMTP_EMAIL!,
        pass: process.env.SMTP_PASSWORD!,
      },
    });

  //  define transport object
  const message = {
    from: `${process.env.FROM_NAME!} <${process.env.FROM_EMAIL!}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  const info = await transporter.sendMail(message);
  process.env.NODE_ENV === "development" && console.log("Message sent: %s", info.messageId);
};

export default sendEmail;
