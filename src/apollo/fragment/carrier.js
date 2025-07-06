import { gql } from '@apollo/client';

export const CORE_CARRIER_FIELDS = gql`
  fragment CORE_CARRIER_FIELDS on CarrierType {
    modifiedDt
    createdDt
    id
    dotNumber
    mcNumber
    name
    displayName
    ownerFirstName
    ownerLastName
    address1
    address2
    city
    state
    zipCode
    phone
    phoneExt
    email
    mcNumber
    eldProvider
    providerToken
    logo
    isOwnerOperator
  }
`;
