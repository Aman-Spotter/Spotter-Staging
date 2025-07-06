import { gql } from '@apollo/client';

export const CORE_MC_FIELDS = gql`
  fragment CORE_MC_FIELDS on MCType {
    id
    entityType
    operatingStatus
    legalName
    dbaName
    physicalAddress
    pStreet
    pCity
    pState
    pZipCode
    phone
    mailingAddress
    mStreet
    mCity
    mState
    mZipCode
    usdotNumber
    mcMxFfNumber
    powerUnits
    mcs150FormDate
    outOfServiceDate
    stateCarrierIdNumber
    dunsNumber
    drivers
    mcs150MileageYear
  }
`;
