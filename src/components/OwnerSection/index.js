import React from 'react';
import PropTypes from 'prop-types';
import Dots from 'components/Dots';
import * as S from './styles';

const OwnerSection = ({ color, noDots, small }) => (
  <S.Layout color={color}>
    <S.InnerLayout>
      <S.LeftPanel>
        {!noDots && <Dots />}
        <S.Title small={small}>
          sign up for <br />
          owner operators
        </S.Title>
      </S.LeftPanel>
      <S.RightPanel>
        <S.Card small={small}>
          <span>
            Our <b>Owner Operators</b> have the optionality of{' '}
            <span style={{ color: 'rgb(17 172 115)', fontWeight: 'bold' }}>accepting</span> or{' '}
            <span style={{ color: 'rgb(235 61 81)', fontWeight: 'bold' }}>rejecting</span> loads
            while running under our select MCs.
          </span>
        </S.Card>
      </S.RightPanel>
    </S.InnerLayout>
  </S.Layout>
);

OwnerSection.defaultProps = {
  color: null,
  noDots: false,
  small: false,
};

OwnerSection.propTypes = {
  color: PropTypes.string,
  noDots: PropTypes.bool,
  small: PropTypes.bool,
};

export default OwnerSection;
