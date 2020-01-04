import { ApolloClient } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';

import { resolvers, typeDefs } from './graphql/resolvers';
import introspectionQueryResultData from './graphql/fragments';
import { getStorageValue } from './services/browser';


const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});
export const cache = new InMemoryCache({
  fragmentMatcher,
  cacheRedirects: {
    Query: {
      movie: (_, { id }, { getCacheKey }) =>
        getCacheKey({ __typename: 'Movie', id }),
      tv: (_, { id }, { getCacheKey }) =>
        getCacheKey({ __typename: 'Tv', id }),
      watched: (_, { id }, { getCacheKey }) =>
        getCacheKey({ __typename: 'Watched', id })
    },
    Watched: {
      user: (watched, args, { getCacheKey }) => {
        return watched && watched.userId ? getCacheKey({ __typename: 'User', id: watched.userId }) : undefined
      }
    }
  }
})

const token = getStorageValue('token')
const user = getStorageValue('user')
cache.writeData({
  data: {
    isLoggedIn: !!token,
    userData: user || null,
  }
})

const httpLink = new HttpLink({
  uri: `http://localhost:9000/graphql`,
})

export const apolloClient = new ApolloClient({
  cache,
  resolvers,
  link: ApolloLink.from([httpLink]),
  typeDefs
});
