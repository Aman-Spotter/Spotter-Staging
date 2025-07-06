import { gql } from '@apollo/client';

export const ALL_MARKETS_HOTNESS = gql`
  query ALL_MARKET_HOTNESS($equipmentType: TrailerType!) {
    allMarketsHotness(equipmentType: $equipmentType) {
      id
      marketName
      hotness
    }
  }
`;

export const MARKET_RANKINGS = gql`
  query MARKET_RANKINGS($equipmentType: TrailerType!) {
    marketRankings(equipmentType: $equipmentType) {
      id
      marketName
      indexValue
      rank
      prevRank
      change
    }
  }
`;

export const ALL_MARKET_DATA = gql`
  query ALL_MARKET_DATA($marketAreaId: String!, $equipmentType: TrailerType!) {
    marketHistory(marketAreaId: $marketAreaId, equipmentType: $equipmentType) {
      id
      marketName
      createdDt
      indexValue
    }
    marketData(marketAreaId: $marketAreaId, equipmentType: $equipmentType) {
      id
      oneRate
      twoRate
      threeRate
      dstMarkets {
        id
        volume
        tollsCost
        fuelPrice
        dstMarketAreaId
        brokerRate
        miles
      }
    }
  }
`;

export const MARKET_DATA = gql`
  query MARKET_DATA($marketAreaId: String!, $equipmentType: TrailerType!) {
    optimizedMarketData(marketAreaId: $marketAreaId, equipmentType: $equipmentType)
  }
`;

export const ALL_MARKETS_DPH = gql`
  query ALL_MARKETS_DPH($equipmentType: TrailerType!) {
    allMarketsDphData(equipmentType: $equipmentType)
  }
`;
