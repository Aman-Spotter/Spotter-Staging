import React from 'react';
import PropTypes from 'prop-types';
import { Check } from '@styled-icons/bootstrap';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { ActionButton } from 'components';

import * as S from '../styles';

const SubscribeBanner = ({ isLoading, onClick }) => (
  <S.SubscribeBanner>
    <S.BannerContentWrapper>
      <S.ModalTitle>get unlimited access to market data </S.ModalTitle>
      <S.SubscribeBenefitsRow>
        <S.SubscribeBenefitsCol>
          <S.Benefit>
            <Check className="checkmark" />
            hot market map
          </S.Benefit>
          <S.Benefit>
            <Check className="checkmark" />
            daily market rankings
          </S.Benefit>
        </S.SubscribeBenefitsCol>
        <S.SubscribeBenefitsCol>
          <S.Benefit>
            <Check className="checkmark" />
            market historical data
          </S.Benefit>
          <S.Benefit>
            <Check className="checkmark" />
            unlimited access
          </S.Benefit>
        </S.SubscribeBenefitsCol>
      </S.SubscribeBenefitsRow>
    </S.BannerContentWrapper>
    <S.ButtonWrapper>
      <ActionButton
        isLoading={isLoading}
        onClick={onClick}
        id="subscribe-button"
        type="button"
        borderRadius="10px"
      >
        <strong>subscribe now</strong>
        <FaLongArrowAltRight color="white" size={15} style={{ marginLeft: '20px' }} />
      </ActionButton>
    </S.ButtonWrapper>
  </S.SubscribeBanner>
);

SubscribeBanner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SubscribeBanner;
