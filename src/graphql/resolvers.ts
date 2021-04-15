import { Resolvers, gql, ApolloCache, ApolloClient } from '@apollo/client';
import { setAuthData } from './helpers';

export const typeDefs = gql`
  extend type Query {
    auth: User
    isExtensionCheckDone: Boolean
  }
`;

export const resolvers: Resolvers = {
  Mutation: {
    logout: (
      root,
      variables,
      { cache, client }: { cache: ApolloCache<any>; client: ApolloClient<any> },
    ) => {
      setAuthData(cache);
      client.resetStore();
    },
  },
};
