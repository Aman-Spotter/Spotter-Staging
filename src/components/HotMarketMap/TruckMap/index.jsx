import React, { useMemo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Tooltip as ReactTooltip } from 'react-tooltip';

import _ from 'lodash';
import chroma from 'chroma-js';
import useTruck from 'contexts/useTruck';
import useTour from 'contexts/useTour';
import { useTruckMapQuery } from 'apollo/hook';
import * as Utils from 'utils/Utils';
import { useIsMobile } from 'hooks';

import LoadingIndicator from 'components/LoadingIndicator';
import { ComposableMap, ZoomableGroup, Geographies, Geography } from 'components/SimpleMap';

import TruckMapHeader from './Header';
import * as S from '../styles';
import useHotMarketAreasTopo from '../useHotMarketAreasTopo';

const INITIAL_TRUCK_BREAKPOINTS = [1, 2, 5, 25, 50];

const guestColorScale = ['#a1d3d2', '#fff6b6', '#ffb227', '#ff7c27', '#e94c0e'];

const TruckMap = ({ guestMode }) => {
  const {
    truckMapMarketAreas,
    allTrucksCount,
    loading: isTruckMapQueryLoading,
  } = useTruckMapQuery();

  const {
    hotMarketMapAreas,
    sourceMarket,
    destinationMarket,
    setSrcMarketAreaId,
    setDstMarketAreaId,
    setTruckMapMarketAreas,
    setTruckMapLoaded,
  } = useTruck();

  const [filterValues, setFilterValues] = useState({
    date: 'now',
    puDays: [],
  });

  const [truckBreakpoints, setTruckBreakpoints] = useState([...INITIAL_TRUCK_BREAKPOINTS]);
  const [truckDestBreakpoints, setTruckDestBreakpoints] = useState([...INITIAL_TRUCK_BREAKPOINTS]);
  const [hoveredMapAddress, setHoveredMapAddress] = useState(null);
  const [hoveredMarketAreaId, setHoveredMarketAreaId] = useState(null);
  const [disableDblClickZoom, setDisableDblClickZoom] = useState(false);
  const [topPickupMarket, setTopPickupMarket] = useState(null);
  const [topDropoffMarket, setTopDropoffMarket] = useState(null);
  const { isMobile } = useIsMobile();
  const { isTourMode, onTourNext, tourItem } = useTour();
  const [patternColor, setPatternColor] = useState('transparent');

  const [mapInfo, setMapInfo] = useState([
    _.cloneDeep(truckMapMarketAreas),
    _.clone(allTrucksCount),
  ]);

  const [truckMapMarketAreasFiltered, allTrucksCountFiltered] = mapInfo;

  useEffect(() => {
    const filterOutput = Utils.filterTrucksByDate(
      truckMapMarketAreas,
      filterValues.puDays,
      filterValues.date
    );
    setMapInfo(filterOutput);
  }, [filterValues, truckMapMarketAreas]);

  useEffect(() => {
    if (isTruckMapQueryLoading) return;
    if (sourceMarket && truckMapMarketAreasFiltered) {
      const marketArea =
        _.find(hotMarketMapAreas, (market) => market.marketAreaId === sourceMarket.marketAreaId) ||
        {};

      const { postedTrucksCount = 0, destinationsMap } =
        _.find(truckMapMarketAreasFiltered, (t) => t.marketAreaId === sourceMarket.marketAreaId) ||
        {};

      if (destinationsMap) {
        setSrcMarketAreaId(marketArea.originZipFive);
      } else {
        setSrcMarketAreaId(null);
      }
    } else {
      setSrcMarketAreaId(null);
    }
  }, [truckMapMarketAreasFiltered, isTruckMapQueryLoading]);

  const mapMarketProperties = useCallback(
    (marketArea) => {
      const { postedTrucksCount = 0, destinationsMap = '{}' } =
        _.find(truckMapMarketAreasFiltered, (t) => t.marketAreaId === marketArea.marketAreaId) ||
        {};

      return {
        postedTrucksCount,
        destinationsMap,
      };
    },
    [truckMapMarketAreasFiltered]
  );

  const hotMarketMapAreasTopo = useHotMarketAreasTopo(hotMarketMapAreas, mapMarketProperties);

  const getTruckBreakPoints = useCallback((arr, callback) => {
    const maxTruckCount = _.max(_.flattenDeep(arr));

    callback(
      INITIAL_TRUCK_BREAKPOINTS.map((breakpoint) => breakpoint * Math.ceil(maxTruckCount / 60))
    );
  }, []);

  useEffect(() => {
    if (
      hotMarketMapAreas.length > 0 &&
      truckMapMarketAreasFiltered &&
      !isTruckMapQueryLoading &&
      !disableDblClickZoom &&
      document.querySelector('svg.rsm-svg g.rsm-geographies')
    ) {
      setDisableDblClickZoom(true);
      document.querySelector('svg.rsm-svg g.rsm-geographies').ondblclick = (e) =>
        e.stopPropagation();
    }
  }, [isTruckMapQueryLoading, disableDblClickZoom, truckMapMarketAreasFiltered, hotMarketMapAreas]);

  // Calculate truck breakpoints based on trucks available per market area
  useEffect(() => {
    if (truckMapMarketAreasFiltered) {
      getTruckBreakPoints(
        truckMapMarketAreasFiltered.map((item) => item.postedTrucksCount),
        (breakpoints) => setTruckBreakpoints(breakpoints)
      );
      setTruckMapMarketAreas(truckMapMarketAreasFiltered);

      let maxPostedTrucks = -1;
      let marketAreaIndex = -1;
      let maxDestTrucks = -1;
      let dropOffMarket = null;

      _.each(truckMapMarketAreasFiltered, ({ postedTrucksCount }, index) => {
        if (maxPostedTrucks < postedTrucksCount) {
          maxPostedTrucks = postedTrucksCount;
          marketAreaIndex = index;
        }
      });
      if (marketAreaIndex !== -1) {
        const marketArea = truckMapMarketAreasFiltered[marketAreaIndex];
        setTopPickupMarket(marketArea.marketAreaId);
        const { destinationsMap } = marketArea;
        if (destinationsMap) {
          _.each(Object.keys(destinationsMap), (key) => {
            if (destinationsMap[key].length > maxDestTrucks) {
              maxDestTrucks = destinationsMap[key].length;
              dropOffMarket = key;
            }
          });
          setTopDropoffMarket(dropOffMarket);
        }
      }
    }
  }, [truckMapMarketAreasFiltered]);

  useEffect(() => {
    if (sourceMarket) {
      getTruckBreakPoints(
        _.map(_.values(sourceMarket.destinationsMap), (map) => map.length),
        (breakpoints) => setTruckDestBreakpoints(breakpoints)
      );
    }
  }, [sourceMarket]);

  useEffect(() => {
    const loading =
      !hotMarketMapAreas.length || !truckMapMarketAreasFiltered || isTruckMapQueryLoading;
    setTruckMapLoaded(!loading);
  }, [hotMarketMapAreas, truckMapMarketAreasFiltered, isTruckMapQueryLoading]);

  const colorScale = useMemo(() => {
    if (hotMarketMapAreas.length > 0 && truckMapMarketAreasFiltered && !isTruckMapQueryLoading) {
      let colors = [];
      let breakpoints = [];
      if (sourceMarket && !truckDestBreakpoints.some(Number.isNaN)) {
        colors = ['#FDCF7D', '#FD950A', '#DF5E18', '#C42416', '#A2001A'];
        breakpoints = truckDestBreakpoints;
      } else {
        colors = guestColorScale;
        breakpoints = truckBreakpoints;
      }
      const c = chroma.scale(colors).domain(breakpoints);
      return c;
    }
    const c = chroma.scale(guestColorScale).domain(truckBreakpoints);
    return c;
  }, [truckMapMarketAreasFiltered, sourceMarket, truckBreakpoints, truckDestBreakpoints]);

  if (!hotMarketMapAreas.length || !truckMapMarketAreasFiltered || isTruckMapQueryLoading)
    return <LoadingIndicator center />;

  return (
    <S.TruckMapWrapper guestMode={guestMode} data-tip="" data-for="mapToolTip">
      <TruckMapHeader
        totalTruckCount={allTrucksCountFiltered}
        areaSelected={sourceMarket !== null}
        breakpoints={sourceMarket ? truckDestBreakpoints : truckBreakpoints}
        onChangeValue={(values) => setFilterValues(values)}
      />
      <>
        <ComposableMap
          projection="geoAlbers"
          style={{
            width: '100%',
            position: 'absolute',
            pointerEvents: 'auto',
            backgroundColor: '#242529',
          }}
          onMouseDown={(e) => e.preventDefault()}
        >
          <ZoomableGroup center={[-97, 37 + (isMobile ? 3 : 0)]}>
            <defs>
              <pattern
                id="dest-market"
                x="5"
                y="5"
                width="5"
                height="5"
                patternUnits="userSpaceOnUse"
              >
                <line x1="0" y1="5" x2="5" y2="0" strokeWidth={1} stroke={patternColor} />
              </pattern>
            </defs>
            <Geographies id="truck_map" geography={hotMarketMapAreasTopo}>
              {({ geographies }) => {
                const geographiesSorted = _.sortBy(geographies, (geo) =>
                  geo.properties.marketAreaId === hoveredMarketAreaId ? 1 : 0
                );

                return [
                  ...geographiesSorted.map(
                    ({
                      properties: {
                        marketAreaId,
                        postedTrucksCount,
                        destinationsMap,
                        marketName,
                        originCity,
                        originState,
                        originZipFive,
                      },
                      ...geography
                    }) => {
                      const isSrcSelected =
                        sourceMarket !== null && sourceMarket.marketAreaId === marketAreaId;
                      const isDstSelected =
                        destinationMarket !== null &&
                        destinationMarket.marketAreaId === marketAreaId;
                      const isSelectedDest =
                        destinationMarket !== null &&
                        destinationMarket.marketAreaId === marketAreaId;
                      const hasTrucksPosted = postedTrucksCount > 0;
                      const trucksNumber = isSrcSelected
                        ? postedTrucksCount
                        : sourceMarket !== null
                        ? sourceMarket.destinationsMap[marketAreaId]?.length ?? 0
                        : postedTrucksCount;

                      const fill =
                        sourceMarket !== null
                          ? isSrcSelected
                            ? '#0099DF'
                            : isSelectedDest
                            ? 'url(#dest-market)'
                            : trucksNumber > 0
                            ? colorScale(trucksNumber ?? 0).hex()
                            : '#1C2227'
                          : hasTrucksPosted
                          ? colorScale(trucksNumber ?? 0).hex()
                          : '#1C2227';

                      let stroke = '#535353';
                      let strokeWidth = 0.75;
                      if (isSelectedDest && sourceMarket) {
                        setPatternColor(
                          colorScale(sourceMarket.destinationsMap[marketAreaId]?.length).hex()
                        );
                        stroke = '#008080';
                        strokeWidth = 1.5;
                      }
                      return (
                        <Geography
                          id={
                            marketAreaId === topPickupMarket
                              ? 'truck_map_top_pickup_market'
                              : marketAreaId === topDropoffMarket
                              ? 'truck_map_top_dropoff_market'
                              : marketAreaId
                          }
                          name={marketName}
                          key={marketAreaId}
                          geography={geography}
                          onClick={(e) => {
                            if (isSrcSelected) {
                              setSrcMarketAreaId(null);
                            } else if (!sourceMarket) {
                              setSrcMarketAreaId(originZipFive);
                              if (
                                isTourMode &&
                                tourItem &&
                                tourItem.selector === '#truck_map_top_pickup_market'
                              ) {
                                setTimeout(() => {
                                  onTourNext();
                                }, 500);
                              }
                            }

                            e.preventDefault();
                            // Set destination market
                            if (!isSrcSelected && sourceMarket) {
                              setDstMarketAreaId(isDstSelected ? null : originZipFive);
                              if (
                                !isDstSelected &&
                                isTourMode &&
                                tourItem &&
                                tourItem.selector === '#truck_map_top_dropoff_market'
                              ) {
                                setTimeout(() => {
                                  onTourNext();
                                }, 1000);
                              }
                            }
                          }}
                          onMouseEnter={() => {
                            setHoveredMapAddress(
                              `${originCity}, ${originState} - ${trucksNumber} ${
                                trucksNumber === 1 ? 'truck' : 'trucks'
                              }`
                            );
                            setHoveredMarketAreaId(marketAreaId);
                          }}
                          onMouseLeave={() => {
                            setHoveredMapAddress(null);
                            setHoveredMarketAreaId(null);
                          }}
                          style={{
                            default: {
                              fill,
                              stroke,
                              strokeWidth,
                              outline: 'none',
                            },
                            hover: {
                              fill,
                              stroke: '#0099DF',
                              strokeWidth: 1.5,
                              outline: 'none',
                            },
                            pressed: {
                              fill: '#FF5722',
                              stroke: '#B1B2B5',
                              strokeWidth: 1,
                              outline: 'none',
                            },
                          }}
                        />
                      );
                    }
                  ),
                ];
              }}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </>
      <ReactTooltip id="mapToolTip" backgroundColor="#00000090" textColor="#008080">
        {hoveredMapAddress}
      </ReactTooltip>
    </S.TruckMapWrapper>
  );
};

TruckMap.defaultProps = {
  guestMode: false,
};
TruckMap.propTypes = {
  guestMode: PropTypes.bool,
};

export default TruckMap;
