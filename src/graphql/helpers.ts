import { ApolloCache, gql } from '@apollo/client';

import {
  LoginMutation,
  RegisterMutation,
  AuthQuery,
  SettingsDocument,
  AuthDocument,
  ManagedSettingsFragment,
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
  settings: ManagedSettingsFragment,
  user = cache.readQuery<AuthQuery>({ query: AuthDocument })?.auth,
) => {
  if (!user) return

  updateStorage('userData', {  ...user, settings });

  return cache.writeQuery({
    query: SettingsDocument,
    data: {
      settings,
    },
  });
};
