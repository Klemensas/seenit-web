import gql from 'graphql-tag';
import { Resolvers } from 'apollo-boost';

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
}