import React, { useEffect } from 'react';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';
import ReactGA from 'react-ga4';

import { Footer, Navbar } from 'components';
import FooterLandingPage from 'components/FooterLandingPage';

import Home from './Home';
import NewHome from './NewHome';
import CarrierSignUp50 from './Signup';
import PrivacyPolicy from './PrivacyPolicy';
import SuccessLayout from './SuccessLayout';
import SetPassword from './SetPassword';
import ResetPassword from './ResetPassword';
import MarketDataSignUp from './MarketDataSignUp';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import RequestQuote from './RequestQuote';
import Payment from './Sentinel/Payment';
import PaymentSuccess from './Sentinel/PaymentSuccess';
import MVRPricing from './Sentinel/MVRPricing';

import Market from './Market';
import ExtensionLandingPage from './ExtensionLandingPage';
import ExtensionPayment from './ExtensionPayment';
import ExtensionBilling from './ExtensionBilling';
import ExtensionPrivacyPolicy from './ExtensionPrivacyPolicy';
import ExtensionLUD from './ExtensionLUD';
import TOS from './TOS';
import FromExtension from './FromExtension';
import ExtensionPaymentSuccess from './ExtensionPaymentSuccess';
import Sentinel from './Sentinel';
import TMS from './TMS';
import LoanCalculators from './LoanCalculators';
import WatchDemo from './WatchDemo';
import CCPA from './CCPA';
import Blog from './Blog';
import BlogPost from './BlogPost';

// Debug imports
console.log('MVRPricing component imported:', !!MVRPricing);

const Page = () => {
  const isExtensionHost =
    window.location.hostname.includes('extension') || process.env.REACT_APP_EXTENSION_MODE;

  const location = useLocation();

  // Debug routing
  console.log('=== ROUTING DEBUG ===');
  console.log('Current pathname:', location.pathname);
  console.log('Is extension host:', isExtensionHost);
  console.log('Environment:', process.env.NODE_ENV);
  console.log('App loaded at:', new Date().toISOString());

  useEffect(() => {
    // Only send pageview if Google Analytics is initialized
    if (process.env.REACT_APP_GTAG) {
      ReactGA.send({ hitType: 'pageview', page: location.pathname });
    }
  }, [location]);

  return (
    <>
      {isExtensionHost ? (
        <Switch>
          <Route path="/" exact>
            <Navbar absolute />
            <ExtensionLandingPage />
            <Footer />
          </Route>
          <Route path="/pay" exact component={ExtensionPayment} />
          <Route path="/billing" exact component={ExtensionBilling} />
          <Route path="/privacy" exact component={ExtensionPrivacyPolicy} />
          <Route path="/limited-use-disclosure" exact component={ExtensionLUD} />
          <Route path="/terms-and-services" component={TOS} />
          <Route path="/from-extension" component={FromExtension} />
          <Route path="/payment-successful" exact component={ExtensionPaymentSuccess} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={NewHome}>
            <Navbar absolute showAuthUrls />
            <NewHome />
            <Footer />
          </Route>
          <Route path="/driversapp" component={Home}>
            <Navbar absolute showAuthUrls />
            <Home />
            <Footer />
          </Route>
          <Route path="/sign-up">
            <Navbar showAuthUrls={false} absolute />
            <CarrierSignUp50 />
            <Footer />
          </Route>
          <Route path="/market-sign-up">
            <Navbar showAuthUrls={false} absolute />
            <MarketDataSignUp />
            <Footer />
          </Route>
          <Route path="/success">
            <Navbar showAuthUrls={false} absolute />
            <SuccessLayout />
            <Footer />
          </Route>
          <Route path="/privacy-policy" component={PrivacyPolicy}>
            <Navbar showAuthUrls={false} absolute />
            <PrivacyPolicy />
            <Footer />
          </Route>
          <Route path="/password-set/:passwordSetToken">
            <Navbar showAuthUrls={false} absolute />
            <SetPassword />
            <Footer />
          </Route>
          <Route path="/password-reset/:passwordSetToken">
            <Navbar showAuthUrls={false} absolute />
            <ResetPassword />
            <Footer />
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/lens" exact>
            <Navbar showAuthUrls={false} />
            <Market />
            <Footer />
          </Route>
          <Redirect from="/market" to="/lens" />
          <Route path="/sentinel/mvrprice" exact>
            <Navbar showAuthUrls isSentinelPage />
            <MVRPricing />
            <Footer />
          </Route>
          <Route path="/sentinel/mvr-price" exact>
            <Navbar showAuthUrls isSentinelPage />
            <MVRPricing />
            <Footer />
          </Route>
          <Route path="/sentinel" exact>
            <Navbar showAuthUrls isSentinelPage />
            <Sentinel />
            <Footer />
          </Route>

          <Route exact path="/tms" component={TMS}>
            <Navbar absolute showAuthUrls />
            <TMS />
            <Footer />
          </Route>
          <Route exact path="/loan-calculators" component={LoanCalculators}>
            <Navbar absolute showAuthUrls />
            <LoanCalculators />
            <Footer />
          </Route>
          <Route path="/watch-demo">
            <Navbar absolute showAuthUrls />
            <WatchDemo />
            <Footer />
          </Route>
          <Route path="/payment" exact component={Payment} />
          <Route path="/payment-success" exact component={PaymentSuccess} />
          <Route path="/terms-and-services" component={TOS} />
          <Route path="/from-extension" component={FromExtension} />
          <Route path="/limited-use-disclosure" exact component={ExtensionLUD} />
          <Route path="/request-quote" exact component={RequestQuote} />
          <Route path="/ccpa" exact>
            <Navbar showAuthUrls isSentinelPage />
            <CCPA />
            <Footer />
          </Route>
          <Route path="/insights" exact>
            <Navbar absolute showAuthUrls />
            <Blog />
            <Footer />
          </Route>
          <Route path="/insights/:id" exact>
            <Navbar absolute showAuthUrls />
            <BlogPost />
            <Footer />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      )}
    </>
  );
};

export default Page;
