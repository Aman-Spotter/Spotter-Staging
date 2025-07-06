import { gql } from '@apollo/client';
import * as FRAGMENT from 'apollo/fragment';

export const ME = gql`
  ${FRAGMENT.CORE_USER_FIELDS}
  query ME {
    me {
      ...CORE_USER_FIELDS
    }
  }
`;

export const REMAINING_RESOURCE_ACCESS = gql`
  query ($resource: String!) {
    remainingResourceAccess(resource: $resource)
  }
`;
