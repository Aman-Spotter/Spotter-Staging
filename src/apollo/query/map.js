import { gql } from '@apollo/client';

import {
  CORE_TRUCK_MAP_MARKET_AREA_FIELDS,
  CORE_HOT_MARKET_MAP_AREA_FIELDS,
} from 'apollo/fragment';

export const TRUCK_MAP = gql`
  ${CORE_TRUCK_MAP_MARKET_AREA_FIELDS}
  query {
    truckMap {
      allTrucksCount
      truckMapMarketAreas {
        ...CORE_TRUCK_MAP_MARKET_AREA_FIELDS
      }
    }
  }
`;

export const HOT_MARKET_MAP_AREAS = gql`
  ${CORE_HOT_MARKET_MAP_AREA_FIELDS}
  query HOT_MARKET_MAP_AREAS {
    hotMarketMapAreas {
      ...CORE_HOT_MARKET_MAP_AREA_FIELDS
    }
  }
`;
