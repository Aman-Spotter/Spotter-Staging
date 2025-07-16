import React from 'react';
import * as fa from 'react-icons/fa';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import _ from 'lodash';
import { QueryStats, PrivacyTip, MailLock } from '@styled-icons/material-outlined';
import { FaChrome } from 'react-icons/fa';
import { Shield } from 'lucide-react';
import * as QUERY from 'apollo/query';

import { ReactComponent as Logo } from 'assets/svgs/logo_spotter.svg';
import { ReactComponent as LogoLabel } from 'assets/svgs/logo.svg';
import Facebook from 'assets/svgs/facebook.svg';
import Linkedin from 'assets/svgs/linkedin.svg';
import Instagram from 'assets/svgs/instagram.svg';
import GoogleButton from 'assets/svgs/playstore.svg';
import AppstoreButton from 'assets/svgs/appstore.svg';
import DriverAppIcon from 'assets/pngs/driver-app-icon.png';

import {
  Social,
  IconsWrapper,
  Icon,
  FooterContainer,
  SocialLogo,
  MenuWrapper,
  ActionButton,
  MenuItem,
  Username,
  MenuItemA,
  Copyright,
  RightPanel,
  Image,
  Address,
  NavigationGrid,
} from './Footer.elements';
import * as GS from '../../globalStyles';
// import BrokeragesIcon from '../../assets/pngs/brokerage-icon.png';
// import CarriersIcon from '../../assets/pngs/carriers-icon.png';
// import ApiIcon from '../../assets/pngs/api-icon.png';
// import BlogIcon from '../../assets/svgs/blog.svg';
// import TosIcon from '../../assets/svgs/tos.svg';

const BASE_URL = process.env.REACT_APP_HOSTNAME || `https://${window.location.hostname}`;
const isExtensionHost =
  window.location.hostname.includes('extension') || process.env.REACT_APP_EXTENSION_MODE;

const { FaFacebookF, FaYoutube, FaTwitter, FaRegUser } = fa;
const Footer = () => {
  const history = useHistory();
  const location = useLocation();
  const cachedMeRes = useQuery(QUERY.ME, { fetchPolicy: 'cache-only' });
  const me = _.get(cachedMeRes, 'data.me');
  const username = _.get(me, 'displayName') || _.get(me, 'username');

  // Check if we're on the Sentinel page with proper error handling
  const isSentinelPage = location?.pathname === '/sentinel';

  const onSignUpHandler = () => {
    let url;
    if (history.location.pathname === '/') {
      url = `broker-sign-up`;
    } else if (history.location.pathname === '/carrier') {
      url = `carrier-sign-up`;
    } else {
      url = `/sign-up`;
    }

    history.push(url);
  };

  return (
    <>
      <FooterContainer>
        {/* Logo and Social Icons Row */}
        <GS.Row padding="5px 0" justifyContent="center">
          <GS.Column colNum={10} marginBottom="0" justifyContent="center" alignItems="center">
            <SocialLogo to="/">
              <Logo height={24} />
              <LogoLabel color="white" className="logo" height={24} />
            </SocialLogo>
            <Social>
              <IconsWrapper>
                <a href="https://www.facebook.com/spotterai" target="_blank" rel="noreferrer">
                  <Icon src={Facebook} alt="facebook" />
                </a>
                <a
                  href="https://www.linkedin.com/company/spotter-labs"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon src={Linkedin} alt="linkedin" />
                </a>
                <a href="https://www.instagram.com/spotter.ai/" target="_blank" rel="noreferrer">
                  <Icon src={Instagram} alt="instagram" />
                </a>
              </IconsWrapper>
            </Social>
          </GS.Column>
        </GS.Row>

        <MenuWrapper>
          {/* Navigation Grid */}
          <NavigationGrid>
            <MenuItemA href={`${BASE_URL}/driversapp`}>
              <img className="icon" src={DriverAppIcon} alt="driver-app-icon" />
              <span>spotter app</span>
            </MenuItemA>
            {!isExtensionHost && (
              <MenuItemA
                href={
                  process.env.REACT_APP_ENV === 'PRODUCTION'
                    ? 'https://extension.spotter.ai'
                    : 'https://extension-dev.spotter.ai'
                }
              >
                <FaChrome size={19} role="img" color="#d8d8d8" />
                <span>extension</span>
              </MenuItemA>
            )}
            <MenuItemA href={`${BASE_URL}/lens`}>
              <QueryStats size={19} className="icon" />
              <span>lens</span>
            </MenuItemA>
            <MenuItemA href={`${BASE_URL}/sentinel`}>
              <Shield size={18} className="icon" color="#d8d8d8" />
              <span>sentinel</span>
            </MenuItemA>
            {isExtensionHost && (
              <>
                <MenuItem to="/privacy">
                  <PrivacyTip size={19} className="icon" />
                  <span>privacy policy</span>
                </MenuItem>
                <MenuItem to="/limited-use-disclosure">
                  <MailLock size={19} className="icon" />
                  <span>limited use</span>
                </MenuItem>
              </>
            )}
          </NavigationGrid>

          {/* Download Buttons Row - Hide on Sentinel page */}
          {!isSentinelPage && (
            <GS.Row justifyContent="center" padding="15px 0 10px 0">
              <GS.Column colNum={10} justifyContent="center" alignItems="center">
                <RightPanel>
                  <a href={process.env.REACT_APP_APPSTORE_URL} target="_blank" rel="noreferrer">
                    <Image src={AppstoreButton} alt="appstore" />
                  </a>
                  <a href={process.env.REACT_APP_PLAYSTORE_URL} target="_blank" rel="noreferrer">
                    <Image src={GoogleButton} alt="google" />
                  </a>
                </RightPanel>
              </GS.Column>
            </GS.Row>
          )}

          {/* Copyright Row */}
          <GS.Row alignItems="center" padding="10px 0 0 0">
            <div>
              <Copyright right>
                {new Date().getFullYear()} Copyright spotter.ai. All rights reserved.{' '}
                <a href="https://careers.spotter.ai/" target="_blank" rel="noreferrer">
                  Careers
                </a>{' '}
                | <a href={`${BASE_URL}/terms-and-services`}>Terms</a> |{' '}
                <a href={`${BASE_URL}/ccpa`}>CCPA</a>.
              </Copyright>
              <Address>251 Little Falls Dr. Wilmington DE 19808</Address>
            </div>
          </GS.Row>
        </MenuWrapper>
      </FooterContainer>
    </>
  );
};

export default Footer;
