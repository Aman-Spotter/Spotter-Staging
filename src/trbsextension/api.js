export const createSubscription = async ({ token, allowIncomplete = false }) => {
  const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      allowIncomplete,
    }),
  };
  const res = await fetch(
    `${process.env.REACT_APP_EXTENSION_API_URL}create-paid-subscription/`,
    config
  );

  const data = await res.json();
  return data;
};

export const createSetupIntent = async (token) => {
  const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };
  const res = await fetch(`${process.env.REACT_APP_EXTENSION_API_URL}create-setup-intent/`, config);

  const data = await res.json();
  return data;
};

export const confirmStripePaymentIntent = async ({
  token,
  subscriptionId,
  paymentIntentId,
  paymentMethodId,
}) => {
  const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      subscriptionId,
      paymentIntentId,
      paymentMethodId,
    }),
  };
  const res = await fetch(
    `${process.env.REACT_APP_EXTENSION_API_URL}confirm-payment-intent/`,
    config
  );

  const data = await res.json();
  return data;
};

export const changeDefaultPaymentMethod = async ({ token, paymentMethodId }) => {
  const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      paymentMethodId,
    }),
  };
  const res = await fetch(
    `${process.env.REACT_APP_EXTENSION_API_URL}change-default-payment-method/`,
    config
  );

  const data = await res.json();
  return data;
};

export const detachPaymentMethod = async ({ token, paymentMethodId }) => {
  const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      paymentMethodId,
    }),
  };
  const res = await fetch(
    `${process.env.REACT_APP_EXTENSION_API_URL}detach-payment-method/`,
    config
  );

  const data = await res.json();
  return data;
};

export const cancelSubscription = async ({ token, subscriptionId }) => {
  const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      subscriptionId,
    }),
  };
  const res = await fetch(`${process.env.REACT_APP_EXTENSION_API_URL}cancel-subscription/`, config);

  const data = await res.json();
  return data;
};

export const activateSubscription = async ({ token, subscriptionId }) => {
  const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      subscriptionId,
    }),
  };
  const res = await fetch(
    `${process.env.REACT_APP_EXTENSION_API_URL}activate-subscription/`,
    config
  );

  const data = await res.json();
  return data;
};

export const getSubscription = async (token) => {
  const config = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };
  const res = await fetch(
    `${process.env.REACT_APP_EXTENSION_API_URL}get-current-subscription/`,
    config
  );

  const data = await res.json();
  return data;
};
