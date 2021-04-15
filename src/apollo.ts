import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

import { resolvers, typeDefs } from './graphql/resolvers';
import { getStorageValue } from './common/helpers/storage';
import introspectionQueryResultData from './graphql/introspection';
import { AuthDocument, IsExtensionCheckDoneDocument } from './graphql';
import { setAuthData } from './graphql/helpers';
import typePolicies from './graphql/typePolicies';
import { extensionAuthPromise } from './services/extension';

extensionAuthPromise.then(d => {
  cache.writeQuery({
    query: AuthDocument,
    data: {
      auth: getStorageValue('userData') || null,
    },
  });
  cache.writeQuery({
    query: IsExtensionCheckDoneDocument,
    data: {
      isExtensionCheckDone: true,
    },
  });
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  const isAuthenticationError = graphQLErrors?.some(
    ({ extensions = {} }) => extensions.code === 'UNAUTHENTICATED',
  );

  if (isAuthenticationError) {
    // TODO: implement refresh token
    console.log('auth error encountered');
    setAuthData(cache);
    return;
  }
});

export const cache = new InMemoryCache({
  possibleTypes: introspectionQueryResultData.possibleTypes,
  typePolicies,
  // cacheRedirects: {
  //   Query: {
  //     movie: (_, { id }, { getCacheKey }) =>
  //       getCacheKey({ __typename: 'Movie', id }),
  //     tv: (_, { id }, { getCacheKey }) => getCacheKey({ __typename: 'Tv', id }),
  //     watched: (_, { id }, { getCacheKey }) =>
  //       getCacheKey({ __typename: 'Watched', id }),
  //     user: (_, { id }, { getCacheKey }) =>
  //       id ? getCacheKey({ __typename: 'User', id }) : undefined,
  //     // getCacheKey({ __typename: 'Watched', id }),
  //     // Try adding user: User?
  //   },
  //   Watched: {
  //     user: (watched, args, { getCacheKey }) => {
  //       return watched && watched.userId
  //         ? getCacheKey({ __typename: 'User', id: watched.userId })
  //         : undefined;
  //     },
  //   },
  // },
});

const httpLink = new BatchHttpLink({
  uri: `http://localhost:9000/graphql`,
  // uri: `https://server.seenit.show/graphql`,
});

const authLink = setContext(async request => {
  console.log('auth check');
  await extensionAuthPromise;
  const token = getStorageValue('token');
  console.log('finish auth setup');

  return {
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const apolloClient = new ApolloClient({
  cache,
  resolvers,
  // TODO: follow issue till base param and errorLink gets addressed
  // uri: `http://localhost:9000/graphql`,
  // headers: {
  //   authorization: getStorageValue('token')
  //     ? `Bearer ${getStorageValue('token')}`
  //     : '',
  // },
  // defaultOptions: {
  //   query: {
  //     fetchPolicy: 'network-only',
  //   },
  // },
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  typeDefs,
});
