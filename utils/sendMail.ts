import { ISendEmailOptions } from "./ISendEmailOptions";
import sendEmailWithNodeMailer from "./sendEmailWithNodeMailer";
import sendEmailWithSendInBlue from "./sendEmailWithSendInBlue";

const sendEmail = (options: ISendEmailOptions) => {
  console.log(options);
  //  Mapping to SendInBlue API
  const sender = {
    email: process.env.SENDINBLUE_SENDER_EMAIL || "",
    name: process.env.SENDINBLUE_SENDER_NAME || "",
  };
  const receiver = {
    email: options.email,
  };

  try {
    process.env.NODE_ENV !== "development"
      ? sendEmailWithNodeMailer(options)
      : sendEmailWithSendInBlue(sender, receiver, options.subject, options.message);
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
