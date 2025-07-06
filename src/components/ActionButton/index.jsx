import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

import * as S from './styles';

const ActionButton = ({
  isLoading,
  isDisabled,
  color = 'primary',
  children,
  hasLeftMargin,
  onClick,
  height,
  ...props
}) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    }

    if (!isLoading && showLoader) {
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 400);

      return () => {
        clearTimeout(timeout);
      };
    }
    return () => {};
  }, [isLoading, showLoader]);

  const ref = useRef(null);

  // Hooks used to fade in/out the loader or the button contents
  const fadeOutProps = useSpring({ opacity: showLoader ? 1 : 0 });
  const fadeInProps = useSpring({ opacity: showLoader ? 0 : 1 });

  const handleClick = (evt) => {
    if (onClick && ref.current && !ref.current.getAttribute('disabled')) {
      ref.current.setAttribute('disabled', 'disabled');
      Promise.resolve(onClick(evt)).then(() => ref.current?.removeAttribute('disabled'));
    }
  };

  return (
    <S.Button
      {...props}
      disabled={isDisabled && !showLoader}
      color={color}
      ref={ref}
      hasLeftMargin={hasLeftMargin}
      onClick={handleClick}
      height={height}
    >
      {showLoader ? (
        <animated.div style={fadeOutProps}>
          <S.Loader />
        </animated.div>
      ) : (
        <animated.div style={fadeInProps}>{children}</animated.div>
      )}
    </S.Button>
  );
};

ActionButton.defaultProps = {
  isLoading: false,
  isDisabled: false,
  hasLeftMargin: false,
  borderRadius: '',
  color: 'primary',
  onClick: null,
  height: undefined,
};

ActionButton.propTypes = {
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'other']),
  hasLeftMargin: PropTypes.bool,
  borderRadius: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  height: PropTypes.string,
};

export default ActionButton;
