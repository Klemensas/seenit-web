import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

import { useIsUserLoggedInQuery } from '../graphql';


export default function AuthRoute({
  redirectTo = '/login',
  redirectComponent,
  ...routeProps
}: RouteProps & { redirectTo?: string, redirectComponent?: RouteProps['component'] }) {
  const { data } = useIsUserLoggedInQuery()

  if (data?.isLoggedIn) return <Route {...routeProps} />

  return redirectComponent ? <Route {...routeProps} component={redirectComponent} /> : <Redirect to={redirectTo} />
}
