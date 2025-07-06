import { gql } from '@apollo/client';
import * as FRAGMENT from 'apollo/fragment';

export const CANCEL_CURRENT_SUBSCRIPTION = gql`
  ${FRAGMENT.CORE_STRIPE_SUBSCRIPTION_FIELDS}
  ${FRAGMENT.CORE_STRIPE_CUSTOMER_FIELDS}
  ${FRAGMENT.CORE_STRIPE_INVOICE_FIELDS}
  mutation CANCEL_CURRENT_SUBSCRIPTION($subscriptionId: String!) {
    cancelStripeSubscription(subscriptionId: $subscriptionId) {
      stripeSubscription {
        ...CORE_STRIPE_SUBSCRIPTION_FIELDS
        customer {
          ...CORE_STRIPE_CUSTOMER_FIELDS
        }
        subscriptionInvoices {
          ...CORE_STRIPE_INVOICE_FIELDS
        }
      }
    }
  }
`;

export const CREATE_STRIPE_SETUP_INTENT = gql`
  mutation CREATE_STRIPE_SETUP_INTENT {
    createStripeSetupintent {
      stripeSetupintent {
        clientSecret
      }
    }
  }
`;

export const DETACH_STRIPE_PAYMENT_METHOD = gql`
  mutation DETACH_STRIPE_PAYMENT_METHOD($paymentmethodId: String!) {
    detachStripePaymentMethod(paymentmethodId: $paymentmethodId) {
      success
    }
  }
`;

export const CHANGE_DEFAULT_PAYMENT_METHOD = gql`
  ${FRAGMENT.CORE_STRIPE_CUSTOMER_FIELDS}
  mutation CHANGE_DEFAULT_PAYMENT_METHOD($paymentmethodId: String!) {
    updateStripeCustomer(paymentmethodId: $paymentmethodId) {
      stripeCustomer {
        ...CORE_STRIPE_CUSTOMER_FIELDS
      }
    }
  }
`;

export const ACTIVATE_SUBSCRIPTION = gql`
  ${FRAGMENT.CORE_STRIPE_SUBSCRIPTION_FIELDS}
  ${FRAGMENT.CORE_STRIPE_CUSTOMER_FIELDS}
  ${FRAGMENT.CORE_STRIPE_INVOICE_FIELDS}
  mutation ACTIVATE_SUBSCRIPTION($memberId: ID, $subscriptionId: String) {
    activateStripeSubscription(memberId: $memberId, subscriptionId: $subscriptionId) {
      stripeSubscription {
        ...CORE_STRIPE_SUBSCRIPTION_FIELDS
        customer {
          ...CORE_STRIPE_CUSTOMER_FIELDS
        }
        subscriptionInvoices {
          ...CORE_STRIPE_INVOICE_FIELDS
        }
      }
    }
  }
`;

export const CREATE_SUBSCRIPTION = gql`
  ${FRAGMENT.CORE_STRIPE_SUBSCRIPTION_FIELDS}
  ${FRAGMENT.CORE_STRIPE_CUSTOMER_FIELDS}
  ${FRAGMENT.CORE_STRIPE_INVOICE_FIELDS}
  mutation CREATE_SUBSCRIPTION(
    $subscriptionChoice: SubscriptionChoiceType!
    $allowIncomplete: Boolean
    $priceId: String
    $freeTrial: Boolean
  ) {
    createStripeSubscription(
      subscriptionChoice: $subscriptionChoice
      allowIncomplete: $allowIncomplete
      priceId: $priceId
      freeTrial: $freeTrial
    ) {
      stripeSubscription {
        ...CORE_STRIPE_SUBSCRIPTION_FIELDS
        customer {
          ...CORE_STRIPE_CUSTOMER_FIELDS
        }
        subscriptionInvoices {
          ...CORE_STRIPE_INVOICE_FIELDS
        }
      }
      clientSecret
    }
  }
`;

export const CONFIRM_STRIPE_PAYMENT_INTENT = gql`
  mutation CONFIRM_STRIPE_PAYMENT_INTENT(
    $subscriptionId: String!
    $paymentIntentId: String!
    $paymentMethodId: String!
  ) {
    confirmStripePaymentIntent(
      subscriptionId: $subscriptionId
      paymentIntentId: $paymentIntentId
      paymentMethodId: $paymentMethodId
    ) {
      success
      subscriptionId
    }
  }
`;

export const UPDATE_STRIPE_SUBSCRIPTION_ITEM = gql`
  mutation UPDATE_STRIPE_SUBSCRIPTION_ITEM($subscriptionId: String!, $quantity: Int!) {
    updateStripeSubscriptionItem(subscriptionId: $subscriptionId, quantity: $quantity) {
      success
      subscriptionId
    }
  }
`;
