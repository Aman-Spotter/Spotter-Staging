import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const LoadingSpinner = ({ center, title }) => (
  <S.SpinnerOverlay center={center}>
    <S.SpinnerContainer />
    {title && <S.Title>{title}</S.Title>}
  </S.SpinnerOverlay>
);

LoadingSpinner.defaultProps = {
  center: false,
  title: null,
};
LoadingSpinner.propTypes = {
  center: PropTypes.bool,
  title: PropTypes.string,
};

export default LoadingSpinner;
