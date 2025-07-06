/* global fbq */
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { PublicLayout } from 'components';
import * as GS from '../../globalStyles';

const ExtensionPaymentSuccess = () => {
  const location = useLocation();
  const history = useHistory();
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (location?.state?.data) {
      setMsg(location?.state?.data?.msg);
    }
    if (location.search) {
      const queryParams = new URLSearchParams(location.search);
      if (
        (queryParams.get('payment_intent') || queryParams.get('setup_intent')) &&
        (queryParams.get('payment_intent_client_secret') ||
          queryParams.get('setup_intent_client_secret')) &&
        queryParams.get('redirect_status') === 'succeeded'
      ) {
        history.replace({
          pathname: location.pathname,
          state: {
            data: {
              msg: 'Payment successful! please login again in the extension popup to continue.',
            },
          },
        });
      }
    }
  }, [location]);
  return (
    <PublicLayout>
      <GS.CenteredWarppper>
        <GS.SemiSubHeading lightText>{msg}</GS.SemiSubHeading>
      </GS.CenteredWarppper>
    </PublicLayout>
  );
};

export default ExtensionPaymentSuccess;
