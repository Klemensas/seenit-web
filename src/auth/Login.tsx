import React from 'react';
import { useHistory } from 'react-router-dom';
import { FormGroup, InputGroup, Button, Intent } from '@blueprintjs/core';

import { useLoginMutation, useRegisterMutation } from '../graphql';

export default function Login({ isLogin }) {
  const history = useHistory();
  const [form, setForm] = React.useState({
    email: '',
    password: '',
    name: '',
  });
  // const [isLogin, setLogin] = React.useState(isLogin);
  const mutationParams = {
    variables: form,
    update: (cache, { data }) => {
      const { token, user } = data.login ? data.login : data.register;
      updateStorage({ token, user });
      cache.writeData({
        data: {
          isLoggedIn: true,
          userData: user,
        },
      });
      // TODO: consider moving this to completed since update might be called multiple times. Moved here since omplete isn't available on the 3rd party hook lib
    },
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        auth().then(() => history.push('/'));
      }}
    >
        {!isLogin && (
          <FormGroup label="Name" labelFor="name-input">
            <InputGroup
              id="name-input"
              large
              leftIcon="user"
              onChange={e => setForm({ ...form, name: e.target.value })}
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
            onChange={e => setForm({ ...form, email: e.target.value })}
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
            onChange={e => setForm({ ...form, password: e.target.value })}
            placeholder="Your password"
            value={form.password}
          />
        </FormGroup>
    </form>
  )
}