import React, { useCallback, useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import _ from 'lodash';
import moment from 'moment';

import { ChartCanvas, Chart } from 'react-stockcharts';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { Label } from 'react-stockcharts/lib/annotation';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { last, first } from 'react-stockcharts/lib/utils';
import {
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
} from 'react-stockcharts/lib/coordinates';
import { CandlestickSeries } from 'react-stockcharts/lib/series';
import { LoadingIndicator, AppPopover, StyledDayPicker } from 'components';
import { useIsMobile, useResize } from 'hooks';
import OHLCTooltip from './OHLCTooltip';
import * as S from './styles';

const TIME_SCALES = {
  '3H': (m) => {
    const newK = Number(parseInt(m.hour(), 10)) - Number(parseInt(m.hour(), 10) % 3);
    const newM = moment(m.format(`YYYY-MM-DDT00:00:00.000Z`)).add(newK, 'hours');
    return newM.format('YYYY-MM-DDTHH:00:00.000Z');
  },
  '8H': (m) => {
    const newK = Number(parseInt(m.hour(), 10)) - Number(parseInt(m.hour(), 10) % 8);
    const newM = moment(m.format(`YYYY-MM-DDT00:00:00.000Z`)).add(newK, 'hours');
    return newM.format('YYYY-MM-DDTHH:00:00.000Z');
  },
  '1D': (m) => m.format('YYYY-MM-DDT00:00:00.000Z'),
  '1W': (m) => {
    const dayINeed = 1;
    const day = m.isoWeekday();

    if (day <= dayINeed) {
      return m.isoWeekday(dayINeed).format('YYYY-MM-DD');
    }

    return m.add(1, 'weeks').isoWeekday(dayINeed).format('YYYY-MM-DD');
  },
};

const getTimeScaleReducer = (startDt, endDt) => {
  let timeScale;
  if (endDt.diff(startDt, 'weeks') <= 1) {
    timeScale = TIME_SCALES['3H'];
  } else if (endDt.diff(startDt, 'weeks') <= 5) {
    timeScale = TIME_SCALES['8H'];
  } else {
    timeScale = TIME_SCALES['1D'];
  }

  return (prevGroups, curr) => {
    const { createdDt } = curr;
    const m = moment(createdDt.replace(/-/g, '/'));
    if (m.isBefore(startDt) || m.isAfter(endDt)) {
      return { ...prevGroups };
    }

    const group = timeScale(m);
    return {
      ...prevGroups,
      [group]: [...(prevGroups[group] || []), curr],
    };
  };
};

const getTimeFormatForRange = (startDt, endDt) => {
  if (endDt.diff(startDt, 'days') <= 1) {
    return { dtFormat: '%H:%M', dtDetailFormat: '%b %e %H:%M' };
  }
  if (endDt.diff(startDt, 'weeks') <= 1) {
    return { dtFormat: '%b %e', dtDetailFormat: '%b %e %H:%M' };
  }
  if (endDt.diff(startDt, 'years') > 1) {
    return { dtFormat: '%b %Y', dtDetailFormat: '%b %Y %H:%M' };
  }
  return { dtFormat: '%b %e', dtDetailFormat: '%b %e' };
};

const TIME_RANGE_OPTIONS = {
  '1D': {
    key: '1D',
    endDt: moment(moment().format('YYYY-MM-DDT23:59:59.999Z')),
    startDt: moment().subtract(1, 'days'),
  },
  '7D': {
    key: '7D',
    startDt: moment(moment().format('YYYY-MM-DDT00:00:00.000Z')).subtract(1, 'weeks'),
    endDt: moment(moment().format('YYYY-MM-DDT23:59:59.999Z')),
  },
  '1M': {
    key: '1M',
    startDt: moment(moment().format('YYYY-MM-DDT00:00:00.000Z')).subtract(1, 'months'),
    endDt: moment(moment().format('YYYY-MM-DDT23:59:59.999Z')),
  },
};

const MarketHistoryChart = ({ history, margin, loading }) => {
  const [timeRangeSelected, setTimeRangeSelected] = useState(TIME_RANGE_OPTIONS['7D']);
  const [customTimeRange, setCustomTimeRange] = useState(null);
  const { width: maxWidth, height: maxHeight, Comp: Wrapper } = useResize(S.Wrapper);

  const initialData = useMemo(() => {
    const reducer = getTimeScaleReducer(timeRangeSelected.startDt, timeRangeSelected.endDt);
    const groupedByDate = _.reduce(history, reducer, {});

    return _.map(
      _.orderBy(
        _.map(_.entries(groupedByDate), ([date, dataPoints]) => {
          const values = _.map(
            _.sortBy(dataPoints, 'createdDt'),
            (dataPoint) => dataPoint.indexValue
          );

          return {
            date: moment(date).toDate(),
            open: _.first(values),
            high: _.max(values),
            low: _.min(values),
            close: _.last(values),
          };
        }),
        'date',
        'asc'
      ),
      (d, idx, arr) => {
        const prev = _.get(arr, idx - 1);

        return {
          ...d,
          open: _.get(prev, 'close', d.open),
        };
      }
    );
  }, [history, timeRangeSelected]);

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor((d) => d.date);
  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(initialData);
  const xExtents = [xAccessor(last(data)) + 1, xAccessor(first(data)) - 1];

  const { isMobile } = useIsMobile();
  const height = isMobile ? maxHeight : maxHeight - 120; // substract 100px for the header
  const width = maxWidth;
  const ratio = width / height;

  const gridHeight = height - margin.top - margin.bottom;
  const gridWidth = width - margin.left - margin.right;

  const [yAxisLabelX, yAxisLabelY] = [
    isMobile ? -23 : -35,
    (height - margin.top - margin.bottom) / 2,
  ];

  const showGrid = true;
  const yGrid = showGrid ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.2 } : {};
  const xGrid = showGrid ? { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.2 } : {};

  const cancelWheel = useCallback((e) => e.preventDefault(), []);

  const { dtFormat, dtDetailFormat } = getTimeFormatForRange(
    timeRangeSelected.startDt,
    timeRangeSelected.endDt
  );

  if (loading || !maxHeight || !maxWidth) {
    return (
      <Wrapper>
        <LoadingIndicator center />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '5px',
          marginLeft: margin.left,
        }}
      >
        {_.map(_.entries(TIME_RANGE_OPTIONS), ([key, value]) => (
          <S.TimeRangeOption
            key={key}
            onClick={() => {
              setTimeRangeSelected({ key, ...value });
            }}
            $selected={timeRangeSelected?.key === key}
          >
            {key}
          </S.TimeRangeOption>
        ))}
        <S.TimeRangeOption
          onClick={() => {
            setTimeRangeSelected({
              key: 'MAX',
              startDt: moment('1970-01-01T00:00:00Z'),
              endDt: moment(),
            });
          }}
          $selected={timeRangeSelected?.key === 'MAX'}
        >
          MAX
        </S.TimeRangeOption>
        <AppPopover
          positions={['top', 'right']}
          headerWidth="unset"
          overlayBgColor="#04283c"
          normalBgColor="transparent"
          activeBorderColor="transparent"
          fillBorderColor="transparent"
          normalBorderColor="transparent"
          borderOnHover={false}
          onOpen={() => setCustomTimeRange(null)}
          content={
            <div style={{ padding: 5 }}>
              <StyledDayPicker
                mode="range"
                disabled={{ after: new Date() }}
                selected={{
                  from: customTimeRange?.from,
                  to: customTimeRange?.to,
                }}
                showOutsideDays
                fixedWeeks
                onSelect={(range) => {
                  setCustomTimeRange(range);
                  if (!!range.from && !!range.to) {
                    setTimeRangeSelected({
                      key: 'custom',
                      startDt: moment(moment(range.from).format('YYYY-MM-DDT00:00:00.000Z')),
                      endDt: moment(moment(range.to).format('YYYY-MM-DDT23:59:59.999Z')),
                    });
                  }
                }}
              />
            </div>
          }
        >
          <S.TimeRangeOption $selected={timeRangeSelected?.key === 'custom'}>
            CUSTOM
          </S.TimeRangeOption>
        </AppPopover>
      </div>
      <div
        style={{ overscrollBehavior: 'contain', width, height }}
        onFocus={() => {}}
        onMouseOver={() => {
          document.body.addEventListener('wheel', cancelWheel, { passive: false });
        }}
        onMouseLeave={() => {
          document.body.removeEventListener('wheel', cancelWheel);
        }}
        onTouchStart={() => {
          document.body.addEventListener('touchmove', cancelWheel, { passive: false });
        }}
        onTouchEnd={() => {
          document.body.removeEventListener('touchmove', cancelWheel);
        }}
      >
        <ChartCanvas
          type="svg"
          width={width}
          height={height}
          ratio={ratio}
          margin={margin}
          seriesName="TBI"
          data={data}
          xScale={xScale}
          xAccessor={xAccessor}
          displayXAccessor={displayXAccessor}
          xExtents={xExtents}
        >
          <Chart id={1} yExtents={(d) => [d.high + 1, d.low - 1]}>
            <YAxis axisAt="left" orient="left" ticks={5} {...yGrid} inverted tickStroke="#cad4de" />
            <Label
              x={yAxisLabelX}
              y={yAxisLabelY}
              rotate={-90}
              fill="#cad4de"
              fontSize={isMobile ? 9 : 12}
              text=""
            />
            <XAxis
              axisAt="bottom"
              orient="bottom"
              ticks={isMobile ? 4 : 12}
              {...xGrid}
              tickStroke="#cad4de"
              // tickFormat={(d) => {
              //   const { date } = data[d];
              //   const m = moment(date);
              //   if (m.hour() === 0) {
              //     return timeFormat(dtFormat)(date);
              //   }
              //   return '';
              // }}
              stroke="#cad4de"
              rotation={-45}
            />
            <MouseCoordinateY at="right" orient="right" displayFormat={format('.2f')} />
            <MouseCoordinateX
              at="bottom"
              orient="bottom"
              displayFormat={timeFormat(dtDetailFormat)}
            />
            <CandlestickSeries
              stroke={(d) => (d.close > d.open ? '#14d29b' : '#ff7979')}
              wickStroke={(d) => (d.close > d.open ? '#14d29b' : '#ff7979')}
              fill={(d) => (d.close > d.open ? '#14d29b' : '#ff7979')}
              opacity={1}
            />

            <EdgeIndicator
              itemType="last"
              orient="right"
              edgeAt="right"
              yAccessor={(d) => d.close}
              fill={(d) => (d.close > d.open ? '#14d29b' : '#ff7979')}
            />
            <OHLCTooltip
              origin={[0, -15]}
              labelFill="#159ea3"
              textFill="#edeef0"
              fontSize={isMobile ? 11 : 12}
              displayTexts={{
                d: '',
                o: ' Open: ',
                h: ' High: ',
                l: ' Low: ',
                c: ' Close: ',
                na: 'n/a',
              }}
            />
            <CrossHairCursor stroke="#edeef0" />
          </Chart>
        </ChartCanvas>
      </div>
    </Wrapper>
  );
};

MarketHistoryChart.defaultProps = {
  loading: false,
};

MarketHistoryChart.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      marketName: PropTypes.string.isRequired,
      indexValue: PropTypes.number.isRequired,
      createdDt: PropTypes.string.isRequired,
    })
  ).isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
  }).isRequired,
  loading: PropTypes.bool,
};

export default MarketHistoryChart;
