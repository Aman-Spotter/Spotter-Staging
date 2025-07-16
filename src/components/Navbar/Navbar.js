import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useApolloClient } from '@apollo/client';

import { FaChevronDown, FaRegUser } from 'react-icons/fa';
import { MessageCircle } from 'lucide-react';
import { IconContext } from 'react-icons/lib';
import _ from 'lodash';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { useHistory, useLocation } from 'react-router';
import Cookies from 'js-cookie';
import * as QUERY from 'apollo/query';
import { useIsMobile } from 'hooks';

import {
  Nav,
  NavbarContainer,
  NavMenu,
  NavItem, // Import NavItem
  NavItemBtn,
  NavLinks,
  NavBtnLink,
  Logo,
  Button,
  Dropdown,
  DropdownBtn,
  DropdownContent,
  DropdownItem,
} from './Navbar.elements';
import { AppLogo } from './AppLogo';

const Navbar = ({ absolute, showAuthUrls, isSentinelPage }) => {
  const cachedMeRes = useQuery(QUERY.ME, { fetchPolicy: 'cache-only' });
  const me = _.get(cachedMeRes, 'data.me');
  const username = _.get(me, 'displayName') || _.get(me, 'username');
  const apolloClient = useApolloClient();
  const history = useHistory();
  const location = useLocation();
  const { isMobile } = useIsMobile();

  const onLogout = useCallback(async () => {
    Cookies.remove('access_token');

    apolloClient.writeQuery({
      query: QUERY.ME,
      data: {
        me: null,
      },
    });
    await apolloClient.clearStore();

    history.replace('/login', { from: location.pathname });
  }, [apolloClient]);

  const isExtensionHost =
    window.location.hostname.includes('extension') || process.env.REACT_APP_EXTENSION_MODE;

  const handleSentinelLogin = () => {
    window.location.href = 'https://safetyapp.spotter.ai/';
  };

  const handleContactSalesClick = () => {
    history.push('/request-quote?product=sentinel');
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav absolute={absolute}>
          <NavbarContainer
            padding={isMobile ? '0px 10px' : '30px 10px'}
            centered={
              (location.pathname === '/' ||
                location.pathname === '/driversapp' ||
                location.pathname === '/sentinel' ||
                location.pathname === '/tms' ||
                location.pathname === '/login' ||
                location.pathname === '/request-quote' ||
                location.pathname === '/loan-calculators' ||
                location.pathname === '/insights' ||
                location.pathname.startsWith('/insights/')) &&
              !isExtensionHost
            }
          >
            <Logo>
              <AppLogo />
            </Logo>
            <NavMenu>
              {/* <NavItem>
                <NavLinks to="/watch-demo">Watch Demo</NavLinks>
              </NavItem> */}

              <NavItemBtn>
                {isSentinelPage ? (
                  <>
                    <NavLinks as="button" onClick={handleSentinelLogin}>
                      <FaRegUser />
                      login
                    </NavLinks>
                    {!isMobile && (
                      <NavBtnLink as="button" onClick={handleContactSalesClick}>
                        <Button
                          primary
                          color="#fff"
                          borderRadius="10px"
                          padding="10px 25px"
                          smPadding="10px"
                        >
                          <MessageCircle size={14} style={{ marginRight: '8px' }} />
                          contact sales
                        </Button>
                      </NavBtnLink>
                    )}
                  </>
                ) : me ? (
                  <>
                    <Dropdown>
                      {username && (
                        <DropdownBtn>
                          {username.length > 10 && isMobile
                            ? `${username.slice(0, 10)}...`
                            : username}
                          <FaChevronDown />
                        </DropdownBtn>
                      )}
                      <DropdownContent>
                        <DropdownItem onClick={onLogout}>
                          <div>logout</div>
                        </DropdownItem>
                      </DropdownContent>
                    </Dropdown>
                  </>
                ) : showAuthUrls ? (
                  <>
                    <NavBtnLink to="/request-quote">
                      <Button
                        primary
                        color="#fff"
                        borderRadius="10px"
                        padding="10px 25px"
                        smPadding="10px"
                      >
                        sign up
                      </Button>
                    </NavBtnLink>
                  </>
                ) : (
                  <></>
                )}
              </NavItemBtn>
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

Navbar.defaultProps = {
  absolute: false,
  showAuthUrls: false,
  isSentinelPage: false,
};

Navbar.propTypes = {
  absolute: PropTypes.bool,
  showAuthUrls: PropTypes.bool,
  isSentinelPage: PropTypes.bool,
};

export default Navbar;
