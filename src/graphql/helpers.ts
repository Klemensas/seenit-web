import { ApolloCache, gql } from '@apollo/client';

import {
  LoginMutation,
  RegisterMutation,
  AuthQuery,
  SettingsDocument,
} from '.';
import { updateStorage } from '../common/helpers/storage';

export const setAuthData = <T>(
  cache: ApolloCache<T>,
  auth?: LoginMutation['login']['user'] | RegisterMutation['register']['user'],
  token?: string,
) => {
  updateStorage('token', token || null);
  updateStorage('userData', auth || null);

  cache.writeQuery({
    query: gql`
      {
        auth
      }
    `,
    data: {
      auth: auth || null,
    },
  });
};

export const updateUserSettings = <T>(
  cache: ApolloCache<T>,
  user: NonNullable<AuthQuery['auth']>,
) => {
  updateStorage('userData', user);

  return cache.writeQuery({
    query: SettingsDocument,
    data: {
      settings: user.settings,
    },
  });
};
