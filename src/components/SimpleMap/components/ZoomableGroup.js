import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { MapContext } from './MapProvider';
import useZoomPan from './useZoomPan';

const ZoomableGroup = ({
  center = [0, 0],
  zoom = 1,
  minZoom = 1,
  maxZoom = 8,
  translateExtent,
  filterZoomEvent,
  onMoveStart,
  onMove,
  onMoveEnd,
  onMouseDown,
  className,
  disableZoomPan = false,
  ...restProps
}) => {
  const { width, height } = useContext(MapContext);
  const { mapRef, transformString } = useZoomPan({
    center,
    filterZoomEvent,
    onMoveStart,
    onMove,
    onMoveEnd,
    onMouseDown,
    scaleExtent: [minZoom, maxZoom],
    translateExtent,
    zoom,
    disableZoomPan,
  });

  return (
    <g ref={mapRef}>
      <rect width={width} height={height} fill="transparent" />
      <g transform={transformString} className={`rsm-zoomable-group ${className}`} {...restProps} />
    </g>
  );
};

ZoomableGroup.defaultProps = {
  center: [0, 0],
  zoom: 1,
  minZoom: 1,
  maxZoom: 8,
  translateExtent: undefined,
  filterZoomEvent: undefined,
  onMoveStart: undefined,
  onMove: undefined,
  onMoveEnd: undefined,
  onMouseDown: undefined,
  className: '',
  disableZoomPan: false,
};

ZoomableGroup.propTypes = {
  center: PropTypes.arrayOf(PropTypes.any),
  zoom: PropTypes.number,
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
  translateExtent: PropTypes.arrayOf(PropTypes.array),
  filterZoomEvent: PropTypes.func,
  onMoveStart: PropTypes.func,
  onMove: PropTypes.func,
  onMoveEnd: PropTypes.func,
  onMouseDown: PropTypes.func,
  className: PropTypes.string,
  disableZoomPan: PropTypes.bool,
};

export default ZoomableGroup;
