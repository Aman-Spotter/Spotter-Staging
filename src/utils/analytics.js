// Sentinel-specific Google Analytics and Google Ads configuration
export const SENTINEL_GA_MEASUREMENT_ID = 'G-LLDJEGJFNL';
export const SENTINEL_GOOGLE_ADS_ID = 'AW-16856050666';

// Check if we're on a Sentinel-related path
export const isSentinelPath = () => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname;
  return path.includes('/sentinel') || path.includes('/payment');
};

// Load Sentinel-specific tracking scripts
export const loadSentinelTracking = () => {
  if (typeof window === 'undefined' || !isSentinelPath()) return;

  // Check if already loaded
  if (window.sentinelTrackingLoaded) return;

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];

  // Define gtag function
  function gtag(...args) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', SENTINEL_GA_MEASUREMENT_ID);
  gtag('config', SENTINEL_GOOGLE_ADS_ID);

  // Load the Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${SENTINEL_GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Mark as loaded
  window.sentinelTrackingLoaded = true;
};

// Google Ads conversion tracking (Sentinel-specific)
export const trackConversion = (conversionAction, conversionValue = null) => {
  if (typeof window !== 'undefined' && window.gtag && isSentinelPath()) {
    const conversionData = {
      send_to: `${SENTINEL_GOOGLE_ADS_ID}/${conversionAction}`,
    };

    if (conversionValue) {
      conversionData.value = conversionValue;
      conversionData.currency = 'USD';
    }

    window.gtag('event', 'conversion', conversionData);
  }
};

// Track specific events for Google Analytics (Sentinel-specific)
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag && isSentinelPath()) {
    window.gtag('event', eventName, parameters);
  }
};

// Track page views (Sentinel-specific)
export const trackPageView = (page) => {
  if (typeof window !== 'undefined' && window.gtag && isSentinelPath()) {
    window.gtag('config', SENTINEL_GA_MEASUREMENT_ID, {
      page_path: page,
    });
  }
};

// Common conversion actions (you can customize these based on your needs)
export const CONVERSION_ACTIONS = {
  SIGN_UP: 'sign_up',
  PURCHASE: 'purchase',
  SUBSCRIPTION: 'subscription',
  QUOTE_REQUEST: 'quote_request',
  CONTACT: 'contact',
};

// Track common business events
export const trackSignUp = (method = null) => {
  trackEvent('sign_up', method ? { method } : {});
};

export const trackPurchase = (value, currency = 'USD') => {
  trackEvent('purchase', {
    currency,
    value,
  });
};

export const trackSubscription = (subscriptionType, value) => {
  trackEvent('subscribe', {
    subscription_type: subscriptionType,
    value,
    currency: 'USD',
  });
  // Also track as conversion for Google Ads
  trackConversion(CONVERSION_ACTIONS.SUBSCRIPTION, value);
};

export const trackQuoteRequest = () => {
  trackEvent('quote_request');
  trackConversion(CONVERSION_ACTIONS.QUOTE_REQUEST);
};
