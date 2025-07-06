import { gql } from '@apollo/client';

export const CORE_DISPATCHER_FIELDS = gql`
  fragment CORE_DISPATCHER_FIELDS on DispatcherType {
    modifiedDt
    createdDt
    id
    firstName
    isFree
    lastName
    phone
    phoneExt
    email
    maxEmailsPerDay
    maxEmailsPerShare
    sms
    emailNotification
    mobile
    dispatcherType
    noSampleOffersBrokerages
  }
`;

export const CORE_DISPATCHER_EMAIL_FIELDS = gql`
  fragment CORE_DISPATCHER_EMAIL_FIELDS on DispatcherEmailType {
    id
    modifiedDt
    createdDt
    emailAddress
    brokerEmails {
      id
      emailAddress
      brokerage {
        id
        name
      }
    }
    lastContactsSyncDt
  }
`;
