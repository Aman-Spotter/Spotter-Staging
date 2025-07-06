import { gql } from '@apollo/client';

export const CORE_BROKERAGE_FIELDS = gql`
  fragment CORE_BROKERAGE_FIELDS on BrokerageType {
    id
    mcNumber
    dotNumber
    name
    phone
    email
    displayName
    state
    creditScore
    daysToPay
    modifiedDt
  }
`;

export const CORE_BROKERAGE_EXCEPTION_FIELDS = gql`
  fragment CORE_BROKERAGE_EXCEPTION_FIELDS on BrokerageExceptionType {
    id
    modifiedDt
    createdDt
    brokerageId
    dispatcherId
  }
`;

export const CORE_BROKER_FIELDS = gql`
  fragment CORE_BROKER_FIELDS on BrokerType {
    modifiedDt
    createdDt
    id
    firstName
    lastName
    phone
    phoneExt
    email
  }
`;

export const CORE_BROKERAGE_LANE_EXPOSURE_FIELDS = gql`
  fragment CORE_BROKERAGE_LANE_EXPOSURE_FIELDS on BrokerageLaneExposureType {
    id
    brokerageName
    srcMarketName
    dstMarketName
    laneExposure
  }
`;
