const Sib = require("sib-api-v3-sdk");
const config = require("config");

// Create a client instance
const client = Sib.ApiClient.instance;

// Set the client apikey
const apiKey = client.authentications["api-key"];
apiKey.apiKey = config.get("SENDINBLUE_API_KEY");

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
    email: "fredrik_hjelmaeus@hotmail.com",
  },
]; */

function sendMail(sender, receivers, subject, content) {
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

module.exports = sendMail;