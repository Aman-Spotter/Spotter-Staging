import { gql } from '@apollo/client';

export const CORE_STRIPE_CUSTOMER_FIELDS = gql`
  fragment CORE_STRIPE_CUSTOMER_FIELDS on StripeCustomerType {
    modifiedDt
    createdDt
    metadata
    livemode
    created
    id
    name
    description
    email
    defaultSource
    invoiceSettings
  }
`;

export const CORE_STRIPE_PAYMENT_METHOD_FIELDS = gql`
  fragment CORE_STRIPE_PAYMENT_METHOD_FIELDS on StripePaymentMethodType {
    modifiedDt
    createdDt
    metadata
    livemode
    created
    id
    card
  }
`;

export const CORE_STRIPE_INVOICE_FIELDS = gql`
  fragment CORE_STRIPE_INVOICE_FIELDS on StripeInvoiceType {
    modifiedDt
    createdDt
    metadata
    livemode
    created
    id
    amountDue
    amountPaid
    amountRemaining
    applicationFeeAmount
    attemptCount
    attempted
    autoAdvance
    collectionMethod
    currency
    discount
    hostedInvoiceUrl
    number
    paid
    lines
    paymentIntent
    status
  }
`;

export const CORE_STRIPE_SUBSCRIPTION_FIELDS = gql`
  fragment CORE_STRIPE_SUBSCRIPTION_FIELDS on StripeSubscriptionType {
    modifiedDt
    createdDt
    metadata
    livemode
    created
    id
    billingCycleAnchor
    cancelAt
    cancelAtPeriodEnd
    canceledAt
    collectionMethod
    currentPeriodEnd
    currentPeriodStart
    daysUntilDue
    endedAt
    items
    latestInvoice
    startDate
    status
    trialEnd
    trialStart
    upcomingInvoice
  }
`;

export const CORE_STRIPE_PRICE_FIELDS = gql`
  fragment CORE_STRIPE_PRICE_FIELDS on StripePriceType {
    billingScheme
    created
    createdDt
    currency
    id
    livemode
    metadata
    modifiedDt
    nickname
    recurring
    taxBehavior
    tiers
    tiersMode
    transformQuantity
    type
    unitAmount
    unitAmountDecimal
  }
`;
