import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useQuery } from '@apollo/client';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import _ from 'lodash';
import chroma from 'chroma-js';
import { ComposableMap, ZoomableGroup, Geographies, Geography } from 'components/SimpleMap';
import { HOT_MARKET_MAP_AREAS, ALL_MARKETS_HOTNESS } from 'apollo/query';
import { MARKET_HOTNESS_VALUES } from 'utils/Constants';
import { useIsMobile, useResize } from 'hooks';

import LoadingIndicator from 'components/LoadingIndicator';

import * as S from '../styles';
import useHotMarketAreasTopo from '../useHotMarketAreasTopo';

const colorScale = chroma
  .scale(['#37b1c3', '#93e2ee', '#D5F4DE', '#ffe9ad', '#feae37', '#ff792e', '#f95f49'])
  .domain([0, MARKET_HOTNESS_VALUES.length - 1]);

const MarketHotnessMap = ({
  onMarketClick,
  selectedMkt,
  legendVertical,
  outsideHoveredMkt,
  selectedEquipment,
  renderDropdown,
  marketRankings,
}) => {
  const { data: { hotMarketMapAreas = [] } = {} } = useQuery(HOT_MARKET_MAP_AREAS);
  const { data: { allMarketsHotness = [] } = {}, loading: hotnessMapLoading } = useQuery(
    ALL_MARKETS_HOTNESS,
    {
      fetchPolicy: 'no-cache',
      variables: { equipmentType: selectedEquipment },
      pollInterval: 1000 * 60 * 30,
    }
  );

  const [hoveredMkt, setHoveredMkt] = useState(null);
  const { isMobile, width: windowWidth } = useIsMobile();
  const {
    width: maxWidth,
    height: maxHeight,
    Comp: Wrapper,
  } = useResize(S.MarketHotnessMapWrapper);

  useEffect(() => {
    setHoveredMkt(outsideHoveredMkt);
  }, [outsideHoveredMkt]);

  const mapMarketProperties = useCallback(
    (marketArea) => {
      const mktHotness = _.find(
        allMarketsHotness,
        (mkt) => mkt.marketName === marketArea.marketName
      );
      return { ...mktHotness };
    },
    [allMarketsHotness]
  );

  const composableMapStyles = isMobile
    ? { width: '100%' }
    : { height: maxHeight - 30, width: maxWidth * 0.575 };
  const centerCoordinates = isMobile ? [-97, 40] : [-100, 39];
  const projectionConfig = { scale: isMobile ? 1050 : windowWidth <= 1600 ? 1000 : 1200 };
  const hotMarketMapAreasTopo = useHotMarketAreasTopo(
    hotMarketMapAreas.map((hmma) => ({
      ...hmma,
      rank: marketRankings.find((mktRank) => mktRank.marketName === hmma.marketName)?.rank || -1,
    })),
    mapMarketProperties
  );

  if (!hotMarketMapAreas.length || hotnessMapLoading) return <LoadingIndicator center />;

  return (
    <Wrapper guestMode>
      {!legendVertical && (
        <S.MarketHotnessHeader>
          <S.AvailableWrapper>
            <S.MarketHotnessMobileTitle>
              {renderDropdown()} profitability
              <S.HelpIcon data-tip="" data-tooltip-id="tbimToolTip" />
            </S.MarketHotnessMobileTitle>
          </S.AvailableWrapper>

          <S.ColorScaleWrapper>
            <S.ColorScaleBig>
              {_.map(MARKET_HOTNESS_VALUES, (value, index) => (
                <S.ColorBar key={value} normal={colorScale(index)}>
                  {index % 2 !== 0 && <span className="center">{value}</span>}
                </S.ColorBar>
              ))}
            </S.ColorScaleBig>
          </S.ColorScaleWrapper>
          <ReactTooltip
            id="tbimToolTip"
            place="bottom"
            events={['hover', 'click']}
            style={{ backgroundColor: '#043344', color: '#f5f6f8', zIndex: '9999' }}
          >
            $ made per hour while driving, excluding fixed expenses
          </ReactTooltip>
        </S.MarketHotnessHeader>
      )}

      <S.MarketContent>
        <ComposableMap
          projection="geoAlbers"
          style={{
            ...composableMapStyles,
            pointerEvents: 'auto',
            backgroundColor: '#0d1e2d',
          }}
          projectionConfig={projectionConfig}
        >
          <defs>
            {_.map(MARKET_HOTNESS_VALUES, (value, index) => (
              <pattern
                key={`cross-out-pattern-${value}`}
                id={`cross-out-pattern-${index}`}
                x="7"
                y="7"
                width="7"
                height="7"
                patternUnits="userSpaceOnUse"
              >
                <rect width="7" height="7" fill={colorScale(index)} />
                <line x1="0" y1="7" x2="7" y2="0" stroke="black" strokeWidth={1} />
              </pattern>
            ))}
          </defs>
          <ZoomableGroup center={centerCoordinates}>
            <Geographies id="truck_map" geography={hotMarketMapAreasTopo}>
              {({ geographies }) => {
                const geographiesSorted = _.sortBy(geographies, (geo) =>
                  geo.properties.marketAreaId === hoveredMkt ? 1 : 0
                );

                return [
                  ...geographiesSorted.map(
                    ({
                      properties: {
                        marketAreaId,
                        destinationsMap,
                        marketName,
                        originCity,
                        originState,
                        originZipFive,
                        hotness,
                        rank,
                      },
                      ...geography
                    }) => {
                      const indexHotness = _.findIndex(
                        MARKET_HOTNESS_VALUES,
                        (value) => value === hotness
                      );
                      const fill =
                        selectedMkt === marketAreaId
                          ? `url(#cross-out-pattern-${indexHotness})`
                          : colorScale(indexHotness);

                      const styles = {
                        default: {
                          fill,
                          stroke: '#535353',
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                        hover: {
                          fill,
                          stroke: '#1a8d8d',
                          strokeWidth: 2,
                          strokeAlignment: 'inside',
                          outline: 'none',
                          cursor: 'pointer',
                        },
                        pressed: {
                          fill: '#FF5722',
                          stroke: '#B1B2B5',
                          strokeWidth: 1,
                          outline: 'none',
                        },
                      };

                      return (
                        <>
                          <Geography
                            id={marketAreaId}
                            name={marketName}
                            key={marketAreaId}
                            geography={geography}
                            onClick={() => {
                              onMarketClick({ marketAreaId });
                            }}
                            onMouseEnter={() => {
                              setHoveredMkt(marketAreaId);
                            }}
                            style={{
                              ...styles,
                              default: marketAreaId === hoveredMkt ? styles.hover : styles.default,
                            }}
                            data-tooltip-id="map-tooltip"
                            data-tooltip-content={`${originCity}, ${originState} (${rank}) - ${hotness}`}
                          />
                        </>
                      );
                    }
                  ),
                ];
              }}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        {legendVertical && (
          <>
            <S.ColorScaleWrapper legendVertical>
              <S.ColorScaleBig legendVertical>
                <span>cold</span>
                {_.map(MARKET_HOTNESS_VALUES, (value, index) => (
                  <S.ColorBar legendVertical key={value} normal={colorScale(index)} />
                ))}
                <span>hot</span>
              </S.ColorScaleBig>
            </S.ColorScaleWrapper>
            <S.MarketHotnessTitle>
              {renderDropdown()} profitability
              <S.HelpIcon data-tip="" data-tooltip-id="tbiToolTip" />
            </S.MarketHotnessTitle>
            <ReactTooltip
              id="tbiToolTip"
              place="top"
              style={{ backgroundColor: '#043344', color: '#f5f6f8' }}
            >
              $ made per hour while driving, excluding fixed expenses
            </ReactTooltip>
          </>
        )}
      </S.MarketContent>
    </Wrapper>
  );
};

MarketHotnessMap.defaultProps = {
  legendVertical: false,
  outsideHoveredMkt: null,
  selectedEquipment: 'VAN',
  selectedMkt: null,
  marketRankings: [],
};

MarketHotnessMap.propTypes = {
  legendVertical: PropTypes.bool,
  onMarketClick: PropTypes.func.isRequired,
  selectedMkt: PropTypes.string,
  outsideHoveredMkt: PropTypes.string,
  selectedEquipment: PropTypes.string,
  renderDropdown: PropTypes.func.isRequired,
  marketRankings: PropTypes.arrayOf(
    PropTypes.shape({ marketName: PropTypes.string, rank: PropTypes.number })
  ),
};

export default MarketHotnessMap;
