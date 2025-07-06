const requestQuote = async (req, res) => {
  try {
    const formData = req.body;

    // Validate required fields for product-specific flows (Sentinel and TMS)
    if (formData.isSentinelFlow || formData.isTMSFlow) {
      if (!formData.name || !formData.email || !formData.company || !formData.phone) {
        const productName = formData.isSentinelFlow ? 'Sentinel' : 'TMS';
        return res.status(400).json({
          type: 'error',
          message: `Name, email, company, and phone are required for ${productName} quotes.`,
        });
      }
    } else if (!formData.email || !formData.selectedApps || formData.selectedApps.length === 0) {
      return res.status(400).json({
        type: 'error',
        message: 'Email and at least one selected app are required.',
      });
    }

    // Determine which webhook to use based on selection
    const isSentinelOnlyRequest =
      formData.isSentinelFlow &&
      formData.selectedApps &&
      formData.selectedApps.length === 1 &&
      formData.selectedApps[0] === 'sentinel';

    const webhookUrl = isSentinelOnlyRequest
      ? process.env.SLACK_SENTINEL_WEBHOOK_URL
      : process.env.SLACK_MAIN_WEHOOK_URL;

    const webhookName = isSentinelOnlyRequest
      ? 'SLACK_SENTINEL_WEBHOOK_URL'
      : 'SLACK_MAIN_WEHOOK_URL';

    if (!webhookUrl) {
      console.error(`${webhookName} is not configured`);
      throw new Error('Slack webhook is not configured');
    }

    // Format the message for Slack based on flow type
    let slackMessage;

    if (formData.isSentinelFlow) {
      // Sentinel-specific Slack message
      slackMessage = {
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: '🎯 Sentinel Quote Request',
              emoji: true,
            },
          },
          {
            type: 'section',
            accessory: {
              type: 'image',
              image_url: 'https://img.icons8.com/3d-fluency/512/shield.png',
              alt_text: 'Sentinel Request Icon',
            },
            text: {
              type: 'mrkdwn',
              text: "*Someone's interested in Spotter Sentinel! 🚀*\n\n_Hot lead from the demo completion!_",
            },
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `*👤 Name*\n${formData.name}`,
              },
              {
                type: 'mrkdwn',
                text: `*🏢 Company*\n${formData.company}`,
              },
            ],
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `*📧 Email*\n${formData.email}`,
              },
              {
                type: 'mrkdwn',
                text: `*📱 Phone*\n${formData.phone}`,
              },
            ],
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*🛡️ Interested Products*\n${formData.selectedAppNames || 'Spotter Sentinel'}`,
            },
          },
        ],
      };
    } else if (formData.isTMSFlow) {
      // TMS-specific Slack message
      slackMessage = {
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: '🚛 TMS Quote Request',
              emoji: true,
            },
          },
          {
            type: 'section',
            accessory: {
              type: 'image',
              image_url: 'https://img.icons8.com/3d-fluency/512/truck.png',
              alt_text: 'TMS Request Icon',
            },
            text: {
              type: 'mrkdwn',
              text: "*Someone's interested in Spotter TMS! 🚀*\n\n_Hot lead from the TMS page!_",
            },
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `*👤 Name*\n${formData.name}`,
              },
              {
                type: 'mrkdwn',
                text: `*🏢 Company*\n${formData.company}`,
              },
            ],
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `*📧 Email*\n${formData.email}`,
              },
              {
                type: 'mrkdwn',
                text: `*📱 Phone*\n${formData.phone}`,
              },
            ],
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*🚛 Interested Products*\n${formData.selectedAppNames || 'Spotter TMS'}`,
            },
          },
        ],
      };
    } else {
      // General quote request Slack message
      slackMessage = {
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: '💼 General Quote Request',
              emoji: true,
            },
          },
          {
            type: 'section',
            accessory: {
              type: 'image',
              image_url: 'https://img.icons8.com/3d-fluency/512/business-report.png',
              alt_text: 'Quote Request Icon',
            },
            text: {
              type: 'mrkdwn',
              text: '*New quote request received! 💼*\n\n_General inquiry from website_',
            },
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `*📧 Email*\n${formData.email}`,
              },
              {
                type: 'mrkdwn',
                text: `*🛠️ Products*\n${formData.selectedAppNames || 'Not specified'}`,
              },
            ],
          },
        ],
      };

      // Add name and company if provided
      if (formData.name || formData.company) {
        slackMessage.blocks.splice(2, 0, {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*👤 Name*\n${formData.name || 'Not provided'}`,
            },
            {
              type: 'mrkdwn',
              text: `*🏢 Company*\n${formData.company || 'Not provided'}`,
            },
          ],
        });
      }

      // Add phone if provided
      if (formData.phone) {
        slackMessage.blocks.push({
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*📱 Phone*\n${formData.phone}`,
          },
        });
      }
    }

    // Add message if provided
    if (formData.message) {
      slackMessage.blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*💭 Additional Notes*\n>${formData.message.split('\n').join('\n>')}`,
        },
      });
    }

    // Add footer with source information
    const getSourceText = () => {
      if (formData.isSentinelFlow) return 'Sentinel Demo';
      if (formData.isTMSFlow) return 'TMS Page';
      return 'General Website';
    };

    slackMessage.blocks.push(
      {
        type: 'divider',
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `🕒 Received: ${new Date().toLocaleString()} | 🎯 Source: ${getSourceText()} | 📡 Webhook: ${webhookName}`,
          },
        ],
      }
    );

    try {
      const slackResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(slackMessage),
      });

      if (!slackResponse.ok) {
        console.error('Slack API error:', await slackResponse.text());
        throw new Error('Failed to send to Slack');
      }
    } catch (slackError) {
      console.error('Slack request failed:', slackError);
      throw new Error('Failed to send notification');
    }

    // Return success message based on flow type
    const getSuccessMessage = () => {
      if (formData.isSentinelFlow) {
        return 'Sentinel quote request successfully submitted. Our team will contact you within 24 hours to discuss your specific security and monitoring needs.';
      }
      if (formData.isTMSFlow) {
        return 'TMS quote request successfully submitted. Our team will contact you within 24 hours to discuss your specific fleet management needs.';
      }
      return 'Quote request successfully submitted. We will review your request and get back to you within 24 hours with a customized quote.';
    };

    return res.json({
      type: 'success',
      message: getSuccessMessage(),
    });
  } catch (error) {
    console.error('Quote request error:', error);
    return res.status(500).json({
      type: 'error',
      message:
        'There was an error submitting your request. Please try again or contact us directly.',
    });
  }
};

module.exports = { requestQuote };
