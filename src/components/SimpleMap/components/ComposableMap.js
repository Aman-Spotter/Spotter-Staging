import React from 'react';
import PropTypes from 'prop-types';

import { MapProvider } from './MapProvider';

const ComposableMap = ({
  width = 800,
  height = 600,
  projection = 'geoEqualEarth',
  projectionConfig = {},
  className = '',
  ...restProps
}) => (
  <MapProvider
    width={width}
    height={height}
    projection={projection}
    projectionConfig={projectionConfig}
  >
    <svg viewBox={`0 0 ${width} ${height}`} className={`rsm-svg ${className}`} {...restProps} />
  </MapProvider>
);

ComposableMap.defaultProps = {
  width: 800,
  height: 600,
  projection: 'geoEqualEarth',
  projectionConfig: {},
  className: '',
};

ComposableMap.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  projection: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  projectionConfig: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
};

export default ComposableMap;
