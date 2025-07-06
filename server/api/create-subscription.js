const Stripe = require('stripe');
const nodemailer = require('nodemailer');

// Initialize Stripe with secret key from environment
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Simple in-memory cache to prevent processing the same payment intent multiple times
const processedPaymentIntents = new Set();

const createSubscription = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, name, surname, phoneNumber, planType = 'monthly' } = req.body;

    console.log('Received subscription request:', {
      email: email ? 'provided' : 'missing',
      name: name ? 'provided' : 'missing',
      surname: surname ? 'provided' : 'missing',
      phoneNumber: phoneNumber ? 'provided' : 'missing',
      planType,
    });

    // Improved validation with clearer error messages
    if (!email || email.trim() === '') {
      console.error('Validation failed: Email is missing or empty');
      return res.status(400).json({
        error: 'Email is required',
        details: 'Please provide a valid email address',
      });
    }

    if (!isValidEmail(email)) {
      console.error('Validation failed: Invalid email format:', email);
      return res.status(400).json({
        error: 'Invalid email format',
        details: 'Please provide a valid email address',
      });
    }

    // Check if Stripe secret key is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Configuration error: STRIPE_SECRET_KEY not configured');
      return res.status(500).json({
        error: 'Payment system not configured',
        details: 'Stripe secret key is missing from environment variables',
      });
    }

    // Determine which price ID to use based on plan type
    const priceId =
      planType === 'yearly'
        ? process.env.STRIPE_YEARLY_PRICE_ID
        : process.env.STRIPE_PROF_PLAN_PRICE_ID;

    if (!priceId) {
      console.error(`Configuration error: Price ID not configured for plan: ${planType}`);
      console.error('Available env vars:', {
        STRIPE_PROF_PLAN_PRICE_ID: process.env.STRIPE_PROF_PLAN_PRICE_ID ? 'set' : 'missing',
        STRIPE_YEARLY_PRICE_ID: process.env.STRIPE_YEARLY_PRICE_ID ? 'set' : 'missing',
      });
      return res.status(500).json({
        error: `${planType} plan not configured`,
        details: `Price ID for ${planType} plan is missing from environment variables`,
      });
    }

    console.log(`Creating subscription for ${email} with plan: ${planType}, priceId: ${priceId}`);

    // Create or get customer
    const customer = await stripe.customers.create({
      email,
      name: name && surname ? `${name} ${surname}` : undefined,
      phone: phoneNumber || undefined,
      metadata: {
        plan: 'professional',
        planType,
        firstName: name || '',
        lastName: surname || '',
        phoneNumber: phoneNumber || '',
      },
    });

    console.log('Customer created:', customer.id);

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    console.log('Subscription created:', subscription.id);

    // Add subscription ID to the payment intent's metadata
    await stripe.paymentIntents.update(subscription.latest_invoice.payment_intent.id, {
      metadata: {
        subscription_id: subscription.id,
        planType,
        firstName: name || '',
        lastName: surname || '',
        phoneNumber: phoneNumber || '',
      },
    });

    console.log('Payment intent updated with metadata');

    return res.status(200).json({
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      subscriptionId: subscription.id,
      customerId: customer.id,
    });
  } catch (error) {
    console.error('Subscription Error Details:', {
      message: error.message,
      stack: error.stack,
      type: error.type,
      code: error.code,
    });

    // More specific error handling for Stripe errors
    if (error.type === 'StripeInvalidRequestError') {
      return res.status(400).json({
        error: 'Invalid request to payment processor',
        details: error.message,
      });
    }

    if (error.type === 'StripeAPIError') {
      return res.status(502).json({
        error: 'Payment processor error',
        details: 'Stripe API is temporarily unavailable',
      });
    }

    return res.status(500).json({
      error: error.message || 'Failed to create subscription',
      details: 'An unexpected error occurred while processing your request',
    });
  }
};

// Utility functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function generateSecurePassword() {
  const length = 12;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

async function handleExistingUser(email, customerId, subscriptionId) {
  const response = await fetch(`${process.env.DRF_API_URL}/api/users/update_subscription/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      is_subscribed: true,
      customer_stripe_id: customerId,
      subscription_status: 'active',
      subscription_id: subscriptionId,
      role: 'account_owner',
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to update subscription status: ${JSON.stringify(errorData)}`);
  }

  return await response.json();
}

async function registerNewUser(email, customerId, subscriptionId) {
  const password = generateSecurePassword();
  const response = await fetch(`${process.env.DRF_API_URL}/api/users/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
      password2: password,
      role: 'account_owner',
      is_subscribed: true,
      customer_stripe_id: customerId,
      subscription_status: 'active',
      subscription_id: subscriptionId,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to create user account: ${JSON.stringify(errorData)}`);
  }

  return { password, userData: await response.json() };
}

async function sendSlackNotification(
  email,
  isNewUser,
  subscriptionId,
  customerId,
  name = '',
  surname = '',
  phoneNumber = ''
) {
  if (!process.env.SLACK_SENTINEL_WEBHOOK_URL) {
    console.error('SLACK_SENTINEL_WEBHOOK_URL is not configured');
    return;
  }

  const message = {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🎉 New Premium Subscription!',
          emoji: true,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: isNewUser
            ? '*Exciting news!* A new user has joined Spotter Safety Premium! 🚀'
            : '*Fantastic update!* An existing user has upgraded to Premium! 🌟',
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Name:*\n${name && surname ? `${name} ${surname}` : 'Not provided'}`,
          },
          {
            type: 'mrkdwn',
            text: `*Email:*\n${email}`,
          },
        ],
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Phone:*\n${phoneNumber || 'Not provided'}`,
          },
          {
            type: 'mrkdwn',
            text: `*Account Status:*\n${isNewUser ? 'New User' : 'Existing User'}`,
          },
        ],
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Subscription ID:*\n${subscriptionId || 'Processing...'}`,
          },
          {
            type: 'mrkdwn',
            text: `*Customer ID:*\n${customerId || 'N/A'}`,
          },
        ],
      },
      {
        type: 'divider',
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `Subscription activated at: ${new Date().toLocaleString()}`,
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(process.env.SLACK_SENTINEL_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      console.error('Failed to send Slack notification:', await response.text());
    }
  } catch (error) {
    console.error('Error sending Slack notification:', error);
  }
}

function getNewUserEmailTemplate(email, password, subscriptionId, customerId) {
  return {
    subject: 'Welcome to Spotter Safety Premium!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #008080; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Welcome to Spotter Safety Premium!</h1>
        </div>
        
        <div style="padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #333;">Your Premium Account is Ready</h2>
          
          <p>Thank you for subscribing to Spotter Safety Premium! Your account has been successfully created with full access to all our premium features.</p>
          
          <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #008080; margin-top: 0;">Your Login Credentials</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Password:</strong> ${password}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://safetyapp.spotter.ai/login/" 
               style="background-color: #008080; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Access Your Premium Account
            </a>
          </div>
          
          <div style="border-left: 4px solid #008080; padding-left: 15px; margin: 20px 0;">
            <p style="color: #666; margin: 0;">
              <strong>Important Security Note:</strong><br>
              Please change your password immediately after your first login.
            </p>
          </div>
          
          <p>If you have any questions about your premium subscription, our dedicated support team is here to help.</p>
          
          <p style="color: #666;">Best regards,<br>The Spotter Safety Team</p>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
          <p>This email was sent to confirm your Spotter Safety Premium subscription.</p>
        </div>
      </div>
    `,
    text: `
Welcome to Spotter Safety Premium!

Your Premium Account is Ready

Thank you for subscribing to Spotter Safety Premium! Your account has been successfully created with full access to all our premium features.

Your Login Credentials:
Email: ${email}
Password: ${password}

Access your premium account at: https://safetyapp.spotter.ai/login/

Important Security Note:
Please change your password immediately after your first login.

If you have any questions about your premium subscription, our dedicated support team is here to help.

Best regards,
The Spotter Safety Team
    `,
  };
}

function getExistingUserEmailTemplate(email, subscriptionId, customerId) {
  return {
    subject: 'Premium Subscription Activated!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #008080; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Premium Subscription Activated!</h1>
        </div>
        
        <div style="padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #333;">Welcome Back to Spotter Safety Premium!</h2>
          
          <p>Your account has been successfully upgraded to premium status. You now have full access to all our premium features!</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://safetyapp.spotter.ai/login/" 
               style="background-color: #008080; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Access Your Premium Account
            </a>
          </div>

          <p>If you have any questions about your premium subscription, our dedicated support team is here to help.</p>
          
          <p style="color: #666;">Best regards,<br>The Spotter Safety Team</p>
        </div>
      </div>
    `,
    text: `
Premium Subscription Activated!

Welcome Back to Spotter Safety Premium!

Your account has been successfully upgraded to premium status. You now have full access to all our premium features!

Access your premium account at: https://safetyapp.spotter.ai/login/

If you have any questions about your premium subscription, our dedicated support team is here to help.

Best regards,
The Spotter Safety Team
    `,
  };
}

const registerPaidUser = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, paymentIntent } = req.body;

    // Add logging to track requests
    console.log(`📧 Processing request for email: ${email}, paymentIntent: ${paymentIntent}`);

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Check if we've already processed this payment intent
    if (processedPaymentIntents.has(paymentIntent)) {
      console.log(`⚠️  Duplicate request detected for payment intent: ${paymentIntent}`);
      return res.status(200).json({
        success: true,
        message: 'Request already processed',
        duplicate: true,
      });
    }

    // Mark this payment intent as being processed
    processedPaymentIntents.add(paymentIntent);

    // Step 1: Get payment intent and customer details
    const intent = await stripe.paymentIntents.retrieve(paymentIntent, {
      expand: ['customer', 'payment_method'],
    });

    // Step 2: Get or create customer
    let customerId = intent.customer?.id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email,
        payment_method: intent.payment_method,
      });
      customerId = customer.id;

      await stripe.paymentIntents.update(paymentIntent, {
        customer: customerId,
      });
    }

    // Step 3: Get subscription ID and user info from metadata
    const subscriptionId = intent.metadata?.subscription_id;
    const firstName = intent.metadata?.firstName || '';
    const lastName = intent.metadata?.lastName || '';
    const phoneNumber = intent.metadata?.phoneNumber || '';

    if (!subscriptionId) {
      throw new Error('No subscription ID found in payment intent metadata');
    }

    // Step 4: Check if user exists
    const checkEmailResponse = await fetch(`${process.env.DRF_API_URL}/api/users/check_email/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!checkEmailResponse.ok) {
      throw new Error(`Failed to verify email status: ${checkEmailResponse.status}`);
    }

    const { exists } = await checkEmailResponse.json();

    // Step 5: Handle user registration or update
    let password;
    let userData;

    if (exists) {
      userData = await handleExistingUser(email, customerId, subscriptionId);
    } else {
      const result = await registerNewUser(email, customerId, subscriptionId);
      password = result.password;
      userData = result.userData;
    }

    // Step 6: Send notifications (email and Slack) concurrently
    const notificationPromises = [];

    // Email notification
    const emailPromise = (async () => {
      try {
        console.log(`📤 Sending email to: ${email}`);
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: true,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
          tls: { rejectUnauthorized: false },
        });

        const emailTemplate = exists
          ? getExistingUserEmailTemplate(email, subscriptionId, customerId)
          : getNewUserEmailTemplate(email, password, subscriptionId, customerId);

        await transporter.sendMail({
          from: `"Spotter Safety" <${process.env.SMTP_USER}>`,
          to: email,
          ...emailTemplate,
        });

        console.log('✅ Email sent successfully to:', email);
      } catch (emailError) {
        console.error('❌ Failed to send email:', emailError);
        // Don't throw error, continue execution
      }
    })();
    notificationPromises.push(emailPromise);

    // Slack notification
    const slackPromise = sendSlackNotification(
      email,
      !exists,
      subscriptionId,
      customerId,
      firstName,
      lastName,
      phoneNumber
    );
    notificationPromises.push(slackPromise);

    // Wait for all notifications to complete
    await Promise.allSettled(notificationPromises);

    // Remove from processed set after successful completion (cleanup after 5 minutes)
    setTimeout(() => {
      processedPaymentIntents.delete(paymentIntent);
      console.log(`🧹 Cleaned up payment intent: ${paymentIntent}`);
    }, 5 * 60 * 1000); // 5 minutes

    console.log(`✅ Successfully processed request for: ${email}`);

    return res.status(200).json({
      success: true,
      message: exists ? 'User subscription updated successfully' : 'User registered successfully',
      userData,
    });
  } catch (error) {
    console.error('❌ User Registration Error:', error);
    // Remove from processed set on error so it can be retried
    processedPaymentIntents.delete(paymentIntent);
    return res.status(500).json({
      error: error.message || 'Failed to register user',
      details: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

module.exports = { createSubscription, registerPaidUser };
