import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

import { useAuthQuery } from '../graphql';

export default function AuthRoute({
  redirectTo = '/login',
  redirectComponent,
  ...routeProps
}: RouteProps & {
  redirectTo?: string;
  redirectComponent?: RouteProps['component'];
}) {
  const { data } = useAuthQuery();

  if (data?.auth) return <Route {...routeProps} />;

  return redirectComponent ? (
    <Route {...routeProps} component={redirectComponent} />
  ) : (
    <Redirect to={redirectTo} />
  );
}
