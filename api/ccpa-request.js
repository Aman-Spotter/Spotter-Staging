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

  const requestOptions = {
    unsubscribe: 'Unsubscribe me from future marketing communications',
    categories:
      'Provide the categories of personal information about me that the business collects and uses',
    selling: 'Does the business sell my personal information?',
    specific: 'Provide the specific personal information the business has about me',
    delete_specific: 'Delete specific data (You should specify in the text message field below)',
    delete_all: 'Delete all of my personal information',
  };

  const requestLabel = requestOptions[requestType] || requestType || '';

  const subject = `New CCPA request from ${name || 'Unknown'} ${surname || ''}`.trim();
  const lines = [
    `Name: ${name} ${surname}`.trim(),
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    `Request type: ${requestLabel}`,
    `State: ${state}`,
    zipcode ? `Zipcode: ${zipcode}` : null,
    message ? `Additional message: ${message}` : null,
  ].filter(Boolean);

  const htmlBody = `
  <div style="font-family: Arial, sans-serif; color: #222;">
    <h2 style="color: #20b2aa; margin-bottom: 16px;">CCPA Request</h2>
    <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
      <tr>
        <td style="padding: 8px; font-weight: bold;">Name:</td>
        <td style="padding: 8px;">${name} ${surname}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Email:</td>
        <td style="padding: 8px;"><a href="mailto:${email}" style="color: #20b2aa;">${email}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Phone:</td>
        <td style="padding: 8px;">${phone || '-'}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Request type:</td>
        <td style="padding: 8px;">${requestLabel}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">State:</td>
        <td style="padding: 8px;">${state}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Zipcode:</td>
        <td style="padding: 8px;">${zipcode || '-'}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Additional message:</td>
        <td style="padding: 8px;">${message || '-'}</td>
      </tr>
    </table>
    <p style="margin-top: 24px; color: #888; font-size: 13px;">
      This request was submitted via the Spotter.ai CCPA form.
    </p>
  </div>
`;

  try {
    await transporter.sendMail({
      from: `${process.env.ZOHO_SMTP_FROM_NAME || 'Spotter Sentinel'} <${
        process.env.ZOHO_SMTP_USER
      }>`,
      to: 'support@spottersentinel.com',
      subject,
      text: lines.join('\n'),
      html: htmlBody,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('CCPA email error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};
