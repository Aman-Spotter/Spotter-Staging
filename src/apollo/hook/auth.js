import { useMemo } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import { useLocation } from 'react-router';
import _ from 'lodash';
import * as MUTATION from 'apollo/mutation';
import { ME } from 'apollo/query';

export const useSendResetPasswordEmail = () => {
  const apolloClient = useApolloClient();

  return useMemo(
    () => (email) =>
      apolloClient.mutate({
        mutation: MUTATION.SEND_PASSWORD_RESET_EMAIL,
        variables: {
          email,
        },
        fetchPolicy: 'no-cache',
      }),
    [apolloClient]
  );
};

export const useResetPassword = () => {
  const apolloClient = useApolloClient();

  return useMemo(
    () =>
      ({ token = '', newPassword1 = '', newPassword2 = '' }) =>
        apolloClient.mutate({
          mutation: MUTATION.RESET_PASSWORD,
          variables: {
            token,
            newPassword1,
            newPassword2,
          },
          fetchPolicy: 'no-cache',
        }),
    [apolloClient]
  );
};

export const useCurrentSubscription = () => {
  const {
    data: { me } = {},
    refetch,
    loading,
  } = useQuery(ME, {
    notifyOnNetworkStatusChange: true,
  });
  const location = useLocation();

  const subscription = useMemo(() => {
    if (location.pathname === '/dispatcher') {
      const items = JSON.parse(_.get(me, 'subscription.items', '{}'));
      const defaultPrice = 29900;
      const priceAmount = (items?.data ? items.data[0].price.unit_amount : defaultPrice) / 100;

      return {
        subscription: {
          ..._.get(me, 'subscription', {}),
          items,
          latestInvoice: JSON.parse(_.get(me, 'subscription.latestInvoice', 'null')),
          upcomingInvoice: _.get(me, 'subscription.upcomingInvoice', null),
          status:
            _.get(me, 'subscription.status') ??
            (!_.get(me, 'dispatcher.isFree') ? 'incomplete' : null),
          priceAmount,
          description: 'subscribe to get access to the dispatcher interface functionalities',
        },
        isAdmin: me.dispatcher?.isTeamAdmin,
        subscriptionChoice: 'CARRIER',
        priceId: null,
      };
    }

    if (location.pathname === '/lens') {
      const items = JSON.parse(_.get(me, 'marketDataSubscription.items', '{}'));
      const defaultPrice = _.get(me, 'dispatcher.carrier.isOwnerOperator', false) ? 5000 : 29900;
      const priceAmount = (items?.data ? items.data[0].price.unit_amount : defaultPrice) / 100;

      return {
        subscription: {
          ..._.get(me, 'marketDataSubscription', {}),
          items,
          latestInvoice: JSON.parse(_.get(me, 'marketDataSubscription.latestInvoice', '{}')),
          status:
            _.get(me, 'marketDataSubscription.status') ??
            (!_.get(me, 'marketDataFree') ? 'incomplete' : null),
          priceAmount,
          description: 'subscribe to get access to live market data',
        },
        isAdmin: true,
        subscriptionChoice: 'MARKET_DATA',
      };
    }

    return { subscription: null, isAdmin: false };
  }, [me, me?.subscription, me?.marketDataSubscription, location.pathname]);
  return { ...subscription, refetch, loading };
};
