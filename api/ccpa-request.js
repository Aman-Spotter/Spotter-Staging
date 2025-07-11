const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com',
  port: Number(process.env.ZOHO_SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_SMTP_USER,
    pass: process.env.ZOHO_SMTP_PASS,
  },
});

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const {
    name = '',
    surname = '',
    email = '',
    phone = '',
    request: requestType = '',
    state = '',
    zipcode = '',
    message = '',
  } = req.body || {};

  if (!email) return res.status(400).json({ error: 'Email is required' });

  const subject = `New CCPA request from ${name || 'Unknown'} ${surname || ''}`.trim();
  const lines = [
    `Name: ${name} ${surname}`.trim(),
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    `Request type: ${requestType}`,
    `State: ${state}`,
    zipcode ? `Zipcode: ${zipcode}` : null,
    message ? `Additional message: ${message}` : null,
  ].filter(Boolean);

  try {
    await transporter.sendMail({
      from: `${process.env.ZOHO_SMTP_FROM_NAME || 'Spotter Sentinel'} <${
        process.env.ZOHO_SMTP_USER
      }>`,
      to: 'support@spottersentinel.com',
      subject,
      text: lines.join('\n'),
      html: `<h2>CCPA Request</h2><ul>${lines.map((l) => `<li>${l}</li>`).join('')}</ul>`,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('CCPA email error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};
