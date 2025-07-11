const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a reusable transporter object using Zoho SMTP
const transporter = nodemailer.createTransport({
  host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com',
  port: Number(process.env.ZOHO_SMTP_PORT) || 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.ZOHO_SMTP_USER,
    pass: process.env.ZOHO_SMTP_PASS,
  },
});

/**
 * Send CCPA form data to support email address via Zoho SMTP
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const sendCcpaRequest = async (req, res) => {
  // Allow CORS pre-flight requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Build plain-text and HTML versions of the email
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

  const textBody = lines.join('\n');
  const htmlBody = `<h2>CCPA Request</h2><ul>${lines
    .map((l) => `<li>${l}</li>`) 
    .join('')}</ul>`;

  try {
    await transporter.sendMail({
      from: `Spotter Sentinel <${process.env.ZOHO_SMTP_USER}>`,
      to: 'support@spottersentinel.com',
      subject,
      text: textBody,
      html: htmlBody,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Failed to send CCPA email:', error);
    return res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
};

module.exports = { sendCcpaRequest }; 