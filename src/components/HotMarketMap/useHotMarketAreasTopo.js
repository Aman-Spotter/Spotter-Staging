import { useMemo } from 'react';

import * as _ from 'lodash';

import * as topojson from 'topojson';
import zip3topo from './datasource/zip3topo.json';
import hotMarketAreaZipCodes from './datasource/hotMarketAreasZipCodes.json';

const useHotMarketAreasTopo = (hotMarketMapAreas, mapMarketProperties) => {
  const hotMarketMapAreasTopo = useMemo(
    () => ({
      ...zip3topo,
      objects: {
        markets: {
          geometries: _.map(
            Object.values(
              _.reduce(
                zip3topo.objects.zip3.geometries,
                (prev, curr) => {
                  const marketArea = hotMarketAreaZipCodes[curr.id];
                  if (!marketArea) return prev;
                  return {
                    ...prev,
                    [marketArea]: [...(prev[marketArea] || []), { ...curr, marketArea }],
                  };
                },
                {}
              )
            ),
            (marketPolygons) => {
              const marketArea =
                _.find(
                  hotMarketMapAreas,
                  (market) => market.marketAreaId === marketPolygons[0].marketArea
                ) || {};

              const marketProperties = mapMarketProperties(marketArea);

              return {
                ...topojson.mergeArcs(zip3topo, marketPolygons),
                properties: {
                  ...marketArea,
                  ...marketProperties,
                },
              };
            }
          ),
          type: 'GeometryCollection',
        },
      },
    }),
    [hotMarketMapAreas, mapMarketProperties]
  );

  return hotMarketMapAreasTopo;
};

export default useHotMarketAreasTopo;
