import React from 'react';
import { useIsMobile } from 'hooks';
import DesktopFooter from './Desktop';
import MobileFooter from './Mobile';

const Footer = () => {
  const { isMobile, width } = useIsMobile();

  return <>{isMobile ? <MobileFooter /> : <DesktopFooter />}</>;
};

export default Footer;
