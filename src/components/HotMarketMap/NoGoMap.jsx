import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { useQuery } from '@apollo/client';
import { geoCentroid } from 'd3-geo';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import _ from 'lodash';
import { HOT_MARKET_MAP_AREAS } from 'apollo/query';
import { ComposableMap, ZoomableGroup, Geographies, Geography, Marker } from 'components/SimpleMap';
import LoadingIndicator from 'components/LoadingIndicator';
import * as S from './styles';
import useHotMarketAreasTopo from './useHotMarketAreasTopo';

const NoGoMap = ({ noGoMarkets, blockedMarkets, onToggle, onResetClick, color, resetVisible }) => {
  const { data: { hotMarketMapAreas = [] } = {} } = useQuery(HOT_MARKET_MAP_AREAS);
  const [hoveredMapAddress, setHoveredMapAddress] = useState(null);
  const [hoveredRpm, setHoveredRpm] = useState(null);
  const [isMap, setIsMap] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [downMarketAreaId, setDownMarketAreaId] = useState(null);
  const [disableZoomPan, setDisableDblClickZoom] = useState(false);
  const [downTimer, setDownTimer] = useState(null);
  const [detectLongPress, setDetectLongPress] = useState(false);

  const downMarketAreaIdRef = useRef();
  const disableZoomPanRef = useRef();
  downMarketAreaIdRef.current = downMarketAreaId;
  disableZoomPanRef.current = disableZoomPan;

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
      setDownTimer(null);
      setDisableDblClickZoom(false);
    }
  }, [downMarketAreaId]);

  useEffect(() => {
    if (detectLongPress) {
      if (downMarketAreaIdRef.current) {
        onToggle(downMarketAreaIdRef.current);
        setDisableDblClickZoom(true);
        setDetectLongPress(false);
      }
    }
  }, [detectLongPress]);

  const mapMarketProperties = useCallback(
    (marketMapArea) => {
      const noGoMarket = _.find(noGoMarkets, (ngmkt) => ngmkt === marketMapArea.marketAreaId);
      return {
        isSelected: !!noGoMarket,
        isHover: hoveredMapAddress === `${marketMapArea.originCity}, ${marketMapArea.originState}`,
        hoveredMarketName: `${marketMapArea.originCity}, ${marketMapArea.originState}`,
        marketName: marketMapArea.marketName,
      };
    },
    [noGoMarkets, hoveredMapAddress]
  );

  const hotMarketMapAreasTopo = useHotMarketAreasTopo(hotMarketMapAreas, mapMarketProperties);

  if (hotMarketMapAreas.length === 0) return <LoadingIndicator />;

  return (
    <S.Wrapper style={{ cursor: disableZoomPan ? 'pointer' : 'default' }}>
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
              id="no-go-pattern-1"
              x="10"
              y="10"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="10" x2="10" y2="0" stroke="#008080" />
            </pattern>
            <pattern
              id="no-go-pattern-blocked"
              x="10"
              y="10"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="10" x2="10" y2="0" stroke="#ff00003a" />
            </pattern>
          </defs>
          <ZoomableGroup
            center={[-97, 39]}
            zoom={2}
            disableZoomPan={disableZoomPan}
            onMouseDown={(marketAreaId) => {
              setDownMarketAreaId(marketAreaId);
              setDisableDblClickZoom(false);
            }}
            onMove={() => {
              if (downMarketAreaIdRef.current && !disableZoomPanRef.current) {
                setDownMarketAreaId(null);
              }
            }}
            onMoveEnd={() => {
              setDownMarketAreaId(null);
            }}
          >
            <Geographies geography={hotMarketMapAreasTopo}>
              {({ geographies }) => {
                let currentLocationArea;
                return [
                  ...geographies.map(
                    ({
                      properties: { marketAreaId, isSelected, isHover, hoveredMarketName, rpm },
                      ...geography
                    }) => {
                      const isBlockedArea = blockedMarkets.indexOf(marketAreaId) > -1;
                      const fill = isSelected
                        ? 'url(#no-go-pattern-1)'
                        : isBlockedArea
                        ? 'url(#no-go-pattern-blocked)'
                        : '#1C2227';
                      return (
                        <Geography
                          key={marketAreaId}
                          marketAreaId={marketAreaId}
                          geography={geography}
                          onClick={() => {
                            setDownMarketAreaId(null);
                            onToggle(marketAreaId);
                          }}
                          onMouseEnter={() => {
                            setHoveredMapAddress(hoveredMarketName);
                            setIsMap(true);
                            if (
                              !isBlockedArea &&
                              disableZoomPan &&
                              downMarketAreaId !== marketAreaId
                            ) {
                              setDownMarketAreaId(marketAreaId);
                              onToggle(marketAreaId);
                            }
                          }}
                          onMouseLeave={() => {
                            setHoveredMapAddress(null);
                            setIsMap(false);
                          }}
                          style={{
                            default: {
                              fill,
                              stroke: isHover ? '#0099DF' : '#535353',
                              strokeWidth: isHover ? 1 : 0.35,
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
      <S.FooterLeft>
        {noGoMarkets.length > 0 && (
          <S.ResetBtn type="button" onClick={onResetClick}>
            reset
          </S.ResetBtn>
        )}
      </S.FooterLeft>
      <ReactTooltip id="mapToolTip" backgroundColor="#00000090" textColor="#008080">
        {(hoveredMapAddress || hoveredRpm) && isMap && (
          <>
            {hoveredMapAddress} {hoveredRpm ? `- $${hoveredRpm.toFixed(2)}` : ''}
          </>
        )}
      </ReactTooltip>
    </S.Wrapper>
  );
};

NoGoMap.defaultProps = {
  onResetClick: () => {},
  resetVisible: false,
  color: '#ff00003a',
  blockedMarkets: [],
};

NoGoMap.propTypes = {
  onToggle: PropTypes.func.isRequired,
  noGoMarkets: PropTypes.arrayOf(PropTypes.string).isRequired,
  blockedMarkets: PropTypes.arrayOf(PropTypes.string),
  onResetClick: PropTypes.func,
  resetVisible: PropTypes.bool,
  color: PropTypes.string,
};

export default NoGoMap;
