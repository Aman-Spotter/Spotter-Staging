/* global fbq */
import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Success from 'components/SignUpForm/Success';
import Footer from 'components/FooterLandingPage';
import * as S from './styles';

const SuccessLayout = ({ title, description = '' }) => (
  <S.Layout>
    <S.Container>
      <Success title={title} description={description} />
    </S.Container>
  </S.Layout>
);

SuccessLayout.propTypes = { title: PropTypes.string, description: PropTypes.string };
SuccessLayout.defaultProps = { title: '', description: '' };
export default SuccessLayout;
