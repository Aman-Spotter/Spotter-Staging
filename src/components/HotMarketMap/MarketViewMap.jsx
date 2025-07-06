import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { useDebouncedCallback } from 'use-debounce/lib';
import { useQuery } from '@apollo/client';
import { geoCentroid } from 'd3-geo';
import { useTransition, animated } from 'react-spring';
import Toggle from 'react-toggle';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import Cookies from 'js-cookie';

import _ from 'lodash';
import { dispatcherType, truckPostType } from 'types';
import useSimulator from 'contexts/useSimulator';
import useSelectedMarketsOnFastTruckPost from 'contexts/useSelectedMarketsOnFastTruckPost';
import { HOT_MARKET_MAP_AREAS } from 'apollo/query';
import { ComposableMap, ZoomableGroup, Geographies, Geography, Marker } from 'components/SimpleMap';
import LoadingIndicator from 'components/LoadingIndicator';
// import { Simulator } from 'components';
import { TRUCK_POST_STATUS, STATUS_COLORS } from 'utils/Constants';

import hotMarketAreaZipCodes from './datasource/hotMarketAreasZipCodes.json';
import useHotMarketAreasTopo from './useHotMarketAreasTopo';

import * as S from './styles';

const MultiSelectTip = ({ onDontShowAgain }) => (
  <S.Tip>
    <span>tip:</span>
    <p>hold down the left mouse key to enable multi-market select mode.</p>
    <button type="button" onClick={onDontShowAgain}>
      don&apos;t show again
    </button>
  </S.Tip>
);

MultiSelectTip.propTypes = {
  onDontShowAgain: PropTypes.func.isRequired,
};

const MarketViewMap = ({
  onToggle,
  onMultipleMarketsToggle,
  marketPrices,
  disabled,
  selectedTruck,
  rpmIntervals,
  hoveredMarket,
  onResetClick,
  resetVisible,
  maxHeight,
  noGoMarketAreas,
  post,
}) => {
  const { data: { hotMarketMapAreas = [] } = {} } = useQuery(HOT_MARKET_MAP_AREAS);
  const [hoveredMarketAreaId, setHoveredMarketAreaId] = useState(null);
  const [hoveredMapAddress, setHoveredMapAddress] = useState(null);
  const [hoveredRpm, setHoveredRpm] = useState(null);
  const [hoveredLegendInterval, setHoveredLegendInterval] = useState(null);
  const [isMap, setIsMap] = useState(false);
  const [isRpmActive, setIsRpmActive] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { isSimMode, routeAnalysis, simData } = useSimulator();
  const hasSimulator = isSimMode && routeAnalysis && routeAnalysis.dstList;
  const noGoSimSelMarkets = isSimMode ? _.get(simData, 'noGoListIds', []) : [];
  const [countSeqC, setCountSeqC] = useState(0);
  const [tipMsg, setTipMsg] = useState(null);
  const { selectedMarketsFastView = [] } = useSelectedMarketsOnFastTruckPost();

  const currMarketArea = _.get(
    hotMarketAreaZipCodes,
    String(_.get(selectedTruck, 'currentZip5')).slice(0, 3)
  );

  const [downMarketAreaId, setDownMarketAreaId] = useState(null);
  const [disableZoomPan, setDisableZoomPan] = useState(false);
  const [downTimer, setDownTimer] = useState(null);
  const [detectLongPress, setDetectLongPress] = useState(false);

  const downMarketAreaIdRef = useRef();
  const disableZoomPanRef = useRef();
  const tempSelMarketsRef = useRef([]);
  const countSeqClick = useRef(0);

  downMarketAreaIdRef.current = downMarketAreaId;
  disableZoomPanRef.current = disableZoomPan;

  const addMarket = (market, isSelected) => {
    const tempMkt = tempSelMarketsRef.current.filter((mkt) => mkt.market === market)[0];
    if (!tempMkt)
      tempSelMarketsRef.current.push({
        market,
        value: isSelected ? 0 : 1,
      });
    else tempMkt.value += 1;
  };

  useMemo(() => {
    if (hoveredMarket && hoveredMarket.address) {
      setHoveredMapAddress(hoveredMarket.address);
    } else {
      setHoveredMapAddress(null);
    }
  }, [hoveredMarket]);

  useEffect(() => {
    if (countSeqC > 2) {
      if (!tipMsg && Cookies.get('multi-select-market-tip') === undefined) {
        setTipMsg(
          <MultiSelectTip
            onDontShowAgain={() => {
              setTipMsg(null);
              Cookies.set('multi-select-market-tip', false);
            }}
          />
        );
        setTimeout(() => {
          setTipMsg(null);
        }, 5000);
      }
      countSeqClick.current = 0;
      setCountSeqC(0);
    }
  }, [countSeqC]);

  useEffect(() => {
    if (!mapLoaded) setMapLoaded(true);
  }, [hotMarketMapAreas]);

  useEffect(() => {
    if (mapLoaded && document.querySelector('svg.rsm-svg g.rsm-geographies')) {
      document.querySelector('svg.rsm-svg g.rsm-geographies').ondblclick = (e) =>
        e.stopPropagation();
    }
  }, [mapLoaded]);

  useEffect(() => {
    if (downMarketAreaId) {
      if (!disableZoomPan) {
        const timer = setTimeout(() => {
          if (downMarketAreaId) {
            setDetectLongPress(true);
          }
        }, 500);
        setDownTimer(timer);
      }
    } else {
      if (downTimer) {
        clearTimeout(downTimer);
      }
      if (tempSelMarketsRef.current.length > 0 && disableZoomPan) {
        onMultipleMarketsToggle(
          tempSelMarketsRef.current.map((mkt) => ({ ...mkt, isSelected: mkt.value % 2 === 1 }))
        );
        tempSelMarketsRef.current = [];
      }
      setDownTimer(null);
      setDisableZoomPan(false);
    }
  }, [downMarketAreaId]);

  useEffect(() => {
    if (detectLongPress) {
      if (downMarketAreaIdRef.current) {
        onToggle(downMarketAreaIdRef.current.marketAreaId);
        addMarket(downMarketAreaIdRef.current.market, downMarketAreaIdRef.current.isSelected);
        setDisableZoomPan(true);
        setDetectLongPress(false);
      }
    }
  }, [detectLongPress]);

  const mapMarketProperties = useCallback(
    (marketArea) => {
      const marketPrice = _.find(
        marketPrices,
        (price) => price.original.dstMarketAreaId === marketArea.marketAreaId
      );
      const rpm = _.get(marketPrice, 'data.rpm');
      const colorByRpm =
        _.get(
          _.find(rpmIntervals, ({ value: [min, max] }) => rpm >= min && rpm <= max),
          'color'
        ) || rpmIntervals[rpmIntervals.length - 1].color;

      const isCurrentLocation = !disabled && marketArea.marketAreaId === currMarketArea;
      return {
        isCurrentLocation,
        isSelected:
          !disabled &&
          (_.get(marketPrice, 'data.selected', false) ||
            (selectedMarketsFastView.length > 0 &&
              selectedMarketsFastView.indexOf(marketArea.marketAreaId) > -1)),
        isHover:
          hoveredMarket && hoveredMarket.market && marketArea.marketName === hoveredMarket.market,
        hoveredMarketName: `${marketArea.originCity}, ${marketArea.originState}`,
        marketName: _.get(marketPrice, 'original.market', false),
        market: marketArea.marketName,
        colorByRpm,
        noGo: !marketPrice && !!selectedTruck && !isCurrentLocation,
        rpm,
      };
    },
    [
      hoveredMarket,
      marketPrices,
      rpmIntervals,
      selectedTruck,
      currMarketArea,
      disabled,
      selectedMarketsFastView,
    ]
  );

  const hotMarketMapAreasTopo = useHotMarketAreasTopo(hotMarketMapAreas, mapMarketProperties);

  const onClickMarket = useDebouncedCallback(async () => {
    if (tempSelMarketsRef.current.length > 0) {
      onMultipleMarketsToggle(
        tempSelMarketsRef.current.map((mkt) => ({ ...mkt, isSelected: mkt.value % 2 === 1 }))
      );
      tempSelMarketsRef.current = [];
    }
  }, 500);

  const selectedRpmIntervals = useMemo(
    () =>
      isRpmActive
        ? _.filter(
            _.map(rpmIntervals, (item, index) => ({ ...item, index })),
            (item) =>
              _.findIndex(
                marketPrices,
                (mPrice) => mPrice.data.selected && item.testPriceIncluded(mPrice.data.rpm)
              ) !== -1
          ).reverse()
        : [],
    [rpmIntervals, marketPrices, isRpmActive]
  );

  const legendTransitions = useTransition(selectedRpmIntervals, {
    keys: ({ value }) => value.join('-'),
    from: { opacity: 0, maxHeight: 0 },
    enter: [{ maxHeight: 25 }, { opacity: 1 }],
    leave: [{ opacity: 0 }, { maxHeight: 0 }],
    config: { tension: 300, friction: 30 },
  });

  if (hotMarketMapAreas.length === 0) return <LoadingIndicator />;

  return (
    <S.Wrapper style={{ height: maxHeight, cursor: disableZoomPan ? 'pointer' : 'default' }}>
      <>
        <ComposableMap
          projection="geoAlbers"
          // projectionConfig={{ scale: 1200 }}
          width={window.innerWidth}
          height={window.innerHeight}
          data-tip=""
          data-for="mapToolTip"
          onMouseDown={(e) => {
            // prevents the map to get focused, so the tooltip displays properly
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <defs>
            <pattern
              id="no-go-pattern"
              x="10"
              y="10"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="10" x2="10" y2="0" stroke="#ff00003a" />
            </pattern>
            <pattern
              id="no-go-pattern-sim-sel"
              x="10"
              y="10"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="10" x2="10" y2="0" stroke="#008080" />
            </pattern>
          </defs>
          <ZoomableGroup
            center={[-97, 39]}
            disableZoomPan={disableZoomPan}
            onMouseDown={(marketAreaId) => {
              if (selectedTruck) {
                const market = hotMarketMapAreasTopo.objects.markets.geometries.filter(
                  (hmm) => hmm.properties.marketAreaId === marketAreaId
                )[0];
                if (market) {
                  setDownMarketAreaId({
                    marketAreaId,
                    market: market.properties.market,
                    isSelected: market.properties.isSelected,
                  });
                  setDisableZoomPan(false);
                }
              }
            }}
            onMove={() => {
              if (selectedTruck) {
                if (downMarketAreaIdRef.current && !disableZoomPanRef.current && !disabled) {
                  setDownMarketAreaId(null);
                }
              }
            }}
            onMoveEnd={() => {
              setDownMarketAreaId(null);
            }}
          >
            <Geographies geography={hotMarketMapAreasTopo}>
              {({ geographies }) => {
                let currentLocationArea;
                const geographiesSorted = _.sortBy(geographies, (geo) =>
                  geo.properties.marketAreaId === hoveredMarketAreaId ? 1 : 0
                );
                return [
                  ...geographiesSorted.map(
                    ({
                      properties: {
                        marketAreaId,
                        market,
                        isSelected,
                        isCurrentLocation,
                        isHover,
                        hoveredMarketName,
                        colorByRpm,
                        rpm,
                        noGo,
                      },
                      ...geography
                    }) => {
                      const tempSelMkt = tempSelMarketsRef.current.filter(
                        (mkt) => mkt.market === market
                      )[0];
                      const noGoSimSel = noGoSimSelMarkets.indexOf(marketAreaId) > -1;
                      const shouldColorSelection =
                        !isCurrentLocation &&
                        !noGo &&
                        !noGoSimSel &&
                        ((isSelected && !tempSelMkt) ||
                          (tempSelMkt && tempSelMkt.value % 2 === 1)) &&
                        (!hoveredLegendInterval ||
                          (hoveredLegendInterval && hoveredLegendInterval.testPriceIncluded(rpm)));

                      const fill = isCurrentLocation
                        ? '#0099DF'
                        : shouldColorSelection
                        ? isRpmActive
                          ? colorByRpm
                          : '#29A328'
                        : noGoSimSel
                        ? 'url(#no-go-pattern-sim-sel)'
                        : noGo
                        ? 'url(#no-go-pattern)'
                        : '#1C2227';

                      const isTargetDestForSim =
                        hasSimulator && routeAnalysis.dstList.indexOf(marketAreaId) > -1;

                      if (isCurrentLocation) currentLocationArea = geography;
                      return (
                        <>
                          <Geography
                            key={marketAreaId}
                            marketAreaId={marketAreaId}
                            geography={geography}
                            onClick={() => {
                              setDownMarketAreaId(null);
                              if (disabled || isCurrentLocation) {
                                return null;
                              }
                              countSeqClick.current += 1;
                              setCountSeqC(countSeqClick.current);
                              addMarket(market, isSelected);
                              setHoveredMapAddress(hoveredMarketName);
                              setHoveredRpm(currMarketArea === marketAreaId ? -1 : rpm);
                              setIsMap(true);
                              onClickMarket();
                              return null;
                            }}
                            onMouseEnter={() => {
                              setHoveredMapAddress(hoveredMarketName);
                              setHoveredRpm(currMarketArea === marketAreaId ? -1 : rpm);
                              setHoveredMarketAreaId(marketAreaId);
                              setIsMap(true);
                              if (
                                disableZoomPan &&
                                downMarketAreaId !== marketAreaId &&
                                !disabled &&
                                !noGo &&
                                !noGoSimSel
                              ) {
                                addMarket(market, isSelected);
                                if (countSeqClick.current > 0) {
                                  countSeqClick.current = 0;
                                  setCountSeqC(0);
                                  setTipMsg(null);
                                }
                              }
                            }}
                            onMouseLeave={() => {
                              setHoveredMapAddress(null);
                              setHoveredRpm(null);
                              setIsMap(false);
                              setHoveredMarketAreaId(null);
                            }}
                            style={{
                              default: {
                                fill,
                                stroke:
                                  isHover || marketAreaId === hoveredMarketAreaId
                                    ? '#0099DF'
                                    : '#535353',
                                strokeWidth:
                                  isHover || marketAreaId === hoveredMarketAreaId ? 1 : 0.35,
                                outline: 'none',
                              },
                              hover: {
                                fill,
                                stroke: '#0099DF',
                                strokeWidth: 1,
                                outline: 'none',
                              },
                              pressed: {
                                fill: '#FF5722',
                                stroke: '#B1B2B5',
                                strokeWidth: 0.35,
                                outline: 'none',
                              },
                            }}
                          />
                          {isTargetDestForSim && (
                            <g key="location">
                              <Marker
                                coordinates={geoCentroid(geography)}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDownMarketAreaId(null);
                                  return disabled || isCurrentLocation
                                    ? null
                                    : onToggle(marketAreaId);
                                }}
                              >
                                <g
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  transform="translate(-4, -8) scale(0.2)"
                                >
                                  <polygon
                                    style={{ fill: '#ff0000' }}
                                    points="52,23.5 10,40 10,22 10,4 "
                                  />
                                  <path
                                    style={{ fill: '#424A60' }}
                                    d="M9,0C8.448,0,8,0.447,8,1v3v55c0,0.553,0.448,1,1,1s1-0.447,1-1V4V1C10,0.447,9.552,0,9,0z"
                                  />
                                </g>
                              </Marker>
                            </g>
                          )}
                        </>
                      );
                    }
                  ),
                  currentLocationArea ? (
                    <g key="location">
                      <Marker coordinates={geoCentroid(currentLocationArea)}>
                        <g
                          fill="none"
                          stroke="#1263c4"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          transform="translate(-4, -8) scale(0.4)"
                          filter="drop-shadow( 0 2px 0.2px #1263c450 )"
                        >
                          <circle cx="12" cy="10" r="3" />
                          <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                        </g>
                      </Marker>
                    </g>
                  ) : null,
                ];
              }}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </>
      {selectedTruck && (
        <>
          <S.Heading>
            {selectedTruck?.name} - {selectedTruck?.location} ({selectedTruck?.currentZip5}){' '}
            <S.StatusCell color={STATUS_COLORS[selectedTruck.status] || '#FFBD86'}>
              {selectedTruck?.status === TRUCK_POST_STATUS.ONTRIP
                ? 'ON-TRIP'
                : selectedTruck?.status}
            </S.StatusCell>
          </S.Heading>
          <S.FooterLeft>
            <S.Legend>
              <S.LegendHeader>
                <S.LegendTitle>RPM</S.LegendTitle>
                <Toggle
                  checked={isRpmActive}
                  onChange={() => setIsRpmActive(!isRpmActive)}
                  icons={false}
                />
              </S.LegendHeader>

              {legendTransitions((styles, item) => {
                const {
                  value: [min, max],
                  color,
                  index,
                } = item;
                return (
                  <animated.div style={styles}>
                    <S.LegendRow
                      onMouseEnter={() => setHoveredLegendInterval(item)}
                      onMouseLeave={() => setHoveredLegendInterval(null)}
                    >
                      {' '}
                      <S.LegendIconSolidColor color={color} />
                      <span>
                        {index === 0
                          ? `< ${max}`
                          : index === rpmIntervals.length - 1
                          ? `> ${min}`
                          : `${min} - ${max}`}
                      </span>
                    </S.LegendRow>
                  </animated.div>
                );
              })}
            </S.Legend>
            {resetVisible && (
              <S.ResetBtn type="button" onClick={onResetClick}>
                reset
              </S.ResetBtn>
            )}
          </S.FooterLeft>
          <S.FooterCenter>{tipMsg && <>{tipMsg}</>}</S.FooterCenter>
          {/* <S.FooterRight>
            <Simulator truck={selectedTruck} noGoMarketAreas={noGoMarketAreas} post={post} />
          </S.FooterRight> */}
        </>
      )}
      <ReactTooltip id="mapToolTip" backgroundColor="#00000090" textColor="#008080">
        {(hoveredMapAddress || hoveredRpm) && isMap && (
          <>
            {hoveredMapAddress}{' '}
            {hoveredRpm > -1 ? `- $${hoveredRpm.toFixed(2)}` : hoveredRpm === -1 ? '' : '(no go)'}
          </>
        )}
      </ReactTooltip>
    </S.Wrapper>
  );
};

MarketViewMap.defaultProps = {
  selectedTruck: null,
  hoveredMarket: null,
  onResetClick: () => {},
  resetVisible: false,
  maxHeight: 400,
  post: null,
};

MarketViewMap.propTypes = {
  onToggle: PropTypes.func.isRequired,
  onMultipleMarketsToggle: PropTypes.func.isRequired,
  marketPrices: PropTypes.arrayOf(Object).isRequired,
  disabled: PropTypes.bool.isRequired,
  hoveredMarket: PropTypes.shape({
    market: PropTypes.string,
    miles: PropTypes.number,
    rpm: PropTypes.number,
    gross: PropTypes.number,
    frequency: PropTypes.number,
    selected: PropTypes.number,
    address: PropTypes.string,
  }),
  selectedTruck: PropTypes.shape({
    id: PropTypes.string.isRequired,
    dispatcher: dispatcherType,
    name: PropTypes.string,
    status: PropTypes.string,
    location: PropTypes.string,
    currentZip5: PropTypes.string,
    isDeleted: PropTypes.bool,
  }),
  rpmIntervals: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.arrayOf(PropTypes.number),
      color: PropTypes.string,
    })
  ).isRequired,
  onResetClick: PropTypes.func,
  resetVisible: PropTypes.bool,
  maxHeight: PropTypes.number,
  noGoMarketAreas: PropTypes.arrayOf(PropTypes.string).isRequired,
  post: truckPostType,
};

export default MarketViewMap;
