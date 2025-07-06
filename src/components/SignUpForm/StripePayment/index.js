/* eslint-disable react/prop-types */
import React, { lazy, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, ElementsConsumer } from '@stripe/react-stripe-js';

import * as S from '../styles';
import { SubHeading, Row, Column } from '../../../globalStyles';
import Button from '../../LandingPageButton';

const LoadingIndicator = lazy(() => import('components/LoadingIndicator'));
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const StripePayment = ({ title, description, clientSecret, redirectPath = '/success-sign-up' }) => {
  const [error, setError] = useState('');
  const [elementReady, setElementReady] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event, stripe, elements, clientSecret) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setLoading(true);
    if (clientSecret.indexOf('seti_') === 0) {
      const result = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}${redirectPath}`,
        },
      });
      if (result.error) {
        setError(result.error.message);
      }
    } else {
      const result = await stripe.confirmPayment({
        // `Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: `${window.location.origin}${redirectPath}`,
        },
      });
      if (result.error) {
        setError(result.error.message);
      }
    }
    setLoading(false);
  };

  return (
    <S.Wrapper>
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: {
            theme: 'night',
            variables: { colorPrimary: '#008080', colorBackground: '#04283c' },
          },
        }}
      >
        <ElementsConsumer>
          {({ stripe, elements }) =>
            !stripe ? (
              <LoadingIndicator />
            ) : (
              <>
                {!elementReady && <LoadingIndicator />}
                <form style={{ display: elementReady ? 'block' : 'none' }}>
                  <SubHeading>{title}</SubHeading>
                  <SubHeading fontSize="24px" lineHeight="24px">
                    {description}
                  </SubHeading>
                  <S.InputWarp style={{ marginTop: 30 }}>
                    <PaymentElement
                      options={{ business: { name: 'spotter.ai' } }}
                      onReady={() => setElementReady(true)}
                    />
                  </S.InputWarp>
                  <S.Error>{error}</S.Error>
                  <Row alignItems="center">
                    <Column colNum={10} alignItems="center" last>
                      <Button
                        title="Subscribe"
                        color="#ffffff"
                        type="button"
                        width="200px"
                        iconColor="#008080"
                        isLoading={loading}
                        disabled={!stripe}
                        onClick={(evt) => handleSubmit(evt, stripe, elements, clientSecret)}
                      />
                    </Column>
                  </Row>
                </form>
              </>
            )
          }
        </ElementsConsumer>
      </Elements>
    </S.Wrapper>
  );
};

export default StripePayment;
