const nodemailer = require('nodemailer');
const config = require('config');
const isObjectEmpty = require('./isObjectEmpty');

// This should be wrapped in outer function and instead Inject whatever mailserviceprovider we choose as an arg input.
// If the the await fails,error is catched in the controller atm.
// validation of email is also done in the controller
const sendEmail = async (options) => {
  //validate options argument recieved
  if (isObjectEmpty(options)) {
    return 'No options provided to sendEmail';
  }

  const transporter = nodemailer.createTransport({
    host: config.get('SMTP_HOST'),
    port: config.get('SMTP_PORT'),
    auth: {
      user: config.get('SMTP_EMAIL'),
      pass: config.get('SMTP_PASSWORD'),
    },
  });

  //  define transport object
  const message = {
    from: `${config.get('FROM_NAME')} <${config.get('FROM_EMAIL')}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  const info = await transporter.sendMail(message);

  process.env.NODE_ENV !== 'test' && console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
