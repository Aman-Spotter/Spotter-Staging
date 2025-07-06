import React, { useEffect } from 'react';

import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import ReactGA from 'react-ga4';
import GlobalFonts from 'assets/fonts';
import { client } from 'apollo/client';
import colors from 'constant/Colors';
import './App.scss';
import Page from 'pages';
import { TruckProvider } from 'context/useTruck';
import * as S from './styles';

const replaceDomainAndKeepPath = (originalUrl, newHostname) => {
  const regex = /^(https?:\/\/)([^/]+)(\/.*)/;

  const newUrl = originalUrl.replace(
    regex,
    (match, protocol, oldDomain, path) => `${newHostname}${path}`
  );

  return newUrl;
};

// Initialize Google Analytics only if the tracking ID is available
if (process.env.REACT_APP_GTAG) {
  ReactGA.initialize(process.env.REACT_APP_GTAG, {
    testMode: window.location.href.includes('localhost'),
  });
}

const App = () => {
  useEffect(() => {
    const isTruckbaseDomain = window.location.hostname.includes('truckbase');

    if (isTruckbaseDomain) {
      const redirectToDomain = process.env.REACT_APP_HOSTNAME;
      const newUrl = replaceDomainAndKeepPath(window.location.href, redirectToDomain);
      window.location.replace(newUrl);
    }
  }, []);

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <S.Layout className="App">
          <GlobalFonts />
          <ThemeProvider theme={{ colors }}>
            <TruckProvider>
              <Page />
            </TruckProvider>
          </ThemeProvider>
        </S.Layout>
      </ApolloProvider>
      <ReactTooltip id="map-tooltip" style={{ backgroundColor: '#043344', color: '#f5f6f8' }} />
      <ReactTooltip
        id="si-tooltip"
        style={{ backgroundColor: '#043344', color: '#f5f6f8', zIndex: '999999999' }}
      />
    </BrowserRouter>
  );
};

export default App;
