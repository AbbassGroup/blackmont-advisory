const nodemailer = require('nodemailer');
const { formatFrom } = require('./emailFrom');

/**
 * Shared Nodemailer transporter for all email sending.
 * Uses SMTP credentials from environment variables.
 */
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send an email using the shared transporter.
 * Accepts SendGrid-style msg objects for easy migration:
 *   { to, from, subject, text, html, attachments }
 *
 * Nodemailer attachments use { filename, content, encoding } instead of
 * SendGrid's { filename, content (base64), type, disposition }, so this
 * function auto-converts base64 string attachments.
 */
async function sendMail(msg) {
  const mailOptions = {
    from: formatFrom(msg.from),
    to: Array.isArray(msg.to) ? msg.to.join(', ') : msg.to,
    subject: msg.subject,
    text: msg.text || undefined,
    html: msg.html || undefined,
  };

  // Add CC if present
  if (msg.cc) {
    mailOptions.cc = Array.isArray(msg.cc) ? msg.cc.join(', ') : msg.cc;
  }

  // Convert attachments from SendGrid format to Nodemailer format
  if (msg.attachments && msg.attachments.length > 0) {
    mailOptions.attachments = msg.attachments.map(att => ({
      filename: att.filename,
      content: att.content,
      encoding: 'base64',
      contentType: att.type || undefined,
    }));
  }

  return transporter.sendMail(mailOptions);
}

module.exports = { transporter, sendMail };
