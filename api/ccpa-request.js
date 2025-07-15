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
    // Send email to support (existing functionality)
    await transporter.sendMail({
      from: `${process.env.ZOHO_SMTP_FROM_NAME || 'Spotter Sentinel'} <${
        process.env.ZOHO_SMTP_USER
      }>`,
      to: 'support@spottersentinel.com',
      subject,
      text: lines.join('\n'),
      html: htmlBody,
    });

    // Send confirmation email to customer
    const customerName = `${name} ${surname}`.trim() || 'Valued Customer';
    const customerSubject = 'Your CCPA Request Has Been Received';
    
    const customerHtmlBody = `
    <div style="font-family: Arial, sans-serif; color: #222; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #20b2aa 0%, #40e0d0 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">CCPA Request Confirmation</h1>
      </div>
      
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
        <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
          Dear ${customerName},
        </p>
        
        <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
          We are writing to acknowledge receipt of your recent request submitted under the California Consumer Privacy Act (CCPA).
        </p>
        
        <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
          <strong>Spotter Sentinel takes data privacy seriously.</strong> We have initiated an internal review to address your request in accordance with applicable CCPA requirements. You can expect a response within the time frame prescribed by law, typically within 45 calendar days from the date of your request. If additional time is required, we will notify you accordingly.
        </p>
        
        <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
          If we need further information to verify your identity or clarify your request, we will reach out to you directly.
        </p>
        
        <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
          Thank you for contacting us.
        </p>
        
        <div style="border-top: 2px solid #20b2aa; padding-top: 20px;">
          <p style="margin: 0; font-size: 16px; font-weight: bold; color: #20b2aa;">
            Sincerely,<br>
            <strong>Spotter Sentinel Support</strong>
          </p>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background: #f0f0f0; border-radius: 8px; font-size: 14px; color: #666;">
          <p style="margin: 0 0 10px 0;"><strong>Request Details:</strong></p>
          <p style="margin: 0 0 5px 0;"><strong>Request Type:</strong> ${requestLabel}</p>
          <p style="margin: 0 0 5px 0;"><strong>Submitted:</strong> ${new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
          ${message ? `<p style="margin: 0 0 5px 0;"><strong>Additional Message:</strong> ${message}</p>` : ''}
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #888;">
        <p style="margin: 0;">This is an automated confirmation. Please do not reply to this email.</p>
        <p style="margin: 5px 0 0 0;">For questions, contact us at support@spottersentinel.com</p>
      </div>
    </div>
    `;

    const customerTextBody = `Dear ${customerName},

We are writing to acknowledge receipt of your recent request submitted under the California Consumer Privacy Act (CCCPA).

Spotter Sentinel takes data privacy seriously. We have initiated an internal review to address your request in accordance with applicable CCPA requirements. You can expect a response within the time frame prescribed by law, typically within 45 calendar days from the date of your request. If additional time is required, we will notify you accordingly.

If we need further information to verify your identity or clarify your request, we will reach out to you directly.

Thank you for contacting us.

Sincerely,
Spotter Sentinel Support

Request Details:
- Request Type: ${requestLabel}
- Submitted: ${new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}
${message ? `- Additional Message: ${message}` : ''}

This is an automated confirmation. Please do not reply to this email.
For questions, contact us at support@spottersentinel.com`;

    await transporter.sendMail({
      from: `${process.env.ZOHO_SMTP_FROM_NAME || 'Spotter Sentinel'} <${
        process.env.ZOHO_SMTP_USER
      }>`,
      to: email,
      subject: customerSubject,
      text: customerTextBody,
      html: customerHtmlBody,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('CCPA email error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};
