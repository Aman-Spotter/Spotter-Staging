import { ApolloClient, InMemoryCache, ApolloLink, createHttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import Cookies from 'js-cookie';

import * as QUERY from 'apollo/query';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        me: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

export const errorLink = onError(({ graphQLErrors = [], networkError }) => {
  const unauthorizedError = graphQLErrors.find((err) => err.message === 'Unauthorized');
  if (unauthorizedError) {
    Cookies.remove('access_token');
    window.location = '/';
    throw Error('User unauthorized.');
  }

  const tokenExpiredError = graphQLErrors.find((err) => err.message === 'Signature has expired');
  if (tokenExpiredError) {
    Cookies.remove('access_token');
    window.location = '/';
    throw Error(tokenExpiredError);
  }

  const expiredSubscriptionError = graphQLErrors.find(
    (err) => err.message === 'Your subscription has expired'
  );
  if (expiredSubscriptionError) {
    const { me } = cache.readQuery({ query: QUERY.ME });
    cache.writeQuery({
      query: QUERY.ME,
      data: {
        me: { ...me, hasValidSubscription: false },
      },
    });
  }

  if (networkError) {
    // Check if error response is JSON
    try {
      JSON.parse(networkError.bodyText);
    } catch (e) {
      // If not replace parsing error message with real one
      networkError.message = networkError.bodyText;
    }
  }
});

export const authLink = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => {
    const token = Cookies.get('access_token');

    if (Cookies.get('extension_access_token')) {
      headers['Extension-Token'] = Cookies.get('extension_access_token');
    }

    headers['Is-Spotter'] = 'true';

    if (token) {
      return {
        headers: {
          ...headers,
          'X-CSRFToken': Cookies.get('csrftoken'),
          authorization: `JWT ${token}`,
        },
      };
    }
    return {
      headers: {
        ...headers,
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    };
  });
  return forward(operation);
});

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL,
  credentials: 'include',
});

const link = ApolloLink.from([errorLink, authLink, httpLink]);

export const client = new ApolloClient({
  cache,
  link,
  fetchOptions: {
    mode: 'no-cors',
  },
});
