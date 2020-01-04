import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

import { useIsUserLoggedInQuery } from '../graphql';


export default function AuthRoute({
  children,
  ...props
}: RouteProps) {
  const { data } = useIsUserLoggedInQuery()

  return (
    <Route {...props} render={() => (data && data.isLoggedIn ? children : <Redirect to="/login" />
    )} />
  )
}
