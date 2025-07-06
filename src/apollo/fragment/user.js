import { gql } from '@apollo/client';

import { CORE_BROKER_FIELDS } from './broker';
import { CORE_DISPATCHER_FIELDS } from './dispatcher';

export const CORE_USER_FIELDS = gql`
  ${CORE_BROKER_FIELDS}
  ${CORE_DISPATCHER_FIELDS}
  fragment CORE_USER_FIELDS on UserType {
    id
    username
    firstName
    lastName
    displayName
    email
    isStaff
    isActive
    dateJoined
    hasValidSubscription
    hasMarketDataAccess
    marketDataFree
    maxTrucksQuota
    isCaller

    broker {
      ...CORE_BROKER_FIELDS
    }
    dispatcher {
      ...CORE_DISPATCHER_FIELDS
    }
  }
`;
