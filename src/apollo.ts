import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
// import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
// import { persistCache } from 'apollo-cache-persist';
import { onError } from '@apollo/link-error';

import { resolvers, typeDefs } from './graphql/resolvers';
import { getStorageValue, updateStorage } from './common/helpers/storage';
import introspectionQueryResultData from './graphql/introspection';

let g = 1;
const errorLink = onError(({ graphQLErrors, networkError, ...d }) => {
  console.error('howdy', graphQLErrors, ++g, d);
  const isAuthenticationError = graphQLErrors?.some(
    ({ extensions = {} }) => (extensions.code = 'UNAUTHENTICATED'),
  );

  if (isAuthenticationError) {
    // cache.writeData({
    //   data: {
    //     isLoggedIn: false,
    //     userData: null,
    //   },
    // });
    updateStorage('token', null);
  }
});

const errorLink2 = onError(({ graphQLErrors, networkError, ...d }) => {
  console.error('boopadity', d);
  const isAuthenticationError = graphQLErrors?.some(
    ({ extensions = {} }) => (extensions.code = 'UNAUTHENTICATED'),
  );

  if (isAuthenticationError) {
    // cache.writeData({
    //   data: {
    //     isLoggedIn: false,
    //     userData: null,
    //   },
    // });
    updateStorage('token', null);
  }
});

export const cache = new InMemoryCache({
  possibleTypes: introspectionQueryResultData.possibleTypes,
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

const httpLink = new HttpLink({
  uri: `http://localhost:9000/graphql`,
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
    // uri: `http://localhost:9000/graphql`,
    // headers: {
    //   authorization: getStorageValue('token')
    //     ? `Bearer ${getStorageValue('token')}`
    //     : '',
    // },
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only',
      },
    },
    link: ApolloLink.from([errorLink, httpLink, errorLink2]),
    // link: errorLink,
    typeDefs,
  });
};
