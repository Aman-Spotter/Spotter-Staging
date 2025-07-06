import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { MapContext } from './MapProvider';

const Line = ({
  from = [0, 0],
  to = [0, 0],
  coordinates,
  stroke = 'currentcolor',
  strokeWidth = 3,
  fill = 'transparent',
  className = '',
  ...restProps
}) => {
  const { path } = useContext(MapContext);

  const lineData = {
    type: 'LineString',
    coordinates: coordinates || [from, to],
  };

  return (
    <path
      d={path(lineData)}
      className={`rsm-line ${className}`}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      {...restProps}
    />
  );
};

Line.defaultProps = {
  from: [0, 0],
  to: [0, 0],
  stroke: 'currentcolor',
  strokeWidth: 3,
  fill: 'transparent',
  className: '',
};

Line.propTypes = {
  from: PropTypes.arrayOf(PropTypes.number),
  to: PropTypes.arrayOf(PropTypes.number),
  coordinates: PropTypes.arrayOf(PropTypes.any).isRequired,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  fill: PropTypes.string,
  className: PropTypes.string,
};

export default Line;
