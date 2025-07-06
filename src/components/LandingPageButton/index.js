import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import { FaLongArrowAltRight } from 'react-icons/fa';
import * as S from './styles';

const LandingPageButton = ({
  title,
  hvBg,
  alignSelf,
  fontSize,
  color,
  maxWidth,
  margin,
  padding,
  primary,
  transparent,
  iconColor,
  iconSize,
  iconLeft,
  type,
  height,
  width,
  onClick,
  disabled,
  noArrow,
  smPadding,
  isLoading,
  border,
  borderRadius,
  fixedWidth,
}) => {
  const [showLoader, setShowLoader] = useState(false);

  // eslint-disable-next-line consistent-return
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
  }, [isLoading, showLoader]);

  const fadeOutProps = useSpring({
    display: 'flex',
    alignItems: 'center',
  });
  const fadeInProps = useSpring({
    opacity: showLoader ? 0 : 1,
    display: 'flex',
    alignItems: 'center',
  });
  return (
    <S.Button
      hvBg={hvBg}
      alignSelf={alignSelf}
      fontSize={fontSize}
      maxWidth={maxWidth}
      color={color}
      padding={padding}
      margin={margin}
      primary={primary}
      transparent={transparent}
      disabled={disabled}
      iconLeft={iconLeft}
      type={type}
      width={width}
      height={height}
      onClick={onClick}
      noArrow={noArrow}
      smPadding={smPadding}
      border={border}
      borderRadius={borderRadius}
      fixedWidth={fixedWidth}
    >
      {showLoader ? (
        <animated.div style={fadeOutProps}>
          <S.Loader />
        </animated.div>
      ) : (
        <animated.div style={fadeInProps}>
          <S.Title color={color} fontSize={fontSize}>
            {title}
          </S.Title>
          {!noArrow && <FaLongArrowAltRight color={iconColor} size={iconSize} />}
        </animated.div>
      )}
    </S.Button>
  );
};

LandingPageButton.defaultProps = {
  hvBg: '#ffffff',
  alignSelf: 'unset',
  fontSize: '17px',
  color: '#000000',
  maxWidth: '100%',
  padding: '25px 40px',
  margin: '0px',
  primary: false,
  transparent: false,
  iconColor: '#ffffff',
  iconSize: '20px',
  iconLeft: '20px',
  type: '',
  width: 'auto',
  height: 'auto',
  disabled: false,
  noArrow: false,
  smPadding: '17px',
  border: 'none',
  borderRadius: undefined,
  fixedWidth: false,
  isLoading: false,
};

LandingPageButton.propTypes = {
  title: PropTypes.string.isRequired,
  hvBg: PropTypes.string,
  alignSelf: PropTypes.string,
  fontSize: PropTypes.string,
  color: PropTypes.string,
  maxWidth: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string,
  primary: PropTypes.bool,
  transparent: PropTypes.bool,
  disabled: PropTypes.bool,
  noArrow: PropTypes.bool,
  isLoading: PropTypes.bool,
  iconColor: PropTypes.string,
  iconSize: PropTypes.string,
  iconLeft: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  smPadding: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  fixedWidth: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default LandingPageButton;
