import React, { useState, useEffect, Suspense } from 'react';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';
import * as extensionApi from 'trbsextension/api';

import { LoadingIndicator, StripePayment, PublicLayout } from 'components';

import * as S from './styles';
import { Container } from '../../globalStyles';

const ExtensionPayment = () => {
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const history = useHistory();

  const accessToken = Cookies.get('extension_access_token');

  const handleCreateSubscription = async (accessToken) => {
    try {
      const data = await extensionApi.createSubscription({
        token: accessToken,
        allowIncomplete: true,
      });
      if (data?.client_secret) {
        setClientSecret(data.client_secret);
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } catch (err) {
      console.log('err', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  useEffect(() => {
    if (accessToken) {
      handleCreateSubscription(accessToken);
    } else {
      history.replace('/');
    }
  }, [accessToken]);

  return (
    <PublicLayout>
      <Suspense fallback={<LoadingIndicator />}>
        {!!error && <div>{error}</div>}
        <Container>
          {clientSecret ? (
            <StripePayment
              title="process payment"
              description="$15/mo"
              clientSecret={clientSecret}
              redirectPath="/payment-successful"
            />
          ) : (
            <S.LoadingContainer>
              <LoadingIndicator />
            </S.LoadingContainer>
          )}
        </Container>
      </Suspense>
    </PublicLayout>
  );
};

export default ExtensionPayment;
