import { useMemo } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import _ from 'lodash';
import pako from 'pako';

import * as QUERY from '../query';
import * as MUTATION from '../mutation';

export const useQueryHotMarketMapAreas = () => {
  const apolloClient = useApolloClient();

  return useMemo(
    () => () =>
      apolloClient.query({
        query: QUERY.HOT_MARKET_MAP_AREAS,
        fetchPolicy: 'no-cache',
      }),
    [apolloClient]
  );
};

export const useUpdateNoGoMarkets = () => {
  const apolloClient = useApolloClient();

  return useMemo(
    () =>
      ({ noGoMarketAreas }) =>
        apolloClient.mutate({
          mutation: MUTATION.SET_NO_GO_MARKETS,
          variables: {
            noGoMarketAreas,
          },
          fetchPolicy: 'no-cache',
        }),
    [apolloClient]
  );
};

export const useGetMarketData = (marketAreaId, equipmentType) => {
  const {
    data: { optimizedMarketData } = {},
    loading,
    error,
    refetch,
  } = useQuery(QUERY.MARKET_DATA, {
    fetchPolicy: 'no-cache',
    variables: { marketAreaId, equipmentType },
    skip: !marketAreaId,
    pollInterval: 1000 * 60 * 30,
  });

  return useMemo(() => {
    if (!optimizedMarketData) return { data: optimizedMarketData, loading, error, refetch };

    const compressed = Uint8Array.from(atob(optimizedMarketData), (c) => c.charCodeAt(0));
    const decompressed = JSON.parse(pako.inflate(compressed, { to: 'string' }));
    return { data: decompressed, loading, error, refetch };
  }, [optimizedMarketData, loading, error, refetch]);
};

export const useGetAllMarketsData = (equipmentType) => {
  const {
    data: { allMarketsDphData } = {},
    loading,
    error,
    refetch,
  } = useQuery(QUERY.ALL_MARKETS_DPH, {
    fetchPolicy: 'no-cache',
    variables: { equipmentType },
    pollInterval: 1000 * 60 * 30,
  });

  return useMemo(() => {
    if (!allMarketsDphData) return { data: allMarketsDphData, loading, error, refetch };

    const compressed = Uint8Array.from(atob(allMarketsDphData), (c) => c.charCodeAt(0));
    const decompressed = JSON.parse(pako.inflate(compressed, { to: 'string' }));
    return { data: decompressed, loading, error, refetch };
  }, [allMarketsDphData, loading, error, refetch]);
};
