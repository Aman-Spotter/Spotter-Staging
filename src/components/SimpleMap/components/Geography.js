import React, { useState, memo, useRef } from 'react';
import PropTypes from 'prop-types';

const Geography = ({
  marketAreaId,
  geography,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  style = {},
  className = '',
  ...restProps
}) => {
  const [isPressed, setPressed] = useState(false);
  const [isFocused, setFocus] = useState(false);
  const ref = useRef(null);

  function handleMouseEnter(evt) {
    setFocus(true);
    if (onMouseEnter) onMouseEnter(evt);
  }

  function handleMouseLeave(evt) {
    setFocus(false);
    if (isPressed) setPressed(false);
    if (onMouseLeave) onMouseLeave(evt);
  }

  function handleFocus(evt) {
    setFocus(true);
    if (onFocus) onFocus(evt);
  }

  function handleBlur(evt) {
    setFocus(false);
    if (isPressed) setPressed(false);
    if (onBlur) onBlur(evt);
  }

  return (
    <path
      ref={ref}
      data-meta={marketAreaId}
      tabIndex="0"
      className={`rsm-geography ${className}`}
      d={geography.svgPath}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={style[isPressed || isFocused ? (isPressed ? 'pressed' : 'hover') : 'default']}
      {...restProps}
    />
  );
};

Geography.defaultProps = {
  marketAreaId: '',
  onMouseEnter: undefined,
  onMouseLeave: undefined,
  onMouseDown: undefined,
  onFocus: undefined,
  onBlur: undefined,
  style: {},
  className: '',
};

Geography.propTypes = {
  marketAreaId: PropTypes.string,
  geography: PropTypes.objectOf(PropTypes.any).isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseDown: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  style: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
};

export default memo(Geography);
