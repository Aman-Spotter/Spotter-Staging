import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const Dots = ({ direction = 'vertical' }) => (
  <S.Wrapper direction={direction} className="dots">
    <S.Dot index={0} />
    <S.Dot index={1} />
    <S.Dot index={2} />
  </S.Wrapper>
);

Dots.defaultProps = {
  direction: 'vertical',
};

Dots.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
};

export default Dots;
