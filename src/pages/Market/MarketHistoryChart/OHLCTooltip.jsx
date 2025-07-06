/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import displayValuesFor from 'react-stockcharts/lib/tooltip/displayValuesFor';
import GenericChartComponent from 'react-stockcharts/lib/GenericChartComponent';

import { isDefined, functor } from 'react-stockcharts/lib/utils';
import ToolTipText from 'react-stockcharts/lib/tooltip/ToolTipText';
import ToolTipTSpanLabel from 'react-stockcharts/lib/tooltip/ToolTipTSpanLabel';

const OHLCTooltip = (props) => {
  const {
    children,
    displayValuesFor,
    xDisplayFormat,
    accessor,
    ohlcFormat,
    percentFormat,
    displayTexts,
    origin: originProp,
  } = props;

  const renderSVG = (moreProps) => {
    const {
      chartConfig: { width, height },
    } = moreProps;
    const { displayXAccessor } = moreProps;

    const currentItem = displayValuesFor(props, moreProps);

    let displayDate = displayTexts.na;
    let open = displayTexts.na;
    let high = displayTexts.na;
    let low = displayTexts.na;
    let close = displayTexts.na;
    let percent = displayTexts.na;

    if (isDefined(currentItem) && isDefined(accessor(currentItem))) {
      const item = accessor(currentItem);

      displayDate = xDisplayFormat(displayXAccessor(item));
      open = ohlcFormat(item.open);
      high = ohlcFormat(item.high);
      low = ohlcFormat(item.low);
      close = ohlcFormat(item.close);
      percent = percentFormat((item.close - item.open) / item.open);
    }

    const origin = functor(originProp);
    const [x, y] = origin(width, height);

    const itemsToDisplay = {
      displayDate,
      open,
      high,
      low,
      close,
      percent,
      x,
      y,
    };
    return children(props, moreProps, itemsToDisplay);
  };

  return <GenericChartComponent clip={false} svgDraw={renderSVG} drawOn={['mousemove']} />;
};

OHLCTooltip.propTypes = {
  className: PropTypes.string,
  accessor: PropTypes.func,
  xDisplayFormat: PropTypes.func,
  children: PropTypes.func,
  percentFormat: PropTypes.func,
  ohlcFormat: PropTypes.func,
  origin: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number,
  onClick: PropTypes.func,
  displayValuesFor: PropTypes.func,
  textFill: PropTypes.string,
  labelFill: PropTypes.string,
  displayTexts: PropTypes.object,
};

const displayTextsDefault = {
  d: 'Date: ',
  o: ' O: ',
  h: ' H: ',
  l: ' L: ',
  c: ' C: ',
  na: 'n/a',
};

OHLCTooltip.defaultProps = {
  accessor: (d) => {
    return {
      date: d.date,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    };
  },
  xDisplayFormat: timeFormat('%Y-%m-%d'),
  percentFormat: format('.2%'),
  ohlcFormat: format('.2f'),
  displayValuesFor: displayValuesFor,
  origin: [0, 0],
  children: defaultDisplay,
  displayTexts: displayTextsDefault,
};

function defaultDisplay(props, moreProps, itemsToDisplay) {
  /* eslint-disable */
  const { className, textFill, labelFill, onClick, fontFamily, fontSize, displayTexts } = props;
  /* eslint-enable */

  const { displayDate, open, high, low, close, x, y } = itemsToDisplay;
  return (
    <g
      className={`react-stockcharts-tooltip-hover ${className}`}
      transform={`translate(${x}, ${y})`}
      onClick={onClick}
    >
      <ToolTipText x={0} y={0} fontFamily={fontFamily} fontSize={fontSize}>
        <ToolTipTSpanLabel fill={labelFill} key="label" x={0} dy="5">
          {displayTexts.d}
        </ToolTipTSpanLabel>
        <tspan key="value" fill={textFill}>
          {displayDate}
        </tspan>
        <ToolTipTSpanLabel fill={labelFill} key="label_O">
          {displayTexts.o}
        </ToolTipTSpanLabel>
        <tspan key="value_O" fill={textFill}>
          {open}
        </tspan>
        <ToolTipTSpanLabel fill={labelFill} key="label_H">
          {displayTexts.h}
        </ToolTipTSpanLabel>
        <tspan key="value_H" fill={textFill}>
          {high}
        </tspan>
        <ToolTipTSpanLabel fill={labelFill} key="label_L">
          {displayTexts.l}
        </ToolTipTSpanLabel>
        <tspan key="value_L" fill={textFill}>
          {low}
        </tspan>
        <ToolTipTSpanLabel fill={labelFill} key="label_C">
          {displayTexts.c}
        </ToolTipTSpanLabel>
        <tspan key="value_C" fill={textFill}>
          {close}
        </tspan>
      </ToolTipText>
    </g>
  );
}

export default OHLCTooltip;
