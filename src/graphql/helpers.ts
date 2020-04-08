import { ApolloCache, gql } from '@apollo/client';

import { User } from '.';
import { updateStorage } from '../common/helpers/storage';

export const setAuthData = <T>(
  cache: ApolloCache<T>,
  auth?: Omit<User, 'watched'>,
  token?: string,
) => {
  updateStorage('token', token || null);
  updateStorage('userData', auth || null);

  if (auth) {
    cache.writeQuery({
      query: gql`
        {
          auth
        }
      `,
      data: {
        auth,
      },
    });
  }
};
