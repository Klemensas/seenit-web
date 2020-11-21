import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  fromPromise,
} from '@apollo/client';
import { onError } from '@apollo/link-error';
import { setContext } from '@apollo/link-context';
import { BatchHttpLink } from '@apollo/link-batch-http';
// import { persistCache } from 'apollo-cache-persist';

import { resolvers, typeDefs } from './graphql/resolvers';
import { getStorageValue } from './common/helpers/storage';
import introspectionQueryResultData from './graphql/introspection';
import { AuthDocument } from './graphql';
import { setAuthData } from './graphql/helpers';
import typePolicies from './graphql/typePolicies';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  const isAuthenticationError = graphQLErrors?.some(
    ({ extensions = {} }) => extensions.code === 'UNAUTHENTICATED',
  );

  if (isAuthenticationError) {
    // TODO: implement refresh token
    fromPromise(
      fetch('http://localhost:9000/auth/refresh_token').then(response =>
        response.json(),
      ),
    );
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

const authLink = setContext(request => {
  const token = getStorageValue('token');

  return {
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

cache.writeQuery({
  query: AuthDocument,
  data: {
    auth: getStorageValue('userData') || null,
  },
});

export const apolloClient = async () => {
  // console.time('Persist block');
  // await persistCache({
  //   cache,
  //   storage: window.localStorage as any,
  //   debug: true,
  // });
  // console.timeEnd('Persist block');

  return new ApolloClient({
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
};
