import React, { ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { FormGroup, InputGroup, Button, Intent } from '@blueprintjs/core';
import { ApolloCache, FetchResult } from '@apollo/client';

import {
  useLoginMutation,
  useRegisterMutation,
  LoginMutation,
  RegisterMutation,
} from '../graphql';
import { setAuthData } from '../graphql/helpers';

export default function Login() {
  const history = useHistory();
  const [form, setForm] = React.useState({
    email: '',
    password: '',
    name: '',
  });
  const [isLogin, setLogin] = React.useState(true);
  const mutationParams = {
    variables: form,
    // refetchQueries: [
    //   {
    //     query: SetAuthDocument,
    //     variables: {},
    //   },
    // ],
    update: (
      cache: ApolloCache<LoginMutation | RegisterMutation>,
      { data }: FetchResult<LoginMutation | RegisterMutation>,
    ) => {
      if (!data) return;

      const { token, user } = 'login' in data ? data.login : data.register;
      setAuthData(cache, user, token);
      document.dispatchEvent(new CustomEvent('seenit-login'));
    },
  };

  const [login] = useLoginMutation(mutationParams);
  const [register] = useRegisterMutation(mutationParams);
  const mutationFn = isLogin ? login : register;

  return (
    <form
      onSubmit={async event => {
        event.preventDefault();

        await mutationFn();
        history.push('/');
      }}
    >
      {!isLogin && (
        <FormGroup label="Name" labelFor="name-input">
          <InputGroup
            id="name-input"
            large
            leftIcon="user"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, name: event.target.value })
            }
            placeholder="John Doe"
            value={form.name}
          />
        </FormGroup>
      )}
      <FormGroup label="Email" labelFor="email-input">
        <InputGroup
          id="email-input"
          large
          type="email"
          leftIcon="envelope"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, email: event.target.value })
          }
          placeholder="you@mail.com"
          value={form.email}
        />
      </FormGroup>
      <FormGroup label="Password" labelFor="password-input">
        <InputGroup
          id="password-input"
          large
          type="password"
          leftIcon="lock"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, password: event.target.value })
          }
          placeholder="Your password"
          value={form.password}
        />
      </FormGroup>

      <div className="flex flex-between">
        <Button type="submit" intent={Intent.PRIMARY}>
          {isLogin ? 'Login' : 'Register'}
        </Button>
        <Button type="button" onClick={() => setLogin(!isLogin)}>
          {isLogin ? 'Need to create an account?' : 'Already have an account?'}
        </Button>
      </div>
    </form>
  );
}
