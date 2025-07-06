import React from 'react';
import PropTypes from 'prop-types';
import * as S from '../../globalStyles';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const PublicLayout = ({ children, darkMode, showAuthUrls }) => (
  <S.Main darkMode={darkMode}>
    <Navbar showAuthUrls={showAuthUrls} />
    {children}
    <Footer />
  </S.Main>
);

PublicLayout.defaultProps = {
  children: null,
  darkMode: false,
  showAuthUrls: false,
};

PublicLayout.propTypes = {
  children: PropTypes.node,
  darkMode: PropTypes.bool,
  showAuthUrls: PropTypes.bool,
};
export default PublicLayout;
