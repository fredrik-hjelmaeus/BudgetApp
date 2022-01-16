const nodemailer = require('nodemailer');
const config = require('config');

// This should be wrapped in outer function and instead Inject whatever mailserviceprovider we choose as an arg input.
const sendEmail = async (options) => {
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

  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
