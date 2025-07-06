import { gql } from '@apollo/client';

export const CORE_TRUCK_MAP_MARKET_AREA_FIELDS = gql`
  fragment CORE_TRUCK_MAP_MARKET_AREA_FIELDS on TruckMapMarketAreaType {
    id
    marketAreaId
    postedTrucksCount
    postedTrucksReadyBy
    destinationsMap
  }
`;

export const CORE_HOT_MARKET_MAP_AREA_FIELDS = gql`
  fragment CORE_HOT_MARKET_MAP_AREA_FIELDS on HotMarketMapAreaType {
    modifiedDt
    createdDt
    marketAreaId
    marketName
    originCity
    originState
    originZipFive
    region
    centerZipFive
    centerLatitude
    centerLongitude
    radiusMiles
  }
`;
