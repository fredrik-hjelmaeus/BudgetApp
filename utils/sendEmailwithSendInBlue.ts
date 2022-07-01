const Sib = require("sib-api-v3-sdk");
//const config = require("config");

// Create a client instance
const client = Sib.ApiClient.instance;

// Set the client apikey
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY; //config.get("SENDINBLUE_API_KEY");

// Two types of transactional, transactional and email campaign
// campaign is for newsletter and transactional for single sends
// to not be vendor-locked we should not use campaign and keep our contacts
// in our own db.
const transactionalEmailApi = new Sib.TransactionalEmailsApi();

// Create a sender, have to use email that is registered on send in blue account
/* const sender = {
  email: "gemigpost@hotmail.com",
  name: "my name",
}; */

// Create receivers
/* const receivers = [
  {
    email: "gemigpost@hotmail.com",
  },
]; */

type sender = {
  email: string;
  name: string;
};
type receivers = {
  email: string;
};

function sendMail(sender: sender, receivers: receivers, subject: string, content: string) {
  // Should only be sent with either html or textcontent. But below
  // i show both. htmlcontent overrides textcontent
  // Send in blue also has a template system
  transactionalEmailApi
    .sendTransacEmail({
      sender,
      to: receivers,
      subject,
      textContent: content,
    })
    .then(console.log)
    .catch(console.log);
  /*  transactionalEmailApi
    .sendTransacEmail({
      sender,
      to: receivers,
      subject: "Subject text",
      textContent: `Text string {{params.somevariable}} here `,
      htmlContent: `<div>Test</div>`,
      params: {
        somevariable: "dynamic content",
      },
    })
    .then(console.log)
    .catch(console.log); */
}

export default sendMail;
