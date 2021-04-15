import { TypePolicies } from '@apollo/client';

import { WatchedCursor } from '.';

const typePolicies: TypePolicies = {
  WatchedCursor: {
    fields: {
      watched: {
        read(watched: WatchedCursor['watched'], { readField }) {
          return watched.filter(item => !!readField('id', item));
        },
      },
    },
  },
  Query: {
    fields: {
      autoTracked(_, { args, toReference }) {
        return toReference({
          __typename: 'AutoTracked',
          id: args?.id,
        });
      },
    },
  },
};

export default typePolicies;
