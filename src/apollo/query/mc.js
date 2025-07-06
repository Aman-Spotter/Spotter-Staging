import { gql } from '@apollo/client';
import { CORE_MC_FIELDS } from 'apollo/fragment';

export const VERIFY_EMAIL_ALREADY_USED = gql`
  query ($email: String!) {
    verifyEmailAlreadyUsed(email: $email)
  }
`;

export const MCS = gql`
  ${CORE_MC_FIELDS}
  query MCS($fourDigitMcNumber: String!, $userType: UserRegisterType) {
    allMcs(fourDigitMcNumber: $fourDigitMcNumber, userType: $userType) {
      ...CORE_MC_FIELDS
    }
  }
`;
