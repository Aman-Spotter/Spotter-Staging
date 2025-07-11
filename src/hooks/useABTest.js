import { useState, useEffect } from 'react';

// Helper function to set a cookie
const setCookie = (name, value, days) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

// Helper function to get a cookie
const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length);
    }
  }
  return null;
};

/**
 * A custom React hook to run A/B tests.
 * This is reusable for any test we want to run in the future.
 * @param {string} testName - A unique name for the A/B test (e.g., 'sentinel_hero_cta').
 * @param {Array<object>} variations - An array of variation objects. The first is the control. Each must have a 'name' property.
 * @returns {object} The chosen variation for the current user.
 */
export const useABTest = (testName, variations) => {
  // Default to the first variation (the 'control')
  const [variation, setVariation] = useState(variations[0]);

  useEffect(() => {
    const cookieName = `ab_test_${testName}`;
    let assignedVariationName = getCookie(cookieName);

    if (assignedVariationName) {
      const existingVariation = variations.find((v) => v.name === assignedVariationName);
      if (existingVariation) {
        setVariation(existingVariation);
      }
    } else {
      const randomIndex = Math.floor(Math.random() * variations.length);
      const newVariation = variations[randomIndex];
      setVariation(newVariation);
      setCookie(cookieName, newVariation.name, 30);
      assignedVariationName = newVariation.name;
    }

    if (window.gtag) {
      window.gtag('event', 'experiment_view', {
        experiment_name: testName,
        experiment_variant: assignedVariationName,
      });
    }
    // `variations` is intentionally **not** included in the dependency array because callers often pass
    // an inline array literal (e.g. `[ { name: 'A', text: 'Buy' }, { name: 'B', text: 'Try' } ]`)
    // which would have a new reference on every render. Including it would cause this effect to run
    // on **every** component update, leading to a state update loop and the "Maximum update depth exceeded" warning.
    // The variations themselves are assumed to be static for the lifetime of the component instance, so
    // it is safe to omit them here.
  }, [testName]);

  return variation;
};
