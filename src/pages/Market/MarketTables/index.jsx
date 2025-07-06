import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useFilters, useGlobalFilter, useSortBy, useTable } from 'react-table';

import { useQuery } from '@apollo/client';

import _ from 'lodash';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { HOT_MARKET_MAP_AREAS } from 'apollo/query';
import { LoadingIndicator, SortIcon } from 'components';

import { volumeColorScale } from 'utils/Constants';

import { useIsMobile } from 'hooks';
import * as S from './styles';

const HeaderWithTooltip = ({ header, tooltipContent, tooltipId }) => (
  <div
    style={{
      display: 'flex',
      width: 'auto',
      flexDirection: 'row',
      alignItems: 'center',
      zIndex: '9999',
      gap: '5px',
    }}
  >
    {header}
    <S.HelpIcon data-tooltip-id={tooltipId} data-tooltip-content={tooltipContent} />
  </div>
);

HeaderWithTooltip.propTypes = {
  header: PropTypes.string.isRequired,
  tooltipContent: PropTypes.string.isRequired,
  tooltipId: PropTypes.string.isRequired,
};

const sortType = (rowA, rowB, id, desc) => {
  if (!rowA || !rowB) return 1;
  const valueA = parseFloat(rowA.values[id]);
  const valueB = parseFloat(rowB.values[id]);
  if (valueA === Infinity) return desc ? -1 : 1;
  if (valueB === Infinity) return desc ? 1 : -1;
  if (valueA > valueB) return 1;
  if (valueB > valueA) return -1;
  return 0;
};

const columns = [
  {
    Header: 'rank',
    accessor: 'rank',
    sortable: true,
    /* eslint-disable react/prop-types */
    Cell: ({ value }) => value,
    sortType,
  },
  {
    Header: 'market',
    accessor: 'marketLocation',
    Cell: ({ value }) => value,
    sortable: true,
  },
  {
    Header: 'SI',
    accessor: 'indexValue',
    Cell: ({ value }) => <S.TBISpan>{value?.toFixed(2)}</S.TBISpan>,
    sortType,
  },
  {
    Header: '1d change',
    accessor: 'change',
    Cell: ({ value }) => (
      <S.ColoredSpan value={value}>{`${value <= 0 ? '' : '+'}${(value * 100).toFixed(
        2
      )}%`}</S.ColoredSpan>
    ),
    sortType,
  },
];

export const MarketRankingsTable = ({
  marketRankings,
  allMarketsData,
  loading,
  onMarketClick,
  onRowMouseEnter,
  onRowMouseLeave,
}) => {
  const { data: { hotMarketMapAreas = [] } = {}, loading: hotMarketMapAreasLoading } = useQuery(
    HOT_MARKET_MAP_AREAS,
    { fetchPolicy: 'cache-only' }
  );

  const orgRows = useMemo(
    () =>
      marketRankings.length && hotMarketMapAreas.length
        ? _.sortBy(
            _.filter(
              _.map(hotMarketMapAreas, (marketArea) => {
                const marketRank = _.find(
                  marketRankings,
                  (market) => market.marketName === marketArea.marketName
                );
                if (!marketRank) {
                  return null;
                }
                return {
                  ...marketRank,
                  ...marketArea,
                  marketLocation: `${marketArea.originCity}, ${marketArea.originState}`,
                  rankChange: marketRank.prevRank - marketRank.rank,
                };
              }),
              (market) => !!market
            ),
            'rank'
          )
        : [],
    [marketRankings, hotMarketMapAreas]
  );

  const {
    getTableProps,
    getTableBodyProps,
    state,
    headerGroups,
    preGlobalFilteredRows,
    setGlobalFilter,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: orgRows,
      autoResetFilters: false,
      autoResetGlobalFilter: false,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  return (
    <S.Table {...getTableProps()}>
      <S.Header>
        {headerGroups.map((headerGroup) => (
          <S.THeadRow
            key={headerGroup.id}
            {...headerGroup.getHeaderGroupProps()}
            gridTemplateColumns="20% 33% 20% 27%"
          >
            {headerGroup.headers.map((column) => (
              <S.TableHead
                key={column.id}
                {...column.getHeaderProps()}
                zIndex={column.id === 'indexValue' ? 3 : 2}
              >
                {column.id === 'indexValue' ? (
                  <HeaderWithTooltip
                    header={column.render('Header')}
                    tooltipId="si-tooltip"
                    tooltipContent="Spotter Index measures profitability per hour"
                  />
                ) : (
                  <>{column.render('Header')}</>
                )}
                <SortIcon
                  {...column.getSortByToggleProps()}
                  isSorted={column.isSorted}
                  desc={column.isSortedDesc}
                />
              </S.TableHead>
            ))}
          </S.THeadRow>
        ))}
      </S.Header>
      <S.TBody {...getTableBodyProps()}>
        {loading && <LoadingIndicator center title="loading" />}
        {!loading && (
          <S.TBodyRow
            gridTemplateColumns="20% 33% 20% 27%"
            onClick={() => onMarketClick({ marketAreaId: 'all' })}
          >
            <S.TableCell>
              <S.RankCell />
            </S.TableCell>
            <S.TableCell>
              <S.MarketCell $bold>all markets</S.MarketCell>
            </S.TableCell>
            <S.TableCell>
              <S.TBICell $bold>
                <S.TBISpan>{allMarketsData.indexValue}</S.TBISpan>
              </S.TBICell>
            </S.TableCell>
            <S.TableCell>
              <S.ChangeCell $bold>
                <S.ColoredSpan value={allMarketsData.change}>
                  {allMarketsData.change === undefined
                    ? 'N/A'
                    : `${allMarketsData.change <= 0 ? '' : '+'}${(
                        allMarketsData.change * 100
                      ).toFixed(2)}%`}
                </S.ColoredSpan>
              </S.ChangeCell>
            </S.TableCell>
          </S.TBodyRow>
        )}
        {!loading &&
          rows.map((row, iRow) => {
            prepareRow(row);
            return (
              <S.TBodyRow
                key={row.id}
                {...row.getRowProps()}
                gridTemplateColumns="20% 33% 20% 27%"
                onClick={() => onMarketClick({ marketAreaId: row.original.marketAreaId })}
                onMouseEnter={(e) => onRowMouseEnter({ marketAreaId: row.original.marketAreaId })}
                onMouseLeave={(e) => onRowMouseLeave({ marketAreaId: row.original.marketAreaId })}
              >
                {row.cells.map((cell, iCell) => (
                  <S.TableCell
                    {...cell.getCellProps()}
                    data-tip=""
                    data-for={`${cell.column.id}-${iRow}-${iCell}`}
                  >
                    {cell.column.id === 'rank' && (
                      <S.RankCell>
                        <S.RankRow>
                          <span style={{ justifySelf: 'flex-end', marginRight: '10px' }}>
                            {cell.value}
                          </span>
                          {row.original.rankChange > 0 ? (
                            <S.RankChangeGroup>
                              <S.UpArrow size={20} />
                              <S.RankChangeSpan value={row.original.rankChange}>
                                {Math.abs(row.original.rankChange)}
                              </S.RankChangeSpan>
                            </S.RankChangeGroup>
                          ) : row.original.rankChange < 0 ? (
                            <S.RankChangeGroup>
                              <S.DownArrow size={20} />
                              <S.RankChangeSpan value={row.original.rankChange}>
                                {Math.abs(row.original.rankChange)}
                              </S.RankChangeSpan>
                            </S.RankChangeGroup>
                          ) : null}
                        </S.RankRow>
                      </S.RankCell>
                    )}
                    {cell.column.id === 'marketLocation' && (
                      <S.MarketCell>{cell.render('Cell')}</S.MarketCell>
                    )}
                    {cell.column.id === 'indexValue' && (
                      <S.TBICell>{cell.render('Cell')}</S.TBICell>
                    )}
                    {cell.column.id === 'change' && (
                      <S.ChangeCell>
                        <S.ColoredSpan value={cell.value}>{`${cell.value <= 0 ? '' : '+'}${(
                          cell.value * 100
                        ).toFixed(2)}%`}</S.ColoredSpan>
                      </S.ChangeCell>
                    )}
                  </S.TableCell>
                ))}
              </S.TBodyRow>
            );
          })}
      </S.TBody>
    </S.Table>
  );
};

MarketRankingsTable.propTypes = {
  marketRankings: PropTypes.arrayOf(
    PropTypes.shape({
      marketName: PropTypes.string.isRequired,
      prevRank: PropTypes.number.isRequired,
      rank: PropTypes.number.isRequired,
      indexValue: PropTypes.number.isRequired,
    })
  ).isRequired,
  allMarketsData: PropTypes.shape({
    change: PropTypes.number.isRequired,
    indexValue: PropTypes.string.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  onMarketClick: PropTypes.func.isRequired,
  onRowMouseEnter: PropTypes.func.isRequired,
  onRowMouseLeave: PropTypes.func.isRequired,
};

export const MarketLanesTable = ({
  dstMarkets,
  loading,
  selectedMarketAreaId,
  onRowMouseEnter,
  onRowMouseLeave,
  onMarketClick,
}) => {
  const { data: { hotMarketMapAreas = [] } = {}, loading: hotMarketMapAreasLoading } = useQuery(
    HOT_MARKET_MAP_AREAS,
    { fetchPolicy: 'cache-only' }
  );
  const { isMobile } = useIsMobile();

  const columns = useMemo(
    () => [
      {
        Header: 'destination',
        accessor: 'marketLocation',
        sortable: true,
        /* eslint-disable react/prop-types */
        Cell: ({ value }) => value,
      },
      {
        Header: 'RPM',
        accessor: 'brokerRpm',
        Cell: ({ value }) =>
          parseFloat(value)?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          }),
        sortType,
      },
      {
        Header: 'tolls',
        accessor: 'tollsCost',
        Cell: ({ value }) =>
          parseFloat(value)?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2,
          }),
        sortType,
      },
      {
        Header: 'fuel',
        accessor: 'fuelPrice',
        Cell: ({ value }) =>
          value?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2,
          }),
        sortType,
      },
      {
        Header: 'volume',
        accessor: 'volume',
        Cell: ({ value }) => (
          <span style={{ color: volumeColorScale(value) }}>
            {(value * 100).toLocaleString('en-US', {
              maximumFractionDigits: 1,
              minimumFractionDigits: 1,
            })}
            %
          </span>
        ),
        sortType,
      },
    ],
    [selectedMarketAreaId, hotMarketMapAreasLoading]
  );

  const orgRows = useMemo(
    () =>
      dstMarkets.length && hotMarketMapAreas.length
        ? _.orderBy(
            _.map(dstMarkets, (market) => {
              const marketArea = _.find(
                hotMarketMapAreas,
                (area) => area.marketAreaId === market.dstMarketAreaId
              );
              return {
                ...market,
                ...marketArea,
                marketLocation: `${marketArea.originCity}, ${marketArea.originState}`,
                brokerRpm: market.brokerRate / market.miles,
              };
            }),
            'marketLocation',
            'asc'
          )
        : [],
    [dstMarkets, hotMarketMapAreas]
  );

  const {
    getTableProps,
    getTableBodyProps,
    state,
    headerGroups,
    preGlobalFilteredRows,
    setGlobalFilter,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: useMemo(() => orgRows, [orgRows]),
      autoResetFilters: false,
      autoResetGlobalFilter: false,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  return (
    <S.Table {...getTableProps()}>
      <S.Header>
        {headerGroups.map((headerGroup) => (
          <S.THeadRow
            {...headerGroup.getHeaderGroupProps()}
            gridTemplateColumns="30% 17% 17% 17% 19%"
          >
            {headerGroup.headers.map((column) => {
              const marketArea = _.find(
                hotMarketMapAreas,
                (area) => area.marketAreaId === selectedMarketAreaId
              );
              return (
                <S.TableHead {...column.getHeaderProps()}>
                  {column.id === 'marketLocation' ? (
                    <>{column.render('Header')}</>
                  ) : (
                    <HeaderWithTooltip
                      placement={isMobile ? 'top' : 'bottom'}
                      header={column.render('Header')}
                      tooltipContent={
                        <p style={{ fontWeight: '400', textAlign: 'center' }}>
                          {column.id === 'brokerRpm' && <>average broker rate</>}
                          {column.id === 'tollsCost' && <>average tolls cost</>}
                          {column.id === 'fuelPrice' && <>average fuel price</>}
                          {column.id === 'volume' && (
                            <>
                              percent of loads going to each market <br />
                              from {marketArea.originCity}, {marketArea.originState} market
                            </>
                          )}
                        </p>
                      }
                    />
                  )}
                  <SortIcon
                    {...column.getSortByToggleProps()}
                    isSorted={column.isSorted}
                    desc={column.isSortedDesc}
                  />
                </S.TableHead>
              );
            })}
          </S.THeadRow>
        ))}
      </S.Header>
      <S.TBodyLanes {...getTableBodyProps()}>
        {loading && <LoadingIndicator center title="loading" />}
        {!loading &&
          rows.map((row, iRow) => {
            prepareRow(row);
            return (
              <S.TBodyRow
                {...row.getRowProps()}
                gridTemplateColumns="30% 17% 17% 17% 19%"
                onClick={() => onMarketClick({ marketAreaId: row.original.marketAreaId })}
                onMouseEnter={(e) => onRowMouseEnter({ marketAreaId: row.original.marketAreaId })}
                onMouseLeave={(e) => onRowMouseLeave({ marketAreaId: row.original.marketAreaId })}
              >
                {row.cells.map((cell, iCell) => (
                  <S.TableCell
                    {...cell.getCellProps()}
                    data-tip=""
                    data-for={`${cell.column.id}-${iRow}-${iCell}`}
                  >
                    {cell.column.id === 'rank' && (
                      <S.TBICell>
                        <S.RankRow>
                          <span style={{ justifySelf: 'flex-end', marginRight: '10px' }}>
                            {cell.value}
                          </span>
                          {row.original.rankChange > 0 ? (
                            <S.RankChangeGroup>
                              <S.UpArrow size={20} />
                              <S.RankChangeSpan $value={row.original.rankChange}>
                                {Math.abs(row.original.rankChange)}
                              </S.RankChangeSpan>
                            </S.RankChangeGroup>
                          ) : row.original.rankChange < 0 ? (
                            <S.RankChangeGroup>
                              <S.DownArrow size={20} />
                              <S.RankChangeSpan $value={row.original.rankChange}>
                                {Math.abs(row.original.rankChange)}
                              </S.RankChangeSpan>
                            </S.RankChangeGroup>
                          ) : null}
                        </S.RankRow>
                      </S.TBICell>
                    )}
                    {cell.column.id === 'marketLocation' && (
                      <S.DestinationCell>{cell.render('Cell')}</S.DestinationCell>
                    )}
                    {cell.column.id === 'brokerRpm' && <S.RPMCell>{cell.render('Cell')}</S.RPMCell>}
                    {cell.column.id === 'tollsCost' && (
                      <S.TollsCell>{cell.render('Cell')}</S.TollsCell>
                    )}
                    {cell.column.id === 'fuelPrice' && (
                      <S.FuelCell>{cell.render('Cell')}</S.FuelCell>
                    )}
                    {cell.column.id === 'volume' && (
                      <S.ChangeCell>
                        <span style={{ color: volumeColorScale(cell.value) }}>
                          {(cell.value * 100).toLocaleString('en-US', {
                            maximumFractionDigits: 1,
                            minimumFractionDigits: 1,
                          })}
                          %
                        </span>
                      </S.ChangeCell>
                    )}
                  </S.TableCell>
                ))}
              </S.TBodyRow>
            );
          })}
      </S.TBodyLanes>
    </S.Table>
  );
};

MarketLanesTable.propTypes = {
  dstMarkets: PropTypes.arrayOf(
    PropTypes.shape({
      dstMarketAreaId: PropTypes.string.isRequired,
      volume: PropTypes.number.isRequired,
      brokerRate: PropTypes.number.isRequired,
      tollsCost: PropTypes.number.isRequired,
      fuelCost: PropTypes.number.isRequired,
      miles: PropTypes.number.isRequired,
    })
  ).isRequired,
  selectedMarketAreaId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onMarketClick: PropTypes.func.isRequired,
  onRowMouseEnter: PropTypes.func.isRequired,
  onRowMouseLeave: PropTypes.func.isRequired,
};
