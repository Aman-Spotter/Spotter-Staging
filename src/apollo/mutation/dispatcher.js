import { gql } from '@apollo/client';
import * as FRAGMENT from 'apollo/fragment';

export const SYNC_DISPATCHER_EMAIL_CONTACTS = gql`
  mutation SYNC_DISPATCHER_EMAIL_CONTACTS($emailAddress: String!, $contacts: String!) {
    syncDispatcherEmailContacts(emailAddress: $emailAddress, contacts: $contacts) {
      updatedDispatcherEmail {
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
    }
  }
`;

export const SAVE_TRUCK_SHARE_EMAILS_SENT = gql`
  mutation SAVE_TRUCK_SHARE_EMAILS_SENT(
    $recipients: String!
    $dispatcherId: ID!
    $dispatcherEmailId: ID!
    $truckPostId: ID!
  ) {
    saveTruckShareEmailsSent(
      recipients: $recipients
      dispatcherId: $dispatcherId
      dispatcherEmailId: $dispatcherEmailId
      truckPostId: $truckPostId
    ) {
      success
    }
  }
`;

export const UPDATE_DISPATCHER_GMAIL_SETTINGS = gql`
  ${FRAGMENT.CORE_DISPATCHER_FIELDS}
  ${FRAGMENT.CORE_CARRIER_FIELDS}
  mutation UPDATE_DISPATCHER_GMAIL_SETTINGS($input: DispatcherGmailSettingsInput!) {
    updateDispatcherGmailSettings(input: $input) {
      updatedDispatcher {
        ...CORE_DISPATCHER_FIELDS
        carrier {
          ...CORE_CARRIER_FIELDS
        }
      }
    }
  }
`;

export const UPDATE_DISPATCHER_PROFILE = gql`
  ${FRAGMENT.CORE_DISPATCHER_FIELDS}
  ${FRAGMENT.CORE_CARRIER_FIELDS}
  mutation UPDATE_DISPATCHER_PROFILE($input: DispatcherProfileInput!) {
    updateDispatcherProfile(input: $input) {
      updatedDispatcher {
        ...CORE_DISPATCHER_FIELDS
        carrier {
          ...CORE_CARRIER_FIELDS
        }
      }
    }
  }
`;

export const UPDATE_INTEGRATION_SETTINGS = gql`
  ${FRAGMENT.CORE_DISPATCHER_FIELDS}
  ${FRAGMENT.CORE_CARRIER_FIELDS}
  mutation UPDATE_INTEGRATION_SETTINGS($input: IntegrationSettingsInput!) {
    updateIntegrationSettings(input: $input) {
      updatedDispatcher {
        ...CORE_DISPATCHER_FIELDS
        carrier {
          ...CORE_CARRIER_FIELDS
        }
      }
    }
  }
`;

export const SET_NO_GO_MARKETS = gql`
  mutation SET_NO_GO_MARKETS($noGoMarketAreas: [String]!) {
    setNoGoMarkets(noGoMarketAreas: $noGoMarketAreas) {
      updatedDispatcher {
        id
        noGoMarketAreas
      }
    }
  }
`;

export const SET_NO_SHOW_SAMPLE_OFFERS_MUTATION = gql`
  mutation SET_NO_SHOW_SAMPLE_OFFERS_MUTATION(
    $loadBoard: String!
    $dontShowSampleOffers: Boolean!
  ) {
    setNoShowSampleOffers(loadBoard: $loadBoard, dontShowSampleOffers: $dontShowSampleOffers) {
      updatedDispatcher {
        id
        noSampleOffersBrokerages
      }
    }
  }
`;

export const UPDATE_DISPATCHER_EXCEPTIONS = gql`
  ${FRAGMENT.CORE_BROKERAGE_EXCEPTION_FIELDS}
  mutation UPDATE_DISPATCHER_EXCEPTIONS($brokerageIds: [ID]!, $dispatcherId: ID!) {
    resetBrokerageException(brokerageIds: $brokerageIds, dispatcherId: $dispatcherId) {
      brokerageException {
        ...CORE_BROKERAGE_EXCEPTION_FIELDS
      }
    }
  }
`;

export const UPDATE_TWO_FACTOR_CODE = gql`
  mutation UPDATE_TWO_FACTOR_CODE($code: String!) {
    updateTwoFactorCode(code: $code) {
      success
    }
  }
`;
