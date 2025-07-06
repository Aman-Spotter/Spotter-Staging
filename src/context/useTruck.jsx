import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';

import _ from 'lodash';
import { HOT_MARKET_MAP_AREAS } from 'apollo/query';
import * as Utils from 'utils/Utils';

const TruckContext = createContext({});

export const TruckProvider = ({ children }) => {
  const [destinationMarket, setDestinationMarket] = useState(null); // Destination Market Info from Truck Map
  const [sourceMarket, setSourceMarket] = useState(null); // Source Market Info from Truck Map
  const [truckMapMarketAreas, setTruckMapMarketAreas] = useState([]);
  const [noGoMarketAreas, setNoGoMarketAreas] = useState([]);
  const [srcMarketAreaId, setSrcMarketAreaId] = useState(null);
  const [dstMarketAreaId, setDstMarketAreaId] = useState(null);
  const [truckMapLoaded, setTruckMapLoaded] = useState(false);

  const { data: { hotMarketMapAreas = [] } = {}, loading: isHotMarketMapAreasLoading } = useQuery(
    HOT_MARKET_MAP_AREAS,
    {
      fetchPolicy: 'network-only',
    }
  );

  // Hmma = HotMarketMapArea
  const getHmmaFromZipcode = (zipcode) => {
    if (!zipcode) return null;
    const hotMarketMapArea = _.find(hotMarketMapAreas, {
      marketAreaId: Utils.getMarketAreaIDfromZip5(zipcode),
    });
    return hotMarketMapArea;
  };

  // Tma = TruckMapArea
  const getTmaFromZipcode = (zipcode) => {
    const hotMarketArea = getHmmaFromZipcode(zipcode);
    if (!hotMarketArea) return null;
    const truckMarketArea = _.find(truckMapMarketAreas, {
      marketAreaId: hotMarketArea.marketAreaId,
    });
    return truckMarketArea;
  };

  const getHmmaOfTopPostedTrucks = () => {
    const sortedTruckMarketAreas = _.last(_.sortBy(truckMapMarketAreas, 'postedTrucksCount'));
    const hotMarketMapArea = _.find(hotMarketMapAreas, {
      marketAreaId: sortedTruckMarketAreas.marketAreaId,
    });
    return hotMarketMapArea;
  };

  const getHmmaOfRandomPostedTrucks = () => {
    const sortedTruckMarketAreas = _.sortBy(truckMapMarketAreas, 'postedTrucksCount');
    const randomIndex = Utils.getRandomIndex(sortedTruckMarketAreas, 'postedTrucksCount');
    const hotMarketMapArea = _.find(hotMarketMapAreas, {
      marketAreaId: sortedTruckMarketAreas[randomIndex].marketAreaId,
    });
    return hotMarketMapArea;
  };

  const getRandomHmma = () => {
    const randomIndex = Math.round(Math.random() * (hotMarketMapAreas.length - 1));
    const hotMarketMapArea = hotMarketMapAreas[randomIndex];
    return hotMarketMapArea;
  };

  const updateSelectedMarket = (setHandle, hotMarketMapArea, zip5) => {
    if (hotMarketMapArea) {
      const truckMarketArea = _.find(truckMapMarketAreas, {
        marketAreaId: hotMarketMapArea.marketAreaId,
      });
      setHandle({
        originZipFive: zip5 || hotMarketMapArea.originZipFive,
        marketName: hotMarketMapArea.marketName,
        originCity: hotMarketMapArea.originCity,
        originState: hotMarketMapArea.originState,
        marketAreaId: hotMarketMapArea.marketAreaId,
        destinationsMap: truckMarketArea?.destinationsMap || [],
      });
    }
  };

  const getHmmaWithTopDstsTrucksOfTma = (truckMarketArea) => {
    const sortedTruckMarketArea = _.last(
      _.sortBy(
        _.map(truckMarketArea.destinationsMap, (value, marketAreaId) => ({
          marketAreaId,
          length: value.length,
        })),
        'length'
      )
    );
    const hotMarketMapArea = _.find(hotMarketMapAreas, {
      marketAreaId: sortedTruckMarketArea.marketAreaId,
    });
    return hotMarketMapArea;
  };

  const getHmmaWithRandomPostedTrucksOfTma = (truckMarketArea) => {
    const sortedTruckMarketAreas = _.sortBy(
      _.map(truckMarketArea.destinationsMap, (value, marketAreaId) => ({
        marketAreaId,
        length: value.length,
      })),
      'length'
    );
    const randomIndex = Utils.getRandomIndex(sortedTruckMarketAreas, 'length');
    const hotMarketMapArea = _.find(hotMarketMapAreas, {
      marketAreaId: sortedTruckMarketAreas[randomIndex].marketAreaId,
    });
    return hotMarketMapArea;
  };

  useEffect(() => {
    if (srcMarketAreaId === null) {
      setSourceMarket(null);
    } else if (srcMarketAreaId === -1) {
      const hotMarketMapArea = getHmmaOfTopPostedTrucks();
      if (hotMarketMapArea) {
        updateSelectedMarket(setSourceMarket, hotMarketMapArea);
      }
    } else {
      const hotMarketMapArea = getHmmaFromZipcode(srcMarketAreaId);
      if (hotMarketMapArea) {
        updateSelectedMarket(setSourceMarket, hotMarketMapArea, srcMarketAreaId);
      }
    }
  }, [srcMarketAreaId]);

  useEffect(() => {
    if (dstMarketAreaId === null) {
      setDestinationMarket(null);
    } else if (dstMarketAreaId === -1) {
      if (!srcMarketAreaId || srcMarketAreaId === -1) return;
      const puTruckMarketArea = getTmaFromZipcode(srcMarketAreaId);
      if (puTruckMarketArea && puTruckMarketArea.destinationsMap) {
        const doHotMarketArea = getHmmaWithTopDstsTrucksOfTma(puTruckMarketArea);
        if (doHotMarketArea) {
          updateSelectedMarket(setDestinationMarket, doHotMarketArea);
        }
      }
    } else {
      const hotMarketMapArea = getHmmaFromZipcode(dstMarketAreaId);
      if (hotMarketMapArea) {
        updateSelectedMarket(setDestinationMarket, hotMarketMapArea, dstMarketAreaId);
      }
    }
  }, [dstMarketAreaId]);

  const memoedValue = useMemo(
    () => ({
      isHotMarketMapAreasLoading,
      destinationMarket,
      hotMarketMapAreas,
      sourceMarket,
      truckMapMarketAreas,
      noGoMarketAreas,
      srcMarketAreaId,
      dstMarketAreaId,
      truckMapLoaded,
      // Setters
      setDestinationMarket,
      setTruckMapLoaded,
      setSourceMarket,
      setTruckMapMarketAreas,
      setNoGoMarketAreas,
      setSrcMarketAreaId,
      setDstMarketAreaId,
      getHmmaFromZipcode,
      getTmaFromZipcode,
      getHmmaOfTopPostedTrucks,
      getHmmaOfRandomPostedTrucks,
      getRandomHmma,
      getHmmaWithTopDstsTrucksOfTma,
      getHmmaWithRandomPostedTrucksOfTma,
    }),
    [
      isHotMarketMapAreasLoading,
      srcMarketAreaId,
      dstMarketAreaId,
      sourceMarket,
      destinationMarket,
      hotMarketMapAreas,
      truckMapMarketAreas,
      noGoMarketAreas,
      truckMapLoaded,
      getHmmaFromZipcode,
      getTmaFromZipcode,
      getHmmaOfTopPostedTrucks,
      getHmmaOfRandomPostedTrucks,
      getHmmaWithTopDstsTrucksOfTma,
      getHmmaWithRandomPostedTrucksOfTma,
      getRandomHmma,
    ]
  );

  return <TruckContext.Provider value={memoedValue}>{children}</TruckContext.Provider>;
};

TruckProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function useTruck() {
  return useContext(TruckContext);
}
