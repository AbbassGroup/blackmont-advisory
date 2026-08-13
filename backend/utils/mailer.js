const formData = require('form-data');
const Mailgun = require('mailgun.js');
const { formatFrom } = require('./emailFrom');

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || '',
  timeout: 30000,
  retry: 0,
});

async function sendMail(msg) {
  const data = {
    from: formatFrom(msg.from),
    to: msg.to,
    subject: msg.subject,
  };

  if (msg.text) data.text = msg.text;
  if (msg.html) data.html = msg.html;
  if (msg.cc) data.cc = msg.cc;

  if (msg.attachments && msg.attachments.length > 0) {
    data.attachment = msg.attachments.map(att => ({
      filename: att.filename,
      data: Buffer.isBuffer(att.content)
        ? att.content
        : Buffer.from(att.content, 'base64'),
      contentType: att.type || undefined,
    }));
  }

  return mg.messages.create(process.env.MAILGUN_DOMAIN, data);
}

module.exports = { mg, sendMail };
