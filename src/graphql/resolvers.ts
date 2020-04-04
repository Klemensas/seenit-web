import { Resolvers, gql } from '@apollo/client';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

export const isLoggedIn = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const resolvers: Resolvers = {
  Mutation: {
    setIsLoggedIn: (root, { isLoggedIn }, { cache }) => {
      debugger;
      cache.writeData({ data: { isLoggedIn } });

      return isLoggedIn;
    },
  },
};
