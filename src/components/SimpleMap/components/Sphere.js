import React, { memo, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';

import { MapContext } from './MapProvider';

const Sphere = ({
  id = 'rsm-sphere',
  fill = 'transparent',
  stroke = 'currentcolor',
  strokeWidth = 0.5,
  className = '',
  ...restProps
}) => {
  const { path } = useContext(MapContext);
  const spherePath = useMemo(() => path({ type: 'Sphere' }), [path]);
  return (
    <>
      <defs>
        <clipPath id={id}>
          <path d={spherePath} />
        </clipPath>
      </defs>
      <path
        d={spherePath}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        style={{ pointerEvents: 'none' }}
        className={`rsm-sphere ${className}`}
        {...restProps}
      />
    </>
  );
};

Sphere.defaultProps = {
  id: 'rsm-sphere',
  fill: 'transparent',
  stroke: 'currentcolor',
  strokeWidth: 0.5,
  className: '',
};

Sphere.propTypes = {
  id: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  className: PropTypes.string,
};

export default memo(Sphere);
