/* global fbq */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { useApolloClient, useQuery } from '@apollo/client';

import _ from 'lodash';
import Cookies from 'js-cookie';

import { useHistory } from 'react-router';
import SearchIcon from 'assets/svgs/magnify.svg';

import { ConfirmDialog } from 'components/Common';
import { useGetAllMarketsData, useGetMarketData } from 'apollo/hook';
// import { useCurrentSubscription, useGetAllMarketsData, useGetMarketData } from 'apollo/hook';
// import { CORE_STRIPE_SUBSCRIPTION_FIELDS } from 'apollo/fragment';
// import { CREATE_SUBSCRIPTION } from 'apollo/mutation';
import { useIsMobile } from 'hooks';
import { MARKET_RANKINGS, HOT_MARKET_MAP_AREAS, ME } from 'apollo/query';
import hotMarketAreasZipCodes from 'components/HotMarketMap/datasource/hotMarketAreasZipCodes.json';
import {
  LoadingIndicator,
  MarketHotnessMap,
  CustomGooglePlacesAutoComplete,
  Dropdown,
  OwnerSection,
  OwnerSectionSmall,
} from 'components';
import { TRAILER_TYPE } from 'utils/Constants';

import { MarketRankingsTable, MarketLanesTable } from './MarketTables';
import MarketHistoryChart from './MarketHistoryChart';

import * as S from './styles';

const TABS = {
  MARKET_RANKINGS: 'MARKET_RANKINGS',
  MARKET_LANES: 'MARKET_LANES',
};

const ALL_MARKET_AREA_IDS = _.uniq(_.values(hotMarketAreasZipCodes));

const Chart = ({
  isMobile,
  allMarketsSelected,
  marketSelected,
  searchLocation,
  setSearchLocation,
  allMarketsDphData,
  marketHistory,
  marketDataLoading,
}) => {
  const chartMargin = {
    left: isMobile ? 35 : 70,
    right: isMobile ? 50 : 50,
    top: 30,
    bottom: 30,
  };
  return (
    <S.ChartWrapper>
      <S.Header style={{ marginLeft: chartMargin.left, marginRight: chartMargin.right }}>
        <S.MarketTitle>
          {!allMarketsSelected && (
            <S.RankBadge>
              <span>rank #{marketSelected?.rank}</span>
            </S.RankBadge>
          )}
          <h2 style={{ marginBottom: 10 }}>
            {!allMarketsSelected && (
              <>
                {marketSelected?.originCity}, {marketSelected?.originState}
              </>
            )}
            {allMarketsSelected && 'all markets'}
          </h2>
        </S.MarketTitle>
        <S.SearchLocationInputWrapper>
          <CustomGooglePlacesAutoComplete
            initialValue={searchLocation?.postal}
            placeholder="city, state or zip code"
            onChangeLocation={(location) => {
              if (
                !_.get(location, 'error', null) &&
                _.get(location, 'city') &&
                _.get(location, 'state')
              ) {
                setSearchLocation(location);
              }
            }}
            location={searchLocation}
            isPopover
            preIcon={SearchIcon}
            height="35px"
            popoverProps={{ fitWidth: false, reposition: false }}
          />
        </S.SearchLocationInputWrapper>
      </S.Header>
      <MarketHistoryChart
        history={(allMarketsSelected ? allMarketsDphData : marketHistory) || []}
        margin={chartMargin}
        loading={
          marketDataLoading ||
          (!allMarketsSelected && !marketHistory?.length) ||
          !allMarketsDphData?.length
        }
      />
    </S.ChartWrapper>
  );
};

Chart.defaultProps = {
  marketHistory: undefined,
  searchLocation: {},
};

Chart.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  allMarketsSelected: PropTypes.bool.isRequired,
  marketSelected: PropTypes.shape({
    rank: PropTypes.number,
    originCity: PropTypes.string,
    originState: PropTypes.string,
  }).isRequired,
  searchLocation: PropTypes.shape({
    postal: PropTypes.string,
  }),
  setSearchLocation: PropTypes.func.isRequired,
  allMarketsDphData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  marketHistory: PropTypes.arrayOf(PropTypes.shape({})),
  marketDataLoading: PropTypes.bool.isRequired,
};

const MarketTables = ({
  marketRankings,
  marketRankingsLoading,
  allMarketsDphData,
  allMarketsDphLoading,
  allMarketsChange,
  onMarketClick,
  onMarketMouseEnter,
  onMarketMouseLeave,
}) => {
  const allMarketsData = useMemo(
    () => ({
      indexValue:
        allMarketsDphData && allMarketsDphData.length
          ? allMarketsDphData[allMarketsDphData.length - 1].indexValue?.toFixed(2)
          : '0.00',
      change: allMarketsChange,
    }),
    [allMarketsDphData, allMarketsChange]
  );

  if (!marketRankingsLoading && !marketRankings.length) {
    return null;
  }

  return (
    <MarketRankingsTable
      onMarketClick={onMarketClick}
      loading={marketRankingsLoading && allMarketsDphLoading}
      marketRankings={marketRankings}
      onRowMouseEnter={onMarketMouseEnter}
      onRowMouseLeave={onMarketMouseLeave}
      allMarketsData={allMarketsData}
    />
  );
};

MarketTables.defaultProps = {
  marketData: {},
  allMarketsChange: undefined,
  marketRankings: [],
};

MarketTables.propTypes = {
  marketRankings: PropTypes.arrayOf(PropTypes.shape({})),
  marketRankingsLoading: PropTypes.bool.isRequired,
  allMarketsDphData: PropTypes.arrayOf(
    PropTypes.shape({
      indexValue: PropTypes.number,
    })
  ).isRequired,
  allMarketsDphLoading: PropTypes.bool.isRequired,
  allMarketsChange: PropTypes.number,
  marketData: PropTypes.shape({
    dstMarkets: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  onMarketClick: PropTypes.func.isRequired,
  onMarketMouseEnter: PropTypes.func.isRequired,
  onMarketMouseLeave: PropTypes.func.isRequired,
};

const Market = ({ onLogout }) => {
  const { isMobile } = useIsMobile();

  const [loading, setLoading] = useState(false);
  const [searchLocation, setSearchLocation] = useState(null);
  const [selectedMktAreaId, setSelectedMktAreaId] = useState();
  const [equipmentTypeSelected, setEquipmentTypeSelected] = useState(TRAILER_TYPE.VAN);
  const [hoveredMktAreaId, setHoveredMktAreaId] = useState(null);
  const [allMarketsSelected, setAllMarketsSelected] = useState(true);

  useEffect(() => {
    if (document.referrer.includes('facebook') && process.env.REACT_APP_ENV === 'PRODUCTION') {
      fbq('init', '867647283364709');
      fbq('track', 'PageView');
      Cookies.set('trackFb', true);
    }
  }, []);

  const { data: { me } = {}, loading: meLoading } = useQuery(ME);
  // const {
  //   subscription: { priceAmount: subscriptionPriceAmount },
  // } = useCurrentSubscription();

  // const hasAlreadyFreeTrial = Boolean(me?.marketDataSubscription);

  const {
    data: { marketRankings = [] } = {},
    loading: marketRankingsLoading,
    refetch: refetchMarketRankings,
    error: marketRankingsError,
  } = useQuery(MARKET_RANKINGS, {
    fetchPolicy: 'no-cache',
    variables: { equipmentType: equipmentTypeSelected },
    pollInterval: 1000 * 60 * 30,
  });

  const { data: { hotMarketMapAreas = [] } = {} } = useQuery(HOT_MARKET_MAP_AREAS);

  const {
    data: { marketHistory: allMarketsDphData = [], change: allMarketsChange } = {},
    loading: allMarketsDphLoading,
    refetch: refetchAllMarketsDph,
  } = useGetAllMarketsData(equipmentTypeSelected);

  const {
    data: { history: marketHistory, ...marketData } = {},
    loading: marketDataLoading,
    error: marketDataError,
    refetch: refetchMarketData,
  } = useGetMarketData(selectedMktAreaId, equipmentTypeSelected);

  const marketSelected = useMemo(() => {
    const marketArea =
      _.find(hotMarketMapAreas, ({ marketAreaId }) => marketAreaId === selectedMktAreaId) || {};
    const marketRank =
      _.find(marketRankings, ({ marketName }) => marketName === marketArea.marketName) || {};

    return {
      ...marketRank,
      ...marketArea,
    };
  }, [selectedMktAreaId, hotMarketMapAreas ?? [], marketRankings ?? []]);

  useEffect(() => {
    if (searchLocation?.postal) {
      setSelectedMktAreaId(hotMarketAreasZipCodes[searchLocation.postal.substring(0, 3)]);
    }
  }, [searchLocation?.postal]);

  useEffect(() => {
    Cookies.set('landing_page', 'market');
  }, []);

  useEffect(() => {
    const error = marketRankingsError || marketDataError;

    if (error && error.message.includes('USER_LOGGED_IN_ANOTHER_DEVICE')) {
      onLogout();
    }
  }, [marketRankingsError, marketDataError]);

  const onMarketClick = useCallback(
    ({ marketAreaId }) => {
      if (marketAreaId === 'all') {
        setAllMarketsSelected(true);
      } else {
        setAllMarketsSelected(false);
        setSelectedMktAreaId(marketAreaId);
        setSearchLocation(null);
      }
    },
    [setAllMarketsSelected, setSelectedMktAreaId, setSearchLocation]
  );

  const onMarketMouseEnter = useCallback(
    ({ marketAreaId }) => {
      setHoveredMktAreaId(marketAreaId);
    },
    [setHoveredMktAreaId]
  );

  const onMarketMouseLeave = useCallback(() => {
    setHoveredMktAreaId(null);
  }, [setHoveredMktAreaId]);

  const renderDropDown = useCallback(
    () => (
      <Dropdown
        name="trailer_type"
        data={Object.values(TRAILER_TYPE)}
        value={equipmentTypeSelected}
        onChange={(value) => setEquipmentTypeSelected(value)}
      />
    ),
    [equipmentTypeSelected, setEquipmentTypeSelected]
  );

  if (marketRankingsLoading || meLoading || loading)
    return (
      <S.Wrapper>
        <LoadingIndicator center />
      </S.Wrapper>
    );

  return (
    <>
      <S.Wrapper>
        {isMobile ? (
          <>
            <S.MapContainer>
              <MarketHotnessMap
                onMarketClick={onMarketClick}
                selectedMkt={allMarketsSelected ? null : marketSelected?.marketAreaId}
                selectedEquipment={equipmentTypeSelected}
                renderDropdown={renderDropDown}
                marketRankings={marketRankings.map((mktRank) => ({
                  marketName: mktRank.marketName,
                  rank: mktRank.rank,
                }))}
              />
            </S.MapContainer>
            <S.DataRow>
              <Chart
                isMobile
                allMarketsSelected={allMarketsSelected}
                marketSelected={marketSelected}
                searchLocation={searchLocation}
                setSearchLocation={setSearchLocation}
                allMarketsDphData={allMarketsDphData}
                marketHistory={marketHistory}
                marketDataLoading={marketDataLoading}
              />
              <S.MarketTablesWrapper>
                <MarketTables
                  marketRankings={marketRankings}
                  marketRankingsLoading={marketRankingsLoading}
                  allMarketsDphData={allMarketsDphData}
                  allMarketsDphLoading={allMarketsDphLoading}
                  allMarketsChange={allMarketsChange}
                  onMarketClick={onMarketClick}
                  onMarketMouseEnter={onMarketMouseEnter}
                  onMarketMouseLeave={onMarketMouseLeave}
                />
              </S.MarketTablesWrapper>
            </S.DataRow>
          </>
        ) : (
          <S.DataGrid>
            <S.SidetableArea>
              <MarketTables
                marketRankings={marketRankings}
                marketRankingsLoading={marketRankingsLoading}
                allMarketsDphData={allMarketsDphData}
                allMarketsDphLoading={allMarketsDphLoading}
                allMarketsChange={allMarketsChange}
                onMarketClick={onMarketClick}
                onMarketMouseEnter={onMarketMouseEnter}
                onMarketMouseLeave={onMarketMouseLeave}
              />
            </S.SidetableArea>
            <S.MapArea>
              <MarketHotnessMap
                legendVertical
                outsideHoveredMkt={hoveredMktAreaId}
                onMarketClick={onMarketClick}
                marketRankings={marketRankings.map((mktRank) => ({
                  marketName: mktRank.marketName,
                  rank: mktRank.rank,
                }))}
                selectedMkt={allMarketsSelected ? null : marketSelected?.marketAreaId}
                selectedEquipment={equipmentTypeSelected}
                renderDropdown={renderDropDown}
              />
            </S.MapArea>
            <S.MarketChartArea>
              <Chart
                isMobile={false}
                allMarketsSelected={allMarketsSelected}
                marketSelected={marketSelected}
                searchLocation={searchLocation}
                setSearchLocation={setSearchLocation}
                allMarketsDphData={allMarketsDphData}
                marketHistory={marketHistory}
                marketDataLoading={marketDataLoading}
              />
            </S.MarketChartArea>
          </S.DataGrid>
        )}
      </S.Wrapper>
      {/* {isMobile ? <OwnerSection noDots color="#008080" small /> : <OwnerSectionSmall />} */}
    </>
  );
};

Market.defaultProps = {
  onLogout: () => {},
};

Market.propTypes = {
  onLogout: PropTypes.func,
};

export default Market;
