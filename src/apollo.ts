import { ApolloClient } from 'apollo-client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';

import { resolvers, typeDefs } from './graphql/resolvers';
import introspectionQueryResultData from './graphql/fragments';
import { getStorageValue, updateStorage } from './common/helpers/storage';

const httpLink = new HttpLink({
  uri: `http://localhost:9000/graphql`,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  const isAuthenticationError = graphQLErrors?.some(
    ({ extensions = {} }) => (extensions.code = 'UNAUTHENTICATED'),
  );

  if (isAuthenticationError) {
    cache.writeData({
      data: {
        isLoggedIn: false,
        userData: null,
      },
    });
    updateStorage('token', null);
  }
});

const authLink = setContext(
  request => {
    const token = getStorageValue('token');

    return {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  },
  // getStorageValue<{ token: string }>('token').then(({ token }) => ({
  //   headers: {
  //     ...headers,
  //     authorization: token ? `Bearer ${token}` : '',
  //   },
  // })),
);

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

export const cache = new InMemoryCache({
  fragmentMatcher,
  cacheRedirects: {
    Query: {
      movie: (_, { id }, { getCacheKey }) =>
        getCacheKey({ __typename: 'Movie', id }),
      tv: (_, { id }, { getCacheKey }) => getCacheKey({ __typename: 'Tv', id }),
      watched: (_, { id }, { getCacheKey }) =>
        getCacheKey({ __typename: 'Watched', id }),
      user: (_, { id }, { getCacheKey }) =>
        id ? getCacheKey({ __typename: 'User', id }) : undefined,
      // getCacheKey({ __typename: 'Watched', id }),
      // Try adding user: User?
    },
    Watched: {
      user: (watched, args, { getCacheKey }) => {
        return watched && watched.userId
          ? getCacheKey({ __typename: 'User', id: watched.userId })
          : undefined;
      },
    },
  },
});

export const apolloClient = async () => {
  console.time('Persist block');
  await persistCache({
    cache,
    storage: window.localStorage as any,
    debug: true,
  });
  console.timeEnd('Persist block');

  return new ApolloClient({
    cache,
    resolvers,
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only',
      },
    },
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    typeDefs,
  });
};
