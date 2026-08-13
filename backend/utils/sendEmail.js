const { sendMail } = require("./mailer");

const sendEmail = async (options) => {
  const info = await sendMail({
    from: process.env.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  });

  console.log("Message sent: %s", info && info.id);
};

module.exports = sendEmail;
